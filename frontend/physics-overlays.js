import * as THREE from "three";

export const overlayDefaults = {loads:true,inertia:false,com:false,joints:false};
const zAxis = new THREE.Vector3(0,0,1);

export class PhysicsOverlays {
  constructor(scene) {
    this.scene=scene;this.group=new THREE.Group();this.group.name="physics-overlays";scene.add(this.group);
    this.options={...overlayDefaults};this.items=new Map();
  }
  clear() {
    this.group.traverse(object=>{
      object.geometry?.dispose();
      if(object.material)for(const material of Array.isArray(object.material)?object.material:[object.material])material.dispose();
    });
    this.group.clear();this.items.clear();
  }
  dispose() { this.clear();this.scene.remove(this.group); }
  item(key, create) {
    if(!this.items.has(key)){const item=create();this.items.set(key,item);this.group.add(item);}
    const item=this.items.get(key);item.visible=true;return item;
  }
  arrow(key,origin,vector,color,scale) {
    const magnitude=vector.length();if(magnitude<1e-10||!Number.isFinite(magnitude))return;
    const arrow=this.item(key,()=>new THREE.ArrowHelper(new THREE.Vector3(1,0,0),new THREE.Vector3(),1,color));
    const length=magnitude*scale;
    arrow.position.copy(origin);arrow.setDirection(vector.clone().normalize());
    arrow.setLength(length,length*.22,length*.12);
    arrow.userData.vector=vector.toArray();arrow.userData.magnitude=magnitude;
  }
  moment(key,origin,vector,radius) {
    const magnitude=vector.length();if(magnitude<1e-10||!Number.isFinite(magnitude))return;
    const glyph=this.item(key,()=>{
      const group=new THREE.Group(),points=[];
      for(let i=0;i<=40;i++){const a=i/40*Math.PI*1.65;points.push(new THREE.Vector3(Math.cos(a),Math.sin(a),0));}
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0xc49bfa,depthTest:false})));
      const tip=new THREE.Mesh(new THREE.ConeGeometry(.09,.22,8),new THREE.MeshBasicMaterial({color:0xc49bfa,depthTest:false}));
      const a=Math.PI*1.65;tip.position.set(Math.cos(a),Math.sin(a),0);tip.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(-Math.sin(a),Math.cos(a),0));group.add(tip);
      return group;
    });
    glyph.position.copy(origin);glyph.quaternion.setFromUnitVectors(zAxis,vector.clone().normalize());glyph.scale.setScalar(radius);
    glyph.userData.vector=vector.toArray();glyph.userData.magnitude=magnitude;
  }
  update(viewer) {
    const {model,data,mujoco:mj}=viewer;if(!model||!data)return;
    for(const item of this.items.values())item.visible=false;
    const extent=Math.max(.1,model.stat.extent||2),size=extent*.012;
    const flexBodies=model.nflex?new Set([...model.flex_vertbodyid,...model.flex_nodebodyid]):new Set();
    if(this.options.com||this.options.inertia){
      for(let body=1;body<model.nbody;body++){
        if(model.body_mass[body]<=0||flexBodies.has(body))continue;
        const center=new THREE.Vector3().fromArray(data.xipos,body*3);
        if(this.options.com){
          const marker=this.item(`com:${body}`,()=>new THREE.Mesh(new THREE.SphereGeometry(1,12,8),new THREE.MeshBasicMaterial({color:0xffd16b,depthTest:false})));
          marker.position.copy(center);marker.scale.setScalar(size);marker.renderOrder=5;
        }
        if(this.options.inertia){
          const mass=model.body_mass[body],inertia=Array.from(model.body_inertia.subarray(body*3,body*3+3));
          const lengths=inertia.map((value,i)=>Math.sqrt(Math.max(0,6*(inertia[(i+1)%3]+inertia[(i+2)%3]-value)/mass)));
          if(lengths.some(value=>!Number.isFinite(value)||value<=0))continue;
          const box=this.item(`inertia:${body}`,()=>{
            const group=new THREE.Group(),geometry=new THREE.BoxGeometry(1,1,1);
            group.add(new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:0x8ecbda,transparent:true,opacity:.12,depthWrite:false})));
            group.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry),new THREE.LineBasicMaterial({color:0x8ecbda,transparent:true,opacity:.8})));
            return group;
          });
          const r=data.ximat.subarray(body*9,body*9+9);
          const rotation=new THREE.Matrix4().set(r[0],r[1],r[2],0,r[3],r[4],r[5],0,r[6],r[7],r[8],0,0,0,0,1);
          box.position.copy(center);box.quaternion.setFromRotationMatrix(rotation);box.scale.fromArray(lengths);
        }
      }
    }
    if(this.options.joints){
      for(let joint=0;joint<model.njnt;joint++){
        if(flexBodies.has(model.jnt_bodyid[joint])||![mj.mjtJoint.mjJNT_HINGE.value,mj.mjtJoint.mjJNT_SLIDE.value].includes(model.jnt_type[joint]))continue;
        this.arrow(`axis:${joint}`,new THREE.Vector3().fromArray(data.xanchor,joint*3),new THREE.Vector3().fromArray(data.xaxis,joint*3),0x74cbe7,extent*.15);
      }
    }
    if(!this.options.loads)return;
    const forces=[],moments=[];
    const add=(origin,force,torque,key)=>{
      if(force?.length()>1e-10)forces.push({origin,vector:force,key});
      if(torque?.length()>1e-10)moments.push({origin,vector:torque,key});
    };
    if(viewer.drag&&viewer.dragTarget){
      const {bodyId,localPoint}=viewer.drag;
      const rotation=new THREE.Matrix3().set(...data.xmat.subarray(bodyId*9,bodyId*9+9));
      const origin=localPoint.clone().applyMatrix3(rotation).add(new THREE.Vector3().fromArray(data.xpos,bodyId*3));
      const displacement=viewer.dragTarget.clone().sub(origin);
      this.arrow("drag:target",origin,displacement,0xc2ccc7,1);
      const arrow=this.items.get("drag:target");
      if(arrow?.visible){
        const length=displacement.length();
        arrow.setLength(length,Math.min(length*.2,extent*.06),Math.min(length*.04,extent*.012));
        for(const part of [arrow.line,arrow.cone]){
          part.material.transparent=true;part.material.opacity=.65;
          part.material.depthTest=false;part.material.depthWrite=false;part.renderOrder=10;
        }
        arrow.userData.role="drag-target";arrow.userData.target=viewer.dragTarget.toArray();
      }
    }
    if(!viewer.posePrepared&&!viewer.drag){
      for(const entry of viewer.loadProgram?.entries||[]){
        if(entry.type!=="wrench")continue;
        const prefix=`load.${entry.id}`,values=viewer.loadValues||{};
        if(values[`${prefix}.fx`]===undefined)continue;
        const center=new THREE.Vector3().fromArray(data.xipos,entry.body*3);
        const r=data.xmat.subarray(entry.body*9,entry.body*9+9),rotation=new THREE.Matrix3().set(...r);
        const point=entry.site!==undefined?new THREE.Vector3().fromArray(data.site_xpos,entry.site*3):entry.point?new THREE.Vector3().fromArray(entry.point).applyMatrix3(rotation).add(new THREE.Vector3().fromArray(data.xpos,entry.body*3)):center.clone();
        const force=new THREE.Vector3(...["fx","fy","fz"].map(field=>values[`${prefix}.${field}`]));
        const torque=new THREE.Vector3(...["tx","ty","tz"].map(field=>values[`${prefix}.${field}`])).sub(point.clone().sub(center).cross(force));
        add(point,force,torque,entry.id);
      }
      // Only actuator drives classified as external contribute to these arrows.
      const generalized=Array.from(data.qfrc_applied);
      for(let actuator=0;actuator<model.nu;actuator++){
        if(viewer.hiddenLoadActuators?.has(actuator))continue;
        const start=data.moment_rowadr[actuator],count=data.moment_rownnz[actuator];
        for(let k=start;k<start+count;k++)generalized[data.moment_colind[k]]+=data.actuator_force[actuator]*data.actuator_moment[k];
      }
      for(let joint=0;joint<model.njnt;joint++){
        if(flexBodies.has(model.jnt_bodyid[joint])||![2,3].includes(model.jnt_type[joint]))continue;
        const vector=new THREE.Vector3().fromArray(data.xaxis,joint*3).multiplyScalar(generalized[model.jnt_dofadr[joint]]);
        const origin=new THREE.Vector3().fromArray(data.xanchor,joint*3);
        add(origin,model.jnt_type[joint]===2?vector:null,model.jnt_type[joint]===3?vector:null,`joint:${joint}`);
      }
    }
    const scale=extent*.28/Math.max(1,...forces.map(item=>item.vector.length()));
    for(const item of forces)this.arrow(`force:${item.key}`,item.origin,item.vector,0x68ddb1,scale);
    const maxMoment=Math.max(1,...moments.map(item=>item.vector.length()));
    for(const item of moments)this.moment(`moment:${item.key}`,item.origin,item.vector,extent*(.06+.07*item.vector.length()/maxMoment));
  }
}
