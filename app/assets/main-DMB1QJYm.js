const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/__vite-browser-external-CB9T68pL.js","assets/rolldown-runtime-WkwZ5CU-.js"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-WkwZ5CU-.js";import{n as t,t as n}from"./task-notes-CubpfVvb.js";var r={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},i={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},a=1e3,o=1001,s=1002,c=1003,l=1004,u=1005,d=1006,f=1007,p=1008,m=1009,h=1010,g=1011,_=1012,v=1013,y=1014,b=1015,x=1016,S=1017,C=1018,w=1020,T=35902,E=35899,D=1021,O=1022,k=1023,ee=1026,A=1027,te=1028,j=1029,ne=1030,re=1031,M=1033,ie=33776,ae=33777,oe=33778,se=33779,ce=35840,le=35841,ue=35842,de=35843,N=36196,P=37492,fe=37496,pe=37808,me=37809,he=37810,F=37811,ge=37812,_e=37813,ve=37814,I=37815,ye=37816,L=37817,R=37818,be=37819,xe=37820,Se=37821,Ce=36492,we=36494,Te=36495,Ee=36283,De=36284,Oe=36285,ke=36286,Ae=2300,je=2301,Me=2302,Ne=2400,Pe=2401,Fe=2402,Ie=3200,Le=3201,Re=`srgb`,ze=`srgb-linear`,Be=`linear`,z=`srgb`,B=7680,Ve=35044,He=35048,Ue=2e3,We=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Ge=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Ke=1234567,qe=Math.PI/180,Je=180/Math.PI;function Ye(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Ge[e&255]+Ge[e>>8&255]+Ge[e>>16&255]+Ge[e>>24&255]+`-`+Ge[t&255]+Ge[t>>8&255]+`-`+Ge[t>>16&15|64]+Ge[t>>24&255]+`-`+Ge[n&63|128]+Ge[n>>8&255]+`-`+Ge[n>>16&255]+Ge[n>>24&255]+Ge[r&255]+Ge[r>>8&255]+Ge[r>>16&255]+Ge[r>>24&255]).toLowerCase()}function V(e,t,n){return Math.max(t,Math.min(n,e))}function Xe(e,t){return(e%t+t)%t}function Ze(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function Qe(e,t,n){return e===t?0:(n-e)/(t-e)}function $e(e,t,n){return(1-n)*e+n*t}function et(e,t,n,r){return $e(e,t,1-Math.exp(-n*r))}function tt(e,t=1){return t-Math.abs(Xe(e,t*2)-t)}function nt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function rt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function it(e,t){return e+Math.floor(Math.random()*(t-e+1))}function at(e,t){return e+Math.random()*(t-e)}function ot(e){return e*(.5-Math.random())}function st(e){e!==void 0&&(Ke=e);let t=Ke+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ct(e){return e*qe}function lt(e){return e*Je}function ut(e){return!(e&e-1)&&e!==0}function dt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function ft(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function pt(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:console.warn(`THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function mt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`Invalid component type.`)}}function ht(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`Invalid component type.`)}}var gt={DEG2RAD:qe,RAD2DEG:Je,generateUUID:Ye,clamp:V,euclideanModulo:Xe,mapLinear:Ze,inverseLerp:Qe,lerp:$e,damp:et,pingpong:tt,smoothstep:nt,smootherstep:rt,randInt:it,randFloat:at,randFloatSpread:ot,seededRandom:st,degToRad:ct,radToDeg:lt,isPowerOfTwo:ut,ceilPowerOfTwo:dt,floorPowerOfTwo:ft,setQuaternionFromProperEuler:pt,normalize:ht,denormalize:mt},H=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},_t=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(o===0)e[t+0]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u;else if(o===1)e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=m;else{if(u!==m||s!==d||c!==f||l!==p){let e=1-o,t=s*d+c*f+l*p+u*m,n=t>=0?1:-1,r=1-t*t;if(r>2**-52){let i=Math.sqrt(r),a=Math.atan2(i,t*n);e=Math.sin(e*a)/i,o=Math.sin(o*a)/i}let i=o*n;if(s=s*e+d*i,c=c*e+f*i,l=l*e+p*i,u=u*e+m*i,e===1-o){let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:console.warn(`THREE.Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(V(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,i=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+i*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=i,this;let s=1-o*o;if(s<=2**-52){let e=1-t;return this._w=e*a+t*this._w,this._x=e*n+t*this._x,this._y=e*r+t*this._y,this._z=e*i+t*this._z,this.normalize(),this}let c=Math.sqrt(s),l=Math.atan2(c,o),u=Math.sin((1-t)*l)/c,d=Math.sin(t*l)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=r*u+this._y*d,this._z=i*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class e{constructor(t=0,n=0,r=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=r}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(yt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(yt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return vt.copy(this).projectOnVector(e),this.sub(vt)}reflect(e){return this.sub(vt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},vt=new U,yt=new _t,W=class e{constructor(t,n,r,i,a,o,s,c,l){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(bt.makeScale(e,t)),this}rotate(e){return this.premultiply(bt.makeRotation(-e)),this}translate(e,t){return this.premultiply(bt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},bt=new W;function xt(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function St(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Ct(){let e=St(`canvas`);return e.style.display=`block`,e}var wt={};function Tt(e){e in wt||(wt[e]=!0,console.warn(e))}function Et(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var G=new W().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dt=new W().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ot(){let e={enabled:!0,workingColorSpace:ze,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=kt(e.r),e.g=kt(e.g),e.b=kt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=At(e.r),e.g=At(e.g),e.b=At(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Be:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Tt(`THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Tt(`THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[ze]:{primaries:t,whitePoint:r,transfer:Be,toXYZ:G,fromXYZ:Dt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Re},outputColorSpaceConfig:{drawingBufferColorSpace:Re}},[Re]:{primaries:t,whitePoint:r,transfer:z,toXYZ:G,fromXYZ:Dt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Re}}}),e}var K=Ot();function kt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function At(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var jt,Mt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{jt===void 0&&(jt=St(`canvas`)),jt.width=e.width,jt.height=e.height;let t=jt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=jt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=St(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=kt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(kt(t[e]/255)*255):t[e]=kt(t[e]);return{data:t,width:e.width,height:e.height}}return console.warn(`THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Nt=0,Pt=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Nt++}),this.uuid=Ye(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Ft(r[t].image)):e.push(Ft(r[t]))}else e=Ft(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Ft(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Mt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn(`THREE.Texture: Unable to serialize Texture.`),{})}var It=0,Lt=new U,Rt=class e extends We{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=o,i=o,a=d,s=p,c=k,l=m,u=e.DEFAULT_ANISOTROPY,f=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:It++}),this.uuid=Ye(),this.name=``,this.source=new Pt(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=s,this.anisotropy=u,this.format=c,this.internalFormat=null,this.type=l,this.offset=new H(0,0),this.repeat=new H(1,1),this.center=new H(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new W,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Lt).x}get height(){return this.source.getSize(Lt).y}get depth(){return this.source.getSize(Lt).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case a:e.x-=Math.floor(e.x);break;case o:e.x=e.x<0?0:1;break;case s:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case a:e.y-=Math.floor(e.y);break;case o:e.y=e.y<0?0:1;break;case s:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Rt.DEFAULT_IMAGE=null,Rt.DEFAULT_MAPPING=300,Rt.DEFAULT_ANISOTROPY=1;var zt=class e{constructor(t=0,n=0,r=0,i=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=r,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this.w=V(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this.w=V(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Bt=class extends We{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:d,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new zt(0,0,e,t),this.scissorTest=!1,this.viewport=new zt(0,0,e,t);let r=new Rt({width:e,height:t,depth:n.depth});this.textures=[];let i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:d,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Pt(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:`dispose`})}},Vt=class extends Bt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ht=class extends Rt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=c,this.minFilter=c,this.wrapR=o,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},q=class extends Rt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=c,this.minFilter=c,this.wrapR=o,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ut=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Gt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Gt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Gt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Gt):Gt.fromBufferAttribute(r,t),Gt.applyMatrix4(e.matrixWorld),this.expandByPoint(Gt);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Kt.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Kt.copy(e.boundingBox)),Kt.applyMatrix4(e.matrixWorld),this.union(Kt)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Gt),Gt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($t),en.subVectors(this.max,$t),qt.subVectors(e.a,$t),Jt.subVectors(e.b,$t),Yt.subVectors(e.c,$t),Xt.subVectors(Jt,qt),Zt.subVectors(Yt,Jt),Qt.subVectors(qt,Yt);let t=[0,-Xt.z,Xt.y,0,-Zt.z,Zt.y,0,-Qt.z,Qt.y,Xt.z,0,-Xt.x,Zt.z,0,-Zt.x,Qt.z,0,-Qt.x,-Xt.y,Xt.x,0,-Zt.y,Zt.x,0,-Qt.y,Qt.x,0];return!rn(t,qt,Jt,Yt,en)||(t=[1,0,0,0,1,0,0,0,1],!rn(t,qt,Jt,Yt,en))?!1:(tn.crossVectors(Xt,Zt),t=[tn.x,tn.y,tn.z],rn(t,qt,Jt,Yt,en))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Gt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Gt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Wt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Wt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Wt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Wt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Wt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Wt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Wt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Wt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Wt)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Wt=[new U,new U,new U,new U,new U,new U,new U,new U],Gt=new U,Kt=new Ut,qt=new U,Jt=new U,Yt=new U,Xt=new U,Zt=new U,Qt=new U,$t=new U,en=new U,tn=new U,nn=new U;function rn(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){nn.fromArray(e,a);let o=i.x*Math.abs(nn.x)+i.y*Math.abs(nn.y)+i.z*Math.abs(nn.z),s=t.dot(nn),c=n.dot(nn),l=r.dot(nn);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var an=new Ut,on=new U,sn=new U,cn=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?an.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;on.subVectors(e,this.center);let t=on.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(on,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(sn.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(on.copy(e.center).add(sn)),this.expandByPoint(on.copy(e.center).sub(sn))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ln=new U,un=new U,dn=new U,fn=new U,pn=new U,mn=new U,hn=new U,gn=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ln)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ln.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ln.copy(this.origin).addScaledVector(this.direction,t),ln.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){un.copy(e).add(t).multiplyScalar(.5),dn.copy(t).sub(e).normalize(),fn.copy(this.origin).sub(un);let i=e.distanceTo(t)*.5,a=-this.direction.dot(dn),o=fn.dot(this.direction),s=-fn.dot(dn),c=fn.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(un).addScaledVector(dn,d),f}intersectSphere(e,t){ln.subVectors(e.center,this.origin);let n=ln.dot(this.direction),r=ln.dot(ln)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ln)!==null}intersectTriangle(e,t,n,r,i){pn.subVectors(t,e),mn.subVectors(n,e),hn.crossVectors(pn,mn);let a=this.direction.dot(hn),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;fn.subVectors(this.origin,e);let s=o*this.direction.dot(mn.crossVectors(fn,mn));if(s<0)return null;let c=o*this.direction.dot(pn.cross(fn));if(c<0||s+c>a)return null;let l=-o*fn.dot(hn);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},_n=class e{constructor(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/vn.setFromMatrixColumn(e,0).length(),i=1/vn.setFromMatrixColumn(e,1).length(),a=1/vn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bn,e,xn)}lookAt(e,t,n){let r=this.elements;return wn.subVectors(e,t),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Sn.crossVectors(n,wn),Sn.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Sn.crossVectors(n,wn)),Sn.normalize(),Cn.crossVectors(wn,Sn),r[0]=Sn.x,r[4]=Cn.x,r[8]=wn.x,r[1]=Sn.y,r[5]=Cn.y,r[9]=wn.y,r[2]=Sn.z,r[6]=Cn.z,r[10]=wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],ee=r[6],A=r[10],te=r[14],j=r[3],ne=r[7],re=r[11],M=r[15];return i[0]=a*x+o*T+s*k+c*j,i[4]=a*S+o*E+s*ee+c*ne,i[8]=a*C+o*D+s*A+c*re,i[12]=a*w+o*O+s*te+c*M,i[1]=l*x+u*T+d*k+f*j,i[5]=l*S+u*E+d*ee+f*ne,i[9]=l*C+u*D+d*A+f*re,i[13]=l*w+u*O+d*te+f*M,i[2]=p*x+m*T+h*k+g*j,i[6]=p*S+m*E+h*ee+g*ne,i[10]=p*C+m*D+h*A+g*re,i[14]=p*w+m*O+h*te+g*M,i[3]=_*x+v*T+y*k+b*j,i[7]=_*S+v*E+y*ee+b*ne,i[11]=_*C+v*D+y*A+b*re,i[15]=_*w+v*O+y*te+b*M,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15];return p*(+i*s*u-r*c*u-i*o*d+n*c*d+r*o*f-n*s*f)+m*(+t*s*f-t*c*d+i*a*d-r*a*f+r*c*l-i*s*l)+h*(+t*c*u-t*o*f-i*a*u+n*a*f+i*o*l-n*c*l)+g*(-r*o*l-t*s*u+t*o*d+r*a*u-n*a*d+n*s*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=u*h*c-m*d*c+m*s*f-o*h*f-u*s*g+o*d*g,v=p*d*c-l*h*c-p*s*f+a*h*f+l*s*g-a*d*g,y=l*m*c-p*u*c+p*o*f-a*m*f-l*o*g+a*u*g,b=p*u*s-l*m*s-p*o*d+a*m*d+l*o*h-a*u*h,x=t*_+n*v+r*y+i*b;if(x===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let S=1/x;return e[0]=_*S,e[1]=(m*d*i-u*h*i-m*r*f+n*h*f+u*r*g-n*d*g)*S,e[2]=(o*h*i-m*s*i+m*r*c-n*h*c-o*r*g+n*s*g)*S,e[3]=(u*s*i-o*d*i-u*r*c+n*d*c+o*r*f-n*s*f)*S,e[4]=v*S,e[5]=(l*h*i-p*d*i+p*r*f-t*h*f-l*r*g+t*d*g)*S,e[6]=(p*s*i-a*h*i-p*r*c+t*h*c+a*r*g-t*s*g)*S,e[7]=(a*d*i-l*s*i+l*r*c-t*d*c-a*r*f+t*s*f)*S,e[8]=y*S,e[9]=(p*u*i-l*m*i-p*n*f+t*m*f+l*n*g-t*u*g)*S,e[10]=(a*m*i-p*o*i+p*n*c-t*m*c-a*n*g+t*o*g)*S,e[11]=(l*o*i-a*u*i-l*n*c+t*u*c+a*n*f-t*o*f)*S,e[12]=b*S,e[13]=(l*m*r-p*u*r+p*n*d-t*m*d-l*n*h+t*u*h)*S,e[14]=(p*o*r-a*m*r-p*n*s+t*m*s+a*n*h-t*o*h)*S,e[15]=(a*u*r-l*o*r+l*n*s-t*u*s-a*n*d+t*o*d)*S,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,i=vn.set(r[0],r[1],r[2]).length(),a=vn.set(r[4],r[5],r[6]).length(),o=vn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(i=-i),e.x=r[12],e.y=r[13],e.z=r[14],yn.copy(this);let s=1/i,c=1/a,l=1/o;return yn.elements[0]*=s,yn.elements[1]*=s,yn.elements[2]*=s,yn.elements[4]*=c,yn.elements[5]*=c,yn.elements[6]*=c,yn.elements[8]*=l,yn.elements[9]*=l,yn.elements[10]*=l,t.setFromRotationMatrix(yn),n.x=i,n.y=a,n.z=o,this}makePerspective(e,t,n,r,i,a,o=Ue,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Ue,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},vn=new U,yn=new _n,bn=new U(0,0,0),xn=new U(1,1,1),Sn=new U,Cn=new U,wn=new U,Tn=new _n,En=new _t,Dn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(V(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-V(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(V(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-V(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(V(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-V(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:console.warn(`THREE.Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Tn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Tn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return En.setFromEuler(this),this.setFromQuaternion(En,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Dn.DEFAULT_ORDER=`XYZ`;var On=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},kn=0,An=new U,jn=new _t,Mn=new _n,Nn=new U,Pn=new U,Fn=new U,J=new _t,In=new U(1,0,0),Ln=new U(0,1,0),Rn=new U(0,0,1),zn={type:`added`},Bn={type:`removed`},Vn={type:`childadded`,child:null},Hn={type:`childremoved`,child:null},Un=class e extends We{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kn++}),this.uuid=Ye(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new U,n=new Dn,r=new _t,i=new U(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new _n},normalMatrix:{value:new W}}),this.matrix=new _n,this.matrixWorld=new _n,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new On,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return jn.setFromAxisAngle(e,t),this.quaternion.multiply(jn),this}rotateOnWorldAxis(e,t){return jn.setFromAxisAngle(e,t),this.quaternion.premultiply(jn),this}rotateX(e){return this.rotateOnAxis(In,e)}rotateY(e){return this.rotateOnAxis(Ln,e)}rotateZ(e){return this.rotateOnAxis(Rn,e)}translateOnAxis(e,t){return An.copy(e).applyQuaternion(this.quaternion),this.position.add(An.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(In,e)}translateY(e){return this.translateOnAxis(Ln,e)}translateZ(e){return this.translateOnAxis(Rn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Mn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Nn.copy(e):Nn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Pn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mn.lookAt(Pn,Nn,this.up):Mn.lookAt(Nn,Pn,this.up),this.quaternion.setFromRotationMatrix(Mn),r&&(Mn.extractRotation(r.matrixWorld),jn.setFromRotationMatrix(Mn),this.quaternion.premultiply(jn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(console.error(`THREE.Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zn),Vn.child=e,this.dispatchEvent(Vn),Vn.child=null):console.error(`THREE.Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Bn),Hn.child=e,this.dispatchEvent(Hn),Hn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Mn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Mn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Mn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zn),Vn.child=e,this.dispatchEvent(Vn),Vn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pn,e,Fn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pn,J,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};Un.DEFAULT_UP=new U(0,1,0),Un.DEFAULT_MATRIX_AUTO_UPDATE=!0,Un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Wn=new U,Gn=new U,Kn=new U,qn=new U,Jn=new U,Yn=new U,Xn=new U,Zn=new U,Qn=new U,$n=new U,er=new zt,tr=new zt,nr=new zt,rr=class e{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Wn.subVectors(e,t),r.cross(Wn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Wn.subVectors(r,t),Gn.subVectors(n,t),Kn.subVectors(e,t);let a=Wn.dot(Wn),o=Wn.dot(Gn),s=Wn.dot(Kn),c=Gn.dot(Gn),l=Gn.dot(Kn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,qn)!==null&&qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,qn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,qn.x),s.addScaledVector(a,qn.y),s.addScaledVector(o,qn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return er.setScalar(0),tr.setScalar(0),nr.setScalar(0),er.fromBufferAttribute(e,t),tr.fromBufferAttribute(e,n),nr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(er,i.x),a.addScaledVector(tr,i.y),a.addScaledVector(nr,i.z),a}static isFrontFacing(e,t,n,r){return Wn.subVectors(n,t),Gn.subVectors(e,t),Wn.cross(Gn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wn.subVectors(this.c,this.b),Gn.subVectors(this.a,this.b),Wn.cross(Gn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Jn.subVectors(r,n),Yn.subVectors(i,n),Zn.subVectors(e,n);let s=Jn.dot(Zn),c=Yn.dot(Zn);if(s<=0&&c<=0)return t.copy(n);Qn.subVectors(e,r);let l=Jn.dot(Qn),u=Yn.dot(Qn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Jn,a);$n.subVectors(e,i);let f=Jn.dot($n),p=Yn.dot($n);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Yn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Xn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Xn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Jn,a).addScaledVector(Yn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ir={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ar={h:0,s:0,l:0},or={h:0,s:0,l:0};function sr(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var cr=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Re){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,K.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=K.workingColorSpace){return this.r=e,this.g=t,this.b=n,K.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=K.workingColorSpace){if(e=Xe(e,1),t=V(t,0,1),n=V(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=sr(i,r,e+1/3),this.g=sr(i,r,e),this.b=sr(i,r,e-1/3)}return K.colorSpaceToWorking(this,r),this}setStyle(e,t=Re){function n(t){t!==void 0&&parseFloat(t)<1&&console.warn(`THREE.Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:console.warn(`THREE.Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);console.warn(`THREE.Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Re){let n=ir[e.toLowerCase()];return n===void 0?console.warn(`THREE.Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=kt(e.r),this.g=kt(e.g),this.b=kt(e.b),this}copyLinearToSRGB(e){return this.r=At(e.r),this.g=At(e.g),this.b=At(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Re){return K.workingToColorSpace(lr.copy(this),e),Math.round(V(lr.r*255,0,255))*65536+Math.round(V(lr.g*255,0,255))*256+Math.round(V(lr.b*255,0,255))}getHexString(e=Re){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=K.workingColorSpace){K.workingToColorSpace(lr.copy(this),t);let n=lr.r,r=lr.g,i=lr.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=K.workingColorSpace){return K.workingToColorSpace(lr.copy(this),t),e.r=lr.r,e.g=lr.g,e.b=lr.b,e}getStyle(e=Re){K.workingToColorSpace(lr.copy(this),e);let t=lr.r,n=lr.g,r=lr.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(ar),this.setHSL(ar.h+e,ar.s+t,ar.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ar),e.getHSL(or);let n=$e(ar.h,or.h,t),r=$e(ar.s,or.s,t),i=$e(ar.l,or.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},lr=new cr;cr.NAMES=ir;var ur=0,dr=class extends We{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ur++}),this.uuid=Ye(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new cr(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=B,this.stencilZFail=B,this.stencilZPass=B,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},fr=class extends dr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new cr(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},pr=new U,mr=new H,hr=0,gr=class{constructor(e,t,n=!1){if(Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ve,this.updateRanges=[],this.gpuType=b,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.applyMatrix3(e),this.setXY(t,mr.x,mr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)pr.fromBufferAttribute(this,t),pr.applyMatrix3(e),this.setXYZ(t,pr.x,pr.y,pr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)pr.fromBufferAttribute(this,t),pr.applyMatrix4(e),this.setXYZ(t,pr.x,pr.y,pr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)pr.fromBufferAttribute(this,t),pr.applyNormalMatrix(e),this.setXYZ(t,pr.x,pr.y,pr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)pr.fromBufferAttribute(this,t),pr.transformDirection(e),this.setXYZ(t,pr.x,pr.y,pr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=mt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ht(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=mt(t,this.array)),t}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=mt(t,this.array)),t}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=mt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=mt(t,this.array)),t}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),r=ht(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),r=ht(r,this.array),i=ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}},_r=class extends gr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},vr=class extends gr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},yr=class extends gr{constructor(e,t,n){super(new Float32Array(e),t,n)}},br=0,xr=new _n,Sr=new Un,Cr=new U,wr=new Ut,Tr=new Ut,Er=new U,Dr=class e extends We{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:br++}),this.uuid=Ye(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(xt(e)?vr:_r)(e,1):e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new W().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return xr.makeRotationFromQuaternion(e),this.applyMatrix4(xr),this}rotateX(e){return xr.makeRotationX(e),this.applyMatrix4(xr),this}rotateY(e){return xr.makeRotationY(e),this.applyMatrix4(xr),this}rotateZ(e){return xr.makeRotationZ(e),this.applyMatrix4(xr),this}translate(e,t,n){return xr.makeTranslation(e,t,n),this.applyMatrix4(xr),this}scale(e,t,n){return xr.makeScale(e,t,n),this.applyMatrix4(xr),this}lookAt(e){return Sr.lookAt(e),Sr.updateMatrix(),this.applyMatrix4(Sr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Cr).negate(),this.translate(Cr.x,Cr.y,Cr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new yr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&console.warn(`THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ut);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)console.error(`THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];wr.setFromBufferAttribute(n),this.morphTargetsRelative?(Er.addVectors(this.boundingBox.min,wr.min),this.boundingBox.expandByPoint(Er),Er.addVectors(this.boundingBox.max,wr.max),this.boundingBox.expandByPoint(Er)):(this.boundingBox.expandByPoint(wr.min),this.boundingBox.expandByPoint(wr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error(`THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)console.error(`THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new U,1/0);else if(e){let n=this.boundingSphere.center;if(wr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Tr.setFromBufferAttribute(n),this.morphTargetsRelative?(Er.addVectors(wr.min,Tr.min),wr.expandByPoint(Er),Er.addVectors(wr.max,Tr.max),wr.expandByPoint(Er)):(wr.expandByPoint(Tr.min),wr.expandByPoint(Tr.max))}wr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Er.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Er));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Er.fromBufferAttribute(a,t),o&&(Cr.fromBufferAttribute(e,t),Er.add(Cr)),r=Math.max(r,n.distanceToSquared(Er))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error(`THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new gr(new Float32Array(4*n.count),4));let a=this.getAttribute(`tangent`),o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new U,s[e]=new U;let c=new U,l=new U,u=new U,d=new H,f=new H,p=new H,m=new U,h=new U;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new U,y=new U,b=new U,x=new U;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0)n=new gr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new U,i=new U,a=new U,o=new U,s=new U,c=new U,l=new U,u=new U;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Er.fromBufferAttribute(e,t),Er.normalize(),e.setXYZ(t,Er.x,Er.y,Er.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new gr(a,r,i)}if(this.index===null)return console.warn(`THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}},Or=new _n,kr=new gn,Ar=new cn,jr=new U,Mr=new U,Nr=new U,Pr=new U,Fr=new U,Ir=new U,Lr=new U,Rr=new U,zr=class extends Un{constructor(e=new Dr,t=new fr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Ir.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Fr.fromBufferAttribute(s,e),a?Ir.addScaledVector(Fr,r):Ir.addScaledVector(Fr.sub(t),r))}t.add(Ir)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere),Ar.applyMatrix4(i),kr.copy(e.ray).recast(e.near),!(Ar.containsPoint(kr.origin)===!1&&(kr.intersectSphere(Ar,jr)===null||kr.origin.distanceToSquared(jr)>(e.far-e.near)**2))&&(Or.copy(i).invert(),kr.copy(e.ray).applyMatrix4(Or),(n.boundingBox===null||kr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,kr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Vr(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Vr(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Vr(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Vr(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Br(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Rr.copy(s),Rr.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Rr);return l<n.near||l>n.far?null:{distance:l,point:Rr.clone(),object:e}}function Vr(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Mr),e.getVertexPosition(c,Nr),e.getVertexPosition(l,Pr);let u=Br(e,t,n,r,Mr,Nr,Pr,Lr);if(u){let e=new U;rr.getBarycoord(Lr,Mr,Nr,Pr,e),i&&(u.uv=rr.getInterpolatedAttribute(i,s,c,l,e,new H)),a&&(u.uv1=rr.getInterpolatedAttribute(a,s,c,l,e,new H)),o&&(u.normal=rr.getInterpolatedAttribute(o,s,c,l,e,new U),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new U,materialIndex:0};rr.getNormal(Mr,Nr,Pr,t.normal),u.face=t,u.barycoord=e}return u}var Hr=class e extends Dr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new yr(c,3)),this.setAttribute(`normal`,new yr(l,3)),this.setAttribute(`uv`,new yr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new U;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Ur(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone():Array.isArray(i)?t[n][r]=i.slice():t[n][r]=i}}return t}function Wr(e){let t={};for(let n=0;n<e.length;n++){let r=Ur(e[n]);for(let e in r)t[e]=r[e]}return t}function Gr(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Kr(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:K.workingColorSpace}var qr={clone:Ur,merge:Wr},Jr=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yr=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Xr=class extends dr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jr,this.fragmentShader=Yr,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ur(e.uniforms),this.uniformsGroups=Gr(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Zr=class extends Un{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new _n,this.projectionMatrix=new _n,this.projectionMatrixInverse=new _n,this.coordinateSystem=Ue,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Qr=new U,$r=new H,ei=new H,ti=class extends Zr{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Je*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(qe*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Je*2*Math.atan(Math.tan(qe*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Qr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qr.x,Qr.y).multiplyScalar(-e/Qr.z),Qr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qr.x,Qr.y).multiplyScalar(-e/Qr.z)}getViewSize(e,t){return this.getViewBounds(e,$r,ei),t.subVectors(ei,$r)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(qe*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ni=-90,ri=1,ii=class extends Un{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new ti(ni,ri,e,t);r.layers=this.layers,this.add(r);let i=new ti(ni,ri,e,t);i.layers=this.layers,this.add(i);let a=new ti(ni,ri,e,t);a.layers=this.layers,this.add(a);let o=new ti(ni,ri,e,t);o.layers=this.layers,this.add(o);let s=new ti(ni,ri,e,t);s.layers=this.layers,this.add(s);let c=new ti(ni,ri,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,i),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,s),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ai=class extends Rt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},oi=class extends Vt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ai(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Hr(5,5,5),i=new Xr({name:`CubemapFromEquirect`,uniforms:Ur(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new zr(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=d),new ii(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},si=class extends Un{constructor(){super(),this.isGroup=!0,this.type=`Group`}},ci={type:`move`},li=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new si,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new si,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new si,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ci)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new si;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},ui=class extends Un{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dn,this.environmentIntensity=1,this.environmentRotation=new Dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},di=new U,fi=new U,pi=new W,mi=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=di.subVectors(n,t).cross(fi.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(di),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let i=-(e.start.dot(this.normal)+this.constant)/r;return i<0||i>1?null:t.copy(e.start).addScaledVector(n,i)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||pi.getNormalMatrix(e),r=this.coplanarPoint(di).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},hi=new cn,gi=new H(.5,.5),_i=new U,vi=class{constructor(e=new mi,t=new mi,n=new mi,r=new mi,i=new mi,a=new mi){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ue,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(hi)}intersectsSprite(e){return hi.center.set(0,0,0),hi.radius=.7071067811865476+gi.distanceTo(e.center),hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(hi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(_i.x=r.normal.x>0?e.max.x:e.min.x,_i.y=r.normal.y>0?e.max.y:e.min.y,_i.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(_i)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},yi=class extends dr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new cr(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},bi=new U,xi=new U,Si=new _n,Ci=new gn,wi=new cn,Ti=new U,Ei=new U,Di=class extends Un{constructor(e=new Dr,t=new yi){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)bi.fromBufferAttribute(t,e-1),xi.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=bi.distanceTo(xi);e.setAttribute(`lineDistance`,new yr(n,1))}else console.warn(`THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wi.copy(n.boundingSphere),wi.applyMatrix4(r),wi.radius+=i,e.ray.intersectsSphere(wi)===!1)return;Si.copy(r).invert(),Ci.copy(e.ray).applyMatrix4(Si);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Oi(this,e,Ci,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Oi(this,e,Ci,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Oi(this,e,Ci,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Oi(this,e,Ci,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Oi(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(bi.fromBufferAttribute(s,i),xi.fromBufferAttribute(s,a),n.distanceSqToSegment(bi,xi,Ti,Ei)>r)return;Ti.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(Ti);if(!(c<t.near||c>t.far))return{distance:c,point:Ei.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var ki=new U,Ai=new U,ji=class extends Di{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)ki.fromBufferAttribute(t,e),Ai.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+ki.distanceTo(Ai);e.setAttribute(`lineDistance`,new yr(n,1))}else console.warn(`THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Mi=class extends Rt{constructor(e,t,n=y,r,i,a,o=c,s=c,l,u=ee,d=1){if(u!==1026&&u!==1027)throw Error(`DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},r,i,a,o,s,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Pt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Ni=class extends Rt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Pi=class e extends Dr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new yr(u,3)),this.setAttribute(`normal`,new yr(d,3)),this.setAttribute(`uv`,new yr(f,2));function _(){let a=new U,_=new U,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new H,m=new U,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Fi=class e extends Pi{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ii=new U,Li=new U,Ri=new U,zi=new rr,Bi=class extends Dr{constructor(e=null,t=1){if(super(),this.type=`EdgesGeometry`,this.parameters={geometry:e,thresholdAngle:t},e!==null){let n=1e4,r=Math.cos(qe*t),i=e.getIndex(),a=e.getAttribute(`position`),o=i?i.count:a.count,s=[0,0,0],c=[`a`,`b`,`c`],l=[,,,],u={},d=[];for(let e=0;e<o;e+=3){i?(s[0]=i.getX(e),s[1]=i.getX(e+1),s[2]=i.getX(e+2)):(s[0]=e,s[1]=e+1,s[2]=e+2);let{a:t,b:o,c:f}=zi;if(t.fromBufferAttribute(a,s[0]),o.fromBufferAttribute(a,s[1]),f.fromBufferAttribute(a,s[2]),zi.getNormal(Ri),l[0]=`${Math.round(t.x*n)},${Math.round(t.y*n)},${Math.round(t.z*n)}`,l[1]=`${Math.round(o.x*n)},${Math.round(o.y*n)},${Math.round(o.z*n)}`,l[2]=`${Math.round(f.x*n)},${Math.round(f.y*n)},${Math.round(f.z*n)}`,l[0]!==l[1]&&l[1]!==l[2]&&l[2]!==l[0])for(let e=0;e<3;e++){let t=(e+1)%3,n=l[e],i=l[t],a=zi[c[e]],o=zi[c[t]],f=`${n}_${i}`,p=`${i}_${n}`;p in u&&u[p]?(Ri.dot(u[p].normal)<=r&&(d.push(a.x,a.y,a.z),d.push(o.x,o.y,o.z)),u[p]=null):f in u||(u[f]={index0:s[e],index1:s[t],normal:Ri.clone()})}}for(let e in u)if(u[e]){let{index0:t,index1:n}=u[e];Ii.fromBufferAttribute(a,t),Li.fromBufferAttribute(a,n),d.push(Ii.x,Ii.y,Ii.z),d.push(Li.x,Li.y,Li.z)}this.setAttribute(`position`,new yr(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Vi=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn(`THREE.Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new H:new U);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new U,r=[],i=[],a=[],o=new U,s=new _n;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new U)}i[0]=new U,a[0]=new U;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(V(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(V(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Hi=class extends Vi{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new H){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ui=class extends Hi{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Wi(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var Gi=new U,Ki=new Wi,qi=new Wi,Ji=new Wi,Yi=class extends Vi{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new U){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Gi.subVectors(r[0],r[1]).add(r[0]),c=Gi);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(Gi.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=Gi),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Ki.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),qi.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Ji.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Ki.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),qi.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Ji.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Ki.calc(s),qi.calc(s),Ji.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new U().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Xi(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Zi(e,t){let n=1-e;return n*n*t}function Qi(e,t){return 2*(1-e)*e*t}function $i(e,t){return e*e*t}function ea(e,t,n,r){return Zi(e,t)+Qi(e,n)+$i(e,r)}function ta(e,t){let n=1-e;return n*n*n*t}function na(e,t){let n=1-e;return 3*n*n*e*t}function ra(e,t){return 3*(1-e)*e*e*t}function ia(e,t){return e*e*e*t}function aa(e,t,n,r,i){return ta(e,t)+na(e,n)+ra(e,r)+ia(e,i)}var oa=class extends Vi{constructor(e=new H,t=new H,n=new H,r=new H){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(aa(e,r.x,i.x,a.x,o.x),aa(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Y=class extends Vi{constructor(e=new U,t=new U,n=new U,r=new U){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(aa(e,r.x,i.x,a.x,o.x),aa(e,r.y,i.y,a.y,o.y),aa(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},sa=class extends Vi{constructor(e=new H,t=new H){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new H){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new H){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ca=class extends Vi{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new U){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},la=class extends Vi{constructor(e=new H,t=new H,n=new H){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(ea(e,r.x,i.x,a.x),ea(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ua=class extends Vi{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(ea(e,r.x,i.x,a.x),ea(e,r.y,i.y,a.y),ea(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},da=class extends Vi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new H){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Xi(o,s.x,c.x,l.x,u.x),Xi(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new H().fromArray(n))}return this}},fa=Object.freeze({__proto__:null,ArcCurve:Ui,CatmullRomCurve3:Yi,CubicBezierCurve:oa,CubicBezierCurve3:Y,EllipseCurve:Hi,LineCurve:sa,LineCurve3:ca,QuadraticBezierCurve:la,QuadraticBezierCurve3:ua,SplineCurve:da}),pa=class extends Vi{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new fa[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new fa[n.type]().fromJSON(n))}return this}},ma=class extends pa{constructor(e){super(),this.type=`Path`,this.currentPoint=new H,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new sa(this.currentPoint.clone(),new H(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new la(this.currentPoint.clone(),new H(e,t),new H(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new oa(this.currentPoint.clone(),new H(e,t),new H(n,r),new H(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new da([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new Hi(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ha=class e extends Dr{constructor(e=[new H(0,-.5),new H(.5,0),new H(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=V(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new U,d=new H,f=new U,p=new U,m=new U,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new yr(a,3)),this.setAttribute(`uv`,new yr(o,2)),this.setAttribute(`normal`,new yr(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},ga=class e extends Dr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new yr(p,3)),this.setAttribute(`normal`,new yr(m,3)),this.setAttribute(`uv`,new yr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},_a=class e extends Dr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new U,d=new U,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=0;f===0&&a===0?v=.5/t:f===n&&s===Math.PI&&(v=-.5/t);for(let n=0;n<=t;n++){let s=n/t;u.x=-e*Math.cos(r+s*i)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(r+s*i)*Math.sin(a+_*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(s+v,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new yr(p,3)),this.setAttribute(`normal`,new yr(m,3)),this.setAttribute(`uv`,new yr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},va=class extends dr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new cr(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new cr(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ya=class extends dr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Ie,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ba=class extends dr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function xa(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Sa(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}var Ca=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`call to abstract method`)}intervalChanged_(){}},wa=class extends Ca{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ne,endingEnd:Ne}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Pe:i=e,o=2*t-n;break;case Fe:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Pe:a=e,s=2*n-t;break;case Fe:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Ta=class extends Ca{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Ea=class extends Ca{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Da=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=xa(t,this.TimeBufferType),this.values=xa(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:xa(e.times,Array),values:xa(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ea(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ta(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new wa(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ae:t=this.InterpolantFactoryMethodDiscrete;break;case je:t=this.InterpolantFactoryMethodLinear;break;case Me:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return console.warn(`THREE.KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ae;case this.InterpolantFactoryMethodLinear:return je;case this.InterpolantFactoryMethodSmooth:return Me}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error(`THREE.KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(console.error(`THREE.KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){console.error(`THREE.KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){console.error(`THREE.KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Sa(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){console.error(`THREE.KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Me,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Da.prototype.ValueTypeName=``,Da.prototype.TimeBufferType=Float32Array,Da.prototype.ValueBufferType=Float32Array,Da.prototype.DefaultInterpolation=je;var Oa=class extends Da{constructor(e,t,n){super(e,t,n)}};Oa.prototype.ValueTypeName=`bool`,Oa.prototype.ValueBufferType=Array,Oa.prototype.DefaultInterpolation=Ae,Oa.prototype.InterpolantFactoryMethodLinear=void 0,Oa.prototype.InterpolantFactoryMethodSmooth=void 0;var ka=class extends Da{constructor(e,t,n,r){super(e,t,n,r)}};ka.prototype.ValueTypeName=`color`;var Aa=class extends Da{constructor(e,t,n,r){super(e,t,n,r)}};Aa.prototype.ValueTypeName=`number`;var ja=class extends Ca{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)_t.slerpFlat(i,0,a,c-o,a,c,s);return i}},Ma=class extends Da{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new ja(this.times,this.values,this.getValueSize(),e)}};Ma.prototype.ValueTypeName=`quaternion`,Ma.prototype.InterpolantFactoryMethodSmooth=void 0;var Na=class extends Da{constructor(e,t,n){super(e,t,n)}};Na.prototype.ValueTypeName=`string`,Na.prototype.ValueBufferType=Array,Na.prototype.DefaultInterpolation=Ae,Na.prototype.InterpolantFactoryMethodLinear=void 0,Na.prototype.InterpolantFactoryMethodSmooth=void 0;var Pa=class extends Da{constructor(e,t,n,r){super(e,t,n,r)}};Pa.prototype.ValueTypeName=`vector`;var Fa={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(this.files[e]=t)},get:function(e){if(this.enabled!==!1)return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}},Ia=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},La=class{constructor(e){this.manager=e===void 0?Ia:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};La.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var Ra=new WeakMap,za=class extends La{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Fa.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=Ra.get(a);e===void 0&&(e=[],Ra.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=St(`img`);function s(){l(),t&&t(this);let n=Ra.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}Ra.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),Fa.remove(`image:${e}`);let n=Ra.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}Ra.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Fa.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},Ba=class extends La{constructor(e){super(e)}load(e,t,n,r){let i=new Rt,a=new za(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},Va=class extends Un{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new cr(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Ha=class extends Va{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Un.DEFAULT_UP),this.updateMatrix(),this.groundColor=new cr(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Ua=new _n,Wa=new U,Ga=new U,Ka=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new H(512,512),this.mapType=m,this.map=null,this.mapPass=null,this.matrix=new _n,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vi,this._frameExtents=new H(1,1),this._viewportCount=1,this._viewports=[new zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Wa.setFromMatrixPosition(e.matrixWorld),t.position.copy(Wa),Ga.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ga),t.updateMatrixWorld(),Ua.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ua,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ua)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},qa=class extends Zr{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ja=class extends Ka{constructor(){super(new qa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ya=class extends Va{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Un.DEFAULT_UP),this.updateMatrix(),this.target=new Un,this.shadow=new Ja}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Xa=class extends Va{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},Za=class extends ti{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Qa=`\\[\\]\\.:\\/`,$a=RegExp(`[\\[\\]\\.:\\/]`,`g`),eo=`[^\\[\\]\\.:\\/]`,to=`[^`+Qa.replace(`\\.`,``)+`]`,no=`((?:WC+[\\/:])*)`.replace(`WC`,eo),ro=`(WCOD+)?`.replace(`WCOD`,to),io=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,eo),ao=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,eo),oo=RegExp(`^`+no+ro+io+ao+`$`),so=[`material`,`materials`,`bones`,`map`],co=class{constructor(e,t,n){let r=n||lo.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},lo=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace($a,``)}static parseTrackName(e){let t=oo.exec(e);if(t===null)throw Error(`PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);so.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn(`THREE.PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){console.error(`THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){console.error(`THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){console.error(`THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){console.error(`THREE.PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){console.error(`THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;console.error(`THREE.PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};lo.Composite=co,lo.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},lo.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},lo.prototype.GetterByBindingType=[lo.prototype._getValue_direct,lo.prototype._getValue_array,lo.prototype._getValue_arrayElement,lo.prototype._getValue_toArray],lo.prototype.SetterByBindingTypeAndVersioning=[[lo.prototype._setValue_direct,lo.prototype._setValue_direct_setNeedsUpdate,lo.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[lo.prototype._setValue_array,lo.prototype._setValue_array_setNeedsUpdate,lo.prototype._setValue_array_setMatrixWorldNeedsUpdate],[lo.prototype._setValue_arrayElement,lo.prototype._setValue_arrayElement_setNeedsUpdate,lo.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[lo.prototype._setValue_fromArray,lo.prototype._setValue_fromArray_setNeedsUpdate,lo.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var uo=new _n,fo=class{constructor(e,t,n=0,r=1/0){this.ray=new gn(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new On,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error(`THREE.Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return uo.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(uo),this}intersectObject(e,t=!0,n=[]){return mo(e,this,n,t),n.sort(po),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)mo(e[r],this,n,t);return n.sort(po),n}};function po(e,t){return e.distance-t.distance}function mo(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)mo(r[e],t,n,!0)}}var ho=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){let e=1e-6;return this.phi=V(this.phi,e,Math.PI-e),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(V(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},go=new U,_o,vo,yo=class extends Un{constructor(e=new U(0,0,1),t=new U(0,0,0),n=1,r=16776960,i=n*.2,a=i*.2){super(),this.type=`ArrowHelper`,_o===void 0&&(_o=new Dr,_o.setAttribute(`position`,new yr([0,0,0,0,1,0],3)),vo=new Fi(.5,1,5,1),vo.translate(0,-.5,0)),this.position.copy(t),this.line=new Di(_o,new yi({color:r,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new zr(vo,new fr({color:r,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,i,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{go.set(e.z,0,-e.x).normalize();let t=Math.acos(e.y);this.quaternion.setFromAxisAngle(go,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}},bo=class extends We{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){e===void 0?console.warn(`THREE.Controls: connect() now requires an element.`):(this.domElement!==null&&this.disconnect(),this.domElement=e)}disconnect(){}dispose(){}update(){}};function xo(e,t,n,r){let i=So(r);switch(n){case D:return e*t;case te:return e*t/i.components*i.byteLength;case j:return e*t/i.components*i.byteLength;case ne:return e*t*2/i.components*i.byteLength;case re:return e*t*2/i.components*i.byteLength;case O:return e*t*3/i.components*i.byteLength;case k:return e*t*4/i.components*i.byteLength;case M:return e*t*4/i.components*i.byteLength;case ie:case ae:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case oe:case se:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case le:case de:return Math.max(e,16)*Math.max(t,8)/4;case ce:case ue:return Math.max(e,8)*Math.max(t,8)/2;case N:case P:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case fe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case pe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case me:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case he:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case F:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ge:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case _e:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case ve:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case I:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ye:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case L:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case R:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case be:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case xe:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Se:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ce:case we:case Te:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ee:case De:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Oe:case ke:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function So(e){switch(e){case m:case h:return{byteLength:1,components:1};case _:case g:case x:return{byteLength:2,components:1};case S:case C:return{byteLength:2,components:4};case y:case v:case b:return{byteLength:4,components:1};case T:case E:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`180`}})),typeof window<`u`&&(window.__THREE__?console.warn(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`180`);function Co(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function wo(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var X={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Z={common:{diffuse:{value:new cr(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new W}},envmap:{envMap:{value:null},envMapRotation:{value:new W},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new W}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new W}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new W},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new W},normalScale:{value:new H(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new W},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new W}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new W}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new W}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new cr(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new cr(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0},uvTransform:{value:new W}},sprite:{diffuse:{value:new cr(16777215)},opacity:{value:1},center:{value:new H(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}}},To={basic:{uniforms:Wr([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:X.meshbasic_vert,fragmentShader:X.meshbasic_frag},lambert:{uniforms:Wr([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new cr(0)}}]),vertexShader:X.meshlambert_vert,fragmentShader:X.meshlambert_frag},phong:{uniforms:Wr([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new cr(0)},specular:{value:new cr(1118481)},shininess:{value:30}}]),vertexShader:X.meshphong_vert,fragmentShader:X.meshphong_frag},standard:{uniforms:Wr([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new cr(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag},toon:{uniforms:Wr([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new cr(0)}}]),vertexShader:X.meshtoon_vert,fragmentShader:X.meshtoon_frag},matcap:{uniforms:Wr([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:X.meshmatcap_vert,fragmentShader:X.meshmatcap_frag},points:{uniforms:Wr([Z.points,Z.fog]),vertexShader:X.points_vert,fragmentShader:X.points_frag},dashed:{uniforms:Wr([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:X.linedashed_vert,fragmentShader:X.linedashed_frag},depth:{uniforms:Wr([Z.common,Z.displacementmap]),vertexShader:X.depth_vert,fragmentShader:X.depth_frag},normal:{uniforms:Wr([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:X.meshnormal_vert,fragmentShader:X.meshnormal_frag},sprite:{uniforms:Wr([Z.sprite,Z.fog]),vertexShader:X.sprite_vert,fragmentShader:X.sprite_frag},background:{uniforms:{uvTransform:{value:new W},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:X.background_vert,fragmentShader:X.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new W}},vertexShader:X.backgroundCube_vert,fragmentShader:X.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:X.cube_vert,fragmentShader:X.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:X.equirect_vert,fragmentShader:X.equirect_frag},distanceRGBA:{uniforms:Wr([Z.common,Z.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:X.distanceRGBA_vert,fragmentShader:X.distanceRGBA_frag},shadow:{uniforms:Wr([Z.lights,Z.fog,{color:{value:new cr(0)},opacity:{value:1}}]),vertexShader:X.shadow_vert,fragmentShader:X.shadow_frag}};To.physical={uniforms:Wr([To.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new W},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new W},clearcoatNormalScale:{value:new H(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new W},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new W},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new W},sheen:{value:0},sheenColor:{value:new cr(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new W},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new W},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new W},transmissionSamplerSize:{value:new H},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new W},attenuationDistance:{value:0},attenuationColor:{value:new cr(0)},specularColor:{value:new cr(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new W},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new W},anisotropyVector:{value:new H},anisotropyMap:{value:null},anisotropyMapTransform:{value:new W}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag};var Eo={r:0,b:0,g:0},Do=new Dn,Oo=new _n;function ko(e,t,n,r,i,a,o){let s=new cr(0),c=a===!0?0:1,l,u,d=null,f=0,p=null;function m(e){let r=e.isScene===!0?e.background:null;return r&&r.isTexture&&(r=(e.backgroundBlurriness>0?n:t).get(r)),r}function h(t){let n=!1,i=m(t);i===null?_(s,c):i&&i.isColor&&(_(i,1),n=!0);let a=e.xr.getEnvironmentBlendMode();a===`additive`?r.buffers.color.setClear(0,0,0,1,o):a===`alpha-blend`&&r.buffers.color.setClear(0,0,0,0,o),(e.autoClear||n)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(t,n){let r=m(n);r&&(r.isCubeTexture||r.mapping===306)?(u===void 0&&(u=new zr(new Hr(1,1,1),new Xr({name:`BackgroundCubeMaterial`,uniforms:Ur(To.backgroundCube.uniforms),vertexShader:To.backgroundCube.vertexShader,fragmentShader:To.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Do.copy(n.backgroundRotation),Do.x*=-1,Do.y*=-1,Do.z*=-1,r.isCubeTexture&&r.isRenderTargetTexture===!1&&(Do.y*=-1,Do.z*=-1),u.material.uniforms.envMap.value=r,u.material.uniforms.flipEnvMap.value=r.isCubeTexture&&r.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Oo.makeRotationFromEuler(Do)),u.material.toneMapped=K.getTransfer(r.colorSpace)!==z,(d!==r||f!==r.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=r,f=r.version,p=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):r&&r.isTexture&&(l===void 0&&(l=new zr(new ga(2,2),new Xr({name:`BackgroundMaterial`,uniforms:Ur(To.background.uniforms),vertexShader:To.background.vertexShader,fragmentShader:To.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=r,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.toneMapped=K.getTransfer(r.colorSpace)!==z,r.matrixAutoUpdate===!0&&r.updateMatrix(),l.material.uniforms.uvTransform.value.copy(r.matrix),(d!==r||f!==r.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,d=r,f=r.version,p=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null))}function _(t,n){t.getRGB(Eo,Kr(e)),r.buffers.color.setClear(Eo.r,Eo.g,Eo.b,n,o)}function v(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return s},setClearColor:function(e,t=1){s.set(e),c=t,_(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(e){c=e,_(s,c)},render:h,addToRenderList:g,dispose:v}}function Ao(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n){let i=n.wireframe===!0,a=r[e.id];a===void 0&&(a={},r[e.id]=a);let o=a[t.id];o===void 0&&(o={},a[t.id]=o);let s=o[i];return s===void 0&&(s=f(c()),o[i]=s),s}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){w();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n)u(n[e].object),delete n[e];delete t[e]}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n)u(n[e].object),delete n[e];delete t[e]}delete r[e.id]}function C(e){for(let t in r){let n=r[t];if(n[e.id]===void 0)continue;let i=n[e.id];for(let e in i)u(i[e].object),delete i[e];delete n[e.id]}}function w(){T(),o=!0,a!==i&&(a=i,l(a.object))}function T(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:w,resetDefaultState:T,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function jo(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}function c(e,i,a,s){if(a===0)return;let c=t.get(`WEBGL_multi_draw`);if(c===null)for(let t=0;t<e.length;t++)o(e[t],i[t],s[t]);else{c.multiDrawArraysInstancedWEBGL(r,e,0,i,0,s,0,a);let t=0;for(let e=0;e<a;e++)t+=i[e]*s[e];n.update(t,r,1)}}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s,this.renderMultiDrawInstances=c}function Mo(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(console.warn(`THREE.WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=m>0,S=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,vertexTextures:x,maxSamples:S}}function No(e){let t=this,n=null,r=0,i=!1,a=!1,o=new mi,s=new W,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}function Po(e){let t=new WeakMap;function n(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function r(r){if(r&&r.isTexture){let a=r.mapping;if(a===303||a===304){if(t.has(r)){let e=t.get(r).texture;return n(e,r.mapping)}{let a=r.image;if(a&&a.height>0){let o=new oi(a.height);return o.fromEquirectangularTexture(e,r),t.set(r,o),r.addEventListener(`dispose`,i),n(o.texture,r.mapping)}return null}}}return r}function i(e){let n=e.target;n.removeEventListener(`dispose`,i);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function a(){t=new WeakMap}return{get:r,dispose:a}}var Fo=4,Io=[.125,.215,.35,.446,.526,.582],Lo=20,Ro=new qa,zo=new cr,Bo=null,Vo=0,Ho=0,Uo=!1,Wo=(1+Math.sqrt(5))/2,Go=1/Wo,Ko=[new U(-Wo,Go,0),new U(Wo,Go,0),new U(-Go,0,Wo),new U(Go,0,Wo),new U(0,Wo,-Go),new U(0,Wo,Go),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)],qo=new U,Jo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=qo}=i;Bo=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Ho=this._renderer.getActiveMipmapLevel(),Uo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=es(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$o(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Bo,Vo,Ho),this._renderer.xr.enabled=Uo,e.scissorTest=!1,Zo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Bo=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Ho=this._renderer.getActiveMipmapLevel(),Uo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:d,minFilter:d,generateMipmaps:!1,type:x,format:k,colorSpace:ze,depthBuffer:!1},r=Xo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xo(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Yo(r)),this._blurMaterial=Qo(r,e,t)}return r}_compileMaterial(e){let t=new zr(this._lodPlanes[0],e);this._renderer.compile(t,Ro)}_sceneToCubeUV(e,t,n,r,i){let a=new ti(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(zo),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null));let d=new fr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1}),f=new zr(new Hr,d),p=!1,m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,p=!0):(d.color.copy(zo),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Zo(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(f,a),c.render(e,a)}f.geometry.dispose(),f.material.dispose(),c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=es()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$o());let i=r?this._cubemapMaterial:this._equirectMaterial,a=new zr(this._lodPlanes[0],i),o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Zo(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Ro)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let t=1;t<r;t++){let n=Math.sqrt(this._sigmas[t]*this._sigmas[t]-this._sigmas[t-1]*this._sigmas[t-1]),i=Ko[(r-t-1)%Ko.length];this._blur(e,t-1,t,n,i)}t.autoClear=n}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&console.error(`blur direction must be either latitudinal or longitudinal!`);let l=new zr(this._lodPlanes[r],c),u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/39,p=i/f,m=isFinite(i)?1+Math.floor(3*p):Lo;m>Lo&&console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Lo}`);let h=[],g=0;for(let e=0;e<Lo;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];Zo(t,3*v*(r>_-Fo?r-_+Fo:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,Ro)}};function Yo(e){let t=[],n=[],r=[],i=e,a=e-Fo+1+Io.length;for(let o=0;o<a;o++){let a=2**i;n.push(a);let s=1/a;o>e-Fo?s=Io[o-e+Fo-1]:o===0&&(s=0),r.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new Dr;h.setAttribute(`position`,new gr(f,3)),h.setAttribute(`uv`,new gr(p,2)),h.setAttribute(`faceIndex`,new gr(m,1)),t.push(h),i>Fo&&i--}return{lodPlanes:t,sizeLods:n,sigmas:r}}function Xo(e,t,n){let r=new Vt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Zo(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Qo(e,t,n){let r=new Float32Array(Lo),i=new U(0,1,0);return new Xr({name:`SphericalGaussianBlur`,defines:{n:Lo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ts(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function $o(){return new Xr({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:ts(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function es(){return new Xr({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ts(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ts(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ns(e){let t=new WeakMap,n=null;function r(r){if(r&&r.isTexture){let o=r.mapping,s=o===303||o===304,c=o===301||o===302;if(s||c){let o=t.get(r),l=o===void 0?0:o.texture.pmremVersion;if(r.isRenderTargetTexture&&r.pmremVersion!==l)return n===null&&(n=new Jo(e)),o=s?n.fromEquirectangular(r,o):n.fromCubemap(r,o),o.texture.pmremVersion=r.pmremVersion,t.set(r,o),o.texture;if(o!==void 0)return o.texture;{let l=r.image;return s&&l&&l.height>0||c&&l&&i(l)?(n===null&&(n=new Jo(e)),o=s?n.fromEquirectangular(r):n.fromCubemap(r),o.texture.pmremVersion=r.pmremVersion,t.set(r,o),r.addEventListener(`dispose`,a),o.texture):null}}}return r}function i(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function a(e){let n=e.target;n.removeEventListener(`dispose`,a);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function o(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:o}}function rs(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r;switch(n){case`WEBGL_depth_texture`:r=e.getExtension(`WEBGL_depth_texture`)||e.getExtension(`MOZ_WEBGL_depth_texture`)||e.getExtension(`WEBKIT_WEBGL_depth_texture`);break;case`EXT_texture_filter_anisotropic`:r=e.getExtension(`EXT_texture_filter_anisotropic`)||e.getExtension(`MOZ_EXT_texture_filter_anisotropic`)||e.getExtension(`WEBKIT_EXT_texture_filter_anisotropic`);break;case`WEBGL_compressed_texture_s3tc`:r=e.getExtension(`WEBGL_compressed_texture_s3tc`)||e.getExtension(`MOZ_WEBGL_compressed_texture_s3tc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_s3tc`);break;case`WEBGL_compressed_texture_pvrtc`:r=e.getExtension(`WEBGL_compressed_texture_pvrtc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_pvrtc`);break;default:r=e.getExtension(n)}return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Tt(`THREE.WebGLRenderer: `+e+` extension not supported.`),t}}}function is(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else if(i!==void 0){let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}else return;let s=new(xt(n)?vr:_r)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function as(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}function d(e,i,s,c){if(s===0)return;let u=t.get(`WEBGL_multi_draw`);if(u===null)for(let t=0;t<e.length;t++)l(e[t]/o,i[t],c[t]);else{u.multiDrawElementsInstancedWEBGL(r,i,0,a,e,0,c,0,s);let t=0;for(let e=0;e<s;e++)t+=i[e]*c[e];n.update(t,r,1)}}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function os(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:console.error(`THREE.WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function ss(e,t,n){let r=new WeakMap,i=new zt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Ht(h,p,m,u);g.type=b,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new H(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function cs(e,t,n,r){let i=new WeakMap;function a(a){let o=r.render.frame,c=a.geometry,l=t.get(a,c);if(i.get(l)!==o&&(t.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener(`dispose`,s)===!1&&a.addEventListener(`dispose`,s),i.get(a)!==o&&(n.update(a.instanceMatrix,e.ARRAY_BUFFER),a.instanceColor!==null&&n.update(a.instanceColor,e.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let e=a.skeleton;i.get(e)!==o&&(e.update(),i.set(e,o))}return l}function o(){i=new WeakMap}function s(e){let t=e.target;t.removeEventListener(`dispose`,s),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:a,dispose:o}}var ls=new Rt,us=new Mi(1,1),ds=new Ht,fs=new q,ps=new ai,ms=[],hs=[],gs=new Float32Array(16),_s=new Float32Array(9),vs=new Float32Array(4);function ys(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=ms[i];if(a===void 0&&(a=new Float32Array(i),ms[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function bs(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function xs(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Ss(e,t){let n=hs[t];n===void 0&&(n=new Int32Array(t),hs[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Cs(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function ws(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(bs(n,t))return;e.uniform2fv(this.addr,t),xs(n,t)}}function Ts(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(bs(n,t))return;e.uniform3fv(this.addr,t),xs(n,t)}}function Es(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(bs(n,t))return;e.uniform4fv(this.addr,t),xs(n,t)}}function Ds(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(bs(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),xs(n,t)}else{if(bs(n,r))return;vs.set(r),e.uniformMatrix2fv(this.addr,!1,vs),xs(n,r)}}function Os(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(bs(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),xs(n,t)}else{if(bs(n,r))return;_s.set(r),e.uniformMatrix3fv(this.addr,!1,_s),xs(n,r)}}function ks(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(bs(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),xs(n,t)}else{if(bs(n,r))return;gs.set(r),e.uniformMatrix4fv(this.addr,!1,gs),xs(n,r)}}function As(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function js(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(bs(n,t))return;e.uniform2iv(this.addr,t),xs(n,t)}}function Ms(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(bs(n,t))return;e.uniform3iv(this.addr,t),xs(n,t)}}function Ns(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(bs(n,t))return;e.uniform4iv(this.addr,t),xs(n,t)}}function Ps(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Fs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(bs(n,t))return;e.uniform2uiv(this.addr,t),xs(n,t)}}function Is(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(bs(n,t))return;e.uniform3uiv(this.addr,t),xs(n,t)}}function Ls(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(bs(n,t))return;e.uniform4uiv(this.addr,t),xs(n,t)}}function Rs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(us.compareFunction=515,a=us):a=ls,n.setTexture2D(t||a,i)}function zs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||fs,i)}function Bs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||ps,i)}function Vs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||ds,i)}function Hs(e){switch(e){case 5126:return Cs;case 35664:return ws;case 35665:return Ts;case 35666:return Es;case 35674:return Ds;case 35675:return Os;case 35676:return ks;case 5124:case 35670:return As;case 35667:case 35671:return js;case 35668:case 35672:return Ms;case 35669:case 35673:return Ns;case 5125:return Ps;case 36294:return Fs;case 36295:return Is;case 36296:return Ls;case 35678:case 36198:case 36298:case 36306:case 35682:return Rs;case 35679:case 36299:case 36307:return zs;case 35680:case 36300:case 36308:case 36293:return Bs;case 36289:case 36303:case 36311:case 36292:return Vs}}function Us(e,t){e.uniform1fv(this.addr,t)}function Ws(e,t){let n=ys(t,this.size,2);e.uniform2fv(this.addr,n)}function Gs(e,t){let n=ys(t,this.size,3);e.uniform3fv(this.addr,n)}function Ks(e,t){let n=ys(t,this.size,4);e.uniform4fv(this.addr,n)}function qs(e,t){let n=ys(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Js(e,t){let n=ys(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Ys(e,t){let n=ys(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Xs(e,t){e.uniform1iv(this.addr,t)}function Zs(e,t){e.uniform2iv(this.addr,t)}function Qs(e,t){e.uniform3iv(this.addr,t)}function $s(e,t){e.uniform4iv(this.addr,t)}function ec(e,t){e.uniform1uiv(this.addr,t)}function tc(e,t){e.uniform2uiv(this.addr,t)}function nc(e,t){e.uniform3uiv(this.addr,t)}function rc(e,t){e.uniform4uiv(this.addr,t)}function ic(e,t,n){let r=this.cache,i=t.length,a=Ss(n,i);bs(r,a)||(e.uniform1iv(this.addr,a),xs(r,a));for(let e=0;e!==i;++e)n.setTexture2D(t[e]||ls,a[e])}function ac(e,t,n){let r=this.cache,i=t.length,a=Ss(n,i);bs(r,a)||(e.uniform1iv(this.addr,a),xs(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||fs,a[e])}function oc(e,t,n){let r=this.cache,i=t.length,a=Ss(n,i);bs(r,a)||(e.uniform1iv(this.addr,a),xs(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||ps,a[e])}function sc(e,t,n){let r=this.cache,i=t.length,a=Ss(n,i);bs(r,a)||(e.uniform1iv(this.addr,a),xs(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||ds,a[e])}function cc(e){switch(e){case 5126:return Us;case 35664:return Ws;case 35665:return Gs;case 35666:return Ks;case 35674:return qs;case 35675:return Js;case 35676:return Ys;case 5124:case 35670:return Xs;case 35667:case 35671:return Zs;case 35668:case 35672:return Qs;case 35669:case 35673:return $s;case 5125:return ec;case 36294:return tc;case 36295:return nc;case 36296:return rc;case 35678:case 36198:case 36298:case 36306:case 35682:return ic;case 35679:case 36299:case 36307:return ac;case 35680:case 36300:case 36308:case 36293:return oc;case 36289:case 36303:case 36311:case 36292:return sc}}var lc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Hs(t.type)}},uc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=cc(t.type)}},dc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},fc=/(\w+)(\])?(\[|\.)?/g;function pc(e,t){e.seq.push(t),e.map[t.id]=t}function mc(e,t,n){let r=e.name,i=r.length;for(fc.lastIndex=0;;){let a=fc.exec(r),o=fc.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){pc(n,l===void 0?new lc(s,e,t):new uc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new dc(s),pc(n,e)),n=e}}}var hc=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);mc(n,e.getUniformLocation(t,n.name),this)}}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function gc(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var _c=37297,vc=0;function yc(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var bc=new W;function xc(e){K._getMatrix(bc,K.workingColorSpace,e);let t=`mat3( ${bc.elements.map(e=>e.toFixed(4))} )`;switch(K.getTransfer(e)){case Be:return[t,`LinearTransferOETF`];case z:return[t,`sRGBTransferOETF`];default:return console.warn(`THREE.WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Sc(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+yc(e.getShaderSource(t),r)}return i}function Cc(e,t){let n=xc(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}function wc(e,t){let n;switch(t){case 1:n=`Linear`;break;case 2:n=`Reinhard`;break;case 3:n=`Cineon`;break;case 4:n=`ACESFilmic`;break;case 6:n=`AgX`;break;case 7:n=`Neutral`;break;case 5:n=`Custom`;break;default:console.warn(`THREE.WebGLProgram: Unsupported toneMapping:`,t),n=`Linear`}return`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Tc=new U;function Ec(){return K.getLuminanceCoefficients(Tc),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Tc.x.toFixed(4)}, ${Tc.y.toFixed(4)}, ${Tc.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Dc(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Ac).join(`
`)}function Oc(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function kc(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Ac(e){return e!==``}function jc(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Mc(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Nc=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pc(e){return e.replace(Nc,Ic)}var Fc=new Map;function Ic(e,t){let n=X[t];if(n===void 0){let e=Fc.get(t);if(e!==void 0)n=X[e],console.warn(`THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`Can not resolve #include <`+t+`>`)}return Pc(n)}var Lc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rc(e){return e.replace(Lc,zc)}function zc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Bc(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}function Vc(e){let t=`SHADOWMAP_TYPE_BASIC`;return e.shadowMapType===1?t=`SHADOWMAP_TYPE_PCF`:e.shadowMapType===2?t=`SHADOWMAP_TYPE_PCF_SOFT`:e.shadowMapType===3&&(t=`SHADOWMAP_TYPE_VSM`),t}function Hc(e){let t=`ENVMAP_TYPE_CUBE`;if(e.envMap)switch(e.envMapMode){case 301:case 302:t=`ENVMAP_TYPE_CUBE`;break;case 306:t=`ENVMAP_TYPE_CUBE_UV`}return t}function Uc(e){let t=`ENVMAP_MODE_REFLECTION`;if(e.envMap)switch(e.envMapMode){case 302:t=`ENVMAP_MODE_REFRACTION`}return t}function Wc(e){let t=`ENVMAP_BLENDING_NONE`;if(e.envMap)switch(e.combine){case 0:t=`ENVMAP_BLENDING_MULTIPLY`;break;case 1:t=`ENVMAP_BLENDING_MIX`;break;case 2:t=`ENVMAP_BLENDING_ADD`}return t}function Gc(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Kc(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Vc(n),l=Hc(n),u=Uc(n),d=Wc(n),f=Gc(n),p=Dc(n),m=Oc(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Ac).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Ac).join(`
`),_.length>0&&(_+=`
`)):(g=[Bc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Ac).join(`
`),_=[Bc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor||n.batchingColor?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:X.tonemapping_pars_fragment,n.toneMapping===0?``:wc(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,X.colorspace_pars_fragment,Cc(`linearToOutputTexel`,n.outputColorSpace),Ec(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Ac).join(`
`)),o=Pc(o),o=jc(o,n),o=Mc(o,n),s=Pc(s),s=jc(s,n),s=Mc(s,n),o=Rc(o),s=Rc(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=gc(i,i.VERTEX_SHADER,y),S=gc(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.morphTargets===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Sc(i,x,`vertex`),n=Sc(i,S,`fragment`);console.error(`THREE.WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):console.warn(`THREE.WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new hc(i,h),T=kc(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,_c)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=vc++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var qc=0,Jc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),i=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Yc(e),t.set(e,n)),n}},Yc=class{constructor(e){this.id=qc++,this.code=e,this.usedTimes=0}};function Xc(e,t,n,r,i,a,o){let s=new On,c=new Jc,l=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures,p=i.precision,m={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distanceRGBA`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function h(e){return l.add(e),e===0?`uv`:`uv${e}`}function g(a,s,u,g,_){let v=g.fog,y=_.geometry,b=a.isMeshStandardMaterial?g.environment:null,x=(a.isMeshStandardMaterial?n:t).get(a.envMap||b),S=x&&x.mapping===306?x.image.height:null,C=m[a.type];a.precision!==null&&(p=i.getMaxPrecision(a.precision),p!==a.precision&&console.warn(`THREE.WebGLProgram.getParameters:`,a.precision,`not supported, using`,p,`instead.`));let w=y.morphAttributes.position||y.morphAttributes.normal||y.morphAttributes.color,T=w===void 0?0:w.length,E=0;y.morphAttributes.position!==void 0&&(E=1),y.morphAttributes.normal!==void 0&&(E=2),y.morphAttributes.color!==void 0&&(E=3);let D,O,k,ee;if(C){let e=To[C];D=e.vertexShader,O=e.fragmentShader}else D=a.vertexShader,O=a.fragmentShader,c.update(a),k=c.getVertexShaderID(a),ee=c.getFragmentShaderID(a);let A=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),j=_.isInstancedMesh===!0,ne=_.isBatchedMesh===!0,re=!!a.map,M=!!a.matcap,ie=!!x,ae=!!a.aoMap,oe=!!a.lightMap,se=!!a.bumpMap,ce=!!a.normalMap,le=!!a.displacementMap,ue=!!a.emissiveMap,de=!!a.metalnessMap,N=!!a.roughnessMap,P=a.anisotropy>0,fe=a.clearcoat>0,pe=a.dispersion>0,me=a.iridescence>0,he=a.sheen>0,F=a.transmission>0,ge=P&&!!a.anisotropyMap,_e=fe&&!!a.clearcoatMap,ve=fe&&!!a.clearcoatNormalMap,I=fe&&!!a.clearcoatRoughnessMap,ye=me&&!!a.iridescenceMap,L=me&&!!a.iridescenceThicknessMap,R=he&&!!a.sheenColorMap,be=he&&!!a.sheenRoughnessMap,xe=!!a.specularMap,Se=!!a.specularColorMap,Ce=!!a.specularIntensityMap,we=F&&!!a.transmissionMap,Te=F&&!!a.thicknessMap,Ee=!!a.gradientMap,De=!!a.alphaMap,Oe=a.alphaTest>0,ke=!!a.alphaHash,Ae=!!a.extensions,je=0;a.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(je=e.toneMapping);let Me={shaderID:C,shaderType:a.type,shaderName:a.name,vertexShader:D,fragmentShader:O,defines:a.defines,customVertexShaderID:k,customFragmentShaderID:ee,isRawShaderMaterial:a.isRawShaderMaterial===!0,glslVersion:a.glslVersion,precision:p,batching:ne,batchingColor:ne&&_._colorsTexture!==null,instancing:j,instancingColor:j&&_.instanceColor!==null,instancingMorph:j&&_.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:ze,alphaToCoverage:!!a.alphaToCoverage,map:re,matcap:M,envMap:ie,envMapMode:ie&&x.mapping,envMapCubeUVHeight:S,aoMap:ae,lightMap:oe,bumpMap:se,normalMap:ce,displacementMap:f&&le,emissiveMap:ue,normalMapObjectSpace:ce&&a.normalMapType===1,normalMapTangentSpace:ce&&a.normalMapType===0,metalnessMap:de,roughnessMap:N,anisotropy:P,anisotropyMap:ge,clearcoat:fe,clearcoatMap:_e,clearcoatNormalMap:ve,clearcoatRoughnessMap:I,dispersion:pe,iridescence:me,iridescenceMap:ye,iridescenceThicknessMap:L,sheen:he,sheenColorMap:R,sheenRoughnessMap:be,specularMap:xe,specularColorMap:Se,specularIntensityMap:Ce,transmission:F,transmissionMap:we,thicknessMap:Te,gradientMap:Ee,opaque:a.transparent===!1&&a.blending===1&&a.alphaToCoverage===!1,alphaMap:De,alphaTest:Oe,alphaHash:ke,combine:a.combine,mapUv:re&&h(a.map.channel),aoMapUv:ae&&h(a.aoMap.channel),lightMapUv:oe&&h(a.lightMap.channel),bumpMapUv:se&&h(a.bumpMap.channel),normalMapUv:ce&&h(a.normalMap.channel),displacementMapUv:le&&h(a.displacementMap.channel),emissiveMapUv:ue&&h(a.emissiveMap.channel),metalnessMapUv:de&&h(a.metalnessMap.channel),roughnessMapUv:N&&h(a.roughnessMap.channel),anisotropyMapUv:ge&&h(a.anisotropyMap.channel),clearcoatMapUv:_e&&h(a.clearcoatMap.channel),clearcoatNormalMapUv:ve&&h(a.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:I&&h(a.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&h(a.iridescenceMap.channel),iridescenceThicknessMapUv:L&&h(a.iridescenceThicknessMap.channel),sheenColorMapUv:R&&h(a.sheenColorMap.channel),sheenRoughnessMapUv:be&&h(a.sheenRoughnessMap.channel),specularMapUv:xe&&h(a.specularMap.channel),specularColorMapUv:Se&&h(a.specularColorMap.channel),specularIntensityMapUv:Ce&&h(a.specularIntensityMap.channel),transmissionMapUv:we&&h(a.transmissionMap.channel),thicknessMapUv:Te&&h(a.thicknessMap.channel),alphaMapUv:De&&h(a.alphaMap.channel),vertexTangents:!!y.attributes.tangent&&(ce||P),vertexColors:a.vertexColors,vertexAlphas:a.vertexColors===!0&&!!y.attributes.color&&y.attributes.color.itemSize===4,pointsUvs:_.isPoints===!0&&!!y.attributes.uv&&(re||De),fog:!!v,useFog:a.fog===!0,fogExp2:!!v&&v.isFogExp2,flatShading:a.flatShading===!0&&a.wireframe===!1,sizeAttenuation:a.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:te,skinning:_.isSkinnedMesh===!0,morphTargets:y.morphAttributes.position!==void 0,morphNormals:y.morphAttributes.normal!==void 0,morphColors:y.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:s.directional.length,numPointLights:s.point.length,numSpotLights:s.spot.length,numSpotLightMaps:s.spotLightMap.length,numRectAreaLights:s.rectArea.length,numHemiLights:s.hemi.length,numDirLightShadows:s.directionalShadowMap.length,numPointLightShadows:s.pointShadowMap.length,numSpotLightShadows:s.spotShadowMap.length,numSpotLightShadowsWithMaps:s.numSpotLightShadowsWithMaps,numLightProbes:s.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:a.dithering,shadowMapEnabled:e.shadowMap.enabled&&u.length>0,shadowMapType:e.shadowMap.type,toneMapping:je,decodeVideoTexture:re&&a.map.isVideoTexture===!0&&K.getTransfer(a.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ue&&a.emissiveMap.isVideoTexture===!0&&K.getTransfer(a.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:a.premultipliedAlpha,doubleSided:a.side===2,flipSided:a.side===1,useDepthPacking:a.depthPacking>=0,depthPacking:a.depthPacking||0,index0AttributeName:a.index0AttributeName,extensionClipCullDistance:Ae&&a.extensions.clipCullDistance===!0&&r.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ae&&a.extensions.multiDraw===!0||ne)&&r.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:r.has(`KHR_parallel_shader_compile`),customProgramCacheKey:a.customProgramCacheKey()};return Me.vertexUv1s=l.has(1),Me.vertexUv2s=l.has(2),Me.vertexUv3s=l.has(3),l.clear(),Me}function _(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(v(n,t),y(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function v(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function y(e,t){s.disableAll(),t.supportsVertexTextures&&s.enable(0),t.instancing&&s.enable(1),t.instancingColor&&s.enable(2),t.instancingMorph&&s.enable(3),t.matcap&&s.enable(4),t.envMap&&s.enable(5),t.normalMapObjectSpace&&s.enable(6),t.normalMapTangentSpace&&s.enable(7),t.clearcoat&&s.enable(8),t.iridescence&&s.enable(9),t.alphaTest&&s.enable(10),t.vertexColors&&s.enable(11),t.vertexAlphas&&s.enable(12),t.vertexUv1s&&s.enable(13),t.vertexUv2s&&s.enable(14),t.vertexUv3s&&s.enable(15),t.vertexTangents&&s.enable(16),t.anisotropy&&s.enable(17),t.alphaHash&&s.enable(18),t.batching&&s.enable(19),t.dispersion&&s.enable(20),t.batchingColor&&s.enable(21),t.gradientMap&&s.enable(22),e.push(s.mask),s.disableAll(),t.fog&&s.enable(0),t.useFog&&s.enable(1),t.flatShading&&s.enable(2),t.logarithmicDepthBuffer&&s.enable(3),t.reversedDepthBuffer&&s.enable(4),t.skinning&&s.enable(5),t.morphTargets&&s.enable(6),t.morphNormals&&s.enable(7),t.morphColors&&s.enable(8),t.premultipliedAlpha&&s.enable(9),t.shadowMapEnabled&&s.enable(10),t.doubleSided&&s.enable(11),t.flipSided&&s.enable(12),t.useDepthPacking&&s.enable(13),t.dithering&&s.enable(14),t.transmission&&s.enable(15),t.sheen&&s.enable(16),t.opaque&&s.enable(17),t.pointsUvs&&s.enable(18),t.decodeVideoTexture&&s.enable(19),t.decodeVideoTextureEmissive&&s.enable(20),t.alphaToCoverage&&s.enable(21),e.push(s.mask)}function b(e){let t=m[e.type],n;if(t){let e=To[t];n=qr.clone(e.uniforms)}else n=e.uniforms;return n}function x(t,n){let r;for(let e=0,t=u.length;e<t;e++){let t=u[e];if(t.cacheKey===n){r=t,++r.usedTimes;break}}return r===void 0&&(r=new Kc(e,n,t,a),u.push(r)),r}function S(e){if(--e.usedTimes===0){let t=u.indexOf(e);u[t]=u[u.length-1],u.pop(),e.destroy()}}function C(e){c.remove(e)}function w(){c.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:b,acquireProgram:x,releaseProgram:S,releaseShaderCache:C,programs:u,dispose:w}}function Zc(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Qc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.z===t.z?e.id-t.id:e.z-t.z:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function $c(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function el(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(n,r,i,a,o,s){let c=e[t];return c===void 0?(c={id:n.id,object:n,geometry:r,material:i,groupOrder:a,renderOrder:n.renderOrder,z:o,group:s},e[t]=c):(c.id=n.id,c.object=n,c.geometry=r,c.material=i,c.groupOrder=a,c.renderOrder=n.renderOrder,c.z=o,c.group=s),t++,c}function s(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function c(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function l(e,t){n.length>1&&n.sort(e||Qc),r.length>1&&r.sort(t||$c),i.length>1&&i.sort(t||$c)}function u(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:s,unshift:c,finish:u,sort:l}}function tl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new el,e.set(t,[i])):n>=r.length?(i=new el,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function nl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new U,color:new cr};break;case`SpotLight`:n={position:new U,direction:new U,color:new cr,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new U,color:new cr,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new U,skyColor:new cr,groundColor:new cr};break;case`RectAreaLight`:n={color:new cr,position:new U,halfWidth:new U,halfHeight:new U}}return e[t.id]=n,n}}}function rl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var il=0;function al(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function ol(e){let t=new nl,n=rl(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new U);let i=new U,a=new _n,o=new _n;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(al);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=il++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function sl(e){let t=new ol(e),n=[],r=[];function i(e){l.camera=e,n.length=0,r.length=0}function a(e){n.push(e)}function o(e){r.push(e)}function s(){t.setup(n)}function c(e){t.setupView(n,e)}let l={lightsArray:n,shadowsArray:r,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:s,setupLightsView:c,pushLight:a,pushShadow:o}}function cl(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new sl(e),t.set(n,[a])):r>=i.length?(a=new sl(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var ll=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ul=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function dl(e,t,n){let r=new vi,i=new H,a=new H,o=new zt,s=new ya({depthPacking:Le}),l=new ba,u={},d=n.maxTextureSize,f={0:1,1:0,2:2},p=new Xr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new H},radius:{value:4}},vertexShader:ll,fragmentShader:ul}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let h=new Dr;h.setAttribute(`position`,new gr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new zr(h,p),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let v=this.type;this.render=function(t,n,s){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||t.length===0)return;let l=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.state;p.setBlending(0),p.buffers.depth.getReversed()===!0?p.buffers.color.setClear(0,0,0,0):p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);let m=v!==3&&this.type===3,h=v===3&&this.type!==3;for(let l=0,u=t.length;l<u;l++){let u=t[l],f=u.shadow;if(f===void 0){console.warn(`THREE.WebGLShadowMap:`,u,`has no shadow.`);continue}if(f.autoUpdate===!1&&f.needsUpdate===!1)continue;i.copy(f.mapSize);let g=f.getFrameExtents();if(i.multiply(g),a.copy(f.mapSize),(i.x>d||i.y>d)&&(i.x>d&&(a.x=Math.floor(d/g.x),i.x=a.x*g.x,f.mapSize.x=a.x),i.y>d&&(a.y=Math.floor(d/g.y),i.y=a.y*g.y,f.mapSize.y=a.y)),f.map===null||m===!0||h===!0){let e=this.type===3?{}:{minFilter:c,magFilter:c};f.map!==null&&f.map.dispose(),f.map=new Vt(i.x,i.y,e),f.map.texture.name=u.name+`.shadowMap`,f.camera.updateProjectionMatrix()}e.setRenderTarget(f.map),e.clear();let _=f.getViewportCount();for(let e=0;e<_;e++){let t=f.getViewport(e);o.set(a.x*t.x,a.y*t.y,a.x*t.z,a.y*t.w),p.viewport(o),f.updateMatrices(u,e),r=f.getFrustum(),x(n,s,f.camera,u,this.type)}f.isPointLightShadow!==!0&&this.type===3&&y(f,s),f.needsUpdate=!1}v=this.type,_.needsUpdate=!1,e.setRenderTarget(l,u,f)};function y(n,r){let a=t.update(g);p.defines.VSM_SAMPLES!==n.blurSamples&&(p.defines.VSM_SAMPLES=n.blurSamples,m.defines.VSM_SAMPLES=n.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new Vt(i.x,i.y)),p.uniforms.shadow_pass.value=n.map.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,p,g,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value=n.mapSize,m.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,m,g,null)}function b(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?l:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=u[e];r===void 0&&(r={},u[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,S)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?f[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function x(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=b(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=b(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)x(c[e],i,a,o,s)}function S(e){e.target.removeEventListener(`dispose`,S);for(let t in u){let n=u[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}var fl={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function pl(e,t){function n(){let t=!1,n=new zt,r=null,i=new zt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ue(e.DEPTH_TEST):de(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=fl[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(r&&(t=1-t),e.clearDepth(t),o=t)},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ue(e.STENCIL_TEST):de(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f=new WeakMap,p=[],m=null,h=!1,g=null,_=null,v=null,y=null,b=null,x=null,S=null,C=new cr(0,0,0),w=0,T=!1,E=null,D=null,O=null,k=null,ee=null,A=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),te=!1,j=0,ne=e.getParameter(e.VERSION);ne.indexOf(`WebGL`)===-1?ne.indexOf(`OpenGL ES`)!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),te=j>=2):(j=parseFloat(/^WebGL (\d)/.exec(ne)[1]),te=j>=1);let re=null,M={},ie=e.getParameter(e.SCISSOR_BOX),ae=e.getParameter(e.VIEWPORT),oe=new zt().fromArray(ie),se=new zt().fromArray(ae);function ce(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let le={};le[e.TEXTURE_2D]=ce(e.TEXTURE_2D,e.TEXTURE_2D,1),le[e.TEXTURE_CUBE_MAP]=ce(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[e.TEXTURE_2D_ARRAY]=ce(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),le[e.TEXTURE_3D]=ce(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ue(e.DEPTH_TEST),o.setFunc(3),ge(!1),_e(1),ue(e.CULL_FACE),he(0);function ue(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function de(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function N(t,n){return d[t]!==n&&(e.bindFramebuffer(t,n),d[t]=n,t===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=n),!0)}function P(t,n){let r=p,i=!1;if(t){r=f.get(n),r===void 0&&(r=[],f.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function fe(t){return m!==t&&(e.useProgram(t),m=t,!0)}let pe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};pe[103]=e.MIN,pe[104]=e.MAX;let me={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function he(t,n,r,i,a,o,s,c,l,u){if(t===0)h===!0&&(de(e.BLEND),h=!1);else if(h===!1&&(ue(e.BLEND),h=!0),t!==5){if(t!==g||u!==T){if((_!==100||b!==100)&&(e.blendEquation(e.FUNC_ADD),_=100,b=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:console.error(`THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:console.error(`THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t)}v=null,y=null,x=null,S=null,C.set(0,0,0),w=0,g=t,T=u}}else a||=n,o||=r,s||=i,(n!==_||a!==b)&&(e.blendEquationSeparate(pe[n],pe[a]),_=n,b=a),(r!==v||i!==y||o!==x||s!==S)&&(e.blendFuncSeparate(me[r],me[i],me[o],me[s]),v=r,y=i,x=o,S=s),(c.equals(C)===!1||l!==w)&&(e.blendColor(c.r,c.g,c.b,l),C.copy(c),w=l),g=t,T=!1}function F(t,n){t.side===2?de(e.CULL_FACE):ue(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ge(r),t.blending===1&&t.transparent===!1?he(0):he(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),I(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ue(e.SAMPLE_ALPHA_TO_COVERAGE):de(e.SAMPLE_ALPHA_TO_COVERAGE)}function ge(t){E!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),E=t)}function _e(t){t===0?de(e.CULL_FACE):(ue(e.CULL_FACE),t!==D&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),D=t}function ve(t){t!==O&&(te&&e.lineWidth(t),O=t)}function I(t,n,r){t?(ue(e.POLYGON_OFFSET_FILL),(k!==n||ee!==r)&&(e.polygonOffset(n,r),k=n,ee=r)):de(e.POLYGON_OFFSET_FILL)}function ye(t){t?ue(e.SCISSOR_TEST):de(e.SCISSOR_TEST)}function L(t){t===void 0&&(t=e.TEXTURE0+A-1),re!==t&&(e.activeTexture(t),re=t)}function R(t,n,r){r===void 0&&(r=re===null?e.TEXTURE0+A-1:re);let i=M[r];i===void 0&&(i={type:void 0,texture:void 0},M[r]=i),(i.type!==t||i.texture!==n)&&(re!==r&&(e.activeTexture(r),re=r),e.bindTexture(t,n||le[t]),i.type=t,i.texture=n)}function be(){let t=M[re];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function xe(){try{e.compressedTexImage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Se(){try{e.compressedTexImage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ce(){try{e.texSubImage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function we(){try{e.texSubImage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Te(){try{e.compressedTexSubImage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ee(){try{e.compressedTexSubImage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function De(){try{e.texStorage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Oe(){try{e.texStorage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function ke(){try{e.texImage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ae(){try{e.texImage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function je(t){oe.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),oe.copy(t))}function Me(t){se.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),se.copy(t))}function Ne(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Pe(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Fe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),u={},re=null,M={},d={},f=new WeakMap,p=[],m=null,h=!1,g=null,_=null,v=null,y=null,b=null,x=null,S=null,C=new cr(0,0,0),w=0,T=!1,E=null,D=null,O=null,k=null,ee=null,oe.set(0,0,e.canvas.width,e.canvas.height),se.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ue,disable:de,bindFramebuffer:N,drawBuffers:P,useProgram:fe,setBlending:he,setMaterial:F,setFlipSided:ge,setCullFace:_e,setLineWidth:ve,setPolygonOffset:I,setScissorTest:ye,activeTexture:L,bindTexture:R,unbindTexture:be,compressedTexImage2D:xe,compressedTexImage3D:Se,texImage2D:ke,texImage3D:Ae,updateUBOMapping:Ne,uniformBlockBinding:Pe,texStorage2D:De,texStorage3D:Oe,texSubImage2D:Ce,texSubImage3D:we,compressedTexSubImage2D:Te,compressedTexSubImage3D:Ee,scissor:je,viewport:Me,reset:Fe}}function ml(e,t,n,r,i,m,h){let g=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new H,y=new WeakMap,b,x=new WeakMap,S=!1;try{S=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function C(e,t){return S?new OffscreenCanvas(e,t):St(`canvas`)}function w(e,t,n){let r=1,i=ke(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);b===void 0&&(b=C(n,a));let o=t?C(n,a):b;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),console.warn(`THREE.WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&console.warn(`THREE.WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function T(e){return e.generateMipmaps}function E(t){e.generateMipmap(t)}function D(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function O(n,r,i,a,o=!1){if(n!==null){if(e[n]!==void 0)return e[n];console.warn(`THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let s=r;if(r===e.RED&&(i===e.FLOAT&&(s=e.R32F),i===e.HALF_FLOAT&&(s=e.R16F),i===e.UNSIGNED_BYTE&&(s=e.R8)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.R8UI),i===e.UNSIGNED_SHORT&&(s=e.R16UI),i===e.UNSIGNED_INT&&(s=e.R32UI),i===e.BYTE&&(s=e.R8I),i===e.SHORT&&(s=e.R16I),i===e.INT&&(s=e.R32I)),r===e.RG&&(i===e.FLOAT&&(s=e.RG32F),i===e.HALF_FLOAT&&(s=e.RG16F),i===e.UNSIGNED_BYTE&&(s=e.RG8)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.RG8UI),i===e.UNSIGNED_SHORT&&(s=e.RG16UI),i===e.UNSIGNED_INT&&(s=e.RG32UI),i===e.BYTE&&(s=e.RG8I),i===e.SHORT&&(s=e.RG16I),i===e.INT&&(s=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.RGB8UI),i===e.UNSIGNED_SHORT&&(s=e.RGB16UI),i===e.UNSIGNED_INT&&(s=e.RGB32UI),i===e.BYTE&&(s=e.RGB8I),i===e.SHORT&&(s=e.RGB16I),i===e.INT&&(s=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(s=e.RGBA16UI),i===e.UNSIGNED_INT&&(s=e.RGBA32UI),i===e.BYTE&&(s=e.RGBA8I),i===e.SHORT&&(s=e.RGBA16I),i===e.INT&&(s=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_INT_5_9_9_9_REV&&(s=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(s=e.R11F_G11F_B10F)),r===e.RGBA){let t=o?Be:K.getTransfer(a);i===e.FLOAT&&(s=e.RGBA32F),i===e.HALF_FLOAT&&(s=e.RGBA16F),i===e.UNSIGNED_BYTE&&(s=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT_4_4_4_4&&(s=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(s=e.RGB5_A1)}return(s===e.R16F||s===e.R32F||s===e.RG16F||s===e.RG32F||s===e.RGBA16F||s===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),s}function k(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,console.warn(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function ee(e,t){return T(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function te(e){let t=e.target;t.removeEventListener(`dispose`,te),ne(t),t.isVideoTexture&&y.delete(t)}function j(e){let t=e.target;t.removeEventListener(`dispose`,j),M(t)}function ne(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=x.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&re(e),Object.keys(i).length===0&&x.delete(n)}r.remove(e)}function re(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=x.get(i);delete a[n.__cacheKey],h.memory.textures--}function M(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),h.memory.textures--),r.remove(i[t])}r.remove(t)}let ie=0;function ae(){ie=0}function oe(){let e=ie;return e>=i.maxTextures&&console.warn(`THREE.WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),ie+=1,e}function se(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ce(t,i){let a=r.get(t);if(t.isVideoTexture&&De(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)console.warn(`THREE.WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)console.warn(`THREE.WebGLRenderer: Texture marked for update but image is incomplete`);else{ge(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function le(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?ge(a,t,i):n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function ue(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?ge(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function de(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?_e(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let N={[a]:e.REPEAT,[o]:e.CLAMP_TO_EDGE,[s]:e.MIRRORED_REPEAT},P={[c]:e.NEAREST,[l]:e.NEAREST_MIPMAP_NEAREST,[u]:e.NEAREST_MIPMAP_LINEAR,[d]:e.LINEAR,[f]:e.LINEAR_MIPMAP_NEAREST,[p]:e.LINEAR_MIPMAP_LINEAR},fe={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function pe(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&console.warn(`THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,N[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,N[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,N[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,P[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,P[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,fe[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function me(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,te));let i=n.source,a=x.get(i);a===void 0&&(a={},x.set(i,a));let o=se(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},h.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&re(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function he(e,t,n){return Math.floor(Math.floor(e/n)/t)}function F(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=he(n.start,r.width,4),c=he(t.start,r.width,4);n.start<=i+1&&a===c&&he(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=e.getParameter(e.UNPACK_ROW_LENGTH),l=e.getParameter(e.UNPACK_SKIP_PIXELS),u=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;e.pixelStorei(e.UNPACK_SKIP_PIXELS,u),e.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,c),e.pixelStorei(e.UNPACK_SKIP_PIXELS,l),e.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function ge(t,a,o){let s=e.TEXTURE_2D;(a.isDataArrayTexture||a.isCompressedArrayTexture)&&(s=e.TEXTURE_2D_ARRAY),a.isData3DTexture&&(s=e.TEXTURE_3D);let c=me(t,a),l=a.source;n.bindTexture(s,t.__webglTexture,e.TEXTURE0+o);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+o);let t=K.getPrimaries(K.workingColorSpace),r=a.colorSpace===``?null:K.getPrimaries(a.colorSpace),d=a.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,a.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,a.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=w(a.image,!1,i.maxTextureSize);f=Oe(a,f);let p=m.convert(a.format,a.colorSpace),h=m.convert(a.type),g=O(a.internalFormat,p,h,a.colorSpace,a.isVideoTexture);pe(s,a);let _,v=a.mipmaps,y=a.isVideoTexture!==!0,b=u.__version===void 0||c===!0,x=l.dataReady,S=ee(a,f);if(a.isDepthTexture)g=k(a.format===A,a.type),b&&(y?n.texStorage2D(e.TEXTURE_2D,1,g,f.width,f.height):n.texImage2D(e.TEXTURE_2D,0,g,f.width,f.height,0,p,h,null));else if(a.isDataTexture){if(v.length>0){y&&b&&n.texStorage2D(e.TEXTURE_2D,S,g,v[0].width,v[0].height);for(let t=0,r=v.length;t<r;t++)_=v[t],y?x&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,_.width,_.height,p,h,_.data):n.texImage2D(e.TEXTURE_2D,t,g,_.width,_.height,0,p,h,_.data);a.generateMipmaps=!1}else y?(b&&n.texStorage2D(e.TEXTURE_2D,S,g,f.width,f.height),x&&F(a,f,p,h)):n.texImage2D(e.TEXTURE_2D,0,g,f.width,f.height,0,p,h,f.data)}else if(a.isCompressedTexture){if(a.isCompressedArrayTexture){y&&b&&n.texStorage3D(e.TEXTURE_2D_ARRAY,S,g,v[0].width,v[0].height,f.depth);for(let t=0,r=v.length;t<r;t++)if(_=v[t],a.format!==1023){if(p!==null){if(y){if(x){if(a.layerUpdates.size>0){let r=xo(_.width,_.height,a.format,a.type);for(let i of a.layerUpdates){let a=_.data.subarray(i*r/_.data.BYTES_PER_ELEMENT,(i+1)*r/_.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,i,_.width,_.height,1,p,a)}a.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,0,_.width,_.height,f.depth,p,_.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,t,g,_.width,_.height,f.depth,0,_.data,0,0)}else console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else y?x&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,0,_.width,_.height,f.depth,p,h,_.data):n.texImage3D(e.TEXTURE_2D_ARRAY,t,g,_.width,_.height,f.depth,0,p,h,_.data)}else{y&&b&&n.texStorage2D(e.TEXTURE_2D,S,g,v[0].width,v[0].height);for(let t=0,r=v.length;t<r;t++)_=v[t],a.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,_.width,_.height,p,h,_.data):n.texImage2D(e.TEXTURE_2D,t,g,_.width,_.height,0,p,h,_.data):p===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,_.width,_.height,p,_.data):n.compressedTexImage2D(e.TEXTURE_2D,t,g,_.width,_.height,0,_.data)}}else if(a.isDataArrayTexture){if(y){if(b&&n.texStorage3D(e.TEXTURE_2D_ARRAY,S,g,f.width,f.height,f.depth),x){if(a.layerUpdates.size>0){let t=xo(f.width,f.height,a.format,a.type);for(let r of a.layerUpdates){let i=f.data.subarray(r*t/f.data.BYTES_PER_ELEMENT,(r+1)*t/f.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,r,f.width,f.height,1,p,h,i)}a.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,f.width,f.height,f.depth,p,h,f.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,g,f.width,f.height,f.depth,0,p,h,f.data)}else if(a.isData3DTexture)y?(b&&n.texStorage3D(e.TEXTURE_3D,S,g,f.width,f.height,f.depth),x&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,f.width,f.height,f.depth,p,h,f.data)):n.texImage3D(e.TEXTURE_3D,0,g,f.width,f.height,f.depth,0,p,h,f.data);else if(a.isFramebufferTexture){if(b){if(y)n.texStorage2D(e.TEXTURE_2D,S,g,f.width,f.height);else{let t=f.width,r=f.height;for(let i=0;i<S;i++)n.texImage2D(e.TEXTURE_2D,i,g,t,r,0,p,h,null),t>>=1,r>>=1}}}else if(v.length>0){if(y&&b){let t=ke(v[0]);n.texStorage2D(e.TEXTURE_2D,S,g,t.width,t.height)}for(let t=0,r=v.length;t<r;t++)_=v[t],y?x&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,p,h,_):n.texImage2D(e.TEXTURE_2D,t,g,p,h,_);a.generateMipmaps=!1}else if(y){if(b){let t=ke(f);n.texStorage2D(e.TEXTURE_2D,S,g,t.width,t.height)}x&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,p,h,f)}else n.texImage2D(e.TEXTURE_2D,0,g,p,h,f);T(a)&&E(s),u.__version=l.version,a.onUpdate&&a.onUpdate(a)}t.__version=a.version}function _e(t,a,o){if(a.image.length!==6)return;let s=me(t,a),c=a.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+o);let l=r.get(c);if(c.version!==l.__version||s===!0){n.activeTexture(e.TEXTURE0+o);let t=K.getPrimaries(K.workingColorSpace),r=a.colorSpace===``?null:K.getPrimaries(a.colorSpace),u=a.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,a.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,a.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,u);let d=a.isCompressedTexture||a.image[0].isCompressedTexture,f=a.image[0]&&a.image[0].isDataTexture,p=[];for(let e=0;e<6;e++)!d&&!f?p[e]=w(a.image[e],!0,i.maxCubemapSize):p[e]=f?a.image[e].image:a.image[e],p[e]=Oe(a,p[e]);let h=p[0],g=m.convert(a.format,a.colorSpace),_=m.convert(a.type),v=O(a.internalFormat,g,_,a.colorSpace),y=a.isVideoTexture!==!0,b=l.__version===void 0||s===!0,x=c.dataReady,S=ee(a,h);pe(e.TEXTURE_CUBE_MAP,a);let C;if(d){y&&b&&n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=p[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];a.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=a.mipmaps,y&&b){C.length>0&&S++;let t=ke(p[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(f){y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,p[t].width,p[t].height,g,_,p[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,p[t].width,p[t].height,0,g,_,p[t].data);for(let r=0;r<C.length;r++){let i=C[r].image[t].image;y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,i.width,i.height,0,g,_,i.data)}}else{y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,p[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,p[t]);for(let r=0;r<C.length;r++){let i=C[r];y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,g,_,i.image[t])}}}T(a)&&E(e.TEXTURE_CUBE_MAP),l.__version=c.version,a.onUpdate&&a.onUpdate(a)}t.__version=a.version}function ve(t,i,a,o,s,c){let l=m.convert(a.format,a.colorSpace),u=m.convert(a.type),d=O(a.internalFormat,l,u,a.colorSpace),f=r.get(i),p=r.get(a);if(p.__renderTarget=i,!f.__hasExternalTextures){let t=Math.max(1,i.width>>c),r=Math.max(1,i.height>>c);s===e.TEXTURE_3D||s===e.TEXTURE_2D_ARRAY?n.texImage3D(s,c,d,t,r,i.depth,0,l,u,null):n.texImage2D(s,c,d,t,r,0,l,u,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Ee(i)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,o,s,p.__webglTexture,0,Te(i)):(s===e.TEXTURE_2D||s>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&s<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,o,s,p.__webglTexture,c),n.bindFramebuffer(e.FRAMEBUFFER,null)}function I(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=k(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,c=Te(n);Ee(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,c,o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,c,o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],o=m.convert(a.format,a.colorSpace),s=m.convert(a.type),c=O(a.internalFormat,o,s,a.colorSpace),l=Te(n);r&&Ee(n)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,l,c,n.width,n.height):Ee(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,l,c,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,c,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ye(t,i){if(i&&i.isWebGLCubeRenderTarget)throw Error(`Depth Texture with cube render targets is not supported`);if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`renderTarget.depthTexture must be an instance of THREE.DepthTexture`);let a=r.get(i.depthTexture);a.__renderTarget=i,a.__webglTexture&&i.depthTexture.image.width===i.width&&i.depthTexture.image.height===i.height||(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),ce(i.depthTexture,0);let o=a.__webglTexture,s=Te(i);if(i.depthTexture.format===1026)Ee(i)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,o,0,s):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,o,0);else if(i.depthTexture.format===1027)Ee(i)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,o,0,s):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,o,0);else throw Error(`Unknown depthTexture format`)}function L(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)throw Error(`target.depthTexture not supported in Cube render targets`);let e=t.texture.mipmaps;e&&e.length>0?ye(i.__webglFramebuffer[0],t):ye(i.__webglFramebuffer,t)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),I(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),I(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function R(t,n,i){let a=r.get(t);n!==void 0&&ve(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&L(t)}function be(t){let i=t.texture,a=r.get(t),o=r.get(i);t.addEventListener(`dispose`,j);let s=t.textures,c=t.isWebGLCubeRenderTarget===!0,l=s.length>1;if(l||(o.__webglTexture===void 0&&(o.__webglTexture=e.createTexture()),o.__version=i.version,h.memory.textures++),c){a.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){a.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)a.__webglFramebuffer[t][n]=e.createFramebuffer()}else a.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){a.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)a.__webglFramebuffer[t]=e.createFramebuffer()}else a.__webglFramebuffer=e.createFramebuffer();if(l)for(let t=0,n=s.length;t<n;t++){let n=r.get(s[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),h.memory.textures++)}if(t.samples>0&&Ee(t)===!1){a.__webglMultisampledFramebuffer=e.createFramebuffer(),a.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,a.__webglMultisampledFramebuffer);for(let n=0;n<s.length;n++){let r=s[n];a.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,a.__webglColorRenderbuffer[n]);let i=m.convert(r.format,r.colorSpace),o=m.convert(r.type),c=O(r.internalFormat,i,o,r.colorSpace,t.isXRRenderTarget===!0),l=Te(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,l,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,a.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(a.__webglDepthRenderbuffer=e.createRenderbuffer(),I(a.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(c){n.bindTexture(e.TEXTURE_CUBE_MAP,o.__webglTexture),pe(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)ve(a.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else ve(a.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);T(i)&&E(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(l){for(let i=0,o=s.length;i<o;i++){let o=s[i],c=r.get(o),l=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(l=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(l,c.__webglTexture),pe(l,o),ve(a.__webglFramebuffer,t,o,e.COLOR_ATTACHMENT0+i,l,0),T(o)&&E(l)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,o.__webglTexture),pe(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)ve(a.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else ve(a.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);T(i)&&E(r),n.unbindTexture()}t.depthBuffer&&L(t)}function xe(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(T(a)){let t=D(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),E(t),n.unbindTexture()}}}let Se=[],Ce=[];function we(t){if(t.samples>0){if(Ee(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,c=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,l=r.get(t),u=i.length>1;if(u)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,l.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,l.__webglMultisampledFramebuffer);let d=t.texture.mipmaps;d&&d.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,l.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,l.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),u){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,l.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),_===!0&&(Se.length=0,Ce.length=0,Se.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.resolveDepthBuffer===!1&&(Se.push(c),Ce.push(c),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ce)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Se))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),u)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,l.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,l.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,l.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&_){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Te(e){return Math.min(i.maxSamples,e.samples)}function Ee(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function De(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Oe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(K.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&console.warn(`THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):console.error(`THREE.WebGLTextures: Unsupported texture color space:`,n)),t}function ke(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=oe,this.resetTextureUnits=ae,this.setTexture2D=ce,this.setTexture2DArray=le,this.setTexture3D=ue,this.setTextureCube=de,this.rebindTextures=R,this.setupRenderTarget=be,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=we,this.setupDepthRenderbuffer=L,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=Ee}function hl(e,t){function n(n,r=``){let i,a=K.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var gl=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_l=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,vl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ni(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Xr({vertexShader:gl,fragmentShader:_l,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new zr(new ga(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},yl=class extends We{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,h=typeof XRWebGLBinding<`u`,g=new vl,_={},v=t.getContextAttributes(),b=null,x=null,S=[],C=[],T=new H,E=null,D=new ti;D.viewport=new zt;let O=new ti;O.viewport=new zt;let te=[D,O],j=new Za,ne=null,re=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=S[e];return t===void 0&&(t=new li,S[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=S[e];return t===void 0&&(t=new li,S[e]=t),t.getGripSpace()},this.getHand=function(e){let t=S[e];return t===void 0&&(t=new li,S[e]=t),t.getHandSpace()};function M(e){let t=C.indexOf(e.inputSource);if(t===-1)return;let n=S[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ie(){r.removeEventListener(`select`,M),r.removeEventListener(`selectstart`,M),r.removeEventListener(`selectend`,M),r.removeEventListener(`squeeze`,M),r.removeEventListener(`squeezestart`,M),r.removeEventListener(`squeezeend`,M),r.removeEventListener(`end`,ie),r.removeEventListener(`inputsourceschange`,ae);for(let e=0;e<S.length;e++){let t=C[e];t!==null&&(C[e]=null,S[e].disconnect(t))}ne=null,re=null,g.reset();for(let e in _)delete _[e];e.setRenderTarget(b),f=null,d=null,u=null,r=null,x=null,P.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&h&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(b=e.getRenderTarget(),r.addEventListener(`select`,M),r.addEventListener(`selectstart`,M),r.addEventListener(`selectend`,M),r.addEventListener(`squeeze`,M),r.addEventListener(`squeezestart`,M),r.addEventListener(`squeezeend`,M),r.addEventListener(`end`,ie),r.addEventListener(`inputsourceschange`,ae),v.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(T),h&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;v.depth&&(o=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=v.stencil?A:ee,a=v.stencil?w:y);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Vt(d.textureWidth,d.textureHeight,{format:k,type:m,depthTexture:new Mi(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Vt(f.framebufferWidth,f.framebufferHeight,{format:k,type:m,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),P.setContext(r),P.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ae(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=C.indexOf(n);r>=0&&(C[r]=null,S[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=C.indexOf(n);if(r===-1){for(let e=0;e<S.length;e++)if(e>=C.length){C.push(n),r=e;break}else if(C[e]===null){C[e]=n,r=e;break}if(r===-1)break}let i=S[r];i&&i.connect(n)}}let oe=new U,se=new U;function ce(e,t,n){oe.setFromMatrixPosition(t.matrixWorld),se.setFromMatrixPosition(n.matrixWorld);let r=oe.distanceTo(se),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function le(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;g.texture!==null&&(g.depthNear>0&&(t=g.depthNear),g.depthFar>0&&(n=g.depthFar)),j.near=O.near=D.near=t,j.far=O.far=D.far=n,(ne!==j.near||re!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),ne=j.near,re=j.far),j.layers.mask=e.layers.mask|6,D.layers.mask=j.layers.mask&3,O.layers.mask=j.layers.mask&5;let i=e.parent,a=j.cameras;le(j,i);for(let e=0;e<a.length;e++)le(a[e],i);a.length===2?ce(j,D,O):j.projectionMatrix.copy(D.projectionMatrix),ue(e,j,i)};function ue(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Je*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(j)},this.getCameraTexture=function(e){return _[e]};let de=null;function N(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(x,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(x))}let o=te[n];o===void 0&&(o=new ti,o.layers.enable(n),o.viewport=new zt,te[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&h){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&g.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&h){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=_[n];e||(e=new Ni,_[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<S.length;e++){let t=C[e],n=S[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}de&&de(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let P=new Co;P.setAnimationLoop(N),this.setAnimationLoop=function(e){de=e},this.dispose=function(){}}},bl=new Dn,xl=new _n;function Sl(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Kr(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isMeshBasicMaterial||t.isMeshLambertMaterial?a(e,t):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,bl.copy(o),bl.x*=-1,bl.y*=-1,bl.z*=-1,a.isCubeTexture&&a.isRenderTargetTexture===!1&&(bl.y*=-1,bl.z*=-1),e.envMapRotation.value.setFromMatrix4(xl.makeRotationFromEuler(bl)),e.flipEnvMap.value=a.isCubeTexture&&a.isRenderTargetTexture===!1?-1:1,e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Cl(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(m(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return console.error(`THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let t=0,n=r.length;t<n;t++){let n=Array.isArray(r[t])?r[t]:[r[t]];for(let r=0,i=n.length;r<i;r++){let i=n[r];if(p(i,t,r,a)===!0){let t=i.__offset,n=Array.isArray(i.value)?i.value:[i.value],r=0;for(let a=0;a<n.length;a++){let o=n[a],s=h(o);typeof o==`number`||typeof o==`boolean`?(i.__data[0]=o,e.bufferSubData(e.UNIFORM_BUFFER,t+r,i.__data)):o.isMatrix3?(i.__data[0]=o.elements[0],i.__data[1]=o.elements[1],i.__data[2]=o.elements[2],i.__data[3]=0,i.__data[4]=o.elements[3],i.__data[5]=o.elements[4],i.__data[6]=o.elements[5],i.__data[7]=0,i.__data[8]=o.elements[6],i.__data[9]=o.elements[7],i.__data[10]=o.elements[8],i.__data[11]=0):(o.toArray(i.__data,r),r+=s.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,t,i.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=h(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?console.warn(`THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.`):console.warn(`THREE.WebGLRenderer: Unsupported uniform value type.`,e),t}function g(t){let n=t.target;n.removeEventListener(`dispose`,g);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:_}}var wl=class{constructor(e={}){let{canvas:t=Ct(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);f=n.getContextAttributes().alpha}else f=a;let h=new Uint32Array(4),g=new Int32Array(4),_=null,v=null,y=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,C=!1;this._outputColorSpace=Re;let w=0,T=0,E=null,D=-1,O=null,k=new zt,ee=new zt,A=null,te=new cr(0),j=0,ne=t.width,re=t.height,M=1,ie=null,ae=null,oe=new zt(0,0,ne,re),se=new zt(0,0,ne,re),ce=!1,le=new vi,ue=!1,de=!1,N=new _n,P=new U,fe=new zt,pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},me=!1;function he(){return E===null?M:1}let F=n;function ge(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r180`),t.addEventListener(`webglcontextlost`,B,!1),t.addEventListener(`webglcontextrestored`,Ve,!1),t.addEventListener(`webglcontextcreationerror`,He,!1),F===null){let t=`webgl2`;if(F=ge(t,e),F===null)throw ge(t)?Error(`Error creating WebGL context with your selected attributes.`):Error(`Error creating WebGL context.`)}}catch(e){throw console.error(`THREE.WebGLRenderer: `+e.message),e}let _e,ve,I,ye,L,R,be,xe,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le;function Be(){_e=new rs(F),_e.init(),Fe=new hl(F,_e),ve=new Mo(F,_e,e,Fe),I=new pl(F,_e),ve.reversedDepthBuffer&&d&&I.buffers.depth.setReversed(!0),ye=new os(F),L=new Zc,R=new ml(F,_e,I,L,ve,Fe,ye),be=new Po(S),xe=new ns(S),Se=new wo(F),Ie=new Ao(F,Se),Ce=new is(F,Se,ye,Ie),we=new cs(F,Ce,Se,ye),Me=new ss(F,ve,R),ke=new No(L),Te=new Xc(S,be,xe,_e,ve,Ie,ke),Ee=new Sl(S,L),De=new tl,Oe=new cl(_e),je=new ko(S,be,xe,I,we,f,s),Ae=new dl(S,we,ve),Le=new Cl(F,ye,ve,I),Ne=new jo(F,_e,ye),Pe=new as(F,_e,ye),ye.programs=Te.programs,S.capabilities=ve,S.extensions=_e,S.properties=L,S.renderLists=De,S.shadowMap=Ae,S.state=I,S.info=ye}Be();let z=new yl(S,F);this.xr=z,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let e=_e.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=_e.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return M},this.setPixelRatio=function(e){e!==void 0&&(M=e,this.setSize(ne,re,!1))},this.getSize=function(e){return e.set(ne,re)},this.setSize=function(e,n,r=!0){z.isPresenting?console.warn(`THREE.WebGLRenderer: Can't change size while VR device is presenting.`):(ne=e,re=n,t.width=Math.floor(e*M),t.height=Math.floor(n*M),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(ne*M,re*M).floor()},this.setDrawingBufferSize=function(e,n,r){ne=e,re=n,M=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.getCurrentViewport=function(e){return e.copy(k)},this.getViewport=function(e){return e.copy(oe)},this.setViewport=function(e,t,n,r){e.isVector4?oe.set(e.x,e.y,e.z,e.w):oe.set(e,t,n,r),I.viewport(k.copy(oe).multiplyScalar(M).round())},this.getScissor=function(e){return e.copy(se)},this.setScissor=function(e,t,n,r){e.isVector4?se.set(e.x,e.y,e.z,e.w):se.set(e,t,n,r),I.scissor(ee.copy(se).multiplyScalar(M).round())},this.getScissorTest=function(){return ce},this.setScissorTest=function(e){I.setScissorTest(ce=e)},this.setOpaqueSort=function(e){ie=e},this.setTransparentSort=function(e){ae=e},this.getClearColor=function(e){return e.copy(je.getClearColor())},this.setClearColor=function(){je.setClearColor(...arguments)},this.getClearAlpha=function(){return je.getClearAlpha()},this.setClearAlpha=function(){je.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(E!==null){let t=E.texture.format;e=t===1033||t===1031||t===1029}if(e){let e=E.texture.type,t=e===1009||e===1014||e===1012||e===1020||e===1017||e===1018,n=je.getClearColor(),r=je.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(h[0]=i,h[1]=a,h[2]=o,h[3]=r,F.clearBufferuiv(F.COLOR,0,h)):(g[0]=i,g[1]=a,g[2]=o,g[3]=r,F.clearBufferiv(F.COLOR,0,g))}else r|=F.COLOR_BUFFER_BIT}t&&(r|=F.DEPTH_BUFFER_BIT),n&&(r|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener(`webglcontextlost`,B,!1),t.removeEventListener(`webglcontextrestored`,Ve,!1),t.removeEventListener(`webglcontextcreationerror`,He,!1),je.dispose(),De.dispose(),Oe.dispose(),L.dispose(),be.dispose(),xe.dispose(),we.dispose(),Ie.dispose(),Le.dispose(),Te.dispose(),z.dispose(),z.removeEventListener(`sessionstart`,V),z.removeEventListener(`sessionend`,Xe),Ze.stop()};function B(e){e.preventDefault(),console.log(`THREE.WebGLRenderer: Context Lost.`),C=!0}function Ve(){console.log(`THREE.WebGLRenderer: Context Restored.`),C=!1;let e=ye.autoReset,t=Ae.enabled,n=Ae.autoUpdate,r=Ae.needsUpdate,i=Ae.type;Be(),ye.autoReset=e,Ae.enabled=t,Ae.autoUpdate=n,Ae.needsUpdate=r,Ae.type=i}function He(e){console.error(`THREE.WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function We(e){let t=e.target;t.removeEventListener(`dispose`,We),Ge(t)}function Ge(e){Ke(e),L.remove(e)}function Ke(e){let t=L.get(e).programs;t!==void 0&&(t.forEach(function(e){Te.releaseProgram(e)}),e.isShaderMaterial&&Te.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=pe);let o=i.isMesh&&i.matrixWorld.determinant()<0,s=ot(e,t,n,r,i);I.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ce.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ie.setup(i,r,s,n,c);let h,g=Ne;if(c!==null&&(h=Se.get(c),g=Pe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(I.setLineWidth(r.wireframeLinewidth*he()),g.setMode(F.LINES)):g.setMode(F.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),I.setLineWidth(e*he()),i.isLineSegments?g.setMode(F.LINES):i.isLineLoop?g.setMode(F.LINE_LOOP):g.setMode(F.LINE_STRIP)}else i.isPoints?g.setMode(F.POINTS):i.isSprite&&g.setMode(F.TRIANGLES);if(i.isBatchedMesh){if(i._multiDrawInstances!==null)Tt(`THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection.`),g.renderMultiDrawInstances(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount,i._multiDrawInstances);else if(_e.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Se.get(c).bytesPerElement:1,o=L.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(F,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function qe(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,rt(e,t,n),e.side=0,e.needsUpdate=!0,rt(e,t,n),e.side=2):rt(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),v=Oe.get(n),v.init(t),b.push(v),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(v.pushLight(e),e.castShadow&&v.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(v.pushLight(e),e.castShadow&&v.pushShadow(e))}),v.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t){if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];qe(a,n,e),r.add(a)}else qe(t,n,e),r.add(t)}}),v=b.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){L.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}_e.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let Je=null;function Ye(e){Je&&Je(e)}function V(){Ze.stop()}function Xe(){Ze.start()}let Ze=new Co;Ze.setAnimationLoop(Ye),typeof self<`u`&&Ze.setContext(self),this.setAnimationLoop=function(e){Je=e,z.setAnimationLoop(e),e===null?Ze.stop():Ze.start()},z.addEventListener(`sessionstart`,V),z.addEventListener(`sessionend`,Xe),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){console.error(`THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(C===!0)return;if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),z.enabled===!0&&z.isPresenting===!0&&(z.cameraAutoUpdate===!0&&z.updateCamera(t),t=z.getCamera()),e.isScene===!0&&e.onBeforeRender(S,e,t,E),v=Oe.get(e,b.length),v.init(t),b.push(v),N.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),le.setFromProjectionMatrix(N,Ue,t.reversedDepth),de=this.localClippingEnabled,ue=ke.init(this.clippingPlanes,de),_=De.get(e,y.length),_.init(),y.push(_),z.enabled===!0&&z.isPresenting===!0){let e=S.xr.getDepthSensingMesh();e!==null&&Qe(e,t,-1/0,S.sortObjects)}Qe(e,t,0,S.sortObjects),_.finish(),S.sortObjects===!0&&_.sort(ie,ae),me=z.enabled===!1||z.isPresenting===!1||z.hasDepthSensing()===!1,me&&je.addToRenderList(_,e),this.info.render.frame++,ue===!0&&ke.beginShadows();let n=v.state.shadowsArray;Ae.render(n,e,t),ue===!0&&ke.endShadows(),this.info.autoReset===!0&&this.info.reset();let r=_.opaque,i=_.transmissive;if(v.setupLights(),t.isArrayCamera){let n=t.cameras;if(i.length>0)for(let t=0,a=n.length;t<a;t++){let a=n[t];et(r,i,e,a)}me&&je.render(e);for(let t=0,r=n.length;t<r;t++){let r=n[t];$e(_,e,r,r.viewport)}}else i.length>0&&et(r,i,e,t),me&&je.render(e),$e(_,e,t);E!==null&&T===0&&(R.updateMultisampleRenderTarget(E),R.updateRenderTargetMipmap(E)),e.isScene===!0&&e.onAfterRender(S,e,t),Ie.resetDefaultState(),D=-1,O=null,b.pop(),b.length>0?(v=b[b.length-1],ue===!0&&ke.setGlobalState(S.clippingPlanes,v.state.camera)):v=null,y.pop(),_=y.length>0?y[y.length-1]:null};function Qe(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)v.pushLight(e),e.castShadow&&v.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||le.intersectsSprite(e)){r&&fe.setFromMatrixPosition(e.matrixWorld).applyMatrix4(N);let t=we.update(e),i=e.material;i.visible&&_.push(e,t,i,n,fe.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||le.intersectsObject(e))){let t=we.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),fe.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),fe.copy(e.boundingSphere.center)),fe.applyMatrix4(e.matrixWorld).applyMatrix4(N)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&_.push(e,t,s,n,fe.z,o)}}else i.visible&&_.push(e,t,i,n,fe.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)Qe(i[e],t,n,r)}function $e(e,t,n,r){let i=e.opaque,a=e.transmissive,o=e.transparent;v.setupLightsView(n),ue===!0&&ke.setGlobalState(S.clippingPlanes,n),r&&I.viewport(k.copy(r)),i.length>0&&tt(i,t,n),a.length>0&&tt(a,t,n),o.length>0&&tt(o,t,n),I.buffers.depth.setTest(!0),I.buffers.depth.setMask(!0),I.buffers.color.setMask(!0),I.setPolygonOffset(!1)}function et(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[r.id]===void 0&&(v.state.transmissionRenderTarget[r.id]=new Vt(1,1,{generateMipmaps:!0,type:_e.has(`EXT_color_buffer_half_float`)||_e.has(`EXT_color_buffer_float`)?x:m,minFilter:p,samples:4,stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:K.workingColorSpace}));let a=v.state.transmissionRenderTarget[r.id],o=r.viewport||k;a.setSize(o.z*S.transmissionResolutionScale,o.w*S.transmissionResolutionScale);let s=S.getRenderTarget(),c=S.getActiveCubeFace(),l=S.getActiveMipmapLevel();S.setRenderTarget(a),S.getClearColor(te),j=S.getClearAlpha(),j<1&&S.setClearColor(16777215,.5),S.clear(),me&&je.render(n);let u=S.toneMapping;S.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),v.setupLightsView(r),ue===!0&&ke.setGlobalState(S.clippingPlanes,r),tt(e,n,r),R.updateMultisampleRenderTarget(a),R.updateRenderTargetMipmap(a),_e.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let a=t[i],o=a.object,s=a.geometry,c=a.material,l=a.group;if(c.side===2&&o.layers.test(r.layers)){let t=c.side;c.side=1,c.needsUpdate=!0,nt(o,n,r,s,c,l),c.side=t,c.needsUpdate=!0,e=!0}}e===!0&&(R.updateMultisampleRenderTarget(a),R.updateRenderTargetMipmap(a))}S.setRenderTarget(s,c,l),S.setClearColor(te,j),d!==void 0&&(r.viewport=d),S.toneMapping=u}function tt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],o=a.object,s=a.geometry,c=a.group,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&nt(o,t,n,s,l,c)}}function nt(e,t,n,r,i,a){e.onBeforeRender(S,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(S,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,S.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,S.renderBufferDirect(n,t,r,i,e,a),i.side=2):S.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(S,t,n,r,i,a)}function rt(e,t,n){t.isScene!==!0&&(t=pe);let r=L.get(e),i=v.state.lights,a=v.state.shadowsArray,o=i.state.version,s=Te.getParameters(e,i.state,a,t,n),c=Te.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial?t.environment:null,r.fog=t.fog,r.envMap=(e.isMeshStandardMaterial?xe:be).get(e.envMap||r.environment),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,We),l=new Map,r.programs=l);let u=l.get(c);if(u!==void 0){if(r.currentProgram===u&&r.lightsStateVersion===o)return at(e,s),u}else s.uniforms=Te.getUniforms(e),e.onBeforeCompile(s,S),u=Te.acquireProgram(s,c),l.set(c,u),r.uniforms=s.uniforms;let d=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(d.clippingPlanes=ke.uniform),at(e,s),r.needsLights=ct(e),r.lightsStateVersion=o,r.needsLights&&(d.ambientLightColor.value=i.state.ambient,d.lightProbe.value=i.state.probe,d.directionalLights.value=i.state.directional,d.directionalLightShadows.value=i.state.directionalShadow,d.spotLights.value=i.state.spot,d.spotLightShadows.value=i.state.spotShadow,d.rectAreaLights.value=i.state.rectArea,d.ltc_1.value=i.state.rectAreaLTC1,d.ltc_2.value=i.state.rectAreaLTC2,d.pointLights.value=i.state.point,d.pointLightShadows.value=i.state.pointShadow,d.hemisphereLights.value=i.state.hemi,d.directionalShadowMap.value=i.state.directionalShadowMap,d.directionalShadowMatrix.value=i.state.directionalShadowMatrix,d.spotShadowMap.value=i.state.spotShadowMap,d.spotLightMatrix.value=i.state.spotLightMatrix,d.spotLightMap.value=i.state.spotLightMap,d.pointShadowMap.value=i.state.pointShadowMap,d.pointShadowMatrix.value=i.state.pointShadowMatrix),r.currentProgram=u,r.uniformsList=null,u}function it(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=hc.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function at(e,t){let n=L.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function ot(e,t,n,r,i){t.isScene!==!0&&(t=pe),R.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial?t.environment:null,s=E===null?S.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:ze,c=(r.isMeshStandardMaterial?xe:be).get(r.envMap||o),l=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,u=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),d=!!n.morphAttributes.position,f=!!n.morphAttributes.normal,p=!!n.morphAttributes.color,m=0;r.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(m=S.toneMapping);let h=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,g=h===void 0?0:h.length,_=L.get(r),y=v.state.lights;if(ue===!0&&(de===!0||e!==O)){let t=e===O&&r.id===D;ke.setState(r,e,t)}let b=!1;r.version===_.__version?_.needsLights&&_.lightsStateVersion!==y.state.version?b=!0:_.outputColorSpace===s?i.isBatchedMesh&&_.batching===!1||!i.isBatchedMesh&&_.batching===!0||i.isBatchedMesh&&_.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&_.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&_.instancing===!1||!i.isInstancedMesh&&_.instancing===!0||i.isSkinnedMesh&&_.skinning===!1||!i.isSkinnedMesh&&_.skinning===!0||i.isInstancedMesh&&_.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&_.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&_.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&_.instancingMorph===!1&&i.morphTexture!==null?b=!0:_.envMap===c?r.fog===!0&&_.fog!==a||_.numClippingPlanes!==void 0&&(_.numClippingPlanes!==ke.numPlanes||_.numIntersection!==ke.numIntersection)?b=!0:_.vertexAlphas===l&&_.vertexTangents===u&&_.morphTargets===d&&_.morphNormals===f&&_.morphColors===p&&_.toneMapping===m?_.morphTargetsCount!==g&&(b=!0):b=!0:b=!0:b=!0:(b=!0,_.__version=r.version);let x=_.currentProgram;b===!0&&(x=rt(r,t,i));let C=!1,w=!1,T=!1,k=x.getUniforms(),ee=_.uniforms;if(I.useProgram(x.program)&&(C=!0,w=!0,T=!0),r.id!==D&&(D=r.id,w=!0),C||O!==e){I.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),k.setValue(F,`projectionMatrix`,e.projectionMatrix),k.setValue(F,`viewMatrix`,e.matrixWorldInverse);let t=k.map.cameraPosition;t!==void 0&&t.setValue(F,P.setFromMatrixPosition(e.matrixWorld)),ve.logarithmicDepthBuffer&&k.setValue(F,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&k.setValue(F,`isOrthographic`,e.isOrthographicCamera===!0),O!==e&&(O=e,w=!0,T=!0)}if(i.isSkinnedMesh){k.setOptional(F,i,`bindMatrix`),k.setOptional(F,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),k.setValue(F,`boneTexture`,e.boneTexture,R))}i.isBatchedMesh&&(k.setOptional(F,i,`batchingTexture`),k.setValue(F,`batchingTexture`,i._matricesTexture,R),k.setOptional(F,i,`batchingIdTexture`),k.setValue(F,`batchingIdTexture`,i._indirectTexture,R),k.setOptional(F,i,`batchingColorTexture`),i._colorsTexture!==null&&k.setValue(F,`batchingColorTexture`,i._colorsTexture,R));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Me.update(i,n,x),(w||_.receiveShadow!==i.receiveShadow)&&(_.receiveShadow=i.receiveShadow,k.setValue(F,`receiveShadow`,i.receiveShadow)),r.isMeshGouraudMaterial&&r.envMap!==null&&(ee.envMap.value=c,ee.flipEnvMap.value=c.isCubeTexture&&c.isRenderTargetTexture===!1?-1:1),r.isMeshStandardMaterial&&r.envMap===null&&t.environment!==null&&(ee.envMapIntensity.value=t.environmentIntensity),w&&(k.setValue(F,`toneMappingExposure`,S.toneMappingExposure),_.needsLights&&st(ee,T),a&&r.fog===!0&&Ee.refreshFogUniforms(ee,a),Ee.refreshMaterialUniforms(ee,r,M,re,v.state.transmissionRenderTarget[e.id]),hc.upload(F,it(_),ee,R)),r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(hc.upload(F,it(_),ee,R),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&k.setValue(F,`center`,i.center),k.setValue(F,`modelViewMatrix`,i.modelViewMatrix),k.setValue(F,`normalMatrix`,i.normalMatrix),k.setValue(F,`modelMatrix`,i.matrixWorld),r.isShaderMaterial||r.isRawShaderMaterial){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Le.update(n,x),Le.bind(n,x)}}return x}function st(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function ct(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(e,t,n){let r=L.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),L.get(e.texture).__webglTexture=t,L.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=L.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0};let lt=F.createFramebuffer();this.setRenderTarget=function(e,t=0,n=0){E=e,w=t,T=n;let r=!0,i=null,a=!1,o=!1;if(e){let s=L.get(e);if(s.__useDefaultFramebuffer!==void 0)I.bindFramebuffer(F.FRAMEBUFFER,null),r=!1;else if(s.__webglFramebuffer===void 0)R.setupRenderTarget(e);else if(s.__hasExternalTextures)R.rebindTextures(e,L.get(e.texture).__webglTexture,L.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(s.__boundDepthTexture!==t){if(t!==null&&L.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.`);R.setupDepthRenderbuffer(e)}}let c=e.texture;(c.isData3DTexture||c.isDataArrayTexture||c.isCompressedArrayTexture)&&(o=!0);let l=L.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(i=Array.isArray(l[t])?l[t][n]:l[t],a=!0):i=e.samples>0&&R.useMultisampledRTT(e)===!1?L.get(e).__webglMultisampledFramebuffer:Array.isArray(l)?l[n]:l,k.copy(e.viewport),ee.copy(e.scissor),A=e.scissorTest}else k.copy(oe).multiplyScalar(M).floor(),ee.copy(se).multiplyScalar(M).floor(),A=ce;if(n!==0&&(i=lt),I.bindFramebuffer(F.FRAMEBUFFER,i)&&r&&I.drawBuffers(e,i),I.viewport(k),I.scissor(ee),I.setScissorTest(A),a){let r=L.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(o){let r=t;for(let t=0;t<e.textures.length;t++){let i=L.get(e.textures[t]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=L.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,t.__webglTexture,n)}D=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){I.bindFramebuffer(F.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(!ve.textureFormatReadable(c)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!ve.textureTypeReadable(l)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&(e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s),F.readPixels(t,n,r,i,Fe.convert(c),Fe.convert(l),a))}finally{let e=E===null?null:L.get(E).__webglFramebuffer;I.bindFramebuffer(F.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){I.bindFramebuffer(F.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(!ve.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!ve.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,d),F.bufferData(F.PIXEL_PACK_BUFFER,a.byteLength,F.STREAM_READ),e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s),F.readPixels(t,n,r,i,Fe.convert(l),Fe.convert(u),0);let f=E===null?null:L.get(E).__webglFramebuffer;I.bindFramebuffer(F.FRAMEBUFFER,f);let p=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Et(F,p,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,d),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,a),F.deleteBuffer(d),F.deleteSync(p),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;R.setTexture2D(e,0),F.copyTexSubImage2D(F.TEXTURE_2D,n,0,0,o,s,i,a),I.unbindTexture()};let ut=F.createFramebuffer(),dt=F.createFramebuffer();this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=null){a===null&&(i===0?a=0:(Tt(`WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels.`),a=i,i=0));let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Fe.convert(t.format),_=Fe.convert(t.type),v;t.isData3DTexture?(R.setTexture3D(t,0),v=F.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(R.setTexture2DArray(t,0),v=F.TEXTURE_2D_ARRAY):(R.setTexture2D(t,0),v=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,t.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,t.unpackAlignment);let y=F.getParameter(F.UNPACK_ROW_LENGTH),b=F.getParameter(F.UNPACK_IMAGE_HEIGHT),x=F.getParameter(F.UNPACK_SKIP_PIXELS),S=F.getParameter(F.UNPACK_SKIP_ROWS),C=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,h.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,h.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,l),F.pixelStorei(F.UNPACK_SKIP_ROWS,u),F.pixelStorei(F.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=L.get(e),r=L.get(t),h=L.get(n.__renderTarget),g=L.get(r.__renderTarget);I.bindFramebuffer(F.READ_FRAMEBUFFER,h.__webglFramebuffer),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,L.get(e).__webglTexture,i,d+n),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,L.get(t).__webglTexture,a,m+n)),F.blitFramebuffer(l,u,o,s,f,p,o,s,F.DEPTH_BUFFER_BIT,F.NEAREST);I.bindFramebuffer(F.READ_FRAMEBUFFER,null),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||L.has(e)){let n=L.get(e),r=L.get(t);I.bindFramebuffer(F.READ_FRAMEBUFFER,ut),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,dt);for(let e=0;e<c;e++)w?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,n.__webglTexture,i),T?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,r.__webglTexture,a),i===0?T?F.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):F.copyTexSubImage2D(v,a,f,p,l,u,o,s):F.blitFramebuffer(l,u,o,s,f,p,o,s,F.COLOR_BUFFER_BIT,F.NEAREST);I.bindFramebuffer(F.READ_FRAMEBUFFER,null),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?F.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h);F.pixelStorei(F.UNPACK_ROW_LENGTH,y),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,b),F.pixelStorei(F.UNPACK_SKIP_PIXELS,x),F.pixelStorei(F.UNPACK_SKIP_ROWS,S),F.pixelStorei(F.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&F.generateMipmap(v),I.unbindTexture()},this.initRenderTarget=function(e){L.get(e).__webglFramebuffer===void 0&&R.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?R.setTextureCube(e,0):e.isData3DTexture?R.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?R.setTexture2DArray(e,0):R.setTexture2D(e,0),I.unbindTexture()},this.resetState=function(){w=0,T=0,E=null,I.reset(),Ie.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ue}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=K._getDrawingBufferColorSpace(e),t.unpackColorSpace=K._getUnpackColorSpace()}},Tl={type:`change`},El={type:`start`},Dl={type:`end`},Ol=new gn,kl=new mi,Al=Math.cos(70*gt.DEG2RAD),jl=new U,Ml=2*Math.PI,Nl={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Pl=1e-6,Fl=class extends bo{constructor(e,t=null){super(e,t),this.state=Nl.NONE,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:r.ROTATE,MIDDLE:r.DOLLY,RIGHT:r.PAN},this.touches={ONE:i.ROTATE,TWO:i.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new _t,this._lastTargetPosition=new U,this._quat=new _t().setFromUnitVectors(e.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ho,this._sphericalDelta=new ho,this._scale=1,this._panOffset=new U,this._rotateStart=new H,this._rotateEnd=new H,this._rotateDelta=new H,this._panStart=new H,this._panEnd=new H,this._panDelta=new H,this._dollyStart=new H,this._dollyEnd=new H,this._dollyDelta=new H,this._dollyDirection=new U,this._mouse=new H,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Ll.bind(this),this._onPointerDown=Il.bind(this),this._onPointerUp=Rl.bind(this),this._onContextMenu=Gl.bind(this),this._onMouseWheel=Vl.bind(this),this._onKeyDown=Hl.bind(this),this._onTouchStart=Ul.bind(this),this._onTouchMove=Wl.bind(this),this._onMouseDown=zl.bind(this),this._onMouseMove=Bl.bind(this),this._interceptControlDown=Kl.bind(this),this._interceptControlUp=ql.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Tl),this.update(),this.state=Nl.NONE}update(e=null){let t=this.object.position;jl.copy(t).sub(this.target),jl.applyQuaternion(this._quat),this._spherical.setFromVector3(jl),this.autoRotate&&this.state===Nl.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=Ml:n>Math.PI&&(n-=Ml),r<-Math.PI?r+=Ml:r>Math.PI&&(r-=Ml),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(jl.setFromSpherical(this._spherical),jl.applyQuaternion(this._quatInverse),t.copy(this.target).add(jl),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=jl.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new U(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new U(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=jl.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(Ol.origin.copy(this.object.position),Ol.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ol.direction))<Al?this.object.lookAt(this.target):(kl.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ol.intersectPlane(kl,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>Pl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Pl||this._lastTargetPosition.distanceToSquared(this.target)>Pl?(this.dispatchEvent(Tl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?Ml/60/60*this.autoRotateSpeed:Ml/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){jl.setFromMatrixColumn(t,0),jl.multiplyScalar(-e),this._panOffset.add(jl)}_panUp(e,t){this.screenSpacePanning===!0?jl.setFromMatrixColumn(t,1):(jl.setFromMatrixColumn(t,0),jl.crossVectors(this.object.up,jl)),jl.multiplyScalar(e),this._panOffset.add(jl)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;jl.copy(r).sub(this.target);let i=jl.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Ml*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ml*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Ml*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Ml*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Ml*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Ml*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Ml*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ml*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new H,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Il(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.addEventListener(`pointermove`,this._onPointerMove),this.domElement.addEventListener(`pointerup`,this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e)))}function Ll(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function Rl(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(Dl),this.state=Nl.NONE;break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y})}}function zl(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case r.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=Nl.DOLLY;break;case r.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=Nl.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=Nl.ROTATE}break;case r.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=Nl.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=Nl.PAN}break;default:this.state=Nl.NONE}this.state!==Nl.NONE&&this.dispatchEvent(El)}function Bl(e){switch(this.state){case Nl.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case Nl.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case Nl.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e)}}function Vl(e){this.enabled!==!1&&this.enableZoom!==!1&&this.state===Nl.NONE&&(e.preventDefault(),this.dispatchEvent(El),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Dl))}function Hl(e){this.enabled!==!1&&this._handleKeyDown(e)}function Ul(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case i.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=Nl.TOUCH_ROTATE;break;case i.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=Nl.TOUCH_PAN;break;default:this.state=Nl.NONE}break;case 2:switch(this.touches.TWO){case i.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=Nl.TOUCH_DOLLY_PAN;break;case i.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=Nl.TOUCH_DOLLY_ROTATE;break;default:this.state=Nl.NONE}break;default:this.state=Nl.NONE}this.state!==Nl.NONE&&this.dispatchEvent(El)}function Wl(e){switch(this._trackPointer(e),this.state){case Nl.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case Nl.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case Nl.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case Nl.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=Nl.NONE}}function Gl(e){this.enabled!==!1&&e.preventDefault()}function Kl(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function ql(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}var Jl=`modulepreload`,Yl=function(e){return`/static/`+e},Xl={},Zl=function(e){return e.pathname.endsWith(`.css`)},Ql=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},$l=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Yl(t,n);let r=s(t),i=Zl(r);return Ql(Xl,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Jl,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},eu=(async function(t={}){var n,r=t,i=typeof window==`object`,a=typeof WorkerGlobalScope<`u`,o=typeof process==`object`&&process.versions?.node&&process.type!=`renderer`,s=!i&&!o&&!a;if(o){let{createRequire:t}=await $l(async()=>{let{createRequire:t}=await import(`./__vite-browser-external-CB9T68pL.js`).then(t=>e(t.default,1));return{createRequire:t}},__vite__mapDeps([0,1]));var c=t(import.meta.url)}var l=`./this.program`,u=(e,t)=>{throw t},d=import.meta.url,f=``;function p(e){return r.locateFile?r.locateFile(e,f):f+e}var m,h;if(o){if(!(typeof process==`object`&&process.versions?.node&&process.type!=`renderer`))throw Error(`not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)`);var g=process.versions.node,_=g.split(`.`).slice(0,3);if(_=_[0]*1e4+_[1]*100+_[2].split(`-`)[0]*1,_<16e4)throw Error(`This emscripten-generated code requires node v16.0.0 (detected v`+g+`)`);var v=c("fs");d.startsWith(`file:`)&&(f=c("path").dirname(c("url").fileURLToPath(d))+`/`),h=e=>{e=w(e)?new URL(e):e;var t=v.readFileSync(e);return C(Buffer.isBuffer(t)),t},m=async(e,t=!0)=>{e=w(e)?new URL(e):e;var n=v.readFileSync(e,t?void 0:`utf8`);return C(t?Buffer.isBuffer(n):typeof n==`string`),n},process.argv.length>1&&(l=process.argv[1].replace(/\\/g,`/`)),process.argv.slice(2),u=(e,t)=>{throw process.exitCode=e,t}}else if(s){if(typeof process==`object`&&process.versions?.node&&process.type!=`renderer`||typeof window==`object`||typeof WorkerGlobalScope<`u`)throw Error(`not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)`)}else if(i||a){try{f=new URL(`.`,d).href}catch{}if(typeof window!=`object`&&typeof WorkerGlobalScope>`u`)throw Error(`not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)`);a&&(h=e=>{var t=new XMLHttpRequest;return t.open(`GET`,e,!1),t.responseType=`arraybuffer`,t.send(null),new Uint8Array(t.response)}),m=async e=>{if(w(e))return new Promise((t,n)=>{var r=new XMLHttpRequest;r.open(`GET`,e,!0),r.responseType=`arraybuffer`,r.onload=()=>{r.status==200||r.status==0&&r.response?t(r.response):n(r.status)},r.onerror=n,r.send(null)});var t=await fetch(e,{credentials:`same-origin`});if(t.ok)return t.arrayBuffer();throw Error(t.status+` : `+t.url)}}else throw Error(`environment detection error`);var y=console.log.bind(console),b=console.error.bind(console);C(!s,"shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");var x;typeof WebAssembly!=`object`&&b(`no native wasm support detected`);var S=!1;function C(e,t){e||Ce(`Assertion failed`+(t?`: `+t:``))}var w=e=>e.startsWith(`file://`);function T(){var e=aa();C(!(e&3)),e==0&&(e+=4),P[e>>2]=34821223,P[e+4>>2]=2310721022,P[0]=1668509029}function E(){if(!S){var e=aa();e==0&&(e+=4);var t=P[e>>2],n=P[e+4>>2];(t!=34821223||n!=2310721022)&&Ce(`Stack overflow! Stack cookie has been overwritten at ${Be(e)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${Be(n)} ${Be(t)}`),P[0]!=1668509029&&Ce(`Runtime error: The application has corrupted its heap memory area (address zero)!`)}}class D extends Error{}class O extends D{}class k extends D{constructor(e){super(e),this.excPtr=e;let t=Qi(e);this.name=t[0],this.message=t[1]}}(()=>{var e=new Int16Array(1),t=new Int8Array(e.buffer);if(e[0]=25459,t[0]!==115||t[1]!==99)throw`Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)`})();function ee(e){Object.getOwnPropertyDescriptor(r,e)||Object.defineProperty(r,e,{configurable:!0,set(){Ce(`Attempt to set \`Module.${e}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`)}})}function A(e){return()=>C(!1,`call to '${e}' via reference taken before Wasm module initialization`)}function te(e){Object.getOwnPropertyDescriptor(r,e)&&Ce(`\`Module.${e}\` was supplied but \`${e}\` not included in INCOMING_MODULE_JS_API`)}function j(e){return e===`FS_createPath`||e===`FS_createDataFile`||e===`FS_createPreloadedFile`||e===`FS_unlink`||e===`addRunDependency`||e===`FS_createLazyFile`||e===`FS_createDevice`||e===`removeRunDependency`}function ne(e,t){typeof globalThis<`u`&&!Object.getOwnPropertyDescriptor(globalThis,e)&&Object.defineProperty(globalThis,e,{configurable:!0,get(){t()}})}function re(e,t){ne(e,()=>{Ve(`\`${e}\` is not longer defined by emscripten. ${t}`)})}re(`buffer`,`Please use HEAP8.buffer or wasmMemory.buffer`),re(`asm`,`Please use wasmExports instead`);function M(e){ne(e,()=>{var t=`\`${e}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`,n=e;n.startsWith(`_`)||(n=`$`+e),t+=` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${n}')`,j(e)&&(t+=`. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you`),Ve(t)}),ie(e)}function ie(e){Object.getOwnPropertyDescriptor(r,e)||Object.defineProperty(r,e,{configurable:!0,get(){var t=`'${e}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;j(e)&&(t+=`. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you`),Ce(t)}})}var ae,oe,se,ce,le,ue,de,N,P,fe,pe,me,he,F=!1;function ge(){var e=se.buffer;ce=new Int8Array(e),ue=new Int16Array(e),le=new Uint8Array(e),de=new Uint16Array(e),N=new Int32Array(e),P=new Uint32Array(e),fe=new Float32Array(e),pe=new Float64Array(e),me=new BigInt64Array(e),he=new BigUint64Array(e)}C(typeof Int32Array<`u`&&typeof Float64Array<`u`&&Int32Array.prototype.subarray!=null&&Int32Array.prototype.set!=null,`JS engine does not provide full typed array support`);function _e(){if(r.preRun)for(typeof r.preRun==`function`&&(r.preRun=[r.preRun]);r.preRun.length;)Re(r.preRun.shift());ee(`preRun`),Pe(Le)}function ve(){C(!F),F=!0,E(),!r.noFSInit&&!G.initialized&&G.init(),H.init(),ya.__wasm_call_ctors(),G.ignorePermissions=!1}function I(){if(E(),r.postRun)for(typeof r.postRun==`function`&&(r.postRun=[r.postRun]);r.postRun.length;)Ie(r.postRun.shift());ee(`postRun`),Pe(Fe)}var ye=0,L=null,R={},be=null;function xe(e){ye++,r.monitorRunDependencies?.(ye),e?(C(!R[e]),R[e]=1,be===null&&typeof setInterval<`u`&&(be=setInterval(()=>{if(S)clearInterval(be),be=null;else{var e=!1;for(var t in R)e||(e=!0,b(`still waiting on run dependencies:`)),b(`dependency: ${t}`);e&&b(`(end of list)`)}},1e4))):b(`warning: run dependency added without ID`)}function Se(e){if(ye--,r.monitorRunDependencies?.(ye),e?(C(R[e]),delete R[e]):b(`warning: run dependency removed without ID`),ye==0&&(be!==null&&(clearInterval(be),be=null),L)){var t=L;L=null,t()}}function Ce(e){r.onAbort?.(e),e=`Aborted(`+e+`)`,b(e),S=!0;var t=new WebAssembly.RuntimeError(e);throw oe?.(t),t}function we(e,t){return(...n)=>{C(F,`native function \`${e}\` called before runtime initialization`);var r=ya[e];return C(r,`exported native function \`${e}\` not found`),C(n.length<=t,`native function \`${e}\` called with ${n.length} args but expects ${t}`),r(...n)}}var Te;function Ee(){return r.locateFile?p(`mujoco.wasm`):new URL(`/static/assets/mujoco-D9UjOFNX.wasm`,``+import.meta.url).href}function De(e){if(e==Te&&x)return new Uint8Array(x);if(h)return h(e);throw`both async and sync fetching of the wasm failed`}async function Oe(e){if(!x)try{var t=await m(e);return new Uint8Array(t)}catch{}return De(e)}async function ke(e,t){try{var n=await Oe(e);return await WebAssembly.instantiate(n,t)}catch(e){b(`failed to asynchronously prepare wasm: ${e}`),w(Te)&&b(`warning: Loading from a file URI (${Te}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`),Ce(e)}}async function Ae(e,t,n){if(!e&&typeof WebAssembly.instantiateStreaming==`function`&&!w(t)&&!o)try{var r=fetch(t,{credentials:`same-origin`});return await WebAssembly.instantiateStreaming(r,n)}catch(e){b(`wasm streaming compile failed: ${e}`),b(`falling back to ArrayBuffer instantiation`)}return ke(t,n)}function je(){return{env:va,wasi_snapshot_preview1:va}}async function Me(){function e(e,t){return ya=e.exports,se=ya.memory,C(se,`memory not found in wasm exports`),ge(),Fn=ya.__indirect_function_table,C(Fn,`table not found in wasm exports`),_a(ya),Se(`wasm-instantiate`),ya}xe(`wasm-instantiate`);var t=r;function n(n){return C(r===t,`the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?`),t=null,e(n.instance)}var i=je();return r.instantiateWasm?new Promise((t,n)=>{try{r.instantiateWasm(i,(n,r)=>{t(e(n,r))})}catch(e){b(`Module.instantiateWasm callback failed with error: ${e}`),n(e)}}):(Te??=Ee(),n(await Ae(x,Te,i)))}class Ne{name=`ExitStatus`;constructor(e){this.message=`Program terminated with exit(${e})`,this.status=e}}var Pe=e=>{for(;e.length>0;)e.shift()(r)},Fe=[],Ie=e=>Fe.push(e),Le=[],Re=e=>Le.push(e),ze=!0,Be=e=>(C(typeof e==`number`),e>>>=0,`0x`+e.toString(16).padStart(8,`0`)),z=e=>la(e),B=()=>da(),Ve=e=>{Ve.shown||={},Ve.shown[e]||(Ve.shown[e]=1,o&&(e=`warning: `+e),b(e))},He=typeof TextDecoder<`u`?new TextDecoder:void 0,Ue=(e,t=0,n=NaN)=>{for(var r=t+n,i=t;e[i]&&!(i>=r);)++i;if(i-t>16&&e.buffer&&He)return He.decode(e.subarray(t,i));for(var a=``;t<i;){var o=e[t++];if(!(o&128))a+=String.fromCharCode(o);else{var s=e[t++]&63;if((o&224)==192)a+=String.fromCharCode((o&31)<<6|s);else{var c=e[t++]&63;if((o&240)==224?o=(o&15)<<12|s<<6|c:((o&248)!=240&&Ve(`Invalid UTF-8 leading byte `+Be(o)+` encountered when deserializing a UTF-8 string in wasm memory to a JS string!`),o=(o&7)<<18|s<<12|c<<6|e[t++]&63),o<65536)a+=String.fromCharCode(o);else{var l=o-65536;a+=String.fromCharCode(55296|l>>10,56320|l&1023)}}}}return a},We=(e,t)=>(C(typeof e==`number`,`UTF8ToString expects a number (got ${typeof e})`),e?Ue(le,e,t):``),Ge=(e,t,n,r)=>Ce(`Assertion failed: ${We(e)}, at: `+[t?We(t):`unknown filename`,n,r?We(r):`unknown function`]),Ke=[],qe=0,Je=e=>{var t=new Ze(e);return t.get_caught()||(t.set_caught(!0),qe--),t.set_rethrown(!1),Ke.push(t),pa(e),ga(e)},Ye=()=>{if(!Ke.length)return 0;var e=Ke[Ke.length-1];return pa(e.excPtr),e.excPtr},V=0,Xe=()=>{Y(0,0),C(Ke.length>0);var e=Ke.pop();fa(e.excPtr),V=0};class Ze{constructor(e){this.excPtr=e,this.ptr=e-24}set_type(e){P[this.ptr+4>>2]=e}get_type(){return P[this.ptr+4>>2]}set_destructor(e){P[this.ptr+8>>2]=e}get_destructor(){return P[this.ptr+8>>2]}set_caught(e){e=+!!e,ce[this.ptr+12]=e}get_caught(){return ce[this.ptr+12]!=0}set_rethrown(e){e=+!!e,ce[this.ptr+13]=e}get_rethrown(){return ce[this.ptr+13]!=0}init(e,t){this.set_adjusted_ptr(0),this.set_type(e),this.set_destructor(t)}set_adjusted_ptr(e){P[this.ptr+16>>2]=e}get_adjusted_ptr(){return P[this.ptr+16>>2]}}var Qe=e=>sa(e),$e=e=>{var t=V?.excPtr;if(!t)return Qe(0),0;var n=new Ze(t);n.set_adjusted_ptr(t);var r=n.get_type();if(!r)return Qe(0),t;for(var i of e){if(i===0||i===r)break;var a=n.ptr+16;if(ha(i,r,a))return Qe(i),t}return Qe(r),t},et=()=>$e([]),tt=e=>$e([e]),nt=(e,t)=>$e([e,t]),rt=()=>{var e=Ke.pop();e||Ce(`no exception to throw`);var t=e.excPtr;throw e.get_rethrown()||(Ke.push(e),e.set_rethrown(!0),e.set_caught(!1),qe++),V=new k(t),V},it=e=>{if(e){var t=new Ze(e);Ke.push(t),t.set_rethrown(!0),rt()}},at=(e,t,n)=>{throw new Ze(e).init(t,n),V=new k(e),qe++,V},ot=()=>qe,st=e=>{throw V||=new k(e),V},ct={isAbs:e=>e.charAt(0)===`/`,splitPath:e=>/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1),normalizeArray:(e,t)=>{for(var n=0,r=e.length-1;r>=0;r--){var i=e[r];i===`.`?e.splice(r,1):i===`..`?(e.splice(r,1),n++):n&&(e.splice(r,1),n--)}if(t)for(;n;n--)e.unshift(`..`);return e},normalize:e=>{var t=ct.isAbs(e),n=e.slice(-1)===`/`;return e=ct.normalizeArray(e.split(`/`).filter(e=>!!e),!t).join(`/`),!e&&!t&&(e=`.`),e&&n&&(e+=`/`),(t?`/`:``)+e},dirname:e=>{var t=ct.splitPath(e),n=t[0],r=t[1];return!n&&!r?`.`:(r&&=r.slice(0,-1),n+r)},basename:e=>e&&e.match(/([^\/]+|\/)\/*$/)[1],join:(...e)=>ct.normalize(e.join(`/`)),join2:(e,t)=>ct.normalize(e+`/`+t)},lt=()=>{if(o){var e=c("crypto");return t=>e.randomFillSync(t)}return e=>crypto.getRandomValues(e)},ut=e=>{(ut=lt())(e)},dt={resolve:(...e)=>{for(var t=``,n=!1,r=e.length-1;r>=-1&&!n;r--){var i=r>=0?e[r]:G.cwd();if(typeof i!=`string`)throw TypeError(`Arguments to path.resolve must be strings`);if(!i)return``;t=i+`/`+t,n=ct.isAbs(i)}return t=ct.normalizeArray(t.split(`/`).filter(e=>!!e),!n).join(`/`),(n?`/`:``)+t||`.`},relative:(e,t)=>{e=dt.resolve(e).slice(1),t=dt.resolve(t).slice(1);function n(e){for(var t=0;t<e.length&&e[t]===``;t++);for(var n=e.length-1;n>=0&&e[n]===``;n--);return t>n?[]:e.slice(t,n-t+1)}for(var r=n(e.split(`/`)),i=n(t.split(`/`)),a=Math.min(r.length,i.length),o=a,s=0;s<a;s++)if(r[s]!==i[s]){o=s;break}for(var c=[],s=o;s<r.length;s++)c.push(`..`);return c=c.concat(i.slice(o)),c.join(`/`)}},ft=[],pt=e=>{for(var t=0,n=0;n<e.length;++n){var r=e.charCodeAt(n);r<=127?t++:r<=2047?t+=2:r>=55296&&r<=57343?(t+=4,++n):t+=3}return t},mt=(e,t,n,r)=>{if(C(typeof e==`string`,`stringToUTF8Array expects a string (got ${typeof e})`),!(r>0))return 0;for(var i=n,a=n+r-1,o=0;o<e.length;++o){var s=e.codePointAt(o);if(s<=127){if(n>=a)break;t[n++]=s}else if(s<=2047){if(n+1>=a)break;t[n++]=192|s>>6,t[n++]=128|s&63}else if(s<=65535){if(n+2>=a)break;t[n++]=224|s>>12,t[n++]=128|s>>6&63,t[n++]=128|s&63}else{if(n+3>=a)break;s>1114111&&Ve(`Invalid Unicode code point `+Be(s)+` encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).`),t[n++]=240|s>>18,t[n++]=128|s>>12&63,t[n++]=128|s>>6&63,t[n++]=128|s&63,o++}}return t[n]=0,n-i},ht=(e,t,n)=>{var r=n>0?n:pt(e)+1,i=Array(r),a=mt(e,i,0,i.length);return t&&(i.length=a),i},gt=()=>{if(!ft.length){var e=null;if(o){var t=256,n=Buffer.alloc(t),r=0,i=process.stdin.fd;try{r=v.readSync(i,n,0,t)}catch(e){if(e.toString().includes(`EOF`))r=0;else throw e}r>0&&(e=n.slice(0,r).toString(`utf-8`))}else typeof window<`u`&&typeof window.prompt==`function`&&(e=window.prompt(`Input: `),e!==null&&(e+=`
`));if(!e)return null;ft=ht(e,!0)}return ft.shift()},H={ttys:[],init(){},shutdown(){},register(e,t){H.ttys[e]={input:[],output:[],ops:t},G.registerDevice(e,H.stream_ops)},stream_ops:{open(e){var t=H.ttys[e.node.rdev];if(!t)throw new G.ErrnoError(43);e.tty=t,e.seekable=!1},close(e){e.tty.ops.fsync(e.tty)},fsync(e){e.tty.ops.fsync(e.tty)},read(e,t,n,r,i){if(!e.tty||!e.tty.ops.get_char)throw new G.ErrnoError(60);for(var a=0,o=0;o<r;o++){var s;try{s=e.tty.ops.get_char(e.tty)}catch{throw new G.ErrnoError(29)}if(s===void 0&&a===0)throw new G.ErrnoError(6);if(s==null)break;a++,t[n+o]=s}return a&&(e.node.atime=Date.now()),a},write(e,t,n,r,i){if(!e.tty||!e.tty.ops.put_char)throw new G.ErrnoError(60);try{for(var a=0;a<r;a++)e.tty.ops.put_char(e.tty,t[n+a])}catch{throw new G.ErrnoError(29)}return r&&(e.node.mtime=e.node.ctime=Date.now()),a}},default_tty_ops:{get_char(e){return gt()},put_char(e,t){t===null||t===10?(y(Ue(e.output)),e.output=[]):t!=0&&e.output.push(t)},fsync(e){e.output?.length>0&&(y(Ue(e.output)),e.output=[])},ioctl_tcgets(e){return{c_iflag:25856,c_oflag:5,c_cflag:191,c_lflag:35387,c_cc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},ioctl_tcsets(e,t,n){return 0},ioctl_tiocgwinsz(e){return[24,80]}},default_tty1_ops:{put_char(e,t){t===null||t===10?(b(Ue(e.output)),e.output=[]):t!=0&&e.output.push(t)},fsync(e){e.output?.length>0&&(b(Ue(e.output)),e.output=[])}}},_t=e=>{Ce("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported")},U={ops_table:null,mount(e){return U.createNode(null,`/`,16895,0)},createNode(e,t,n,r){if(G.isBlkdev(n)||G.isFIFO(n))throw new G.ErrnoError(63);U.ops_table||={dir:{node:{getattr:U.node_ops.getattr,setattr:U.node_ops.setattr,lookup:U.node_ops.lookup,mknod:U.node_ops.mknod,rename:U.node_ops.rename,unlink:U.node_ops.unlink,rmdir:U.node_ops.rmdir,readdir:U.node_ops.readdir,symlink:U.node_ops.symlink},stream:{llseek:U.stream_ops.llseek}},file:{node:{getattr:U.node_ops.getattr,setattr:U.node_ops.setattr},stream:{llseek:U.stream_ops.llseek,read:U.stream_ops.read,write:U.stream_ops.write,mmap:U.stream_ops.mmap,msync:U.stream_ops.msync}},link:{node:{getattr:U.node_ops.getattr,setattr:U.node_ops.setattr,readlink:U.node_ops.readlink},stream:{}},chrdev:{node:{getattr:U.node_ops.getattr,setattr:U.node_ops.setattr},stream:G.chrdev_stream_ops}};var i=G.createNode(e,t,n,r);return G.isDir(i.mode)?(i.node_ops=U.ops_table.dir.node,i.stream_ops=U.ops_table.dir.stream,i.contents={}):G.isFile(i.mode)?(i.node_ops=U.ops_table.file.node,i.stream_ops=U.ops_table.file.stream,i.usedBytes=0,i.contents=null):G.isLink(i.mode)?(i.node_ops=U.ops_table.link.node,i.stream_ops=U.ops_table.link.stream):G.isChrdev(i.mode)&&(i.node_ops=U.ops_table.chrdev.node,i.stream_ops=U.ops_table.chrdev.stream),i.atime=i.mtime=i.ctime=Date.now(),e&&(e.contents[t]=i,e.atime=e.mtime=e.ctime=i.atime),i},getFileDataAsTypedArray(e){return e.contents?e.contents.subarray?e.contents.subarray(0,e.usedBytes):new Uint8Array(e.contents):new Uint8Array},expandFileStorage(e,t){var n=e.contents?e.contents.length:0;if(!(n>=t)){t=Math.max(t,n*(n<1048576?2:1.125)>>>0),n!=0&&(t=Math.max(t,256));var r=e.contents;e.contents=new Uint8Array(t),e.usedBytes>0&&e.contents.set(r.subarray(0,e.usedBytes),0)}},resizeFileStorage(e,t){if(e.usedBytes!=t){if(t==0)e.contents=null,e.usedBytes=0;else{var n=e.contents;e.contents=new Uint8Array(t),n&&e.contents.set(n.subarray(0,Math.min(t,e.usedBytes))),e.usedBytes=t}}},node_ops:{getattr(e){var t={};return t.dev=G.isChrdev(e.mode)?e.id:1,t.ino=e.id,t.mode=e.mode,t.nlink=1,t.uid=0,t.gid=0,t.rdev=e.rdev,t.size=G.isDir(e.mode)?4096:G.isFile(e.mode)?e.usedBytes:G.isLink(e.mode)?e.link.length:0,t.atime=new Date(e.atime),t.mtime=new Date(e.mtime),t.ctime=new Date(e.ctime),t.blksize=4096,t.blocks=Math.ceil(t.size/t.blksize),t},setattr(e,t){for(let n of[`mode`,`atime`,`mtime`,`ctime`])t[n]!=null&&(e[n]=t[n]);t.size!==void 0&&U.resizeFileStorage(e,t.size)},lookup(e,t){throw new G.ErrnoError(44)},mknod(e,t,n,r){return U.createNode(e,t,n,r)},rename(e,t,n){var r;try{r=G.lookupNode(t,n)}catch{}if(r){if(G.isDir(e.mode))for(var i in r.contents)throw new G.ErrnoError(55);G.hashRemoveNode(r)}delete e.parent.contents[e.name],t.contents[n]=e,e.name=n,t.ctime=t.mtime=e.parent.ctime=e.parent.mtime=Date.now()},unlink(e,t){delete e.contents[t],e.ctime=e.mtime=Date.now()},rmdir(e,t){for(var n in G.lookupNode(e,t).contents)throw new G.ErrnoError(55);delete e.contents[t],e.ctime=e.mtime=Date.now()},readdir(e){return[`.`,`..`,...Object.keys(e.contents)]},symlink(e,t,n){var r=U.createNode(e,t,41471,0);return r.link=n,r},readlink(e){if(!G.isLink(e.mode))throw new G.ErrnoError(28);return e.link}},stream_ops:{read(e,t,n,r,i){var a=e.node.contents;if(i>=e.node.usedBytes)return 0;var o=Math.min(e.node.usedBytes-i,r);if(C(o>=0),o>8&&a.subarray)t.set(a.subarray(i,i+o),n);else for(var s=0;s<o;s++)t[n+s]=a[i+s];return o},write(e,t,n,r,i,a){if(C(!(t instanceof ArrayBuffer)),t.buffer===ce.buffer&&(a=!1),!r)return 0;var o=e.node;if(o.mtime=o.ctime=Date.now(),t.subarray&&(!o.contents||o.contents.subarray)){if(a)return C(i===0,`canOwn must imply no weird position inside the file`),o.contents=t.subarray(n,n+r),o.usedBytes=r,r;if(o.usedBytes===0&&i===0)return o.contents=t.slice(n,n+r),o.usedBytes=r,r;if(i+r<=o.usedBytes)return o.contents.set(t.subarray(n,n+r),i),r}if(U.expandFileStorage(o,i+r),o.contents.subarray&&t.subarray)o.contents.set(t.subarray(n,n+r),i);else for(var s=0;s<r;s++)o.contents[i+s]=t[n+s];return o.usedBytes=Math.max(o.usedBytes,i+r),r},llseek(e,t,n){var r=t;if(n===1?r+=e.position:n===2&&G.isFile(e.node.mode)&&(r+=e.node.usedBytes),r<0)throw new G.ErrnoError(28);return r},mmap(e,t,n,r,i){if(!G.isFile(e.node.mode))throw new G.ErrnoError(43);var a,o,s=e.node.contents;if(!(i&2)&&s&&s.buffer===ce.buffer)o=!1,a=s.byteOffset;else{if(o=!0,a=_t(t),!a)throw new G.ErrnoError(48);s&&((n>0||n+t<s.length)&&(s=s.subarray?s.subarray(n,n+t):Array.prototype.slice.call(s,n,n+t)),ce.set(s,a))}return{ptr:a,allocated:o}},msync(e,t,n,r,i){return U.stream_ops.write(e,t,0,r,n,!1),0}}},vt=async e=>{var t=await m(e);return C(t,`Loading data file "${e}" failed (no arrayBuffer).`),new Uint8Array(t)},yt=(...e)=>G.createDataFile(...e),W=e=>{for(var t=e;;){if(!R[e])return e;e=t+Math.random()}},bt=[],xt=(e,t,n,r)=>{typeof Browser<`u`&&Browser.init();var i=!1;return bt.forEach(a=>{i||a.canHandle(t)&&(a.handle(e,t,n,r),i=!0)}),i},St=(e,t,n,r,i,a,o,s,c,l)=>{var u=t?dt.resolve(ct.join2(e,t)):e,d=W(`cp ${u}`);function f(n){function f(n){l?.(),s||yt(e,t,n,r,i,c),a?.(),Se(d)}xt(n,u,f,()=>{o?.(),Se(d)})||f(n)}xe(d),typeof n==`string`?vt(n).then(f,o):f(n)},Ct=e=>{var t={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[e];if(t===void 0)throw Error(`Unknown file open mode: ${e}`);return t},wt=(e,t)=>{var n=0;return e&&(n|=365),t&&(n|=146),n},Tt=e=>We(oa(e)),Et={EPERM:63,ENOENT:44,ESRCH:71,EINTR:27,EIO:29,ENXIO:60,E2BIG:1,ENOEXEC:45,EBADF:8,ECHILD:12,EAGAIN:6,EWOULDBLOCK:6,ENOMEM:48,EACCES:2,EFAULT:21,ENOTBLK:105,EBUSY:10,EEXIST:20,EXDEV:75,ENODEV:43,ENOTDIR:54,EISDIR:31,EINVAL:28,ENFILE:41,EMFILE:33,ENOTTY:59,ETXTBSY:74,EFBIG:22,ENOSPC:51,ESPIPE:70,EROFS:69,EMLINK:34,EPIPE:64,EDOM:18,ERANGE:68,ENOMSG:49,EIDRM:24,ECHRNG:106,EL2NSYNC:156,EL3HLT:107,EL3RST:108,ELNRNG:109,EUNATCH:110,ENOCSI:111,EL2HLT:112,EDEADLK:16,ENOLCK:46,EBADE:113,EBADR:114,EXFULL:115,ENOANO:104,EBADRQC:103,EBADSLT:102,EDEADLOCK:16,EBFONT:101,ENOSTR:100,ENODATA:116,ETIME:117,ENOSR:118,ENONET:119,ENOPKG:120,EREMOTE:121,ENOLINK:47,EADV:122,ESRMNT:123,ECOMM:124,EPROTO:65,EMULTIHOP:36,EDOTDOT:125,EBADMSG:9,ENOTUNIQ:126,EBADFD:127,EREMCHG:128,ELIBACC:129,ELIBBAD:130,ELIBSCN:131,ELIBMAX:132,ELIBEXEC:133,ENOSYS:52,ENOTEMPTY:55,ENAMETOOLONG:37,ELOOP:32,EOPNOTSUPP:138,EPFNOSUPPORT:139,ECONNRESET:15,ENOBUFS:42,EAFNOSUPPORT:5,EPROTOTYPE:67,ENOTSOCK:57,ENOPROTOOPT:50,ESHUTDOWN:140,ECONNREFUSED:14,EADDRINUSE:3,ECONNABORTED:13,ENETUNREACH:40,ENETDOWN:38,ETIMEDOUT:73,EHOSTDOWN:142,EHOSTUNREACH:23,EINPROGRESS:26,EALREADY:7,EDESTADDRREQ:17,EMSGSIZE:35,EPROTONOSUPPORT:66,ESOCKTNOSUPPORT:137,EADDRNOTAVAIL:4,ENETRESET:39,EISCONN:30,ENOTCONN:53,ETOOMANYREFS:141,EUSERS:136,EDQUOT:19,ESTALE:72,ENOTSUP:138,ENOMEDIUM:148,EILSEQ:25,EOVERFLOW:61,ECANCELED:11,ENOTRECOVERABLE:56,EOWNERDEAD:62,ESTRPIPE:135},G={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:`/`,initialized:!1,ignorePermissions:!0,filesystems:null,syncFSRequests:0,readFiles:{},ErrnoError:class extends Error{name=`ErrnoError`;constructor(e){for(var t in super(F?Tt(e):``),this.errno=e,Et)if(Et[t]===e){this.code=t;break}}},FSStream:class{shared={};get object(){return this.node}set object(e){this.node=e}get isRead(){return(this.flags&2097155)!=1}get isWrite(){return!!(this.flags&2097155)}get isAppend(){return this.flags&1024}get flags(){return this.shared.flags}set flags(e){this.shared.flags=e}get position(){return this.shared.position}set position(e){this.shared.position=e}},FSNode:class{node_ops={};stream_ops={};readMode=365;writeMode=146;mounted=null;constructor(e,t,n,r){e||=this,this.parent=e,this.mount=e.mount,this.id=G.nextInode++,this.name=t,this.mode=n,this.rdev=r,this.atime=this.mtime=this.ctime=Date.now()}get read(){return(this.mode&this.readMode)===this.readMode}set read(e){e?this.mode|=this.readMode:this.mode&=~this.readMode}get write(){return(this.mode&this.writeMode)===this.writeMode}set write(e){e?this.mode|=this.writeMode:this.mode&=~this.writeMode}get isFolder(){return G.isDir(this.mode)}get isDevice(){return G.isChrdev(this.mode)}},lookupPath(e,t={}){if(!e)throw new G.ErrnoError(44);t.follow_mount??=!0,ct.isAbs(e)||(e=G.cwd()+`/`+e);linkloop:for(var n=0;n<40;n++){for(var r=e.split(`/`).filter(e=>!!e),i=G.root,a=`/`,o=0;o<r.length;o++){var s=o===r.length-1;if(s&&t.parent)break;if(r[o]!==`.`){if(r[o]===`..`){if(a=ct.dirname(a),G.isRoot(i)){e=a+`/`+r.slice(o+1).join(`/`);continue linkloop}i=i.parent}else{a=ct.join2(a,r[o]);try{i=G.lookupNode(i,r[o])}catch(e){if(e?.errno===44&&s&&t.noent_okay)return{path:a};throw e}if(G.isMountpoint(i)&&(!s||t.follow_mount)&&(i=i.mounted.root),G.isLink(i.mode)&&(!s||t.follow)){if(!i.node_ops.readlink)throw new G.ErrnoError(52);var c=i.node_ops.readlink(i);ct.isAbs(c)||(c=ct.dirname(a)+`/`+c),e=c+`/`+r.slice(o+1).join(`/`);continue linkloop}}}}return{path:a,node:i}}throw new G.ErrnoError(32)},getPath(e){for(var t;;){if(G.isRoot(e)){var n=e.mount.mountpoint;return t?n[n.length-1]===`/`?n+t:`${n}/${t}`:n}t=t?`${e.name}/${t}`:e.name,e=e.parent}},hashName(e,t){for(var n=0,r=0;r<t.length;r++)n=(n<<5)-n+t.charCodeAt(r)|0;return(e+n>>>0)%G.nameTable.length},hashAddNode(e){var t=G.hashName(e.parent.id,e.name);e.name_next=G.nameTable[t],G.nameTable[t]=e},hashRemoveNode(e){var t=G.hashName(e.parent.id,e.name);if(G.nameTable[t]===e)G.nameTable[t]=e.name_next;else for(var n=G.nameTable[t];n;){if(n.name_next===e){n.name_next=e.name_next;break}n=n.name_next}},lookupNode(e,t){var n=G.mayLookup(e);if(n)throw new G.ErrnoError(n);for(var r=G.hashName(e.id,t),i=G.nameTable[r];i;i=i.name_next){var a=i.name;if(i.parent.id===e.id&&a===t)return i}return G.lookup(e,t)},createNode(e,t,n,r){C(typeof e==`object`);var i=new G.FSNode(e,t,n,r);return G.hashAddNode(i),i},destroyNode(e){G.hashRemoveNode(e)},isRoot(e){return e===e.parent},isMountpoint(e){return!!e.mounted},isFile(e){return(e&61440)==32768},isDir(e){return(e&61440)==16384},isLink(e){return(e&61440)==40960},isChrdev(e){return(e&61440)==8192},isBlkdev(e){return(e&61440)==24576},isFIFO(e){return(e&61440)==4096},isSocket(e){return(e&49152)==49152},flagsToPermissionString(e){var t=[`r`,`w`,`rw`][e&3];return e&512&&(t+=`w`),t},nodePermissions(e,t){return G.ignorePermissions?0:t.includes(`r`)&&!(e.mode&292)||t.includes(`w`)&&!(e.mode&146)||t.includes(`x`)&&!(e.mode&73)?2:0},mayLookup(e){return G.isDir(e.mode)?G.nodePermissions(e,`x`)||(e.node_ops.lookup?0:2):54},mayCreate(e,t){if(!G.isDir(e.mode))return 54;try{return G.lookupNode(e,t),20}catch{}return G.nodePermissions(e,`wx`)},mayDelete(e,t,n){var r;try{r=G.lookupNode(e,t)}catch(e){return e.errno}var i=G.nodePermissions(e,`wx`);if(i)return i;if(n){if(!G.isDir(r.mode))return 54;if(G.isRoot(r)||G.getPath(r)===G.cwd())return 10}else if(G.isDir(r.mode))return 31;return 0},mayOpen(e,t){return e?G.isLink(e.mode)?32:G.isDir(e.mode)&&(G.flagsToPermissionString(t)!==`r`||t&576)?31:G.nodePermissions(e,G.flagsToPermissionString(t)):44},checkOpExists(e,t){if(!e)throw new G.ErrnoError(t);return e},MAX_OPEN_FDS:4096,nextfd(){for(var e=0;e<=G.MAX_OPEN_FDS;e++)if(!G.streams[e])return e;throw new G.ErrnoError(33)},getStreamChecked(e){var t=G.getStream(e);if(!t)throw new G.ErrnoError(8);return t},getStream:e=>G.streams[e],createStream(e,t=-1){return C(t>=-1),e=Object.assign(new G.FSStream,e),t==-1&&(t=G.nextfd()),e.fd=t,G.streams[t]=e,e},closeStream(e){G.streams[e]=null},dupStream(e,t=-1){var n=G.createStream(e,t);return n.stream_ops?.dup?.(n),n},doSetAttr(e,t,n){var r=e?.stream_ops.setattr,i=r?e:t;r??=t.node_ops.setattr,G.checkOpExists(r,63),r(i,n)},chrdev_stream_ops:{open(e){e.stream_ops=G.getDevice(e.node.rdev).stream_ops,e.stream_ops.open?.(e)},llseek(){throw new G.ErrnoError(70)}},major:e=>e>>8,minor:e=>e&255,makedev:(e,t)=>e<<8|t,registerDevice(e,t){G.devices[e]={stream_ops:t}},getDevice:e=>G.devices[e],getMounts(e){for(var t=[],n=[e];n.length;){var r=n.pop();t.push(r),n.push(...r.mounts)}return t},syncfs(e,t){typeof e==`function`&&(t=e,e=!1),G.syncFSRequests++,G.syncFSRequests>1&&b(`warning: ${G.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);var n=G.getMounts(G.root.mount),r=0;function i(e){return C(G.syncFSRequests>0),G.syncFSRequests--,t(e)}function a(e){if(e)return a.errored?void 0:(a.errored=!0,i(e));++r>=n.length&&i(null)}n.forEach(t=>{if(!t.type.syncfs)return a(null);t.type.syncfs(t,e,a)})},mount(e,t,n){if(typeof e==`string`)throw e;var r=n===`/`,i=!n,a;if(r&&G.root)throw new G.ErrnoError(10);if(!r&&!i){var o=G.lookupPath(n,{follow_mount:!1});if(n=o.path,a=o.node,G.isMountpoint(a))throw new G.ErrnoError(10);if(!G.isDir(a.mode))throw new G.ErrnoError(54)}var s={type:e,opts:t,mountpoint:n,mounts:[]},c=e.mount(s);return c.mount=s,s.root=c,r?G.root=c:a&&(a.mounted=s,a.mount&&a.mount.mounts.push(s)),c},unmount(e){var t=G.lookupPath(e,{follow_mount:!1});if(!G.isMountpoint(t.node))throw new G.ErrnoError(28);var n=t.node,r=n.mounted,i=G.getMounts(r);Object.keys(G.nameTable).forEach(e=>{for(var t=G.nameTable[e];t;){var n=t.name_next;i.includes(t.mount)&&G.destroyNode(t),t=n}}),n.mounted=null;var a=n.mount.mounts.indexOf(r);C(a!==-1),n.mount.mounts.splice(a,1)},lookup(e,t){return e.node_ops.lookup(e,t)},mknod(e,t,n){var r=G.lookupPath(e,{parent:!0}).node,i=ct.basename(e);if(!i)throw new G.ErrnoError(28);if(i===`.`||i===`..`)throw new G.ErrnoError(20);var a=G.mayCreate(r,i);if(a)throw new G.ErrnoError(a);if(!r.node_ops.mknod)throw new G.ErrnoError(63);return r.node_ops.mknod(r,i,t,n)},statfs(e){return G.statfsNode(G.lookupPath(e,{follow:!0}).node)},statfsStream(e){return G.statfsNode(e.node)},statfsNode(e){var t={bsize:4096,frsize:4096,blocks:1e6,bfree:5e5,bavail:5e5,files:G.nextInode,ffree:G.nextInode-1,fsid:42,flags:2,namelen:255};return e.node_ops.statfs&&Object.assign(t,e.node_ops.statfs(e.mount.opts.root)),t},create(e,t=438){return t&=4095,t|=32768,G.mknod(e,t,0)},mkdir(e,t=511){return t&=1023,t|=16384,G.mknod(e,t,0)},mkdirTree(e,t){var n=e.split(`/`),r=``;for(var i of n)if(i){(r||ct.isAbs(e))&&(r+=`/`),r+=i;try{G.mkdir(r,t)}catch(e){if(e.errno!=20)throw e}}},mkdev(e,t,n){return n===void 0&&(n=t,t=438),t|=8192,G.mknod(e,t,n)},symlink(e,t){if(!dt.resolve(e))throw new G.ErrnoError(44);var n=G.lookupPath(t,{parent:!0}).node;if(!n)throw new G.ErrnoError(44);var r=ct.basename(t),i=G.mayCreate(n,r);if(i)throw new G.ErrnoError(i);if(!n.node_ops.symlink)throw new G.ErrnoError(63);return n.node_ops.symlink(n,r,e)},rename(e,t){var n=ct.dirname(e),r=ct.dirname(t),i=ct.basename(e),a=ct.basename(t),o=G.lookupPath(e,{parent:!0}),s=o.node,c;if(o=G.lookupPath(t,{parent:!0}),c=o.node,!s||!c)throw new G.ErrnoError(44);if(s.mount!==c.mount)throw new G.ErrnoError(75);var l=G.lookupNode(s,i),u=dt.relative(e,r);if(u.charAt(0)!==`.`)throw new G.ErrnoError(28);if(u=dt.relative(t,n),u.charAt(0)!==`.`)throw new G.ErrnoError(55);var d;try{d=G.lookupNode(c,a)}catch{}if(l!==d){var f=G.isDir(l.mode),p=G.mayDelete(s,i,f);if(p||(p=d?G.mayDelete(c,a,f):G.mayCreate(c,a),p))throw new G.ErrnoError(p);if(!s.node_ops.rename)throw new G.ErrnoError(63);if(G.isMountpoint(l)||d&&G.isMountpoint(d))throw new G.ErrnoError(10);if(c!==s&&(p=G.nodePermissions(s,`w`),p))throw new G.ErrnoError(p);G.hashRemoveNode(l);try{s.node_ops.rename(l,c,a),l.parent=c}catch(e){throw e}finally{G.hashAddNode(l)}}},rmdir(e){var t=G.lookupPath(e,{parent:!0}).node,n=ct.basename(e),r=G.lookupNode(t,n),i=G.mayDelete(t,n,!0);if(i)throw new G.ErrnoError(i);if(!t.node_ops.rmdir)throw new G.ErrnoError(63);if(G.isMountpoint(r))throw new G.ErrnoError(10);t.node_ops.rmdir(t,n),G.destroyNode(r)},readdir(e){var t=G.lookupPath(e,{follow:!0}).node;return G.checkOpExists(t.node_ops.readdir,54)(t)},unlink(e){var t=G.lookupPath(e,{parent:!0}).node;if(!t)throw new G.ErrnoError(44);var n=ct.basename(e),r=G.lookupNode(t,n),i=G.mayDelete(t,n,!1);if(i)throw new G.ErrnoError(i);if(!t.node_ops.unlink)throw new G.ErrnoError(63);if(G.isMountpoint(r))throw new G.ErrnoError(10);t.node_ops.unlink(t,n),G.destroyNode(r)},readlink(e){var t=G.lookupPath(e).node;if(!t)throw new G.ErrnoError(44);if(!t.node_ops.readlink)throw new G.ErrnoError(28);return t.node_ops.readlink(t)},stat(e,t){var n=G.lookupPath(e,{follow:!t}).node;return G.checkOpExists(n.node_ops.getattr,63)(n)},fstat(e){var t=G.getStreamChecked(e),n=t.node,r=t.stream_ops.getattr,i=r?t:n;return r??=n.node_ops.getattr,G.checkOpExists(r,63),r(i)},lstat(e){return G.stat(e,!0)},doChmod(e,t,n,r){G.doSetAttr(e,t,{mode:n&4095|t.mode&-4096,ctime:Date.now(),dontFollow:r})},chmod(e,t,n){var r=typeof e==`string`?G.lookupPath(e,{follow:!n}).node:e;G.doChmod(null,r,t,n)},lchmod(e,t){G.chmod(e,t,!0)},fchmod(e,t){var n=G.getStreamChecked(e);G.doChmod(n,n.node,t,!1)},doChown(e,t,n){G.doSetAttr(e,t,{timestamp:Date.now(),dontFollow:n})},chown(e,t,n,r){var i=typeof e==`string`?G.lookupPath(e,{follow:!r}).node:e;G.doChown(null,i,r)},lchown(e,t,n){G.chown(e,t,n,!0)},fchown(e,t,n){var r=G.getStreamChecked(e);G.doChown(r,r.node,!1)},doTruncate(e,t,n){if(G.isDir(t.mode))throw new G.ErrnoError(31);if(!G.isFile(t.mode))throw new G.ErrnoError(28);var r=G.nodePermissions(t,`w`);if(r)throw new G.ErrnoError(r);G.doSetAttr(e,t,{size:n,timestamp:Date.now()})},truncate(e,t){if(t<0)throw new G.ErrnoError(28);var n=typeof e==`string`?G.lookupPath(e,{follow:!0}).node:e;G.doTruncate(null,n,t)},ftruncate(e,t){var n=G.getStreamChecked(e);if(t<0||!(n.flags&2097155))throw new G.ErrnoError(28);G.doTruncate(n,n.node,t)},utime(e,t,n){var r=G.lookupPath(e,{follow:!0}).node;G.checkOpExists(r.node_ops.setattr,63)(r,{atime:t,mtime:n})},open(e,t,n=438){if(e===``)throw new G.ErrnoError(44);t=typeof t==`string`?Ct(t):t,n=t&64?n&4095|32768:0;var i,a;if(typeof e==`object`)i=e;else{a=e.endsWith(`/`);var o=G.lookupPath(e,{follow:!(t&131072),noent_okay:!0});i=o.node,e=o.path}var s=!1;if(t&64){if(i){if(t&128)throw new G.ErrnoError(20)}else if(a)throw new G.ErrnoError(31);else i=G.mknod(e,n|511,0),s=!0}if(!i)throw new G.ErrnoError(44);if(G.isChrdev(i.mode)&&(t&=-513),t&65536&&!G.isDir(i.mode))throw new G.ErrnoError(54);if(!s){var c=G.mayOpen(i,t);if(c)throw new G.ErrnoError(c)}t&512&&!s&&G.truncate(i,0),t&=-131713;var l=G.createStream({node:i,path:G.getPath(i),flags:t,seekable:!0,position:0,stream_ops:i.stream_ops,ungotten:[],error:!1});return l.stream_ops.open&&l.stream_ops.open(l),s&&G.chmod(i,n&511),r.logReadFiles&&!(t&1)&&(e in G.readFiles||(G.readFiles[e]=1)),l},close(e){if(G.isClosed(e))throw new G.ErrnoError(8);e.getdents&&=null;try{e.stream_ops.close&&e.stream_ops.close(e)}catch(e){throw e}finally{G.closeStream(e.fd)}e.fd=null},isClosed(e){return e.fd===null},llseek(e,t,n){if(G.isClosed(e))throw new G.ErrnoError(8);if(!e.seekable||!e.stream_ops.llseek)throw new G.ErrnoError(70);if(n!=0&&n!=1&&n!=2)throw new G.ErrnoError(28);return e.position=e.stream_ops.llseek(e,t,n),e.ungotten=[],e.position},read(e,t,n,r,i){if(C(n>=0),r<0||i<0)throw new G.ErrnoError(28);if(G.isClosed(e)||(e.flags&2097155)==1)throw new G.ErrnoError(8);if(G.isDir(e.node.mode))throw new G.ErrnoError(31);if(!e.stream_ops.read)throw new G.ErrnoError(28);var a=i!==void 0;if(!a)i=e.position;else if(!e.seekable)throw new G.ErrnoError(70);var o=e.stream_ops.read(e,t,n,r,i);return a||(e.position+=o),o},write(e,t,n,r,i,a){if(C(n>=0),r<0||i<0)throw new G.ErrnoError(28);if(G.isClosed(e)||!(e.flags&2097155))throw new G.ErrnoError(8);if(G.isDir(e.node.mode))throw new G.ErrnoError(31);if(!e.stream_ops.write)throw new G.ErrnoError(28);e.seekable&&e.flags&1024&&G.llseek(e,0,2);var o=i!==void 0;if(!o)i=e.position;else if(!e.seekable)throw new G.ErrnoError(70);var s=e.stream_ops.write(e,t,n,r,i,a);return o||(e.position+=s),s},mmap(e,t,n,r,i){if(r&2&&!(i&2)&&(e.flags&2097155)!=2||(e.flags&2097155)==1)throw new G.ErrnoError(2);if(!e.stream_ops.mmap)throw new G.ErrnoError(43);if(!t)throw new G.ErrnoError(28);return e.stream_ops.mmap(e,t,n,r,i)},msync(e,t,n,r,i){return C(n>=0),e.stream_ops.msync?e.stream_ops.msync(e,t,n,r,i):0},ioctl(e,t,n){if(!e.stream_ops.ioctl)throw new G.ErrnoError(59);return e.stream_ops.ioctl(e,t,n)},readFile(e,t={}){if(t.flags=t.flags||0,t.encoding=t.encoding||`binary`,t.encoding!==`utf8`&&t.encoding!==`binary`)throw Error(`Invalid encoding type "${t.encoding}"`);var n=G.open(e,t.flags),r=G.stat(e).size,i=new Uint8Array(r);return G.read(n,i,0,r,0),t.encoding===`utf8`&&(i=Ue(i)),G.close(n),i},writeFile(e,t,n={}){n.flags=n.flags||577;var r=G.open(e,n.flags,n.mode);if(typeof t==`string`&&(t=new Uint8Array(ht(t,!0))),ArrayBuffer.isView(t))G.write(r,t,0,t.byteLength,void 0,n.canOwn);else throw Error(`Unsupported data type`);G.close(r)},cwd:()=>G.currentPath,chdir(e){var t=G.lookupPath(e,{follow:!0});if(t.node===null)throw new G.ErrnoError(44);if(!G.isDir(t.node.mode))throw new G.ErrnoError(54);var n=G.nodePermissions(t.node,`x`);if(n)throw new G.ErrnoError(n);G.currentPath=t.path},createDefaultDirectories(){G.mkdir(`/tmp`),G.mkdir(`/home`),G.mkdir(`/home/web_user`)},createDefaultDevices(){G.mkdir(`/dev`),G.registerDevice(G.makedev(1,3),{read:()=>0,write:(e,t,n,r,i)=>r,llseek:()=>0}),G.mkdev(`/dev/null`,G.makedev(1,3)),H.register(G.makedev(5,0),H.default_tty_ops),H.register(G.makedev(6,0),H.default_tty1_ops),G.mkdev(`/dev/tty`,G.makedev(5,0)),G.mkdev(`/dev/tty1`,G.makedev(6,0));var e=new Uint8Array(1024),t=0,n=()=>(t===0&&(ut(e),t=e.byteLength),e[--t]);G.createDevice(`/dev`,`random`,n),G.createDevice(`/dev`,`urandom`,n),G.mkdir(`/dev/shm`),G.mkdir(`/dev/shm/tmp`)},createSpecialDirectories(){G.mkdir(`/proc`);var e=G.mkdir(`/proc/self`);G.mkdir(`/proc/self/fd`),G.mount({mount(){var t=G.createNode(e,`fd`,16895,73);return t.stream_ops={llseek:U.stream_ops.llseek},t.node_ops={lookup(e,t){var n=+t,r=G.getStreamChecked(n),i={parent:null,mount:{mountpoint:`fake`},node_ops:{readlink:()=>r.path},id:n+1};return i.parent=i,i},readdir(){return Array.from(G.streams.entries()).filter(([e,t])=>t).map(([e,t])=>e.toString())}},t}},{},`/proc/self/fd`)},createStandardStreams(e,t,n){e?G.createDevice(`/dev`,`stdin`,e):G.symlink(`/dev/tty`,`/dev/stdin`),t?G.createDevice(`/dev`,`stdout`,null,t):G.symlink(`/dev/tty`,`/dev/stdout`),n?G.createDevice(`/dev`,`stderr`,null,n):G.symlink(`/dev/tty1`,`/dev/stderr`);var r=G.open(`/dev/stdin`,0),i=G.open(`/dev/stdout`,1),a=G.open(`/dev/stderr`,1);C(r.fd===0,`invalid handle for stdin (${r.fd})`),C(i.fd===1,`invalid handle for stdout (${i.fd})`),C(a.fd===2,`invalid handle for stderr (${a.fd})`)},staticInit(){G.nameTable=Array(4096),G.mount(U,{},`/`),G.createDefaultDirectories(),G.createDefaultDevices(),G.createSpecialDirectories(),G.filesystems={MEMFS:U}},init(e,t,n){C(!G.initialized,`FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)`),G.initialized=!0,e??=r.stdin,t??=r.stdout,n??=r.stderr,G.createStandardStreams(e,t,n)},quit(){G.initialized=!1,ra(0);for(var e of G.streams)e&&G.close(e)},findObject(e,t){var n=G.analyzePath(e,t);return n.exists?n.object:null},analyzePath(e,t){try{var n=G.lookupPath(e,{follow:!t});e=n.path}catch{}var r={isRoot:!1,exists:!1,error:0,name:null,path:null,object:null,parentExists:!1,parentPath:null,parentObject:null};try{var n=G.lookupPath(e,{parent:!0});r.parentExists=!0,r.parentPath=n.path,r.parentObject=n.node,r.name=ct.basename(e),n=G.lookupPath(e,{follow:!t}),r.exists=!0,r.path=n.path,r.object=n.node,r.name=n.node.name,r.isRoot=n.path===`/`}catch(e){r.error=e.errno}return r},createPath(e,t,n,r){e=typeof e==`string`?e:G.getPath(e);for(var i=t.split(`/`).reverse();i.length;){var a=i.pop();if(a){var o=ct.join2(e,a);try{G.mkdir(o)}catch(e){if(e.errno!=20)throw e}e=o}}return o},createFile(e,t,n,r,i){var a=ct.join2(typeof e==`string`?e:G.getPath(e),t),o=wt(r,i);return G.create(a,o)},createDataFile(e,t,n,r,i,a){var o=t;e&&(e=typeof e==`string`?e:G.getPath(e),o=t?ct.join2(e,t):e);var s=wt(r,i),c=G.create(o,s);if(n){if(typeof n==`string`){for(var l=Array(n.length),u=0,d=n.length;u<d;++u)l[u]=n.charCodeAt(u);n=l}G.chmod(c,s|146);var f=G.open(c,577);G.write(f,n,0,n.length,0,a),G.close(f),G.chmod(c,s)}},createDevice(e,t,n,r){var i=ct.join2(typeof e==`string`?e:G.getPath(e),t),a=wt(!!n,!!r);G.createDevice.major??=64;var o=G.makedev(G.createDevice.major++,0);return G.registerDevice(o,{open(e){e.seekable=!1},close(e){r?.buffer?.length&&r(10)},read(e,t,r,i,a){for(var o=0,s=0;s<i;s++){var c;try{c=n()}catch{throw new G.ErrnoError(29)}if(c===void 0&&o===0)throw new G.ErrnoError(6);if(c==null)break;o++,t[r+s]=c}return o&&(e.node.atime=Date.now()),o},write(e,t,n,i,a){for(var o=0;o<i;o++)try{r(t[n+o])}catch{throw new G.ErrnoError(29)}return i&&(e.node.mtime=e.node.ctime=Date.now()),o}}),G.mkdev(i,a,o)},forceLoadFile(e){if(e.isDevice||e.isFolder||e.link||e.contents)return!0;if(typeof XMLHttpRequest<`u`)throw Error(`Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.`);try{e.contents=h(e.url),e.usedBytes=e.contents.length}catch{throw new G.ErrnoError(29)}},createLazyFile(e,t,n,r,i){class o{lengthKnown=!1;chunks=[];get(e){if(!(e>this.length-1||e<0)){var t=e%this.chunkSize,n=e/this.chunkSize|0;return this.getter(n)[t]}}setDataGetter(e){this.getter=e}cacheLength(){var e=new XMLHttpRequest;if(e.open(`HEAD`,n,!1),e.send(null),!(e.status>=200&&e.status<300||e.status===304))throw Error(`Couldn't load `+n+`. Status: `+e.status);var t=Number(e.getResponseHeader(`Content-length`)),r,i=(r=e.getResponseHeader(`Accept-Ranges`))&&r===`bytes`,a=(r=e.getResponseHeader(`Content-Encoding`))&&r===`gzip`,o=1048576;i||(o=t);var s=(e,r)=>{if(e>r)throw Error(`invalid range (`+e+`, `+r+`) or no bytes requested!`);if(r>t-1)throw Error(`only `+t+` bytes available! programmer error!`);var i=new XMLHttpRequest;if(i.open(`GET`,n,!1),t!==o&&i.setRequestHeader(`Range`,`bytes=`+e+`-`+r),i.responseType=`arraybuffer`,i.overrideMimeType&&i.overrideMimeType(`text/plain; charset=x-user-defined`),i.send(null),!(i.status>=200&&i.status<300||i.status===304))throw Error(`Couldn't load `+n+`. Status: `+i.status);return i.response===void 0?ht(i.responseText||``,!0):new Uint8Array(i.response||[])},c=this;c.setDataGetter(e=>{var n=e*o,r=(e+1)*o-1;if(r=Math.min(r,t-1),c.chunks[e]===void 0&&(c.chunks[e]=s(n,r)),c.chunks[e]===void 0)throw Error(`doXHR failed!`);return c.chunks[e]}),(a||!t)&&(o=t=1,t=this.getter(0).length,o=t,y(`LazyFiles on gzip forces download of the whole file when length is accessed`)),this._length=t,this._chunkSize=o,this.lengthKnown=!0}get length(){return this.lengthKnown||this.cacheLength(),this._length}get chunkSize(){return this.lengthKnown||this.cacheLength(),this._chunkSize}}if(typeof XMLHttpRequest<`u`){if(!a)throw`Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc`;var s={isDevice:!1,contents:new o}}else var s={isDevice:!1,url:n};var c=G.createFile(e,t,s,r,i);s.contents?c.contents=s.contents:s.url&&(c.contents=null,c.url=s.url),Object.defineProperties(c,{usedBytes:{get:function(){return this.contents.length}}});var l={};Object.keys(c.stream_ops).forEach(e=>{var t=c.stream_ops[e];l[e]=(...e)=>(G.forceLoadFile(c),t(...e))});function u(e,t,n,r,i){var a=e.node.contents;if(i>=a.length)return 0;var o=Math.min(a.length-i,r);if(C(o>=0),a.slice)for(var s=0;s<o;s++)t[n+s]=a[i+s];else for(var s=0;s<o;s++)t[n+s]=a.get(i+s);return o}return l.read=(e,t,n,r,i)=>(G.forceLoadFile(c),u(e,t,n,r,i)),l.mmap=(e,t,n,r,i)=>{G.forceLoadFile(c);var a=_t(t);if(!a)throw new G.ErrnoError(48);return u(e,ce,a,t,n),{ptr:a,allocated:!0}},c.stream_ops=l,c},absolutePath(){Ce(`FS.absolutePath has been removed; use PATH_FS.resolve instead`)},createFolder(){Ce(`FS.createFolder has been removed; use FS.mkdir instead`)},createLink(){Ce(`FS.createLink has been removed; use FS.symlink instead`)},joinPath(){Ce(`FS.joinPath has been removed; use PATH.join instead`)},mmapAlloc(){Ce(`FS.mmapAlloc has been replaced by the top level function mmapAlloc`)},standardizePath(){Ce(`FS.standardizePath has been removed; use PATH.normalize instead`)}},Dt={DEFAULT_POLLMASK:5,calculateAt(e,t,n){if(ct.isAbs(t))return t;var r=e===-100?G.cwd():Dt.getStreamFromFD(e).path;if(t.length==0){if(!n)throw new G.ErrnoError(44);return r}return r+`/`+t},writeStat(e,t){N[e>>2]=t.dev,N[e+4>>2]=t.mode,P[e+8>>2]=t.nlink,N[e+12>>2]=t.uid,N[e+16>>2]=t.gid,N[e+20>>2]=t.rdev,me[e+24>>3]=BigInt(t.size),N[e+32>>2]=4096,N[e+36>>2]=t.blocks;var n=t.atime.getTime(),r=t.mtime.getTime(),i=t.ctime.getTime();return me[e+40>>3]=BigInt(Math.floor(n/1e3)),P[e+48>>2]=n%1e3*1e3*1e3,me[e+56>>3]=BigInt(Math.floor(r/1e3)),P[e+64>>2]=r%1e3*1e3*1e3,me[e+72>>3]=BigInt(Math.floor(i/1e3)),P[e+80>>2]=i%1e3*1e3*1e3,me[e+88>>3]=BigInt(t.ino),0},writeStatFs(e,t){N[e+4>>2]=t.bsize,N[e+40>>2]=t.bsize,N[e+8>>2]=t.blocks,N[e+12>>2]=t.bfree,N[e+16>>2]=t.bavail,N[e+20>>2]=t.files,N[e+24>>2]=t.ffree,N[e+28>>2]=t.fsid,N[e+44>>2]=t.flags,N[e+36>>2]=t.namelen},doMsync(e,t,n,r,i){if(!G.isFile(t.node.mode))throw new G.ErrnoError(43);if(r&2)return 0;var a=le.slice(e,e+n);G.msync(t,a,i,n,r)},getStreamFromFD(e){return G.getStreamChecked(e)},varargs:void 0,getStr(e){return We(e)}};function Ot(e,t,n){try{var r=Dt.getStreamFromFD(e);if(C(!n),r.fd===t)return-28;if(t<0||t>=G.MAX_OPEN_FDS)return-8;var i=G.getStream(t);return i&&G.close(i),G.dupStream(r,t).fd}catch(e){if(G===void 0||e.name!==`ErrnoError`)throw e;return-e.errno}}var K=()=>{C(Dt.varargs!=null);var e=N[Dt.varargs>>2];return Dt.varargs+=4,e},kt=K;function At(e,t,n){Dt.varargs=n;try{var r=Dt.getStreamFromFD(e);switch(t){case 0:var i=K();if(i<0)return-28;for(;G.streams[i];)i++;return G.dupStream(r,i).fd;case 1:case 2:return 0;case 3:return r.flags;case 4:var i=K();return r.flags|=i,0;case 12:var i=kt(),a=0;return ue[i+a>>1]=2,0;case 13:case 14:return 0}return-28}catch(e){if(G===void 0||e.name!==`ErrnoError`)throw e;return-e.errno}}function jt(e,t){try{return Dt.writeStat(t,G.fstat(e))}catch(e){if(G===void 0||e.name!==`ErrnoError`)throw e;return-e.errno}}function Mt(e,t,n){Dt.varargs=n;try{var r=Dt.getStreamFromFD(e);switch(t){case 21509:return r.tty?0:-59;case 21505:if(!r.tty)return-59;if(r.tty.ops.ioctl_tcgets){var i=r.tty.ops.ioctl_tcgets(r),a=kt();N[a>>2]=i.c_iflag||0,N[a+4>>2]=i.c_oflag||0,N[a+8>>2]=i.c_cflag||0,N[a+12>>2]=i.c_lflag||0;for(var o=0;o<32;o++)ce[a+o+17]=i.c_cc[o]||0;return 0}return 0;case 21510:case 21511:case 21512:return r.tty?0:-59;case 21506:case 21507:case 21508:if(!r.tty)return-59;if(r.tty.ops.ioctl_tcsets){for(var a=kt(),s=N[a>>2],c=N[a+4>>2],l=N[a+8>>2],u=N[a+12>>2],d=[],o=0;o<32;o++)d.push(ce[a+o+17]);return r.tty.ops.ioctl_tcsets(r.tty,t,{c_iflag:s,c_oflag:c,c_cflag:l,c_lflag:u,c_cc:d})}return 0;case 21519:if(!r.tty)return-59;var a=kt();return N[a>>2]=0,0;case 21520:return r.tty?-28:-59;case 21531:var a=kt();return G.ioctl(r,t,a);case 21523:if(!r.tty)return-59;if(r.tty.ops.ioctl_tiocgwinsz){var f=r.tty.ops.ioctl_tiocgwinsz(r.tty),a=kt();ue[a>>1]=f[0],ue[a+2>>1]=f[1]}return 0;case 21524:return r.tty?0:-59;case 21515:return r.tty?0:-59;default:return-28}}catch(e){if(G===void 0||e.name!==`ErrnoError`)throw e;return-e.errno}}function Nt(e,t){try{return e=Dt.getStr(e),Dt.writeStat(t,G.lstat(e))}catch(e){if(G===void 0||e.name!==`ErrnoError`)throw e;return-e.errno}}function Pt(e,t,n,r){try{t=Dt.getStr(t);var i=r&256,a=r&4096;return r&=-6401,C(!r,`unknown flags in __syscall_newfstatat: ${r}`),t=Dt.calculateAt(e,t,a),Dt.writeStat(n,i?G.lstat(t):G.stat(t))}catch(e){if(G===void 0||e.name!==`ErrnoError`)throw e;return-e.errno}}function Ft(e,t,n,r){Dt.varargs=r;try{t=Dt.getStr(t),t=Dt.calculateAt(e,t);var i=r?K():0;return G.open(t,n,i).fd}catch(e){if(G===void 0||e.name!==`ErrnoError`)throw e;return-e.errno}}function It(e,t){try{return e=Dt.getStr(e),Dt.writeStat(t,G.stat(e))}catch(e){if(G===void 0||e.name!==`ErrnoError`)throw e;return-e.errno}}var Lt=()=>Ce(`native code called abort()`),Rt=e=>{for(var t=``;;){var n=le[e++];if(!n)return t;t+=String.fromCharCode(n)}},zt={},Bt={},Vt={},Ht=class extends Error{constructor(e){super(e),this.name=`BindingError`}},q=e=>{throw new Ht(e)};function Ut(e,t,n={}){var r=t.name;if(e||q(`type "${r}" must have a positive integer typeid pointer`),Bt.hasOwnProperty(e)){if(n.ignoreDuplicateRegistrations)return;q(`Cannot register type '${r}' twice`)}if(Bt[e]=t,delete Vt[e],zt.hasOwnProperty(e)){var i=zt[e];delete zt[e],i.forEach(e=>e())}}function Wt(e,t,n={}){if(t.argPackAdvance===void 0)throw TypeError(`registerType registeredInstance requires argPackAdvance`);return Ut(e,t,n)}var Gt=(e,t,n)=>{switch(t){case 1:return n?e=>ce[e]:e=>le[e];case 2:return n?e=>ue[e>>1]:e=>de[e>>1];case 4:return n?e=>N[e>>2]:e=>P[e>>2];case 8:return n?e=>me[e>>3]:e=>he[e>>3];default:throw TypeError(`invalid integer width (${t}): ${e}`)}},Kt=e=>{if(e===null)return`null`;var t=typeof e;return t===`object`||t===`array`||t===`function`?e.toString():``+e},qt=(e,t,n,r)=>{if(t<n||t>r)throw TypeError(`Passing a number "${Kt(t)}" from JS side to C/C++ side to an argument of type "${e}", which is outside the valid range [${n}, ${r}]!`)},Jt=(e,t,n,r,i)=>{t=Rt(t);let a=r===0n,o=e=>e;if(a){let e=n*8;o=t=>BigInt.asUintN(e,t),i=o(i)}Wt(e,{name:t,fromWireType:o,toWireType:(e,n)=>{if(typeof n==`number`)n=BigInt(n);else if(typeof n!=`bigint`)throw TypeError(`Cannot convert "${Kt(n)}" to ${this.name}`);return qt(t,n,r,i),n},argPackAdvance:Yt,readValueFromPointer:Gt(t,n,!a),destructorFunction:null})},Yt=8,Xt=(e,t,n,r)=>{t=Rt(t),Wt(e,{name:t,fromWireType:function(e){return!!e},toWireType:function(e,t){return t?n:r},argPackAdvance:Yt,readValueFromPointer:function(e){return this.fromWireType(le[e])},destructorFunction:null})},Zt=e=>({count:e.count,deleteScheduled:e.deleteScheduled,preservePointerOnDelete:e.preservePointerOnDelete,ptr:e.ptr,ptrType:e.ptrType,smartPtr:e.smartPtr,smartPtrType:e.smartPtrType}),Qt=e=>{function t(e){return e.$$.ptrType.registeredClass.name}q(t(e)+` instance already deleted`)},$t=!1,en=e=>{},tn=e=>{e.smartPtr?e.smartPtrType.rawDestructor(e.smartPtr):e.ptrType.registeredClass.rawDestructor(e.ptr)},nn=e=>{--e.count.value,e.count.value===0&&tn(e)},rn=(e,t,n)=>{if(t===n)return e;if(n.baseClass===void 0)return null;var r=rn(e,t,n.baseClass);return r===null?null:n.downcast(r)},an={},on={},sn=(e,t)=>{for(t===void 0&&q(`ptr should not be undefined`);e.baseClass;)t=e.upcast(t),e=e.baseClass;return t},cn=(e,t)=>(t=sn(e,t),on[t]),ln=class extends Error{constructor(e){super(e),this.name=`InternalError`}},un=e=>{throw new ln(e)},dn=(e,t)=>(t.ptrType&&t.ptr||un(`makeClassHandle requires ptr and ptrType`),!!t.smartPtrType!=!!t.smartPtr&&un(`Both smartPtrType and smartPtr must be specified`),t.count={value:1},pn(Object.create(e,{$$:{value:t,writable:!0}})));function fn(e){var t=this.getPointee(e);if(!t)return this.destructor(e),null;var n=cn(this.registeredClass,t);if(n!==void 0){if(n.$$.count.value===0)return n.$$.ptr=t,n.$$.smartPtr=e,n.clone();var r=n.clone();return this.destructor(e),r}function i(){return this.isSmartPointer?dn(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:t,smartPtrType:this,smartPtr:e}):dn(this.registeredClass.instancePrototype,{ptrType:this,ptr:e})}var a=an[this.registeredClass.getActualType(t)];if(!a)return i.call(this);var o=this.isConst?a.constPointerType:a.pointerType,s=rn(t,this.registeredClass,o.registeredClass);return s===null?i.call(this):this.isSmartPointer?dn(o.registeredClass.instancePrototype,{ptrType:o,ptr:s,smartPtrType:this,smartPtr:e}):dn(o.registeredClass.instancePrototype,{ptrType:o,ptr:s})}var pn=e=>typeof FinalizationRegistry>`u`?(pn=e=>e,e):($t=new FinalizationRegistry(e=>{console.warn(e.leakWarning),nn(e.$$)}),pn=e=>{var t=e.$$;if(t.smartPtr){var n={$$:t},r=t.ptrType.registeredClass,i=Error(`Embind found a leaked C++ instance ${r.name} <${Be(t.ptr)}>.\nWe'll free it automatically in this case, but this functionality is not reliable across various environments.
Make sure to invoke .delete() manually once you're done with the instance instead.
Originally allocated`);`captureStackTrace`in Error&&Error.captureStackTrace(i,fn),n.leakWarning=i.stack.replace(/^Error: /,``),$t.register(e,n,e)}return e},en=e=>$t.unregister(e),pn(e)),mn=[],hn=()=>{for(;mn.length;){var e=mn.pop();e.$$.deleteScheduled=!1,e.delete()}},gn,_n=()=>{let e=vn.prototype;Object.assign(e,{isAliasOf(e){if(!(this instanceof vn)||!(e instanceof vn))return!1;var t=this.$$.ptrType.registeredClass,n=this.$$.ptr;e.$$=e.$$;for(var r=e.$$.ptrType.registeredClass,i=e.$$.ptr;t.baseClass;)n=t.upcast(n),t=t.baseClass;for(;r.baseClass;)i=r.upcast(i),r=r.baseClass;return t===r&&n===i},clone(){if(this.$$.ptr||Qt(this),this.$$.preservePointerOnDelete)return this.$$.count.value+=1,this;var e=pn(Object.create(Object.getPrototypeOf(this),{$$:{value:Zt(this.$$)}}));return e.$$.count.value+=1,e.$$.deleteScheduled=!1,e},delete(){this.$$.ptr||Qt(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&q(`Object already scheduled for deletion`),en(this),nn(this.$$),this.$$.preservePointerOnDelete||(this.$$.smartPtr=void 0,this.$$.ptr=void 0)},isDeleted(){return!this.$$.ptr},deleteLater(){return this.$$.ptr||Qt(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&q(`Object already scheduled for deletion`),mn.push(this),mn.length===1&&gn&&gn(hn),this.$$.deleteScheduled=!0,this}});let t=Symbol.dispose;t&&(e[t]=e.delete)};function vn(){}var yn=(e,t)=>Object.defineProperty(t,"name",{value:e}),bn=(e,t,n)=>{if(e[t].overloadTable===void 0){var r=e[t];e[t]=function(...r){return e[t].overloadTable.hasOwnProperty(r.length)||q(`Function '${n}' called with an invalid number of arguments (${r.length}) - expects one of (${e[t].overloadTable})!`),e[t].overloadTable[r.length].apply(this,r)},e[t].overloadTable=[],e[t].overloadTable[r.argCount]=r}},xn=(e,t,n)=>{r.hasOwnProperty(e)?((n===void 0||r[e].overloadTable!==void 0&&r[e].overloadTable[n]!==void 0)&&q(`Cannot register public name '${e}' twice`),bn(r,e,e),r[e].overloadTable.hasOwnProperty(n)&&q(`Cannot register multiple overloads of a function with the same number of arguments (${n})!`),r[e].overloadTable[n]=t):(r[e]=t,r[e].argCount=n)},Sn=48,Cn=57,wn=e=>{C(typeof e==`string`),e=e.replace(/[^a-zA-Z0-9_]/g,`$`);var t=e.charCodeAt(0);return t>=Sn&&t<=Cn?`_${e}`:e};function Tn(e,t,n,r,i,a,o,s){this.name=e,this.constructor=t,this.instancePrototype=n,this.rawDestructor=r,this.baseClass=i,this.getActualType=a,this.upcast=o,this.downcast=s,this.pureVirtualFunctions=[]}var En=(e,t,n)=>{for(;t!==n;)t.upcast||q(`Expected null or instance of ${n.name}, got an instance of ${t.name}`),e=t.upcast(e),t=t.baseClass;return e};function Dn(e,t){if(t===null)return this.isReference&&q(`null is not a valid ${this.name}`),0;t.$$||q(`Cannot pass "${Kt(t)}" as a ${this.name}`),t.$$.ptr||q(`Cannot pass deleted object as a pointer of type ${this.name}`);var n=t.$$.ptrType.registeredClass;return En(t.$$.ptr,n,this.registeredClass)}function On(e,t){var n;if(t===null)return this.isReference&&q(`null is not a valid ${this.name}`),this.isSmartPointer?(n=this.rawConstructor(),e!==null&&e.push(this.rawDestructor,n),n):0;t&&t.$$||q(`Cannot pass "${Kt(t)}" as a ${this.name}`),t.$$.ptr||q(`Cannot pass deleted object as a pointer of type ${this.name}`),!this.isConst&&t.$$.ptrType.isConst&&q(`Cannot convert argument of type ${t.$$.smartPtrType?t.$$.smartPtrType.name:t.$$.ptrType.name} to parameter type ${this.name}`);var r=t.$$.ptrType.registeredClass;if(n=En(t.$$.ptr,r,this.registeredClass),this.isSmartPointer)switch(t.$$.smartPtr===void 0&&q(`Passing raw pointer to smart pointer is illegal`),this.sharingPolicy){case 0:t.$$.smartPtrType===this?n=t.$$.smartPtr:q(`Cannot convert argument of type ${t.$$.smartPtrType?t.$$.smartPtrType.name:t.$$.ptrType.name} to parameter type ${this.name}`);break;case 1:n=t.$$.smartPtr;break;case 2:if(t.$$.smartPtrType===this)n=t.$$.smartPtr;else{var i=t.clone();n=this.rawShare(n,ar.toHandle(()=>i.delete())),e!==null&&e.push(this.rawDestructor,n)}break;default:q(`Unsupporting sharing policy`)}return n}function kn(e,t){if(t===null)return this.isReference&&q(`null is not a valid ${this.name}`),0;t.$$||q(`Cannot pass "${Kt(t)}" as a ${this.name}`),t.$$.ptr||q(`Cannot pass deleted object as a pointer of type ${this.name}`),t.$$.ptrType.isConst&&q(`Cannot convert argument of type ${t.$$.ptrType.name} to parameter type ${this.name}`);var n=t.$$.ptrType.registeredClass;return En(t.$$.ptr,n,this.registeredClass)}function An(e){return this.fromWireType(P[e>>2])}var jn=()=>{Object.assign(Mn.prototype,{getPointee(e){return this.rawGetPointee&&(e=this.rawGetPointee(e)),e},destructor(e){this.rawDestructor?.(e)},argPackAdvance:Yt,readValueFromPointer:An,fromWireType:fn})};function Mn(e,t,n,r,i,a,o,s,c,l,u){this.name=e,this.registeredClass=t,this.isReference=n,this.isConst=r,this.isSmartPointer=i,this.pointeeType=a,this.sharingPolicy=o,this.rawGetPointee=s,this.rawConstructor=c,this.rawShare=l,this.rawDestructor=u,!i&&t.baseClass===void 0?r?(this.toWireType=Dn,this.destructorFunction=null):(this.toWireType=kn,this.destructorFunction=null):this.toWireType=On}var Nn=(e,t,n)=>{r.hasOwnProperty(e)||un(`Replacing nonexistent public symbol`),r[e].overloadTable!==void 0&&n!==void 0?r[e].overloadTable[n]=t:(r[e]=t,r[e].argCount=n)},Pn=[],Fn,J=e=>{var t=Pn[e];return t||(Pn[e]=t=Fn.get(e)),C(Fn.get(e)==t,`JavaScript-side Wasm function table mirror is out of date!`),t},In=(e,t,n=!1)=>{C(!n,`Async bindings are only supported with JSPI.`),e=Rt(e);function r(){return J(t)}var i=r();return typeof i!=`function`&&q(`unknown function pointer with signature ${e}: ${t}`),i};class Ln extends Error{}var Rn=e=>{var t=ta(e),n=Rt(t);return ia(t),n},zn=(e,t)=>{var n=[],r={};function i(e){r[e]||Bt[e]||(Vt[e]?Vt[e].forEach(i):(n.push(e),r[e]=!0))}throw t.forEach(i),new Ln(`${e}: `+n.map(Rn).join([`, `]))},Bn=(e,t,n)=>{e.forEach(e=>Vt[e]=t);function r(t){var r=n(t);r.length!==e.length&&un(`Mismatched type converter count`);for(var i=0;i<e.length;++i)Wt(e[i],r[i])}var i=Array(t.length),a=[],o=0;t.forEach((e,t)=>{Bt.hasOwnProperty(e)?i[t]=Bt[e]:(a.push(e),zt.hasOwnProperty(e)||(zt[e]=[]),zt[e].push(()=>{i[t]=Bt[e],++o,o===a.length&&r(i)}))}),a.length===0&&r(i)},Vn=(e,t,n,r,i,a,o,s,c,l,u,d,f)=>{u=Rt(u),a=In(i,a),s&&=In(o,s),l&&=In(c,l),f=In(d,f);var p=wn(u);xn(p,function(){zn(`Cannot construct ${u} due to unbound types`,[r])}),Bn([e,t,n],r?[r]:[],t=>{t=t[0];var n,i;r?(n=t.registeredClass,i=n.instancePrototype):i=vn.prototype;var o=yn(u,function(...e){if(Object.getPrototypeOf(this)!==c)throw new Ht(`Use 'new' to construct ${u}`);if(d.constructor_body===void 0)throw new Ht(`${u} has no accessible constructor`);var t=d.constructor_body[e.length];if(t===void 0)throw new Ht(`Tried to invoke ctor of ${u} with invalid number of parameters (${e.length}) - expected (${Object.keys(d.constructor_body).toString()}) parameters instead!`);return t.apply(this,e)}),c=Object.create(i,{constructor:{value:o}});o.prototype=c;var d=new Tn(u,o,c,f,n,a,s,l);d.baseClass&&(d.baseClass.__derivedClasses??=[],d.baseClass.__derivedClasses.push(d));var m=new Mn(u,d,!0,!1,!1),h=new Mn(u+`*`,d,!1,!1,!1),g=new Mn(u+` const*`,d,!1,!0,!1);return an[e]={pointerType:h,constPointerType:g},Nn(p,o),[m,h,g]})},Hn=e=>{for(;e.length;){var t=e.pop();e.pop()(t)}};function Un(e){for(var t=1;t<e.length;++t)if(e[t]!==null&&e[t].destructorFunction===void 0)return!0;return!1}function Wn(e,t,n,r,i){(e<t||e>n)&&i(`function ${r} called with ${e} arguments, expected ${t==n?t:`${t} to ${n}`}`)}function Gn(e,t,n,r){var i=Un(e),a=e.length-2,o=[],s=[`fn`];t&&s.push(`thisWired`);for(var c=0;c<a;++c)o.push(`arg${c}`),s.push(`arg${c}Wired`);o=o.join(`,`),s=s.join(`,`);var l=`return function (${o}) {\n`;l+=`checkArgCount(arguments.length, minArgs, maxArgs, humanName, throwBindingError);
`,i&&(l+=`var destructors = [];
`);var u=i?`destructors`:`null`,d=[`humanName`,`throwBindingError`,`invoker`,`fn`,`runDestructors`,`retType`,`classParam`];t&&(l+=`var thisWired = classParam['toWireType'](${u}, this);\n`);for(var c=0;c<a;++c)l+=`var arg${c}Wired = argType${c}['toWireType'](${u}, arg${c});\n`,d.push(`argType${c}`);if(l+=(n||r?`var rv = `:``)+`invoker(${s});\n`,i)l+=`runDestructors(destructors);
`;else for(var c=t?1:2;c<e.length;++c){var f=c===1?`thisWired`:`arg`+(c-2)+`Wired`;e[c].destructorFunction!==null&&(l+=`${f}_dtor(${f});\n`,d.push(`${f}_dtor`))}return n&&(l+=`var ret = retType['fromWireType'](rv);
return ret;
`),l+=`}
`,d.push(`checkArgCount`,`minArgs`,`maxArgs`),l=`if (arguments.length !== ${d.length}){ throw new Error(humanName + "Expected ${d.length} closure arguments " + arguments.length + " given."); }\n${l}`,[d,l]}function Kn(e){for(var t=e.length-2,n=e.length-1;n>=2&&e[n].optional;--n)t--;return t}function qn(e,t,n,r,i,a){var o=t.length;o<2&&q(`argTypes array size mismatch! Must at least get return value and 'this' types!`),C(!a,`Async bindings are only supported with JSPI.`);for(var s=t[1]!==null&&n!==null,c=Un(t),l=t[0].name!==`void`,u=o-2,d=Kn(t),f=[e,q,r,i,Hn,t[0],t[1]],p=0;p<o-2;++p)f.push(t[p+2]);if(!c)for(var p=s?1:2;p<t.length;++p)t[p].destructorFunction!==null&&f.push(t[p].destructorFunction);f.push(Wn,d,u);let[m,h]=Gn(t,s,l,a);return yn(e,Function(...m,h)(...f))}var Jn=(e,t)=>{for(var n=[],r=0;r<e;r++)n.push(P[t+r*4>>2]);return n},Yn=e=>{e=e.trim();let t=e.indexOf(`(`);return t===-1?e:(C(e.endsWith(`)`),`Parentheses for argument names should match.`),e.slice(0,t))},Xn=(e,t,n,r,i,a,o,s,c)=>{var l=Jn(n,r);t=Rt(t),t=Yn(t),a=In(i,a,s),Bn([],[e],e=>{e=e[0];var r=`${e.name}.${t}`;function i(){zn(`Cannot call ${r} due to unbound types`,l)}t.startsWith(`@@`)&&(t=Symbol[t.substring(2)]);var c=e.registeredClass.constructor;return c[t]===void 0?(i.argCount=n-1,c[t]=i):(bn(c,t,r),c[t].overloadTable[n-1]=i),Bn([],l,i=>{var l=qn(r,[i[0],null].concat(i.slice(1)),null,a,o,s);if(c[t].overloadTable===void 0?(l.argCount=n-1,c[t]=l):c[t].overloadTable[n-1]=l,e.registeredClass.__derivedClasses)for(let n of e.registeredClass.__derivedClasses)n.constructor.hasOwnProperty(t)||(n.constructor[t]=l);return[]}),[]})},Zn=(e,t,n,r,i,a)=>{C(t>0);var o=Jn(t,n);i=In(r,i),Bn([],[e],e=>{e=e[0];var n=`constructor ${e.name}`;if(e.registeredClass.constructor_body===void 0&&(e.registeredClass.constructor_body=[]),e.registeredClass.constructor_body[t-1]!==void 0)throw new Ht(`Cannot register multiple constructors with identical number of parameters (${t-1}) for class '${e.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);return e.registeredClass.constructor_body[t-1]=()=>{zn(`Cannot construct ${e.name} due to unbound types`,o)},Bn([],o,r=>(r.splice(1,0,null),e.registeredClass.constructor_body[t-1]=qn(n,r,null,i,a),[])),[]})},Qn=(e,t,n,r,i,a,o,s,c,l)=>{var u=Jn(n,r);t=Rt(t),t=Yn(t),a=In(i,a,c),Bn([],[e],e=>{e=e[0];var r=`${e.name}.${t}`;t.startsWith(`@@`)&&(t=Symbol[t.substring(2)]),s&&e.registeredClass.pureVirtualFunctions.push(t);function i(){zn(`Cannot call ${r} due to unbound types`,u)}var l=e.registeredClass.instancePrototype,d=l[t];return d===void 0||d.overloadTable===void 0&&d.className!==e.name&&d.argCount===n-2?(i.argCount=n-2,i.className=e.name,l[t]=i):(bn(l,t,r),l[t].overloadTable[n-2]=i),Bn([],u,i=>{var s=qn(r,i,e,a,o,c);return l[t].overloadTable===void 0?(s.argCount=n-2,l[t]=s):l[t].overloadTable[n-2]=s,[]}),[]})},$n=(e,t,n)=>(e instanceof Object||q(`${n} with invalid "this": ${e}`),e instanceof t.registeredClass.constructor||q(`${n} incompatible with "this" of type ${e.constructor.name}`),e.$$.ptr||q(`cannot call emscripten binding method ${n} on deleted object`),En(e.$$.ptr,e.$$.ptrType.registeredClass,t.registeredClass)),er=(e,t,n,r,i,a,o,s,c,l)=>{t=Rt(t),i=In(r,i),Bn([],[e],e=>{e=e[0];var r=`${e.name}.${t}`,u={get(){zn(`Cannot access ${r} due to unbound types`,[n,o])},enumerable:!0,configurable:!0};return u.set=c?()=>zn(`Cannot access ${r} due to unbound types`,[n,o]):e=>q(r+` is a read-only property`),Object.defineProperty(e.registeredClass.instancePrototype,t,u),Bn([],c?[n,o]:[n],n=>{var o=n[0],u={get(){var t=$n(this,e,r+` getter`);return o.fromWireType(i(a,t))},enumerable:!0};if(c){c=In(s,c);var d=n[1];u.set=function(t){var n=$n(this,e,r+` setter`),i=[];c(l,n,d.toWireType(i,t)),Hn(i)}}return Object.defineProperty(e.registeredClass.instancePrototype,t,u),[]}),[]})},tr=(e,t,n)=>{e=Rt(e),Bn([],[t],t=>(t=t[0],r[e]=t.fromWireType(n),[]))},nr=[],rr=[0,1,,1,null,1,!0,1,!1,1],ir=e=>{e>9&&--rr[e+1]===0&&(C(rr[e]!==void 0,`Decref for unallocated handle.`),rr[e]=void 0,nr.push(e))},ar={toValue:e=>(e||q(`Cannot use deleted val. handle = ${e}`),C(e===2||rr[e]!==void 0&&e%2==0,`invalid handle: ${e}`),rr[e]),toHandle:e=>{switch(e){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:{let t=nr.pop()||rr.length;return rr[t]=e,rr[t+1]=1,t}}}},or={name:`emscripten::val`,fromWireType:e=>{var t=ar.toValue(e);return ir(e),t},toWireType:(e,t)=>ar.toHandle(t),argPackAdvance:Yt,readValueFromPointer:An,destructorFunction:null},sr=e=>Wt(e,or),cr=(e,t,n)=>{switch(t){case 1:return n?function(e){return this.fromWireType(ce[e])}:function(e){return this.fromWireType(le[e])};case 2:return n?function(e){return this.fromWireType(ue[e>>1])}:function(e){return this.fromWireType(de[e>>1])};case 4:return n?function(e){return this.fromWireType(N[e>>2])}:function(e){return this.fromWireType(P[e>>2])};default:throw TypeError(`invalid integer width (${t}): ${e}`)}},lr=(e,t,n,r)=>{t=Rt(t);function i(){}i.values={},Wt(e,{name:t,constructor:i,fromWireType:function(e){return this.constructor.values[e]},toWireType:(e,t)=>t.value,argPackAdvance:Yt,readValueFromPointer:cr(t,n,r),destructorFunction:null}),xn(t,i)},ur=(e,t)=>{var n=Bt[e];return n===void 0&&q(`${t} has unknown type ${Rn(e)}`),n},dr=(e,t,n)=>{var r=ur(e,`enum`);t=Rt(t);var i=r.constructor,a=Object.create(r.constructor.prototype,{value:{value:n},constructor:{value:yn(`${r.name}_${t}`,function(){})}});i.values[n]=a,i[t]=a},fr=(e,t)=>{switch(t){case 4:return function(e){return this.fromWireType(fe[e>>2])};case 8:return function(e){return this.fromWireType(pe[e>>3])};default:throw TypeError(`invalid float width (${t}): ${e}`)}},pr=(e,t,n)=>{t=Rt(t),Wt(e,{name:t,fromWireType:e=>e,toWireType:(e,t)=>{if(typeof t!=`number`&&typeof t!=`boolean`)throw TypeError(`Cannot convert ${Kt(t)} to ${this.name}`);return t},argPackAdvance:Yt,readValueFromPointer:fr(t,n),destructorFunction:null})},mr=(e,t,n,r,i,a,o,s)=>{var c=Jn(t,n);e=Rt(e),e=Yn(e),i=In(r,i,o),xn(e,function(){zn(`Cannot call ${e} due to unbound types`,c)},t-1),Bn([],c,n=>{var r=[n[0],null].concat(n.slice(1));return Nn(e,qn(e,r,null,i,a,o),t-1),[]})},hr=(e,t,n,r,i)=>{t=Rt(t);let a=r===0,o=e=>e;if(a){var s=32-8*n;o=e=>e<<s>>>s,i=o(i)}Wt(e,{name:t,fromWireType:o,toWireType:(e,n)=>{if(typeof n!=`number`&&typeof n!=`boolean`)throw TypeError(`Cannot convert "${Kt(n)}" to ${t}`);return qt(t,n,r,i),n},argPackAdvance:Yt,readValueFromPointer:Gt(t,n,r!==0),destructorFunction:null})},gr=(e,t,n)=>{var r=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][t];function i(e){var t=P[e>>2],n=P[e+4>>2];return new r(ce.buffer,n,t)}n=Rt(n),Wt(e,{name:n,fromWireType:i,argPackAdvance:Yt,readValueFromPointer:i},{ignoreDuplicateRegistrations:!0})},_r=Object.assign({optional:!0},or),vr=(e,t)=>{Wt(e,_r)},yr=(e,t,n)=>(C(typeof n==`number`,`stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!`),mt(e,le,t,n)),br=(e,t)=>{t=Rt(t);var n=!0;Wt(e,{name:t,fromWireType(e){var t=P[e>>2],r=e+4,i;if(n)for(var a=r,o=0;o<=t;++o){var s=r+o;if(o==t||le[s]==0){var c=s-a,l=We(a,c);i===void 0?i=l:(i+=`\0`,i+=l),a=s+1}}else{for(var u=Array(t),o=0;o<t;++o)u[o]=String.fromCharCode(le[r+o]);i=u.join(``)}return ia(e),i},toWireType(e,t){t instanceof ArrayBuffer&&(t=new Uint8Array(t));var r,i=typeof t==`string`;i||ArrayBuffer.isView(t)&&t.BYTES_PER_ELEMENT==1||q(`Cannot pass non-string to std::string`),r=n&&i?pt(t):t.length;var a=na(4+r+1),o=a+4;if(P[a>>2]=r,i){if(n)yr(t,o,r+1);else for(var s=0;s<r;++s){var c=t.charCodeAt(s);c>255&&(ia(a),q(`String has UTF-16 code units that do not fit in 8 bits`)),le[o+s]=c}}else le.set(t,o);return e!==null&&e.push(ia,a),a},argPackAdvance:Yt,readValueFromPointer:An,destructorFunction(e){ia(e)}})},xr=typeof TextDecoder<`u`?new TextDecoder(`utf-16le`):void 0,Sr=(e,t)=>{C(e%2==0,`Pointer passed to UTF16ToString must be aligned to two bytes!`);for(var n=e>>1,r=n+t/2,i=n;!(i>=r)&&de[i];)++i;if(i-n>16&&xr)return xr.decode(de.subarray(n,i));for(var a=``,o=n;!(o>=r);++o){var s=de[o];if(s==0)break;a+=String.fromCharCode(s)}return a},Cr=(e,t,n)=>{if(C(t%2==0,`Pointer passed to stringToUTF16 must be aligned to two bytes!`),C(typeof n==`number`,`stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!`),n??=2147483647,n<2)return 0;n-=2;for(var r=t,i=n<e.length*2?n/2:e.length,a=0;a<i;++a){var o=e.charCodeAt(a);ue[t>>1]=o,t+=2}return ue[t>>1]=0,t-r},wr=e=>e.length*2,Tr=(e,t)=>{C(e%4==0,`Pointer passed to UTF32ToString must be aligned to four bytes!`);for(var n=``,r=0;!(r>=t/4);r++){var i=N[e+r*4>>2];if(!i)break;n+=String.fromCodePoint(i)}return n},Er=(e,t,n)=>{if(C(t%4==0,`Pointer passed to stringToUTF32 must be aligned to four bytes!`),C(typeof n==`number`,`stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!`),n??=2147483647,n<4)return 0;for(var r=t,i=r+n-4,a=0;a<e.length;++a){var o=e.codePointAt(a);if(o>65535&&a++,N[t>>2]=o,t+=4,t+4>i)break}return N[t>>2]=0,t-r},Dr=e=>{for(var t=0,n=0;n<e.length;++n)e.codePointAt(n)>65535&&n++,t+=4;return t},Or=(e,t,n)=>{n=Rt(n);var r,i,a,o;t===2?(r=Sr,i=Cr,o=wr,a=e=>de[e>>1]):t===4&&(r=Tr,i=Er,o=Dr,a=e=>P[e>>2]),Wt(e,{name:n,fromWireType:e=>{for(var n=P[e>>2],i,o=e+4,s=0;s<=n;++s){var c=e+4+s*t;if(s==n||a(c)==0){var l=c-o,u=r(o,l);i===void 0?i=u:(i+=`\0`,i+=u),o=c+t}}return ia(e),i},toWireType:(e,r)=>{typeof r!=`string`&&q(`Cannot pass non-string to C++ string type ${n}`);var a=o(r),s=na(4+a+t);return P[s>>2]=a/t,i(r,s+4,a+t),e!==null&&e.push(ia,s),s},argPackAdvance:Yt,readValueFromPointer:An,destructorFunction(e){ia(e)}})},kr=(e,t)=>{sr(e)},Ar=(e,t)=>{t=Rt(t),Wt(e,{isVoid:!0,name:t,argPackAdvance:0,fromWireType:()=>void 0,toWireType:(e,t)=>void 0})},jr=()=>{throw new O},Mr=(e,t,n)=>{var r=[],i=e.toWireType(r,n);return r.length&&(P[t>>2]=ar.toHandle(r)),i},Nr=(e,t,n)=>(e=ar.toValue(e),t=ur(t,`emval::as`),Mr(t,n,e)),Pr=[],Fr=(e,t,n,r)=>(e=Pr[e],t=ar.toValue(t),e(null,t,n,r)),Ir={},Lr=e=>{var t=Ir[e];return t===void 0?Rt(e):t},Rr=(e,t,n,r,i)=>(e=Pr[e],t=ar.toValue(t),n=Lr(n),e(t,t[n],r,i)),zr=()=>globalThis,Br=e=>e===0?ar.toHandle(zr()):(e=Lr(e),ar.toHandle(zr()[e])),Vr=e=>{var t=Pr.length;return Pr.push(e),t},Hr=(e,t)=>{for(var n=Array(e),r=0;r<e;++r)n[r]=ur(P[t+r*4>>2],`parameter ${r}`);return n},Ur=(e,t,n)=>{var r=Hr(e,t),i=r.shift();e--;var a=`return function (obj, func, destructorsRef, args) {
`,o=0,s=[];n===0&&s.push(`obj`);for(var c=[`retType`],l=[i],u=0;u<e;++u)s.push(`arg${u}`),c.push(`argType${u}`),l.push(r[u]),a+=`  var arg${u} = argType${u}.readValueFromPointer(args${o?`+`+o:``});\n`,o+=r[u].argPackAdvance;a+=`  var rv = ${n===1?`new func`:`func.call`}(${s.join(`, `)});\n`,i.isVoid||(c.push(`emval_returnValue`),l.push(Mr),a+=`  return emval_returnValue(retType, destructorsRef, rv);
`),a+=`};
`;var d=Function(...c,a)(...l);return Vr(yn(`methodCaller<(${r.map(e=>e.name).join(`, `)}) => ${i.name}>`,d))},Wr=(e,t)=>(e=ar.toValue(e),t=ar.toValue(t),ar.toHandle(e[t])),Gr=e=>{e>9&&(rr[e+1]+=1)},Kr=e=>(e=ar.toValue(e),typeof e==`number`),qr=e=>(e=ar.toValue(e),typeof e==`string`),Jr=()=>ar.toHandle([]),Yr=e=>ar.toHandle(Lr(e)),Xr=e=>{Hn(ar.toValue(e)),ir(e)},Zr=(e,t)=>{e=ur(e,`_emval_take_value`);var n=e.readValueFromPointer(t);return ar.toHandle(n)},Qr=e=>{throw e=ar.toValue(e),e},$r=e=>e%4==0&&(e%100!=0||e%400==0),ei=[0,31,60,91,121,152,182,213,244,274,305,335],ti=[0,31,59,90,120,151,181,212,243,273,304,334],ni=e=>($r(e.getFullYear())?ei:ti)[e.getMonth()]+e.getDate()-1,ri=9007199254740992,ii=-9007199254740992,ai=e=>e<ii||e>ri?NaN:Number(e);function oi(e,t){e=ai(e);var n=new Date(e*1e3);N[t>>2]=n.getSeconds(),N[t+4>>2]=n.getMinutes(),N[t+8>>2]=n.getHours(),N[t+12>>2]=n.getDate(),N[t+16>>2]=n.getMonth(),N[t+20>>2]=n.getFullYear()-1900,N[t+24>>2]=n.getDay();var r=ni(n)|0;N[t+28>>2]=r,N[t+36>>2]=-(n.getTimezoneOffset()*60);var i=new Date(n.getFullYear(),0,1),a=new Date(n.getFullYear(),6,1).getTimezoneOffset(),o=i.getTimezoneOffset(),s=(a!=o&&n.getTimezoneOffset()==Math.min(o,a))|0;N[t+32>>2]=s}var si=function(e){var t=(()=>{var t=new Date(N[e+20>>2]+1900,N[e+16>>2],N[e+12>>2],N[e+8>>2],N[e+4>>2],N[e>>2],0),n=N[e+32>>2],r=t.getTimezoneOffset(),i=new Date(t.getFullYear(),0,1),a=new Date(t.getFullYear(),6,1).getTimezoneOffset(),o=i.getTimezoneOffset(),s=Math.min(o,a);if(n<0)N[e+32>>2]=Number(a!=o&&s==r);else if(n>0!=(s==r)){var c=n>0?s:Math.max(o,a);t.setTime(t.getTime()+(c-r)*6e4)}N[e+24>>2]=t.getDay();var l=ni(t)|0;N[e+28>>2]=l,N[e>>2]=t.getSeconds(),N[e+4>>2]=t.getMinutes(),N[e+8>>2]=t.getHours(),N[e+12>>2]=t.getDate(),N[e+16>>2]=t.getMonth(),N[e+20>>2]=t.getYear();var u=t.getTime();return isNaN(u)?-1:u/1e3})();return BigInt(t)},ci=(e,t,n,r)=>{var i=new Date().getFullYear(),a=new Date(i,0,1),o=new Date(i,6,1),s=a.getTimezoneOffset(),c=o.getTimezoneOffset(),l=Math.max(s,c);P[e>>2]=l*60,N[t>>2]=Number(s!=c);var u=e=>{var t=e>=0?`-`:`+`,n=Math.abs(e);return`UTC${t}${String(Math.floor(n/60)).padStart(2,`0`)}${String(n%60).padStart(2,`0`)}`},d=u(s),f=u(c);C(d),C(f),C(pt(d)<=16,`timezone name truncated to fit in TZNAME_MAX (${d})`),C(pt(f)<=16,`timezone name truncated to fit in TZNAME_MAX (${f})`),c<s?(yr(d,n,17),yr(f,r,17)):(yr(d,r,17),yr(f,n,17))},li=()=>performance.now(),ui=()=>Date.now(),di=1,fi=e=>e>=0&&e<=3;function pi(e,t,n){if(t=ai(t),!fi(e))return 28;var r;if(e===0)r=ui();else if(di)r=li();else return 52;var i=Math.round(r*1e3*1e3);return me[n>>3]=BigInt(i),0}var mi=[],hi=(e,t)=>{C(Array.isArray(mi)),C(t%16==0),mi.length=0;for(var n;n=le[e++];){var r=String.fromCharCode(n),i=[`d`,`f`,`i`,`p`];i.push(`j`),C(i.includes(r),`Invalid character ${n}("${r}") in readEmAsmArgs! Use only [${i}], and do not specify "v" for void return argument.`);var a=n!=105;a&=n!=112,t+=a&&t%8?4:0,mi.push(n==112?P[t>>2]:n==106?me[t>>3]:n==105?N[t>>2]:pe[t>>3]),t+=a?8:4}return mi},gi=(e,t,n)=>{var r=hi(t,n);return C(ea.hasOwnProperty(e),`No EM_ASM constant found at address ${e}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`),ea[e](...r)},_i=(e,t,n)=>gi(e,t,n),vi=()=>2147483648,yi=()=>vi(),bi=(e,t)=>(C(t,`alignment argument is required`),Math.ceil(e/t)*t),xi=e=>{var t=se.buffer,n=(e-t.byteLength+65535)/65536|0;try{return se.grow(n),ge(),1}catch(n){b(`growMemory: Attempted to grow heap from ${t.byteLength} bytes to ${e} bytes, but got error: ${n}`)}},Si=e=>{var t=le.length;e>>>=0,C(e>t);var n=vi();if(e>n)return b(`Cannot enlarge memory, requested ${e} bytes, but the limit is ${n} bytes!`),!1;for(var r=1;r<=4;r*=2){var i=t*(1+.2/r);i=Math.min(i,e+100663296);var a=Math.min(n,bi(Math.max(e,i),65536));if(xi(a))return!0}return b(`Failed to grow the heap from ${t} bytes to ${a} bytes, not enough memory!`),!1},Ci={},wi=()=>l||`./this.program`,Ti=()=>{if(!Ti.strings){var e={USER:`web_user`,LOGNAME:`web_user`,PATH:`/`,PWD:`/`,HOME:`/home/web_user`,LANG:(typeof navigator==`object`&&navigator.language||`C`).replace(`-`,`_`)+`.UTF-8`,_:wi()};for(var t in Ci)Ci[t]===void 0?delete e[t]:e[t]=Ci[t];var n=[];for(var t in e)n.push(`${t}=${e[t]}`);Ti.strings=n}return Ti.strings},Ei=(e,t)=>{var n=0,r=0;for(var i of Ti()){var a=t+n;P[e+r>>2]=a,n+=yr(i,a,1/0)+1,r+=4}return 0},Di=(e,t)=>{var n=Ti();P[e>>2]=n.length;var r=0;for(var i of n)r+=pt(i)+1;return P[t>>2]=r,0},Oi=0,ki=()=>ze||Oi>0,Ai=e=>{ki()||(r.onExit?.(e),S=!0),u(e,new Ne(e))},ji=(e,t)=>{if(cs(),ki()&&!t){var n=`program exited (with status: ${e}), but keepRuntimeAlive() is set (counter=${Oi}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;oe?.(n),b(n)}Ai(e)};function Mi(e){try{var t=Dt.getStreamFromFD(e);return G.close(t),0}catch(e){if(G===void 0||e.name!==`ErrnoError`)throw e;return e.errno}}var Ni=(e,t,n,r)=>{for(var i=0,a=0;a<n;a++){var o=P[t>>2],s=P[t+4>>2];t+=8;var c=G.read(e,ce,o,s,r);if(c<0)return-1;if(i+=c,c<s)break;r!==void 0&&(r+=c)}return i};function Pi(e,t,n,r){try{var i=Ni(Dt.getStreamFromFD(e),t,n);return P[r>>2]=i,0}catch(e){if(G===void 0||e.name!==`ErrnoError`)throw e;return e.errno}}function Fi(e,t,n,r){t=ai(t);try{if(isNaN(t))return 61;var i=Dt.getStreamFromFD(e);return G.llseek(i,t,n),me[r>>3]=BigInt(i.position),i.getdents&&t===0&&n===0&&(i.getdents=null),0}catch(e){if(G===void 0||e.name!==`ErrnoError`)throw e;return e.errno}}var Ii=(e,t,n,r)=>{for(var i=0,a=0;a<n;a++){var o=P[t>>2],s=P[t+4>>2];t+=8;var c=G.write(e,ce,o,s,r);if(c<0)return-1;if(i+=c,c<s)break;r!==void 0&&(r+=c)}return i};function Li(e,t,n,r){try{var i=Ii(Dt.getStreamFromFD(e),t,n);return P[r>>2]=i,0}catch(e){if(G===void 0||e.name!==`ErrnoError`)throw e;return e.errno}}var Ri=e=>e,zi=e=>{var t=r[`_`+e];return C(t,`Cannot call unknown function `+e+`, make sure it is exported`),t},Bi=(e,t)=>{C(e.length>=0,`writeArrayToMemory array must have a length (should be an array or typed array)`),ce.set(e,t)},Vi=e=>ua(e),Hi=e=>{var t=pt(e)+1,n=Vi(t);return yr(e,n,t),n},Ui=(e,t,n,r,i)=>{var a={string:e=>{var t=0;return e!=null&&e!==0&&(t=Hi(e)),t},array:e=>{var t=Vi(e.length);return Bi(e,t),t}};function o(e){return t===`string`?We(e):t===`boolean`?!!e:e}var s=zi(e),c=[],l=0;if(C(t!==`array`,`Return type should not be "array".`),r)for(var u=0;u<r.length;u++){var d=a[n[u]];d?(l===0&&(l=B()),c[u]=d(r[u])):c[u]=r[u]}var f=s(...c);function p(e){return l!==0&&z(l),o(e)}return f=p(f),f},Wi=(e,t,n,r)=>(...i)=>Ui(e,t,n,i,r),Gi=(...e)=>G.createPath(...e),Ki=(...e)=>G.unlink(...e),qi=(...e)=>G.createLazyFile(...e),Ji=(...e)=>G.createDevice(...e),Yi=e=>pa(e),Xi=e=>fa(e),Zi=e=>{var t=B(),n=Vi(4),r=Vi(4);ma(e,n,r);var i=P[n>>2],a=P[r>>2],o=We(i);ia(i);var s;return a&&(s=We(a),ia(a)),z(t),[o,s]},Qi=e=>Zi(e);G.createPreloadedFile=St,G.staticInit(),_n(),jn(),C(rr.length===10),r.noExitRuntime&&(ze=r.noExitRuntime),r.preloadPlugins&&(bt=r.preloadPlugins),r.print&&(y=r.print),r.printErr&&(b=r.printErr),r.wasmBinary&&(x=r.wasmBinary),$i(),r.arguments&&r.arguments,r.thisProgram&&(l=r.thisProgram),C(r.memoryInitializerPrefixURL===void 0,`Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead`),C(r.pthreadMainPrefixURL===void 0,`Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead`),C(r.cdInitializerPrefixURL===void 0,`Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead`),C(r.filePackagePrefixURL===void 0,`Module.filePackagePrefixURL option was removed, use Module.locateFile instead`),C(r.read===void 0,`Module.read option was removed`),C(r.readAsync===void 0,`Module.readAsync option was removed (modify readAsync in JS)`),C(r.readBinary===void 0,`Module.readBinary option was removed (modify readBinary in JS)`),C(r.setWindowTitle===void 0,`Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)`),C(r.TOTAL_MEMORY===void 0,`Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY`),C(r.ENVIRONMENT===void 0,`Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)`),C(r.STACK_SIZE===void 0,`STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time`),C(r.wasmMemory===void 0,"Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally"),C(r.INITIAL_MEMORY===void 0,`Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically`),r.addRunDependency=xe,r.removeRunDependency=Se,r.ccall=Ui,r.cwrap=Wi,r.FS_createPreloadedFile=St,r.FS_unlink=Ki,r.FS_createPath=Gi,r.FS_createDevice=Ji,r.FS=G,r.FS_createDataFile=yt,r.FS_createLazyFile=qi,r.MEMFS=U,`writeI53ToI64.writeI53ToI64Clamped.writeI53ToI64Signaling.writeI53ToU64Clamped.writeI53ToU64Signaling.readI53FromI64.readI53FromU64.convertI32PairToI53.convertI32PairToI53Checked.convertU32PairToI53.getTempRet0.zeroMemory.withStackSave.inetPton4.inetNtop4.inetPton6.inetNtop6.readSockaddr.writeSockaddr.emscriptenLog.runMainThreadEmAsm.jstoi_q.autoResumeAudioContext.getDynCaller.dynCall.handleException.runtimeKeepalivePush.runtimeKeepalivePop.callUserCallback.maybeExit.asmjsMangle.HandleAllocator.getNativeTypeSize.addOnInit.addOnPostCtor.addOnPreMain.addOnExit.STACK_SIZE.STACK_ALIGN.POINTER_SIZE.ASSERTIONS.uleb128Encode.sigToWasmTypes.generateFuncType.convertJsFunctionToWasm.getEmptyTableSlot.updateTableMap.getFunctionAddress.addFunction.removeFunction.reallyNegative.unSign.strLen.reSign.formatString.intArrayToString.stringToAscii.stringToNewUTF8.registerKeyEventCallback.maybeCStringToJsString.findEventTarget.getBoundingClientRect.fillMouseEventData.registerMouseEventCallback.registerWheelEventCallback.registerUiEventCallback.registerFocusEventCallback.fillDeviceOrientationEventData.registerDeviceOrientationEventCallback.fillDeviceMotionEventData.registerDeviceMotionEventCallback.screenOrientation.fillOrientationChangeEventData.registerOrientationChangeEventCallback.fillFullscreenChangeEventData.registerFullscreenChangeEventCallback.JSEvents_requestFullscreen.JSEvents_resizeCanvasForFullscreen.registerRestoreOldStyle.hideEverythingExceptGivenElement.restoreHiddenElements.setLetterbox.softFullscreenResizeWebGLRenderTarget.doRequestFullscreen.fillPointerlockChangeEventData.registerPointerlockChangeEventCallback.registerPointerlockErrorEventCallback.requestPointerLock.fillVisibilityChangeEventData.registerVisibilityChangeEventCallback.registerTouchEventCallback.fillGamepadEventData.registerGamepadEventCallback.registerBeforeUnloadEventCallback.fillBatteryEventData.battery.registerBatteryEventCallback.setCanvasElementSize.getCanvasElementSize.jsStackTrace.getCallstack.convertPCtoSourceLocation.wasiRightsToMuslOFlags.wasiOFlagsToMuslOFlags.safeSetTimeout.setImmediateWrapped.safeRequestAnimationFrame.clearImmediateWrapped.registerPostMainLoop.registerPreMainLoop.getPromise.makePromise.idsToPromises.makePromiseCallback.Browser_asyncPrepareDataCounter.arraySum.addDays.getSocketFromFD.getSocketAddress.FS_mkdirTree._setNetworkCallback.heapObjectForWebGLType.toTypedArrayIndex.webgl_enable_ANGLE_instanced_arrays.webgl_enable_OES_vertex_array_object.webgl_enable_WEBGL_draw_buffers.webgl_enable_WEBGL_multi_draw.webgl_enable_EXT_polygon_offset_clamp.webgl_enable_EXT_clip_control.webgl_enable_WEBGL_polygon_mode.emscriptenWebGLGet.computeUnpackAlignedImageSize.colorChannelsInGlTextureFormat.emscriptenWebGLGetTexPixelData.emscriptenWebGLGetUniform.webglGetUniformLocation.webglPrepareUniformLocationsBeforeFirstUse.webglGetLeftBracePos.emscriptenWebGLGetVertexAttrib.__glGetActiveAttribOrUniform.writeGLArray.registerWebGlEventCallback.runAndAbortIfError.ALLOC_NORMAL.ALLOC_STACK.allocate.writeStringToMemory.writeAsciiToMemory.demangle.stackTrace.getFunctionArgsName.createJsInvokerSignature.PureVirtualError.registerInheritedInstance.unregisterInheritedInstance.getInheritedInstanceCount.getLiveInheritedInstances.setDelayFunction.count_emval_handles`.split(`.`).forEach(M),`run.out.err.callMain.abort.wasmMemory.wasmExports.HEAPF32.HEAPF64.HEAP8.HEAPU8.HEAP16.HEAPU16.HEAP32.HEAPU32.HEAP64.HEAPU64.writeStackCookie.checkStackCookie.INT53_MAX.INT53_MIN.bigintToI53Checked.stackSave.stackRestore.stackAlloc.setTempRet0.ptrToString.exitJS.getHeapMax.growMemory.ENV.ERRNO_CODES.strError.DNS.Protocols.Sockets.timers.warnOnce.readEmAsmArgsArray.readEmAsmArgs.runEmAsmFunction.getExecutableName.keepRuntimeAlive.asyncLoad.alignMemory.mmapAlloc.wasmTable.getUniqueRunDependency.noExitRuntime.addOnPreRun.addOnPostRun.freeTableIndexes.functionsInTableMap.setValue.getValue.PATH.PATH_FS.UTF8Decoder.UTF8ArrayToString.UTF8ToString.stringToUTF8Array.stringToUTF8.lengthBytesUTF8.intArrayFromString.AsciiToString.UTF16Decoder.UTF16ToString.stringToUTF16.lengthBytesUTF16.UTF32ToString.stringToUTF32.lengthBytesUTF32.stringToUTF8OnStack.writeArrayToMemory.JSEvents.specialHTMLTargets.findCanvasEventTarget.currentFullscreenStrategy.restoreOldWindowedStyle.UNWIND_CACHE.ExitStatus.getEnvStrings.checkWasiClock.doReadv.doWritev.initRandomFill.randomFill.emSetImmediate.emClearImmediate_deps.emClearImmediate.promiseMap.uncaughtExceptionCount.exceptionLast.exceptionCaught.ExceptionInfo.findMatchingCatch.getExceptionMessageCommon.Browser.requestFullscreen.requestFullScreen.setCanvasSize.getUserMedia.createContext.getPreloadedImageData__data.wget.MONTH_DAYS_REGULAR.MONTH_DAYS_LEAP.MONTH_DAYS_REGULAR_CUMULATIVE.MONTH_DAYS_LEAP_CUMULATIVE.isLeapYear.ydayFromDate.SYSCALLS.preloadPlugins.FS_modeStringToFlags.FS_getMode.FS_stdin_getChar_buffer.FS_stdin_getChar.FS_readFile.FS_root.FS_mounts.FS_devices.FS_streams.FS_nextInode.FS_nameTable.FS_currentPath.FS_initialized.FS_ignorePermissions.FS_filesystems.FS_syncFSRequests.FS_readFiles.FS_lookupPath.FS_getPath.FS_hashName.FS_hashAddNode.FS_hashRemoveNode.FS_lookupNode.FS_createNode.FS_destroyNode.FS_isRoot.FS_isMountpoint.FS_isFile.FS_isDir.FS_isLink.FS_isChrdev.FS_isBlkdev.FS_isFIFO.FS_isSocket.FS_flagsToPermissionString.FS_nodePermissions.FS_mayLookup.FS_mayCreate.FS_mayDelete.FS_mayOpen.FS_checkOpExists.FS_nextfd.FS_getStreamChecked.FS_getStream.FS_createStream.FS_closeStream.FS_dupStream.FS_doSetAttr.FS_chrdev_stream_ops.FS_major.FS_minor.FS_makedev.FS_registerDevice.FS_getDevice.FS_getMounts.FS_syncfs.FS_mount.FS_unmount.FS_lookup.FS_mknod.FS_statfs.FS_statfsStream.FS_statfsNode.FS_create.FS_mkdir.FS_mkdev.FS_symlink.FS_rename.FS_rmdir.FS_readdir.FS_readlink.FS_stat.FS_fstat.FS_lstat.FS_doChmod.FS_chmod.FS_lchmod.FS_fchmod.FS_doChown.FS_chown.FS_lchown.FS_fchown.FS_doTruncate.FS_truncate.FS_ftruncate.FS_utime.FS_open.FS_close.FS_isClosed.FS_llseek.FS_read.FS_write.FS_mmap.FS_msync.FS_ioctl.FS_writeFile.FS_cwd.FS_chdir.FS_createDefaultDirectories.FS_createDefaultDevices.FS_createSpecialDirectories.FS_createStandardStreams.FS_staticInit.FS_init.FS_quit.FS_findObject.FS_analyzePath.FS_createFile.FS_forceLoadFile.FS_absolutePath.FS_createFolder.FS_createLink.FS_joinPath.FS_mmapAlloc.FS_standardizePath.TTY.PIPEFS.SOCKFS.tempFixedLengthArray.miniTempWebGLFloatBuffers.miniTempWebGLIntBuffers.GL.AL.GLUT.EGL.GLEW.IDBStore.SDL.SDL_gfx.allocateUTF8.allocateUTF8OnStack.print.printErr.jstoi_s.InternalError.BindingError.throwInternalError.throwBindingError.registeredTypes.awaitingDependencies.typeDependencies.tupleRegistrations.structRegistrations.sharedRegisterType.whenDependentTypesAreResolved.getTypeName.getFunctionName.heap32VectorToArray.requireRegisteredType.usesDestructorStack.checkArgCount.getRequiredArgCount.createJsInvoker.UnboundTypeError.GenericWireTypeSize.EmValType.EmValOptionalType.throwUnboundTypeError.ensureOverloadTable.exposePublicSymbol.replacePublicSymbol.createNamedFunction.embindRepr.registeredInstances.getBasestPointer.getInheritedInstance.registeredPointers.registerType.integerReadValueFromPointer.enumReadValueFromPointer.floatReadValueFromPointer.assertIntegerRange.readPointer.runDestructors.craftInvokerFunction.embind__requireFunction.genericPointerToWireType.constNoSmartPtrRawPointerToWireType.nonConstNoSmartPtrRawPointerToWireType.init_RegisteredPointer.RegisteredPointer.RegisteredPointer_fromWireType.runDestructor.releaseClassHandle.finalizationRegistry.detachFinalizer_deps.detachFinalizer.attachFinalizer.makeClassHandle.init_ClassHandle.ClassHandle.throwInstanceAlreadyDeleted.deletionQueue.flushPendingDeletes.delayFunction.RegisteredClass.shallowCopyInternalPointer.downcastPointer.upcastPointer.validateThis.char_0.char_9.makeLegalFunctionName.emval_freelist.emval_handles.emval_symbols.getStringOrSymbol.Emval.emval_get_global.emval_returnValue.emval_lookupTypes.emval_methodCallers.emval_addMethodCaller`.split(`.`).forEach(ie),r.incrementExceptionRefcount=Yi,r.decrementExceptionRefcount=Xi,r.getExceptionMessage=Qi;function $i(){te(`fetchSettings`)}var ea={667668:()=>{r!==void 0&&`mjDISABLESTRING mjENABLESTRING mjFRAMESTRING mjLABELSTRING mjRNDSTRING mjTIMERSTRING mjVISSTRING`.split(` `).forEach(function(e){Object.defineProperty(r,e,{get:function(){return r[`get_`+e]()},set:function(e){},enumerable:!0,configurable:!0})})}},ta=A(`___getTypeName`),na=A(`_malloc`),ra=A(`_fflush`),ia=A(`_free`),aa=A(`_emscripten_stack_get_end`),oa=A(`_strerror`),Y=A(`_setThrew`),sa=A(`__emscripten_tempret_set`),ca=A(`_emscripten_stack_init`),la=A(`__emscripten_stack_restore`),ua=A(`__emscripten_stack_alloc`),da=A(`_emscripten_stack_get_current`),fa=A(`___cxa_decrement_exception_refcount`),pa=A(`___cxa_increment_exception_refcount`),ma=A(`___get_exception_message`),ha=A(`___cxa_can_catch`),ga=A(`___cxa_get_exception_ptr`);function _a(e){ta=we(`__getTypeName`,1),na=we(`malloc`,1),ra=we(`fflush`,1),ia=we(`free`,1),aa=e.emscripten_stack_get_end,e.emscripten_stack_get_base,oa=we(`strerror`,1),Y=we(`setThrew`,2),sa=we(`_emscripten_tempret_set`,1),ca=e.emscripten_stack_init,e.emscripten_stack_get_free,la=e._emscripten_stack_restore,ua=e._emscripten_stack_alloc,da=e.emscripten_stack_get_current,fa=we(`__cxa_decrement_exception_refcount`,1),pa=we(`__cxa_increment_exception_refcount`,1),ma=we(`__get_exception_message`,3),ha=we(`__cxa_can_catch`,3),ga=we(`__cxa_get_exception_ptr`,1)}var va={__assert_fail:Ge,__cxa_begin_catch:Je,__cxa_current_primary_exception:Ye,__cxa_end_catch:Xe,__cxa_find_matching_catch_2:et,__cxa_find_matching_catch_3:tt,__cxa_find_matching_catch_4:nt,__cxa_rethrow:rt,__cxa_rethrow_primary_exception:it,__cxa_throw:at,__cxa_uncaught_exceptions:ot,__resumeException:st,__syscall_dup3:Ot,__syscall_fcntl64:At,__syscall_fstat64:jt,__syscall_ioctl:Mt,__syscall_lstat64:Nt,__syscall_newfstatat:Pt,__syscall_openat:Ft,__syscall_stat64:It,_abort_js:Lt,_embind_register_bigint:Jt,_embind_register_bool:Xt,_embind_register_class:Vn,_embind_register_class_class_function:Xn,_embind_register_class_constructor:Zn,_embind_register_class_function:Qn,_embind_register_class_property:er,_embind_register_constant:tr,_embind_register_emval:sr,_embind_register_enum:lr,_embind_register_enum_value:dr,_embind_register_float:pr,_embind_register_function:mr,_embind_register_integer:hr,_embind_register_memory_view:gr,_embind_register_optional:vr,_embind_register_std_string:br,_embind_register_std_wstring:Or,_embind_register_user_type:kr,_embind_register_void:Ar,_emscripten_throw_longjmp:jr,_emval_as:Nr,_emval_call:Fr,_emval_call_method:Rr,_emval_decref:ir,_emval_get_global:Br,_emval_get_method_caller:Ur,_emval_get_property:Wr,_emval_incref:Gr,_emval_is_number:Kr,_emval_is_string:qr,_emval_new_array:Jr,_emval_new_cstring:Yr,_emval_run_destructors:Xr,_emval_take_value:Zr,_emval_throw:Qr,_localtime_js:oi,_mktime_js:si,_tzset_js:ci,clock_time_get:pi,emscripten_asm_const_int:_i,emscripten_date_now:ui,emscripten_get_heap_max:yi,emscripten_get_now:li,emscripten_resize_heap:Si,environ_get:Ei,environ_sizes_get:Di,exit:ji,fd_close:Mi,fd_read:Pi,fd_seek:Fi,fd_write:Li,invoke_ddd:Go,invoke_dddi:lo,invoke_dddidi:uo,invoke_ddidi:co,invoke_di:fo,invoke_dii:$a,invoke_diii:Na,invoke_diiii:so,invoke_diiiidd:ao,invoke_diiiidi:Ia,invoke_diiiii:Oa,invoke_diiiiii:Ha,invoke_diiiiiii:po,invoke_diiiiiiiii:Ba,invoke_diiiiiiiiiiii:Va,invoke_fiii:ns,invoke_i:ka,invoke_id:Bo,invoke_ii:Sa,invoke_iid:Co,invoke_iidddd:Xo,invoke_iidiii:Xa,invoke_iidiiid:Ja,invoke_iidiiiiidi:Za,invoke_iif:Yo,invoke_iii:ba,invoke_iiid:Qa,invoke_iiididdddddd:Ya,invoke_iiidiiiiiiii:qa,invoke_iiii:Ta,invoke_iiiidddiiiii:ho,invoke_iiiii:Ma,invoke_iiiiid:jo,invoke_iiiiii:Eo,invoke_iiiiiii:X,invoke_iiiiiiii:So,invoke_iiiiiiiidd:Mo,invoke_iiiiiiiii:io,invoke_iiiiiiiiii:Z,invoke_iiiiiiiiiidddiiiiiiiii:Ka,invoke_iiiiiiiiiii:ts,invoke_iiiiiiiiiiii:rs,invoke_iiiiiiiiiiiii:zo,invoke_iiij:To,invoke_iiji:Ao,invoke_j:$o,invoke_ji:Ro,invoke_jiiii:Do,invoke_jij:Lo,invoke_v:wa,invoke_vi:Ca,invoke_vid:wo,invoke_viddd:Oo,invoke_vidddd:ko,invoke_vidi:oo,invoke_vidiii:Wa,invoke_vii:Da,invoke_viid:no,invoke_viiddi:Io,invoke_viiddidi:Fo,invoke_viiddii:mo,invoke_viidi:to,invoke_viidii:Fa,invoke_viidiii:bo,invoke_viidiiid:vo,invoke_viidiiiii:Ga,invoke_viidiiiiidi:xo,invoke_viidiiiiiiii:Ua,invoke_viii:xa,invoke_viiid:Ra,invoke_viiidd:Po,invoke_viiidi:eo,invoke_viiididdddddd:yo,invoke_viiidiiiiiiii:_o,invoke_viiii:ja,invoke_viiiiddd:No,invoke_viiiidi:Ko,invoke_viiiifi:qo,invoke_viiiii:Ea,invoke_viiiiid:La,invoke_viiiiii:Aa,invoke_viiiiiii:Pa,invoke_viiiiiiii:ro,invoke_viiiiiiiiii:Uo,invoke_viiiiiiiiiidddiiiiiiiii:go,invoke_viiiiiiiiiiid:za,invoke_viiiiiiiiiiiii:Ho,invoke_viiiiiiiiiiiiiii:is,invoke_viiiiiiiiiiiiiiiiii:Wo,invoke_viiiij:Zo,invoke_viij:Qo,invoke_viijii:es,invoke_vij:Jo,invoke_vijjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj:Vo,llvm_eh_typeid_for:Ri},ya=await Me();function ba(e,t,n){var r=B();try{return J(e)(t,n)}catch(e){if(z(r),!(e instanceof D))throw e;Y(1,0)}}function xa(e,t,n,r){var i=B();try{J(e)(t,n,r)}catch(e){if(z(i),!(e instanceof D))throw e;Y(1,0)}}function Sa(e,t){var n=B();try{return J(e)(t)}catch(e){if(z(n),!(e instanceof D))throw e;Y(1,0)}}function Ca(e,t){var n=B();try{J(e)(t)}catch(e){if(z(n),!(e instanceof D))throw e;Y(1,0)}}function wa(e){var t=B();try{J(e)()}catch(e){if(z(t),!(e instanceof D))throw e;Y(1,0)}}function Ta(e,t,n,r){var i=B();try{return J(e)(t,n,r)}catch(e){if(z(i),!(e instanceof D))throw e;Y(1,0)}}function Ea(e,t,n,r,i,a){var o=B();try{J(e)(t,n,r,i,a)}catch(e){if(z(o),!(e instanceof D))throw e;Y(1,0)}}function Da(e,t,n){var r=B();try{J(e)(t,n)}catch(e){if(z(r),!(e instanceof D))throw e;Y(1,0)}}function Oa(e,t,n,r,i,a){var o=B();try{return J(e)(t,n,r,i,a)}catch(e){if(z(o),!(e instanceof D))throw e;Y(1,0)}}function ka(e){var t=B();try{return J(e)()}catch(e){if(z(t),!(e instanceof D))throw e;Y(1,0)}}function Aa(e,t,n,r,i,a,o){var s=B();try{J(e)(t,n,r,i,a,o)}catch(e){if(z(s),!(e instanceof D))throw e;Y(1,0)}}function ja(e,t,n,r,i){var a=B();try{J(e)(t,n,r,i)}catch(e){if(z(a),!(e instanceof D))throw e;Y(1,0)}}function Ma(e,t,n,r,i){var a=B();try{return J(e)(t,n,r,i)}catch(e){if(z(a),!(e instanceof D))throw e;Y(1,0)}}function Na(e,t,n,r){var i=B();try{return J(e)(t,n,r)}catch(e){if(z(i),!(e instanceof D))throw e;Y(1,0)}}function Pa(e,t,n,r,i,a,o,s){var c=B();try{J(e)(t,n,r,i,a,o,s)}catch(e){if(z(c),!(e instanceof D))throw e;Y(1,0)}}function Fa(e,t,n,r,i,a){var o=B();try{J(e)(t,n,r,i,a)}catch(e){if(z(o),!(e instanceof D))throw e;Y(1,0)}}function Ia(e,t,n,r,i,a,o){var s=B();try{return J(e)(t,n,r,i,a,o)}catch(e){if(z(s),!(e instanceof D))throw e;Y(1,0)}}function La(e,t,n,r,i,a,o){var s=B();try{J(e)(t,n,r,i,a,o)}catch(e){if(z(s),!(e instanceof D))throw e;Y(1,0)}}function Ra(e,t,n,r,i){var a=B();try{J(e)(t,n,r,i)}catch(e){if(z(a),!(e instanceof D))throw e;Y(1,0)}}function za(e,t,n,r,i,a,o,s,c,l,u,d,f){var p=B();try{J(e)(t,n,r,i,a,o,s,c,l,u,d,f)}catch(e){if(z(p),!(e instanceof D))throw e;Y(1,0)}}function Ba(e,t,n,r,i,a,o,s,c,l){var u=B();try{return J(e)(t,n,r,i,a,o,s,c,l)}catch(e){if(z(u),!(e instanceof D))throw e;Y(1,0)}}function Va(e,t,n,r,i,a,o,s,c,l,u,d,f){var p=B();try{return J(e)(t,n,r,i,a,o,s,c,l,u,d,f)}catch(e){if(z(p),!(e instanceof D))throw e;Y(1,0)}}function Ha(e,t,n,r,i,a,o){var s=B();try{return J(e)(t,n,r,i,a,o)}catch(e){if(z(s),!(e instanceof D))throw e;Y(1,0)}}function Ua(e,t,n,r,i,a,o,s,c,l,u,d){var f=B();try{J(e)(t,n,r,i,a,o,s,c,l,u,d)}catch(e){if(z(f),!(e instanceof D))throw e;Y(1,0)}}function Wa(e,t,n,r,i,a){var o=B();try{J(e)(t,n,r,i,a)}catch(e){if(z(o),!(e instanceof D))throw e;Y(1,0)}}function Ga(e,t,n,r,i,a,o,s,c){var l=B();try{J(e)(t,n,r,i,a,o,s,c)}catch(e){if(z(l),!(e instanceof D))throw e;Y(1,0)}}function Ka(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x){var S=B();try{return J(e)(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x)}catch(e){if(z(S),!(e instanceof D))throw e;Y(1,0)}}function qa(e,t,n,r,i,a,o,s,c,l,u,d){var f=B();try{return J(e)(t,n,r,i,a,o,s,c,l,u,d)}catch(e){if(z(f),!(e instanceof D))throw e;Y(1,0)}}function Ja(e,t,n,r,i,a,o){var s=B();try{return J(e)(t,n,r,i,a,o)}catch(e){if(z(s),!(e instanceof D))throw e;Y(1,0)}}function Ya(e,t,n,r,i,a,o,s,c,l,u,d){var f=B();try{return J(e)(t,n,r,i,a,o,s,c,l,u,d)}catch(e){if(z(f),!(e instanceof D))throw e;Y(1,0)}}function Xa(e,t,n,r,i,a){var o=B();try{return J(e)(t,n,r,i,a)}catch(e){if(z(o),!(e instanceof D))throw e;Y(1,0)}}function Za(e,t,n,r,i,a,o,s,c,l){var u=B();try{return J(e)(t,n,r,i,a,o,s,c,l)}catch(e){if(z(u),!(e instanceof D))throw e;Y(1,0)}}function Qa(e,t,n,r){var i=B();try{return J(e)(t,n,r)}catch(e){if(z(i),!(e instanceof D))throw e;Y(1,0)}}function $a(e,t,n){var r=B();try{return J(e)(t,n)}catch(e){if(z(r),!(e instanceof D))throw e;Y(1,0)}}function eo(e,t,n,r,i,a){var o=B();try{J(e)(t,n,r,i,a)}catch(e){if(z(o),!(e instanceof D))throw e;Y(1,0)}}function to(e,t,n,r,i){var a=B();try{J(e)(t,n,r,i)}catch(e){if(z(a),!(e instanceof D))throw e;Y(1,0)}}function no(e,t,n,r){var i=B();try{J(e)(t,n,r)}catch(e){if(z(i),!(e instanceof D))throw e;Y(1,0)}}function ro(e,t,n,r,i,a,o,s,c){var l=B();try{J(e)(t,n,r,i,a,o,s,c)}catch(e){if(z(l),!(e instanceof D))throw e;Y(1,0)}}function io(e,t,n,r,i,a,o,s,c){var l=B();try{return J(e)(t,n,r,i,a,o,s,c)}catch(e){if(z(l),!(e instanceof D))throw e;Y(1,0)}}function ao(e,t,n,r,i,a,o){var s=B();try{return J(e)(t,n,r,i,a,o)}catch(e){if(z(s),!(e instanceof D))throw e;Y(1,0)}}function oo(e,t,n,r){var i=B();try{J(e)(t,n,r)}catch(e){if(z(i),!(e instanceof D))throw e;Y(1,0)}}function so(e,t,n,r,i){var a=B();try{return J(e)(t,n,r,i)}catch(e){if(z(a),!(e instanceof D))throw e;Y(1,0)}}function co(e,t,n,r,i){var a=B();try{return J(e)(t,n,r,i)}catch(e){if(z(a),!(e instanceof D))throw e;Y(1,0)}}function lo(e,t,n,r){var i=B();try{return J(e)(t,n,r)}catch(e){if(z(i),!(e instanceof D))throw e;Y(1,0)}}function uo(e,t,n,r,i,a){var o=B();try{return J(e)(t,n,r,i,a)}catch(e){if(z(o),!(e instanceof D))throw e;Y(1,0)}}function fo(e,t){var n=B();try{return J(e)(t)}catch(e){if(z(n),!(e instanceof D))throw e;Y(1,0)}}function po(e,t,n,r,i,a,o,s){var c=B();try{return J(e)(t,n,r,i,a,o,s)}catch(e){if(z(c),!(e instanceof D))throw e;Y(1,0)}}function mo(e,t,n,r,i,a,o){var s=B();try{J(e)(t,n,r,i,a,o)}catch(e){if(z(s),!(e instanceof D))throw e;Y(1,0)}}function ho(e,t,n,r,i,a,o,s,c,l,u,d){var f=B();try{return J(e)(t,n,r,i,a,o,s,c,l,u,d)}catch(e){if(z(f),!(e instanceof D))throw e;Y(1,0)}}function go(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S){var C=B();try{J(e)(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S)}catch(e){if(z(C),!(e instanceof D))throw e;Y(1,0)}}function _o(e,t,n,r,i,a,o,s,c,l,u,d,f){var p=B();try{J(e)(t,n,r,i,a,o,s,c,l,u,d,f)}catch(e){if(z(p),!(e instanceof D))throw e;Y(1,0)}}function vo(e,t,n,r,i,a,o,s){var c=B();try{J(e)(t,n,r,i,a,o,s)}catch(e){if(z(c),!(e instanceof D))throw e;Y(1,0)}}function yo(e,t,n,r,i,a,o,s,c,l,u,d,f){var p=B();try{J(e)(t,n,r,i,a,o,s,c,l,u,d,f)}catch(e){if(z(p),!(e instanceof D))throw e;Y(1,0)}}function bo(e,t,n,r,i,a,o){var s=B();try{J(e)(t,n,r,i,a,o)}catch(e){if(z(s),!(e instanceof D))throw e;Y(1,0)}}function xo(e,t,n,r,i,a,o,s,c,l,u){var d=B();try{J(e)(t,n,r,i,a,o,s,c,l,u)}catch(e){if(z(d),!(e instanceof D))throw e;Y(1,0)}}function So(e,t,n,r,i,a,o,s){var c=B();try{return J(e)(t,n,r,i,a,o,s)}catch(e){if(z(c),!(e instanceof D))throw e;Y(1,0)}}function Co(e,t,n){var r=B();try{return J(e)(t,n)}catch(e){if(z(r),!(e instanceof D))throw e;Y(1,0)}}function wo(e,t,n){var r=B();try{J(e)(t,n)}catch(e){if(z(r),!(e instanceof D))throw e;Y(1,0)}}function X(e,t,n,r,i,a,o){var s=B();try{return J(e)(t,n,r,i,a,o)}catch(e){if(z(s),!(e instanceof D))throw e;Y(1,0)}}function Z(e,t,n,r,i,a,o,s,c,l){var u=B();try{return J(e)(t,n,r,i,a,o,s,c,l)}catch(e){if(z(u),!(e instanceof D))throw e;Y(1,0)}}function To(e,t,n,r){var i=B();try{return J(e)(t,n,r)}catch(e){if(z(i),!(e instanceof D))throw e;Y(1,0)}}function Eo(e,t,n,r,i,a){var o=B();try{return J(e)(t,n,r,i,a)}catch(e){if(z(o),!(e instanceof D))throw e;Y(1,0)}}function Do(e,t,n,r,i){var a=B();try{return J(e)(t,n,r,i)}catch(e){if(z(a),!(e instanceof D))throw e;return Y(1,0),0n}}function Oo(e,t,n,r,i){var a=B();try{J(e)(t,n,r,i)}catch(e){if(z(a),!(e instanceof D))throw e;Y(1,0)}}function ko(e,t,n,r,i,a){var o=B();try{J(e)(t,n,r,i,a)}catch(e){if(z(o),!(e instanceof D))throw e;Y(1,0)}}function Ao(e,t,n,r){var i=B();try{return J(e)(t,n,r)}catch(e){if(z(i),!(e instanceof D))throw e;Y(1,0)}}function jo(e,t,n,r,i,a){var o=B();try{return J(e)(t,n,r,i,a)}catch(e){if(z(o),!(e instanceof D))throw e;Y(1,0)}}function Mo(e,t,n,r,i,a,o,s,c,l){var u=B();try{return J(e)(t,n,r,i,a,o,s,c,l)}catch(e){if(z(u),!(e instanceof D))throw e;Y(1,0)}}function No(e,t,n,r,i,a,o,s){var c=B();try{J(e)(t,n,r,i,a,o,s)}catch(e){if(z(c),!(e instanceof D))throw e;Y(1,0)}}function Po(e,t,n,r,i,a){var o=B();try{J(e)(t,n,r,i,a)}catch(e){if(z(o),!(e instanceof D))throw e;Y(1,0)}}function Fo(e,t,n,r,i,a,o,s){var c=B();try{J(e)(t,n,r,i,a,o,s)}catch(e){if(z(c),!(e instanceof D))throw e;Y(1,0)}}function Io(e,t,n,r,i,a){var o=B();try{J(e)(t,n,r,i,a)}catch(e){if(z(o),!(e instanceof D))throw e;Y(1,0)}}function Lo(e,t,n){var r=B();try{return J(e)(t,n)}catch(e){if(z(r),!(e instanceof D))throw e;return Y(1,0),0n}}function Ro(e,t){var n=B();try{return J(e)(t)}catch(e){if(z(n),!(e instanceof D))throw e;return Y(1,0),0n}}function zo(e,t,n,r,i,a,o,s,c,l,u,d,f){var p=B();try{return J(e)(t,n,r,i,a,o,s,c,l,u,d,f)}catch(e){if(z(p),!(e instanceof D))throw e;Y(1,0)}}function Bo(e,t){var n=B();try{return J(e)(t)}catch(e){if(z(n),!(e instanceof D))throw e;Y(1,0)}}function Vo(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,O,k,ee,A,te,j,ne,re,M,ie,ae,oe,se,ce,le,ue,de,N,P,fe,pe,me,he,F,ge,_e,ve,I,ye,L,R,be,xe,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe){var Je=B();try{J(e)(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,O,k,ee,A,te,j,ne,re,M,ie,ae,oe,se,ce,le,ue,de,N,P,fe,pe,me,he,F,ge,_e,ve,I,ye,L,R,be,xe,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe)}catch(e){if(z(Je),!(e instanceof D))throw e;Y(1,0)}}function Ho(e,t,n,r,i,a,o,s,c,l,u,d,f,p){var m=B();try{J(e)(t,n,r,i,a,o,s,c,l,u,d,f,p)}catch(e){if(z(m),!(e instanceof D))throw e;Y(1,0)}}function Uo(e,t,n,r,i,a,o,s,c,l,u){var d=B();try{J(e)(t,n,r,i,a,o,s,c,l,u)}catch(e){if(z(d),!(e instanceof D))throw e;Y(1,0)}}function Wo(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v){var y=B();try{J(e)(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v)}catch(e){if(z(y),!(e instanceof D))throw e;Y(1,0)}}function Go(e,t,n){var r=B();try{return J(e)(t,n)}catch(e){if(z(r),!(e instanceof D))throw e;Y(1,0)}}function Ko(e,t,n,r,i,a,o){var s=B();try{J(e)(t,n,r,i,a,o)}catch(e){if(z(s),!(e instanceof D))throw e;Y(1,0)}}function qo(e,t,n,r,i,a,o){var s=B();try{J(e)(t,n,r,i,a,o)}catch(e){if(z(s),!(e instanceof D))throw e;Y(1,0)}}function Jo(e,t,n){var r=B();try{J(e)(t,n)}catch(e){if(z(r),!(e instanceof D))throw e;Y(1,0)}}function Yo(e,t,n){var r=B();try{return J(e)(t,n)}catch(e){if(z(r),!(e instanceof D))throw e;Y(1,0)}}function Xo(e,t,n,r,i,a){var o=B();try{return J(e)(t,n,r,i,a)}catch(e){if(z(o),!(e instanceof D))throw e;Y(1,0)}}function Zo(e,t,n,r,i,a){var o=B();try{J(e)(t,n,r,i,a)}catch(e){if(z(o),!(e instanceof D))throw e;Y(1,0)}}function Qo(e,t,n,r){var i=B();try{J(e)(t,n,r)}catch(e){if(z(i),!(e instanceof D))throw e;Y(1,0)}}function $o(e){var t=B();try{return J(e)()}catch(e){if(z(t),!(e instanceof D))throw e;return Y(1,0),0n}}function es(e,t,n,r,i,a){var o=B();try{J(e)(t,n,r,i,a)}catch(e){if(z(o),!(e instanceof D))throw e;Y(1,0)}}function ts(e,t,n,r,i,a,o,s,c,l,u){var d=B();try{return J(e)(t,n,r,i,a,o,s,c,l,u)}catch(e){if(z(d),!(e instanceof D))throw e;Y(1,0)}}function ns(e,t,n,r){var i=B();try{return J(e)(t,n,r)}catch(e){if(z(i),!(e instanceof D))throw e;Y(1,0)}}function rs(e,t,n,r,i,a,o,s,c,l,u,d){var f=B();try{return J(e)(t,n,r,i,a,o,s,c,l,u,d)}catch(e){if(z(f),!(e instanceof D))throw e;Y(1,0)}}function is(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){var g=B();try{J(e)(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}catch(e){if(z(g),!(e instanceof D))throw e;Y(1,0)}}var as;function os(){ca(),T()}function ss(){if(ye>0||(os(),_e(),ye>0)){L=ss;return}function e(){C(!as),as=!0,r.calledRun=!0,!S&&(ve(),ae?.(r),r.onRuntimeInitialized?.(),ee(`onRuntimeInitialized`),C(!r._main,`compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]`),I())}r.setStatus?(r.setStatus(`Running...`),setTimeout(()=>{setTimeout(()=>r.setStatus(``),1),e()},1)):e(),E()}function cs(){var e=y,t=b,n=!1;y=b=e=>{n=!0};try{ra(0),[`stdout`,`stderr`].forEach(e=>{var t=G.analyzePath(`/dev/`+e);if(t){var r=t.object.rdev;H.ttys[r]?.output?.length&&(n=!0)}})}catch{}y=e,b=t,n&&Ve(`stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.`)}function ls(){if(r.preInit)for(typeof r.preInit==`function`&&(r.preInit=[r.preInit]);r.preInit.length>0;)r.preInit.shift()();ee(`preInit`)}ls(),ss(),n=F?r:new Promise((e,t)=>{ae=e,oe=t});for(let e of Object.keys(r))e in t||Object.defineProperty(t,e,{configurable:!0,get(){Ce(`Access to module property ('${e}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`)}});return n});function tu(e,t,n){let{mujoco:r,model:i,data:a}=e,o=i.jnt_qposadr[t];if(!i.neq)return a.qpos[o]=n,r.mj_forward(i,a),!0;let s=e.getInteractiveControls().joints.filter(e=>e.id!==t),c=()=>{r.mj_forward(i,a);let e=[];for(let t=0;t<a.nefc;t++)a.efc_type[t]===r.mjtConstraint.mjCNSTR_EQUALITY.value&&e.push(a.efc_pos[t]);return e},l=e=>e.reduce((e,t)=>e+t*t,0),u=(e,t)=>{let n=t.length,r=e.map((e,n)=>[...e,t[n]]);for(let e=0;e<n;e++){let t=e;for(let i=e+1;i<n;i++)Math.abs(r[i][e])>Math.abs(r[t][e])&&(t=i);[r[e],r[t]]=[r[t],r[e]];let i=r[e][e];if(Math.abs(i)<1e-18)return null;for(let t=e;t<=n;t++)r[e][t]/=i;for(let t=0;t<n;t++){if(t===e)continue;let i=r[t][e];for(let a=e;a<=n;a++)r[t][a]-=i*r[e][a]}}return r.map(e=>e[n])},d=a.qpos[o],f=i.jnt_type[t]===r.mjtJoint.mjJNT_HINGE.value,p=Math.max(1,Math.min(72,Math.ceil(Math.abs(n-d)/(f?Math.PI/18:.05))));for(let e=1;e<=p;e++){a.qpos[o]=d+(n-d)*e/p;let t=c();for(let e=0;e<60&&l(t)>1e-14;e++){let e=s.map(e=>a.qpos[i.jnt_qposadr[e.id]]),n=s.map((n,r)=>{let o=i.jnt_qposadr[n.id],s=1e-5;a.qpos[o]=e[r]+s;let l=c();return a.qpos[o]=e[r],t.map((e,t)=>(l[t]-e)/s)}),r=u(t.map((e,r)=>t.map((e,t)=>n.reduce((e,n)=>e+n[r]*n[t],r===t?1e-8:0))),t);if(!r)return!1;let o=n.map(e=>-e.reduce((e,t,n)=>e+t*r[n],0)),d=Math.max(1,...o.map((e,t)=>Math.abs(e)/(s[t].angular?.3:.1)));for(let e=0;e<o.length;e++)o[e]/=d;let f=!1;for(let n=1;n>=1/128;n/=2){for(let t=0;t<s.length;t++){let r=s[t],c=e[t]+o[t]*n;r.limited&&(c=Math.max(r.min,Math.min(r.max,c))),a.qpos[i.jnt_qposadr[r.id]]=c}let r=c();if(l(r)<l(t)){t=r,f=!0;break}}if(!f)return!1}if(!t.every(e=>Number.isFinite(e)&&Math.abs(e)<1e-6))return!1}return!0}var nu={abs:Math.abs,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,exp:Math.exp,log:Math.log,sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,min:Math.min,max:Math.max,clamp:(e,t,n)=>Math.max(t,Math.min(n,e)),step:e=>Number(e>=0),ramp:e=>Math.max(0,e)};function ru(e,t){if(typeof e==`number`)return e;let[n,...r]=e;if(n===`t`)return t.time;if(n===`q`)return t.qpos[r[0]];if(n===`v`)return t.qvel[r[0]];if(n===`where`)return ru(ru(r[0],t)?r[1]:r[2],t);if(n===`and`)return Number(r.every(e=>ru(e,t)));if(n===`or`)return Number(r.some(e=>ru(e,t)));if(n===`table`){let[e,n]=r,i=t.time;if(i<=e[0])return n[0];for(let t=1;t<e.length;t++)if(i<e[t])return n[t-1]+(n[t]-n[t-1])*(i-e[t-1])/(e[t]-e[t-1]);return n.at(-1)}let i=r.map(e=>ru(e,t));switch(n){case`+`:return i[0]+i[1];case`-`:return i[0]-i[1];case`*`:return i[0]*i[1];case`/`:return i[0]/i[1];case`**`:return i[0]**i[1];case`<`:return Number(i[0]<i[1]);case`<=`:return Number(i[0]<=i[1]);case`>`:return Number(i[0]>i[1]);case`>=`:return Number(i[0]>=i[1]);case`==`:return Number(i[0]===i[1]);case`!=`:return Number(i[0]!==i[1])}if(!Object.hasOwn(nu,n))throw Error(`未知载荷运算：${n}`);return nu[n](...i)}function iu(e,t,n){if(!e?.entries?.length)return{};n.qfrc_applied.fill(0),n.xfrc_applied.fill(0);let r={};for(let t of e.entries)try{let e=e=>{let t=ru(e,n);if(!Number.isFinite(t))throw Error(`表达式产生了无效数值`);return t},i=`load.${t.id}`;if([`joint`,`actuator`].includes(t.type)){let a=e(t.value);if(t.range&&(a=Math.max(t.range[0],Math.min(t.range[1],a))),t.type===`joint`){if(n.qfrc_applied[t.index]+=a,!Number.isFinite(n.qfrc_applied[t.index]))throw Error(`叠加载荷超出数值范围`)}else n.ctrl[t.index]=a;r[`${i}.value`]=a}else{let a=t.body,o=n.xmat.subarray(a*9,a*9+9),s=e=>[0,1,2].map(t=>o[t*3]*e[0]+o[t*3+1]*e[1]+o[t*3+2]*e[2]),c=t.force.map(e),l=t.torque.map(e);t.frame===`body`&&(c=s(c),l=s(l));let u=n.xipos.subarray(a*3,a*3+3),d=(t.site===void 0?t.point?s(t.point).map((e,t)=>e+n.xpos[a*3+t]):u:n.site_xpos.subarray(t.site*3,t.site*3+3)).map((e,t)=>e-u[t]),f=[d[1]*c[2]-d[2]*c[1],d[2]*c[0]-d[0]*c[2],d[0]*c[1]-d[1]*c[0]];l=l.map((e,t)=>e+f[t]),[...c,...l].forEach((e,t)=>{if(!Number.isFinite(e))throw Error(`空间载荷产生了无效数值`);if(n.xfrc_applied[a*6+t]+=e,!Number.isFinite(n.xfrc_applied[a*6+t]))throw Error(`叠加载荷超出数值范围`);r[`${i}.${[`fx`,`fy`,`fz`,`tx`,`ty`,`tz`][t]}`]=e})}}catch(e){throw n.qfrc_applied.fill(0),n.xfrc_applied.fill(0),Error(`载荷 ${t.label} 在 t=${Number(n.time).toFixed(6)} s 计算失败：${e.message}`)}return r}var au={loads:!0,inertia:!1,com:!1,joints:!1},ou=new U(0,0,1),su=class{constructor(e){this.scene=e,this.group=new si,this.group.name=`physics-overlays`,e.add(this.group),this.options={...au},this.items=new Map}clear(){this.group.traverse(e=>{if(e.geometry?.dispose(),e.material)for(let t of Array.isArray(e.material)?e.material:[e.material])t.dispose()}),this.group.clear(),this.items.clear()}dispose(){this.clear(),this.scene.remove(this.group)}item(e,t){if(!this.items.has(e)){let n=t();this.items.set(e,n),this.group.add(n)}let n=this.items.get(e);return n.visible=!0,n}arrow(e,t,n,r,i){let a=n.length();if(a<1e-10||!Number.isFinite(a))return;let o=this.item(e,()=>new yo(new U(1,0,0),new U,1,r)),s=a*i;o.position.copy(t),o.setDirection(n.clone().normalize()),o.setLength(s,s*.22,s*.12),o.userData.vector=n.toArray(),o.userData.magnitude=a}moment(e,t,n,r){let i=n.length();if(i<1e-10||!Number.isFinite(i))return;let a=this.item(e,()=>{let e=new si,t=[];for(let e=0;e<=40;e++){let n=e/40*Math.PI*1.65;t.push(new U(Math.cos(n),Math.sin(n),0))}e.add(new Di(new Dr().setFromPoints(t),new yi({color:12884986,depthTest:!1})));let n=new zr(new Fi(.09,.22,8),new fr({color:12884986,depthTest:!1})),r=Math.PI*1.65;return n.position.set(Math.cos(r),Math.sin(r),0),n.quaternion.setFromUnitVectors(new U(0,1,0),new U(-Math.sin(r),Math.cos(r),0)),e.add(n),e});a.position.copy(t),a.quaternion.setFromUnitVectors(ou,n.clone().normalize()),a.scale.setScalar(r),a.userData.vector=n.toArray(),a.userData.magnitude=i}update(e){let{model:t,data:n,mujoco:r}=e;if(!t||!n)return;for(let e of this.items.values())e.visible=!1;let i=Math.max(.1,t.stat.extent||2),a=i*.012,o=t.nflex?new Set([...t.flex_vertbodyid,...t.flex_nodebodyid]):new Set;if(this.options.com||this.options.inertia)for(let e=1;e<t.nbody;e++){if(t.body_mass[e]<=0||o.has(e))continue;let r=new U().fromArray(n.xipos,e*3);if(this.options.com){let t=this.item(`com:${e}`,()=>new zr(new _a(1,12,8),new fr({color:16765291,depthTest:!1})));t.position.copy(r),t.scale.setScalar(a),t.renderOrder=5}if(this.options.inertia){let i=t.body_mass[e],a=Array.from(t.body_inertia.subarray(e*3,e*3+3)),o=a.map((e,t)=>Math.sqrt(Math.max(0,6*(a[(t+1)%3]+a[(t+2)%3]-e)/i)));if(o.some(e=>!Number.isFinite(e)||e<=0))continue;let s=this.item(`inertia:${e}`,()=>{let e=new si,t=new Hr(1,1,1);return e.add(new zr(t,new fr({color:9358298,transparent:!0,opacity:.12,depthWrite:!1}))),e.add(new ji(new Bi(t),new yi({color:9358298,transparent:!0,opacity:.8}))),e}),c=n.ximat.subarray(e*9,e*9+9),l=new _n().set(c[0],c[1],c[2],0,c[3],c[4],c[5],0,c[6],c[7],c[8],0,0,0,0,1);s.position.copy(r),s.quaternion.setFromRotationMatrix(l),s.scale.fromArray(o)}}if(this.options.joints)for(let e=0;e<t.njnt;e++)!o.has(t.jnt_bodyid[e])&&[r.mjtJoint.mjJNT_HINGE.value,r.mjtJoint.mjJNT_SLIDE.value].includes(t.jnt_type[e])&&this.arrow(`axis:${e}`,new U().fromArray(n.xanchor,e*3),new U().fromArray(n.xaxis,e*3),7654375,i*.15);if(!this.options.loads)return;let s=[],c=[],l=(e,t,n,r)=>{t?.length()>1e-10&&s.push({origin:e,vector:t,key:r}),n?.length()>1e-10&&c.push({origin:e,vector:n,key:r})};if(e.drag&&e.dragTarget){let{bodyId:t,localPoint:r}=e.drag,a=new W().set(...n.xmat.subarray(t*9,t*9+9)),o=r.clone().applyMatrix3(a).add(new U().fromArray(n.xpos,t*3)),s=e.dragTarget.clone().sub(o);this.arrow(`drag:target`,o,s,12766407,1);let c=this.items.get(`drag:target`);if(c?.visible){let t=s.length();c.setLength(t,Math.min(t*.2,i*.06),Math.min(t*.04,i*.012));for(let e of[c.line,c.cone])e.material.transparent=!0,e.material.opacity=.65,e.material.depthTest=!1,e.material.depthWrite=!1,e.renderOrder=10;c.userData.role=`drag-target`,c.userData.target=e.dragTarget.toArray()}}if(!e.posePrepared&&!e.drag){for(let t of e.loadProgram?.entries||[]){if(t.type!==`wrench`)continue;let r=`load.${t.id}`,i=e.loadValues||{};if(i[`${r}.fx`]===void 0)continue;let a=new U().fromArray(n.xipos,t.body*3),o=n.xmat.subarray(t.body*9,t.body*9+9),s=new W().set(...o),c=t.site===void 0?t.point?new U().fromArray(t.point).applyMatrix3(s).add(new U().fromArray(n.xpos,t.body*3)):a.clone():new U().fromArray(n.site_xpos,t.site*3),u=new U(...[`fx`,`fy`,`fz`].map(e=>i[`${r}.${e}`]));l(c,u,new U(...[`tx`,`ty`,`tz`].map(e=>i[`${r}.${e}`])).sub(c.clone().sub(a).cross(u)),t.id)}let r=Array.from(n.qfrc_applied);for(let i=0;i<t.nu;i++){if(e.hiddenLoadActuators?.has(i))continue;let t=n.moment_rowadr[i],a=n.moment_rownnz[i];for(let e=t;e<t+a;e++)r[n.moment_colind[e]]+=n.actuator_force[i]*n.actuator_moment[e]}for(let e=0;e<t.njnt;e++){if(o.has(t.jnt_bodyid[e])||![2,3].includes(t.jnt_type[e]))continue;let i=new U().fromArray(n.xaxis,e*3).multiplyScalar(r[t.jnt_dofadr[e]]);l(new U().fromArray(n.xanchor,e*3),t.jnt_type[e]===2?i:null,t.jnt_type[e]===3?i:null,`joint:${e}`)}}let u=i*.28/Math.max(1,...s.map(e=>e.vector.length()));for(let e of s)this.arrow(`force:${e.key}`,e.origin,e.vector,6872497,u);let d=Math.max(1,...c.map(e=>e.vector.length()));for(let e of c)this.moment(`moment:${e.key}`,e.origin,e.vector,i*(.06+.07*e.vector.length()/d))}},cu=class{constructor({texture:e,onLoad:t=()=>{}}={}){this.texture=e||new Ba().load(new URL(`/static/assets/logo-gray-BuPdBCHf.png`,``+import.meta.url).href,t),this.texture.colorSpace=Re,this.geometry=new ga(1,1),this.material=new fr({map:this.texture,transparent:!0,alphaTest:.02,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,toneMapped:!1})}update(e,t,n,r){let i=t.type===r.mjtGeom.mjGEOM_PLANE.value&&t.objtype===r.mjtObj.mjOBJ_GEOM.value&&t.objid>=0&&n.geom_bodyid[t.objid]===0&&t.mat[8]>.95;if(e.userData.floorLogo&&(e.userData.floorLogo.visible=i),!i)return;if(e.material.color.setRGB(.035,.045,.06),!e.userData.floorLogo){let t=new zr(this.geometry,this.material);t.position.z=.001,t.renderOrder=1,t.raycast=()=>{},e.add(t),e.userData.floorLogo=t}let a=Math.max(.5,n.stat.extent),o=2*Math.min(t.size[0]||a,t.size[1]||a),s=Math.min(a*.95,o*.7);e.userData.floorLogo.scale.set(s,s,1)}dispose(){this.geometry.dispose(),this.material.dispose(),this.texture.dispose()}},lu=class extends Dr{constructor(e,t){super();let n=new ma;n.absarc(0,-t/2,e,Math.PI*1.5,0,!1),n.absarc(0,t/2,e,0,Math.PI*.5,!1);let r=new ha(n.getPoints(32),20);this.setIndex(r.getIndex()),this.setAttribute(`position`,r.getAttribute(`position`)),this.setAttribute(`normal`,r.getAttribute(`normal`)),this.setAttribute(`uv`,r.getAttribute(`uv`))}},uu=class{constructor(e,t={}){this.container=e,this.callbacks=t,this.mujoco=null,this.model=null,this.data=null,this.option=null,this.perturb=null,this.mjCamera=null,this.mjScene=null,this.meshes=[],this.geometryCache=new Map,this.sceneDirty=!0,this.floorBranding=new cu({onLoad:()=>{this.sceneDirty=!0}}),this.suspended=!1,this.resetKeyframe=-1,this.paused=!0,this.duration=1/0,this.configuredTimestep=.001,this.cameraConfig=null,this.completionNotified=!1,this.mode=`camera`,this.showContacts=!1,this.shadowsEnabled=null,this.lightingEnabled=!0,this.initialState=[],this.drag=null,this.posePrepared=!1,this.lastFrame=performance.now(),this.sampleInterval=.001,this.nextSampleTime=0,this.lastSampleTime=-1/0,this.timeAccumulator=0,this.frameId=null,this.scene=new ui,this.scene.background=new cr(1645856),this.camera=new ti(45,16/9,.01,1e3),this.camera.up.set(0,0,1),this.renderer=new wl({antialias:!0,alpha:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=2,this.renderer.outputColorSpace=Re,e.appendChild(this.renderer.domElement),this.controls=new Fl(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.addEventListener(`change`,()=>{this.sceneDirty=!0}),this.controls.screenSpacePanning=!0,this.onContextMenu=e=>e.preventDefault(),this.onMouseDown=e=>{e.button===2&&e.preventDefault()},this.renderer.domElement.addEventListener(`contextmenu`,this.onContextMenu),this.renderer.domElement.addEventListener(`mousedown`,this.onMouseDown,{capture:!0}),this.raycaster=new fo,this.pointer=new H,this.dragPlane=new mi,this.dragTarget=new U,this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),this.onPointerDown=e=>this.handlePointerDown(e),this.onPointerMove=e=>this.handlePointerMove(e),this.onPointerUp=e=>this.handlePointerUp(e),this.renderer.domElement.addEventListener(`pointerdown`,this.onPointerDown),this.renderer.domElement.addEventListener(`pointermove`,this.onPointerMove),this.renderer.domElement.addEventListener(`pointerup`,this.onPointerUp),this.renderer.domElement.addEventListener(`pointercancel`,this.onPointerUp),this.renderer.domElement.addEventListener(`lostpointercapture`,this.onPointerUp),this.resize()}async init(e=null){this.mujoco=e||await eu(),this.option=new this.mujoco.MjvOption,this.perturb=new this.mujoco.MjvPerturb,this.mjCamera=new this.mujoco.MjvCamera,this.addLights(),this.homeCamera(),this.animate()}addLights(){this.lightingGroup=new si,this.lightingGroup.add(new Ha(14544639,1581098,1.35));let e=new Ya(16777215,2.4);e.position.set(-3,-4,7),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),this.lightingGroup.add(e);let t=new Ya(9423359,.75);t.position.set(4,3,2),this.lightingGroup.add(t),this.flatLight=new Xa(16777215,2),this.flatLight.visible=!1,this.scene.add(this.lightingGroup,this.flatLight)}setShadows(e){return this.shadowsEnabled=!!e,this.renderer.shadowMap.enabled=this.shadowsEnabled&&this.lightingEnabled!==!1,this.scene.traverse(e=>{if(e.material)for(let t of Array.isArray(e.material)?e.material:[e.material])t.needsUpdate=!0}),this.sceneDirty=!0,this.shadowsEnabled}setLighting(e){return this.lightingEnabled=!!e,this.lightingGroup&&(this.lightingGroup.visible=this.lightingEnabled),this.flatLight&&(this.flatLight.visible=!this.lightingEnabled),this.setShadows(this.shadowsEnabled??this.renderer.shadowMap.enabled),this.lightingEnabled}async loadModel(e,t=[],n={},r={},i=null,a=null,o=null){let s=new this.mujoco.MjVFS,c;try{for(let[e,t]of Object.entries(r)){let n=t;if(!(n instanceof Uint8Array)){let e=atob(t);n=new Uint8Array(e.length);for(let t=0;t<e.length;t++)n[t]=e.charCodeAt(t)}s.addBuffer(e,n)}c=this.mujoco.MjModel.from_xml_string(e,s)}finally{s.delete()}if(!c)throw Error(`MuJoCo 无法编译这个模型。`);if(this.clearDrag(),this.disposeModel(),this.paused=!0,this.initialState=t,this.observe=n,this.loadProgram=o,this.hiddenLoadActuators=new Set,this.loadValues={},this.loadFailed=!1,this.model=c,this.jointLimits=Array.isArray(a)&&a.length===c.njnt?a:Array.from({length:c.njnt},(e,t)=>c.jnt_range[2*t+1]>c.jnt_range[2*t]),this.resetKeyframe=-1,this.callbacks.useModelKeyframe&&c.nkey>0){for(let e of[`home`,`default`,`stand`,`standing`,`reset`,`init`]){let t=this.mujoco.mj_name2id(c,this.mujoco.mjtObj.mjOBJ_KEY.value,e);if(t>=0){this.resetKeyframe=t;break}}this.resetKeyframe<0&&(this.resetKeyframe=0)}this.configuredTimestep=Number(c.opt.timestep),this.cameraConfig=i,this.data=new this.mujoco.MjData(this.model),this.mjScene=new this.mujoco.MjvScene(this.model,2**15),this.reset(),this.homeCamera();let l=c.nflex>0||c.nskin>0||c.nmeshvert>1e5;this.setShadows(this.shadowsEnabled??!l),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,l?1:2)),this.sceneDirty=!0}disposeModel(){this.overlays?.clear(),this.clearMeshes();for(let e of[`mjScene`,`data`,`model`])this[e]&&(this[e].delete(),this[e]=null)}clearMeshes(){for(let e of this.meshes)this.scene.remove(e),e.material?.dispose();this.meshes.length=0;for(let e of this.geometryCache.values())e.dispose();this.geometryCache.clear()}reset(e=!1){if(!this.model||!this.data)return;let t=e?Array.from(this.data.ctrl):null;this.clearDrag(),this.posePrepared=!1,this.loadFailed=!1,this.paused=!0,this.completionNotified=!1,this.mujoco.mj_resetData(this.model,this.data),this.resetKeyframe>=0&&this.mujoco.mj_resetDataKeyframe(this.model,this.data,this.resetKeyframe),this.data.time=0,this.physicsStep=0,this.model.opt.timestep=this.configuredTimestep,t&&t.forEach((e,t)=>{t<this.data.ctrl.length&&(this.data.ctrl[t]=e)}),this.timeAccumulator=0,this.nextSampleTime=0,this.lastSampleTime=-1/0;for(let e of this.initialState){let t=this.mujoco.mj_name2id(this.model,this.mujoco.mjtObj.mjOBJ_JOINT.value,e.joint);t<0||(e.field===`qvel`?this.data.qvel[this.model.jnt_dofadr[t]]=e.value:this.data.qpos[this.model.jnt_qposadr[t]]=e.value)}this.experimentStart={qpos:this.data.qpos.slice(),qvel:this.data.qvel.slice(),act:this.data.act.slice()},this.mujoco.mj_forward(this.model,this.data),this.updateScene(),this.emitSample(!0),this.updateDiagnostics()}step(e=1){if(this.model&&this.data){for(let t=0;t<e;t+=1){if(this.hasReachedDuration()){this.finishDuration();break}if(!this.applyTaskLoads())break;if(this.applyDragForce(),this.model.opt.timestep=Math.min(this.configuredTimestep,this.duration-this.getTime()),this.mujoco.mj_step(this.model,this.data),this.physicsStep=(this.physicsStep||0)+1,this.mujoco.mj_forward(this.model,this.data),this.hasReachedDuration()){this.finishDuration();break}}this.mujoco.mj_forward(this.model,this.data),this.updateScene(),this.emitSample(!0),this.updateDiagnostics()}}setPaused(e){e||(this.loadFailed=!1);let t=this.paused!==e;this.paused=e,t&&this.callbacks.onPausedChange?.(e)}setDuration(e){let t=Number(e);this.duration=Number.isFinite(t)&&t>0?t:1/0;let n=this.configuredTimestep,r=Number.isFinite(this.duration)?this.duration:5;this.sampleInterval=Math.max(n,r/5e3),this.nextSampleTime=this.getTime()+this.sampleInterval,this.data&&!this.hasReachedDuration()&&(this.completionNotified=!1),this.data&&this.hasReachedDuration()&&this.finishDuration()}getTime(){return Number(this.data?.time||0)}hasReachedDuration(){return!!(this.data&&Number.isFinite(this.duration)&&this.data.time+1e-9>=this.duration)}finishDuration(){this.paused=!0,this.timeAccumulator=0,!this.completionNotified&&(this.completionNotified=!0,this.callbacks.onComplete?.(this.getTime(),this.duration))}getInteractiveControls(){if(!this.model||!this.data)return{joints:[],actuators:[]};let e=[],t=this.mujoco.mjtJoint.mjJNT_HINGE.value,n=this.mujoco.mjtJoint.mjJNT_SLIDE.value,r=this.model.nflex?new Set([...this.model.flex_vertbodyid,...this.model.flex_nodebodyid]):new Set;for(let i=0;i<this.model.njnt;i+=1){let a=this.model.jnt_type[i];if(a!==t&&a!==n)continue;let o=this.mujoco.mj_id2name(this.model,this.mujoco.mjtObj.mjOBJ_JOINT.value,i);if(r.has(this.model.jnt_bodyid[i]))continue;let s=Number(this.data.qpos[this.model.jnt_qposadr[i]]),c=a===t?Math.PI:Math.max(1,Math.abs(s)*2),l=Number(this.model.jnt_range[i*2]),u=Number(this.model.jnt_range[i*2+1]),d=this.jointLimits[i]&&Number.isFinite(l)&&Number.isFinite(u)&&u>l,f=a===t&&!d,p=d?l:f?0:Math.min(-c,s),m=d?u:f?2*Math.PI:Math.max(c,s);e.push({id:i,name:o||`joint_${i}`,kindLabel:a===t?`转动关节位置 (rad)`:`滑动关节位置 (m)`,angular:a===t,unit:a===t?`rad`:`m`,limited:d,cyclic:f,min:p,max:m,step:Math.max((m-p)/500,1e-4),value:s})}let i=[];for(let e=0;e<this.model.nu;e+=1){let t=Number(this.model.actuator_ctrlrange[e*2]),n=Number(this.model.actuator_ctrlrange[e*2+1]),r=Number.isFinite(t)&&Number.isFinite(n)&&n>t,a=r?t:-1,o=r?n:1;i.push({id:e,name:this.mujoco.mj_id2name(this.model,this.mujoco.mjtObj.mjOBJ_ACTUATOR.value,e)||`actuator_${e}`,kindLabel:`MuJoCo ctrl 控制量`,min:a,max:o,step:Math.max((o-a)/500,1e-4),value:Number(this.data.ctrl[e])})}return{joints:e,actuators:i}}setJointPosition(e,t){if(!this.model||!this.data||e<0||e>=this.model.njnt)return;let n=this.model.jnt_type[e];if(![this.mujoco.mjtJoint.mjJNT_HINGE.value,this.mujoco.mjtJoint.mjJNT_SLIDE.value].includes(n)||!Number.isFinite(Number(t)))return;let r=this.model.jnt_range,i=this.jointLimits[e]?Math.max(r[2*e],Math.min(r[2*e+1],Number(t))):Number(t),a=this.data.qpos.slice();return tu(this,e,i)?(this.prepareJointPose(),this.mujoco.mj_forward(this.model,this.data),this.updateScene(),this.emitSample(!0),!0):(this.data.qpos.set(a),this.mujoco.mj_forward(this.model,this.data),this.callbacks.onError?.(`该关节值无法满足机构的闭环或联动约束，已保留原姿态。请尝试其他数值或调节驱动关节。`),!1)}prepareJointPose(){this.clearDrag(),this.setPaused(!0),this.posePrepared=!0,this.clearTaskLoads(),this.data.time=0,this.data.qvel.fill(0),this.data.qacc_warmstart.fill(0),this.physicsStep=0,this.timeAccumulator=0,this.lastSampleTime=-1/0,this.nextSampleTime=0,this.completionNotified=!1}getJointPosition(e){if(!this.model||!this.data)return 0;let t=typeof e==`number`?e:this.mujoco.mj_name2id(this.model,this.mujoco.mjtObj.mjOBJ_JOINT.value,e);return t<0||t>=this.model.njnt?0:Number(this.data.qpos[this.model.jnt_qposadr[t]])}setKinematicPosition(e,t){if(e?.type!==`slider_crank`)return;let n=Number(t),r=Number(e.crank_length),i=Number(e.rod_length);if(!(r>0)||!(i>r))return;let a=Math.max(-1,Math.min(1,r*Math.sin(n)/i)),o=Math.asin(a),s=r*Math.cos(n)+Math.sqrt(i*i-r*r*Math.sin(n)**2),c=new Map([[e.crank_joint,n],[e.rod_joint,-n-o],[e.slider_joint,s-r-i]]);this.prepareJointPose();for(let[e,t]of c){let n=this.mujoco.mj_name2id(this.model,this.mujoco.mjtObj.mjOBJ_JOINT.value,e);n<0||(this.data.qpos[this.model.jnt_qposadr[n]]=t,this.data.qvel[this.model.jnt_dofadr[n]]=0)}this.mujoco.mj_forward(this.model,this.data),this.updateScene(),this.emitSample(!0)}setActuatorControl(e,t){!this.model||!this.data||e<0||e>=this.model.nu||(this.drag?this.drag.controls[e]=Number(t):this.data.ctrl[e]=Number(t),this.sceneDirty=!0)}setActuatorLoadVisibility(e={}){this.hiddenLoadActuators=new Set;for(let[t,n]of Object.entries(e)){if(n.show_load!==!1)continue;let e=this.mujoco.mj_name2id(this.model,this.mujoco.mjtObj.mjOBJ_ACTUATOR.value,t);e>=0&&this.hiddenLoadActuators.add(e)}this.updateDiagnostics(),this.sceneDirty=!0}setActuatorControlValues(e={}){if(!this.model||!this.data)return{};let t={};for(let[n,r]of Object.entries(e)){let e=this.mujoco.mj_name2id(this.model,this.mujoco.mjtObj.mjOBJ_ACTUATOR.value,n),i=Number(r);if(e<0||!Number.isFinite(i))continue;let a=Number(this.model.actuator_ctrlrange[e*2]),o=Number(this.model.actuator_ctrlrange[e*2+1]),s=Number.isFinite(a)&&Number.isFinite(o)&&o>a?Math.min(o,Math.max(a,i)):i;this.drag?this.drag.controls[e]=s:this.data.ctrl[e]=s,t[n]=s}return t}getActuatorControlValues(){let e={};if(!this.model||!this.data)return e;for(let t=0;t<this.model.nu;t+=1){let n=this.mujoco.mj_id2name(this.model,this.mujoco.mjtObj.mjOBJ_ACTUATOR.value,t)||`actuator_${t}`;e[n]=Number(this.drag?this.drag.controls[t]:this.data.ctrl[t])}return e}setMode(e){this.mode=e,this.controls.enabled=e===`camera`||e===`pan`,this.controls.mouseButtons.LEFT=e===`pan`?r.PAN:r.ROTATE,this.renderer.domElement.classList.toggle(`drag-mode`,e===`drag`),e!==`drag`&&this.clearDrag()}toggleContacts(){let e=this.mujoco.mjtVisFlag.mjVIS_CONTACTPOINT.value;return this.option.flags[e]=!this.option.flags[e],this.showContacts=!!this.option.flags[e],this.clearMeshes(),this.updateScene(!0),this.showContacts}setOverlay(e,t){return[`loads`,`inertia`,`com`,`joints`].includes(e)?(this.overlays||=new su(this.scene),this.overlays.options[e]=!!t,this.updateDiagnostics(),this.sceneDirty=!0,this.overlays.options[e]):!1}updateDiagnostics(){this.model&&this.data&&(this.overlays||=new su(this.scene),this.overlays.update(this))}homeCamera(){if(this.cameraConfig?.position&&this.cameraConfig?.target){this.camera.position.fromArray(this.cameraConfig.position),this.controls.target.fromArray(this.cameraConfig.target),this.camera.position.sub(this.controls.target).multiplyScalar(1/Math.min(1,this.camera.aspect)).add(this.controls.target),this.controls.update();return}let e=this.model?.stat?.extent||2,t=this.model?.stat?.center||[0,0,0];this.camera.position.set(t[0]-1.1*e,t[1]-1.1*e,t[2]+.75*e),this.controls.target.set(t[0],t[1],t[2]),this.controls.update()}resize(){let e=Math.max(1,this.container.clientWidth),t=Math.max(1,this.container.clientHeight),n=this.camera.aspect;if(this.camera.aspect=e/t,this.model&&n>0&&this.controls){let e=Math.min(1,n)/Math.min(1,this.camera.aspect);this.camera.position.sub(this.controls.target).multiplyScalar(e).add(this.controls.target),this.controls.update()}this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1),this.sceneDirty=!0}getGeometry(e){let t=this.mujoco.mjtGeom;if(e.type===t.mjGEOM_FLEX.value||e.type===t.mjGEOM_SKIN.value)return this.getDeformableGeometry(e);let n=`${e.type}:${e.size[0]},${e.size[1]},${e.size[2]}:${e.dataid}:${e.objtype}`;if(this.geometryCache.has(n))return this.geometryCache.get(n);let r;if(e.type===t.mjGEOM_PLANE.value)r=new ga(2*(e.size[0]||100),2*(e.size[1]||100));else if(e.type===t.mjGEOM_SPHERE.value)r=new _a(e.size[0],32,20);else if(e.type===t.mjGEOM_CAPSULE.value)r=new lu(e.size[0],2*e.size[2]),r.rotateX(Math.PI/2);else if(e.type===t.mjGEOM_BOX.value)r=new Hr(2*e.size[0],2*e.size[1],2*e.size[2]);else if(e.type===t.mjGEOM_CYLINDER.value)r=new Pi(e.size[0],e.size[1],2*e.size[2],32),r.rotateX(Math.PI/2);else if(e.type===t.mjGEOM_ELLIPSOID.value)r=new _a(1,32,20),r.scale(e.size[0],e.size[1],e.size[2]);else if(e.type===t.mjGEOM_MESH.value){let t=e.objtype===this.mujoco.mjtObj.mjOBJ_GEOM.value&&e.objid>=0?this.model.geom_dataid[e.objid]:e.objtype===this.mujoco.mjtObj.mjOBJ_SITE.value?e.dataid:Math.floor(e.dataid/2);r=this.getMeshGeometry(t)}else r=new Dr;return this.geometryCache.set(n,r),r}getMeshGeometry(e){let t=new Dr;if(e<0||e>=this.model.nmesh||!this.model.mesh_vertadr)return t;let n=this.model.mesh_vertadr[e],r=this.model.mesh_vertnum[e],i=this.model.mesh_faceadr[e],a=this.model.mesh_facenum[e],o=this.model.mesh_vert.subarray(n*3,(n+r)*3),s=this.model.mesh_face.subarray(i*3,(i+a)*3);return t.setAttribute(`position`,new gr(new Float32Array(o),3)),t.setIndex(new gr(new Uint32Array(s),1)),t.computeVertexNormals(),t}getDeformableGeometry(e){let t=e.type===this.mujoco.mjtGeom.mjGEOM_FLEX.value,n=e.objid,r=this.mjScene,i=`${t?`flex`:`skin`}:${n}`,a=this.geometryCache.get(i);a||(a=new Dr,this.geometryCache.set(i,a));let o=(e,t,n,r)=>{let i=a.getAttribute(e);(!i||i.array.length<r)&&(i=new gr(new Float32Array(r),3).setUsage(He),a.setAttribute(e,i)),t&&i.array.set(t.subarray(n,n+r)),i.needsUpdate=!0};if(t&&this.model.flex_dim[n]===1){let e=r.flexedgenum[n],t=r.flexedgeadr[n],i=r.flexvertadr[n],s=e*6*6*3;o(`position`,null,0,s),o(`normal`,null,0,s);let c=a.getAttribute(`position`).array,l=a.getAttribute(`normal`).array,u=new U,d=new U,f=new U,p=new U,m=new U,h=this.model.flex_radius[n],g=0;for(let n=0;n<e;n++){u.fromArray(r.flexvert,3*(i+r.flexedge[2*(t+n)])),d.fromArray(r.flexvert,3*(i+r.flexedge[2*(t+n)+1])),f.subVectors(d,u).normalize(),p.set(Math.abs(f.z)<.9?0:1,0,+(Math.abs(f.z)<.9)).cross(f).normalize(),m.crossVectors(f,p);for(let e=0;e<6;e++)for(let[t,n]of[[0,e],[1,e],[1,e+1],[0,e],[1,e+1],[0,e+1]]){let e=n*Math.PI/3,r=Math.cos(e),i=Math.sin(e),a=t?d:u;for(let e=0;e<3;e++){let t=p.getComponent(e)*r+m.getComponent(e)*i;l[g]=t,c[g++]=a.getComponent(e)+h*t}}}a.setDrawRange(0,s/3)}else if(t){let e=9*r.flexfaceadr[n],t=9*r.flexfaceused[n];o(`position`,r.flexface,e,t),o(`normal`,r.flexnormal,e,t),a.setDrawRange(0,t/3)}else{let e=3*r.skinvertadr[n],t=3*r.skinvertnum[n];if(o(`position`,r.skinvert,e,t),o(`normal`,r.skinnormal,e,t),!a.index){let e=this.model.skin_faceadr[n]*3,t=this.model.skin_facenum[n]*3;a.setIndex(new gr(new Uint32Array(this.model.skin_face.subarray(e,e+t)),1))}a.setDrawRange(0,this.model.skin_facenum[n]*3)}return a.boundingSphere=null,a}updateScene(e=!1){if(!this.model||!this.data)return;this.mujoco.mjv_updateScene(this.model,this.data,this.option,this.perturb,this.mjCamera,this.mujoco.mjtCatBit.mjCAT_ALL.value,this.mjScene);let t=this.mjScene.geoms,n=t.size();e&&this.clearMeshes();for(let e=0;e<n;e+=1){let n=t.get(e),r=this.getGeometry(n),i=this.meshes[e];i||(i=new zr(r,new va({roughness:.62,metalness:.04})),i.castShadow=!0,i.receiveShadow=!0,this.meshes.push(i),this.scene.add(i)),i.geometry=r;let a=n.type===this.mujoco.mjtGeom.mjGEOM_FLEX.value||n.type===this.mujoco.mjtGeom.mjGEOM_SKIN.value;i.frustumCulled=!a;let o=a?2:0;i.material.side!==o&&(i.material.side=o,i.material.needsUpdate=!0),i.visible=!0,i.material.color.setRGB(n.rgba[0],n.rgba[1],n.rgba[2]),i.material.opacity=n.rgba[3],i.material.transparent=n.rgba[3]<.999,this.floorBranding?.update(i,n,this.model,this.mujoco),i.matrixAutoUpdate=!1,i.matrix.set(n.mat[0],n.mat[1],n.mat[2],n.pos[0],n.mat[3],n.mat[4],n.mat[5],n.pos[1],n.mat[6],n.mat[7],n.mat[8],n.pos[2],0,0,0,1),i.matrixWorldNeedsUpdate=!0,a&&i.matrix.identity();let s=n.objtype===this.mujoco.mjtObj.mjOBJ_GEOM.value&&n.objid>=0;i.userData.bodyId=s?this.model.geom_bodyid[n.objid]:-1,i.userData.geomId=s?n.objid:-1,n.delete()}for(let e=n;e<this.meshes.length;e+=1)this.meshes[e].visible=!1;t.delete(),this.updateDiagnostics(),this.sceneDirty=!0}setSuspended(e){this.suspended=e,e?(this.frameId&&cancelAnimationFrame(this.frameId),this.frameId=null):this.frameId||(this.lastFrame=performance.now(),this.sceneDirty=!0,this.animate())}animate(){if(this.frameId||this.suspended)return;let e=t=>{if(this.suspended){this.frameId=null;return}let n=Math.min((t-this.lastFrame)/1e3,.05);if(this.lastFrame=t,this.model&&this.data&&this.drag)this.advanceDragPose(n);else if(this.model&&this.data&&!this.paused){let e=this.configuredTimestep;this.timeAccumulator=Math.min(this.timeAccumulator+n,Math.max(.1,e));let r=!1,i=!1,a=!1,o=performance.now()+10;for(;this.timeAccumulator>=e;){if(this.hasReachedDuration()){this.finishDuration(),a=!0;break}if(!this.applyTaskLoads())break;if(this.applyDragForce(),this.model.opt.timestep=Math.min(e,this.duration-this.getTime()),this.mujoco.mj_step(this.model,this.data),this.physicsStep=(this.physicsStep||0)+1,this.mujoco.mj_forward(this.model,this.data),this.timeAccumulator-=e,r=!0,i=!1,this.callbacks.recordSamples!==!1&&this.data.time+1e-12>=this.nextSampleTime&&(this.mujoco.mj_forward(this.model,this.data),i=!0,this.emitSample(!1)),this.hasReachedDuration()){this.finishDuration(),a=!0;break}if(performance.now()>=o){this.timeAccumulator=Math.min(this.timeAccumulator,e);break}}r&&!i&&this.mujoco.mj_forward(this.model,this.data),this.updateScene(),this.emitSample(a,t)}this.controls.update()&&(this.sceneDirty=!0),this.sceneDirty&&=(this.updateDiagnostics(),this.renderer.render(this.scene,this.camera),!1),this.callbacks.onTime?.(this.data?.time||0),this.frameId=requestAnimationFrame(e)};this.frameId=requestAnimationFrame(e)}emitSample(e=!1){if(this.drag||this.posePrepared||this.loadFailed)return!1;let t=Number(this.data?.time||0);if(t+1e-9<this.lastSampleTime)return this.setPaused(!0),this.callbacks.onError?.(`仿真不稳定，物理引擎已自动重置；请检查模型或减小步长。`),!1;if(this.callbacks.recordSamples===!1)return this.lastSampleTime=t,(!Number.isFinite(t)||this.data?.qpos.some(e=>!Number.isFinite(e))||this.data?.qvel.some(e=>!Number.isFinite(e)))&&(this.setPaused(!0),this.callbacks.onError?.(`仿真出现无效数值，已暂停；请检查模型或减小步长。`)),!1;if(!e&&t+1e-12<this.nextSampleTime||!e&&Math.abs(t-this.lastSampleTime)<1e-12||!this.applyTaskLoads())return!1;for(this.lastSampleTime=t;this.nextSampleTime<=t+1e-12;)this.nextSampleTime+=this.sampleInterval;let n={...this.readObservations(),...this.loadValues};return Object.values(n).some(e=>!Number.isFinite(e))?(this.setPaused(!0),this.callbacks.onError?.(`仿真出现无效数值，已暂停；请检查模型或减小步长。`),!1):(this.callbacks.onSample?.({time:t,values:n}),!0)}getObservationUnits(){let e={time:`s`},t=this.mujoco.mjtJoint.mjJNT_SLIDE.value;for(let n of this.observe?.joints||[]){let r=this.mujoco.mj_name2id(this.model,this.mujoco.mjtObj.mjOBJ_JOINT.value,n.name);if(r<0)continue;let i=this.model.jnt_type[r]===t?{position:`m`,velocity:`m/s`,acceleration:`m/s²`,force:`N`}:{position:`rad`,velocity:`rad/s`,acceleration:`rad/s²`,force:`N·m`};for(let t of n.fields||[])i[t]&&(e[`joint.${n.name}.${t}`]=i[t])}for(let t of this.observe?.equalities||[]){if(!(t.fields||[]).includes(`force`))continue;let n=`equality.${t.name}.force`;for(let t of`xyz`)e[`${n}.${t}`]=`N`;e[`${n}.magnitude`]=`N`}for(let t of this.observe?.bodies||[])for(let n of t.fields||[]){if(n===`position`)for(let n of`xyz`)e[`body.${t.name}.position.${n}`]=`m`;if(n===`velocity`){for(let n of[`wx`,`wy`,`wz`])e[`body.${t.name}.velocity.${n}`]=`rad/s`;for(let n of[`vx`,`vy`,`vz`])e[`body.${t.name}.velocity.${n}`]=`m/s`}}for(let t of this.observe?.sites||[]){let n=Array.isArray(t.components)&&t.components.length?t.components:[...`xyz`];for(let r of t.fields||[]){let i=r===`position`?n:n.map(e=>`${r===`velocity`?`v`:`a`}${e}`),a=r===`position`?`m`:r===`velocity`?`m/s`:`m/s²`;for(let n of i)e[`site.${t.name}.${r}.${n}`]=a;t.magnitude&&(e[`site.${t.name}.${r}.magnitude`]=a)}}return{...e,...this.loadProgram?.units}}readObjectVector(e,t,n){let r=new this.mujoco.DoubleBuffer(6);try{return this.mujoco[e](this.model,this.data,t,n,r,0),Array.from(r.GetView())}finally{r.delete()}}readObservations(){let e={},t=this.observe?.sites||[];t.some(e=>(e.fields||[]).includes(`acceleration`))&&this.mujoco.mj_rnePostConstraint(this.model,this.data);for(let t of this.observe?.joints||[]){let n=this.mujoco.mj_name2id(this.model,this.mujoco.mjtObj.mjOBJ_JOINT.value,t.name);if(n<0)continue;let r=this.model.jnt_qposadr[n],i=this.model.jnt_dofadr[n];for(let n of t.fields||[]){let a=`joint.${t.name}.${n}`;n===`position`&&(e[a]=this.data.qpos[r]),n===`velocity`&&(e[a]=this.data.qvel[i]),n===`acceleration`&&(e[a]=this.data.qacc[i]),n===`force`&&(e[a]=this.data.qfrc_passive[i]+this.data.qfrc_actuator[i]+this.data.qfrc_applied[i])}}let n=this.mujoco.mjtObj.mjOBJ_EQUALITY.value,r=this.mujoco.mjtConstraint.mjCNSTR_EQUALITY.value;for(let t of this.observe?.equalities||[]){let i=this.mujoco.mj_name2id(this.model,n,t.name);if(i<0)continue;let a=[];for(let e=0;e<this.data.nefc;e+=1)this.data.efc_type[e]===r&&this.data.efc_id[e]===i&&a.push(Number(this.data.efc_force[e]));if((t.fields||[]).includes(`force`)){let n=[a[0]||0,a[1]||0,a[2]||0],r=`equality.`+t.name+`.force`;`xyz`.split(``).forEach((t,i)=>{e[r+`.`+t]=n[i]}),e[r+`.magnitude`]=Math.hypot(...n)}}for(let t of this.observe?.bodies||[]){let n=this.mujoco.mj_name2id(this.model,this.mujoco.mjtObj.mjOBJ_BODY.value,t.name);if(!(n<0)){for(let r of t.fields||[])if(r===`position`&&`xyz`.split(``).forEach((r,i)=>{e[`body.${t.name}.position.${r}`]=this.data.xpos[n*3+i]}),r===`velocity`){let r=this.readObjectVector(`mj_objectVelocity`,this.mujoco.mjtObj.mjOBJ_BODY.value,n);[`wx`,`wy`,`wz`,`vx`,`vy`,`vz`].forEach((n,i)=>{e[`body.${t.name}.velocity.${n}`]=r[i]})}}}let i=this.mujoco.mjtObj.mjOBJ_SITE.value;for(let n of t){let t=this.mujoco.mj_name2id(this.model,i,n.name);if(t<0)continue;let r=Array.isArray(n.components)&&n.components.length?n.components:[...`xyz`];for(let a of n.fields||[]){let o=`site.${n.name}.${a}`;if(a===`position`){let i=[0,1,2].map(e=>Number(this.data.site_xpos[t*3+e]));r.forEach(t=>{let n=`xyz`.indexOf(t);e[`${o}.${t}`]=i[n]}),n.magnitude&&(e[`${o}.magnitude`]=Math.hypot(...i))}if(a===`velocity`||a===`acceleration`){let s=a===`velocity`?`mj_objectVelocity`:`mj_objectAcceleration`,c=this.readObjectVector(s,i,t);r.forEach(t=>{let n=`xyz`.indexOf(t),r=`${a===`velocity`?`v`:`a`}${t}`;e[`${o}.${r}`]=c[n+3]}),n.magnitude&&(e[`${o}.magnitude`]=Math.hypot(...c.slice(3,6)))}}}return e}pointerFromEvent(e){let t=this.renderer.domElement.getBoundingClientRect();this.pointer.x=(e.clientX-t.left)/t.width*2-1,this.pointer.y=-((e.clientY-t.top)/t.height)*2+1}handlePointerDown(e){if(this.mode!==`drag`||e.button!==0||!this.model)return;this.pointerFromEvent(e),this.raycaster.setFromCamera(this.pointer,this.camera);let t=this.raycaster.intersectObjects(this.meshes.filter(e=>e.visible&&e.userData.bodyId>0))[0];if(!t||this.callbacks.onBeforeDrag?.()===!1)return;e.preventDefault(),e.stopPropagation();let n=new U;this.camera.getWorldDirection(n),this.dragPlane.setFromNormalAndCoplanarPoint(n,t.point),this.dragTarget.copy(t.point);let r=t.object.userData.bodyId,i=new U(this.data.xpos[r*3],this.data.xpos[r*3+1],this.data.xpos[r*3+2]),a=t.point.clone().sub(i),o=r*9,s=this.data.xmat,c=new U(s[o]*a.x+s[o+3]*a.y+s[o+6]*a.z,s[o+1]*a.x+s[o+4]*a.y+s[o+7]*a.z,s[o+2]*a.x+s[o+5]*a.y+s[o+8]*a.z);this.setPaused(!0),this.posePrepared=!0,this.clearTaskLoads(),this.completionNotified=!1,this.timeAccumulator=0,this.drag={bodyId:r,pointerId:e.pointerId,localPoint:c,controls:Array.from(this.data.ctrl),activation:Array.from(this.data.act),disableflags:this.model.opt.disableflags},this.model.opt.disableflags|=this.mujoco.mjtDisableBit.mjDSBL_ACTUATION.value,this.data.ctrl.fill(0),this.data.act.fill(0),this.data.qvel.fill(0),this.data.qacc_warmstart.fill(0),this.data.time=0,this.mujoco.mj_forward(this.model,this.data),this.callbacks.onDragStart?.(),this.renderer.domElement.setPointerCapture(e.pointerId),this.callbacks.onSelection?.(`body #${this.drag.bodyId}`)}handlePointerMove(e){this.drag&&e.pointerId===this.drag.pointerId&&(this.pointerFromEvent(e),this.raycaster.setFromCamera(this.pointer,this.camera),this.raycaster.ray.intersectPlane(this.dragPlane,this.dragTarget),this.sceneDirty=!0)}handlePointerUp(e){this.drag&&e.pointerId===this.drag.pointerId&&this.clearDrag()}advanceDragPose(e){let t=Math.min(this.configuredTimestep,.002);this.timeAccumulator=Math.min(this.timeAccumulator+e,Math.max(.05,t));let n=performance.now()+10;for(;this.drag&&this.timeAccumulator>=t;)if(this.data.ctrl.fill(0),this.data.act.fill(0),this.applyDragForce(),this.model.opt.timestep=t,this.mujoco.mj_step(this.model,this.data),this.data.time=0,this.timeAccumulator-=t,this.mujoco.mj_forward(this.model,this.data),performance.now()>=n){this.timeAccumulator=0;break}this.updateScene()}beginPreparedExperiment(){this.model&&this.data&&this.posePrepared&&!this.drag&&(this.posePrepared=!1,this.data.time=0,this.physicsStep=0,this.data.qvel.fill(0),this.data.qacc_warmstart.fill(0),this.timeAccumulator=0,this.lastSampleTime=-1/0,this.nextSampleTime=0,this.completionNotified=!1,this.model.opt.timestep=this.configuredTimestep,this.experimentStart={qpos:this.data.qpos.slice(),qvel:this.data.qvel.slice(),act:this.data.act.slice()},this.mujoco.mj_forward(this.model,this.data),this.emitSample(!0))}applyDragForce(){if(!this.drag||!this.data)return;let e=this.drag.bodyId,t=new U(this.data.xpos[e*3],this.data.xpos[e*3+1],this.data.xpos[e*3+2]),n=this.readObjectVector(`mj_objectVelocity`,this.mujoco.mjtObj.mjOBJ_BODY.value,e),r=new U(...n.slice(0,3)),i=new U(...n.slice(3,6)),a=e*9,o=this.data.xmat,s=this.drag.localPoint,c=new U(o[a]*s.x+o[a+1]*s.y+o[a+2]*s.z,o[a+3]*s.x+o[a+4]*s.y+o[a+5]*s.z,o[a+6]*s.x+o[a+7]*s.y+o[a+8]*s.z),l=t.clone().add(c),u=new U(...Array.from(this.data.xipos.slice(e*3,e*3+3))),d=r.clone().cross(l.clone().sub(u)).add(i),f=this.dragTarget.clone().sub(l).multiplyScalar(120).addScaledVector(d,-18);f.length()>300&&f.setLength(300);let p=l.clone().sub(u).cross(f);this.drag.force=f.clone(),this.drag.point=l.clone();let m=e*6;this.data.xfrc_applied[m]=f.x,this.data.xfrc_applied[m+1]=f.y,this.data.xfrc_applied[m+2]=f.z,this.data.xfrc_applied[m+3]=p.x,this.data.xfrc_applied[m+4]=p.y,this.data.xfrc_applied[m+5]=p.z}clearTaskLoads(){this.loadProgram?.entries?.length&&this.data&&(this.data.qfrc_applied.fill(0),this.data.xfrc_applied.fill(0),this.loadValues={})}applyTaskLoads(){if(!this.loadProgram?.entries?.length||this.drag||this.posePrepared)return!0;if(this.loadFailed)return!1;try{return this.mujoco.mj_forward(this.model,this.data),this.loadValues=iu(this.loadProgram,this.model,this.data),this.sceneDirty=!0,this.mujoco.mj_forward(this.model,this.data),!0}catch(e){return this.clearTaskLoads(),this.loadFailed=!0,this.setPaused(!0),this.callbacks.onError?.(e.message),!1}}clearDrag(){let e=this.drag;if(this.drag=null,e&&this.data&&this.model){let t=e.bodyId*6;for(let e=0;e<6;e+=1)this.data.xfrc_applied[t+e]=0;this.model.opt.disableflags=e.disableflags,this.model.opt.timestep=this.configuredTimestep,this.data.ctrl.set(e.controls),this.data.act.set(e.activation),this.data.qvel.fill(0),this.data.qacc_warmstart.fill(0),this.data.time=0,this.timeAccumulator=0,this.mujoco.mj_forward(this.model,this.data),this.updateScene(),this.setPaused(!0),this.renderer.domElement.hasPointerCapture(e.pointerId)&&this.renderer.domElement.releasePointerCapture(e.pointerId),this.callbacks.onDragEnd?.()}this.callbacks.onSelection?.(``)}dispose(){this.floorBranding?.dispose(),this.frameId&&cancelAnimationFrame(this.frameId),this.disposeModel(),this.overlays?.dispose(),this.overlays=null;for(let e of[`mjCamera`,`perturb`,`option`])this[e]?.delete();this.controls.dispose(),this.resizeObserver.disconnect(),this.renderer.dispose()}},du={mass:`质量`,stiffness:`刚度`,damping:`阻尼`,initial_displacement:`初始位移`,initial_velocity:`初始速度`,slide_x:`滑块`,slider_x:`滑块B`,slider:`滑块`,slider_center:`滑块中心`,crank_hinge:`曲柄`,connecting_rod:`连杆AB`,crank_speed:`曲柄角速度`,constant_speed_drive:`曲柄角速度`,point_b:`B点`,point_c:`C点`,rod_hinge_a:`连杆`,disk_orbit:`圆心公转`,disk_spin:`圆盘自转`};function fu(e){return du[e]||e.replaceAll(`_`,` `)}function pu(e,t,n=``){let[r,i,a,o]=t.split(`.`);if(r===`load`)return`${e?.loads?.loads?.find(e=>e.id===i)?.label||fu(i)} · ${{fx:`力 X`,fy:`力 Y`,fz:`力 Z`,tx:`质心力矩 X`,ty:`质心力矩 Y`,tz:`质心力矩 Z`,value:`输入`}[a]||a}`;let s={joint:`joints`,body:`bodies`,site:`sites`,equality:`equalities`}[r],c=e?.observe?.observe?.[s]?.find(e=>e.name===i)?.label||fu(i),l=n.startsWith(`rad`)||o?.startsWith(`w`),u={position:l?`转角`:`位移`,velocity:l?`角速度`:`速度`,acceleration:l?`角加速度`:`加速度`,force:n===`N·m`?`力矩`:`力`}[a]||a,d=o&&o!==`magnitude`?` ${o.at(-1).toUpperCase()}`:``;return`${c.replace(/水平运动|刚体|点$/g,``)}${u}${d}`}function mu(e){return Number.isFinite(e)?Math.abs(e)>=1e4||e!==0&&Math.abs(e)<1e-4?e.toExponential(3):e.toFixed(4).replace(/\.?0+$/,``)||`0`:`—`}var hu=[`#277d83`,`#b65332`,`#7860a0`,`#567e48`,`#b35068`,`#9f7c2d`],gu=class{constructor(e,t){this.container=e,this.state=t,this.cards=[],this.hoverTime=null,this.cursorPinned=!1,this.orderCache=new Map,this.viewRange=null,this.observer=new ResizeObserver(()=>this.draw()),this.observer.observe(e)}rebuild(){this.container.replaceChildren(),this.cards=[],this.hoverTime=null,this.viewRange=null,this.cursorPinned=!1;let e=[...this.state.task?.ui?.layout?.charts||[]],t=new Map,n=new Set(e.flatMap(e=>e.series||[]));for(let t of this.state.task?.loads?.loads||[])for(let r of t.type===`wrench`?[[`fx`,`fy`,`fz`],[`tx`,`ty`,`tz`]]:[[`value`]]){let i=r.map(e=>`load.${t.id}.${e}`).filter(e=>this.state.seriesUnits[e]&&!n.has(e));i.length&&e.push({title:`${this.state.preview?``:`实际加载 · `}${t.label||t.id}${t.type===`wrench`?r[0]===`fx`?` · 外力`:` · 质心力矩`:` · 输入`}`,series:i})}for(let n of e){let e=new Map;for(let t of n.series||[]){let n=this.state.seriesUnits[t]||`1`;e.has(n)||e.set(n,[]),e.get(n).push(t)}for(let[r,i]of e){let a=document.createElement(`section`);a.className=`chart-card`;let o=document.createElement(`h2`);o.textContent=e.size>1?pu(this.state.task,i[0],r):n.title||pu(this.state.task,i[0],r);let s=document.createElement(`canvas`);s.setAttribute(`role`,`img`),s.title=`悬停联动读取；单击固定时间，再次单击任意图表解除；Shift＋滚轮缩放；双击恢复全程`,s.setAttribute(`aria-label`,`${o.textContent}，横轴时间（s），纵轴（${r}）`);let c=document.createElement(`div`);c.className=`chart-readouts`;let l=new Map;i.forEach((e,t)=>{let n=document.createElement(`label`),i=document.createElement(`input`);i.type=`checkbox`,i.checked=this.state.visibleSeries.has(e),i.setAttribute(`aria-label`,`显示${pu(this.state.task,e,r)}`),i.addEventListener(`change`,()=>{i.checked?this.state.visibleSeries.add(e):this.state.visibleSeries.delete(e),this.draw()});let a=document.createElement(`span`);a.textContent=pu(this.state.task,e,r),a.style.color=hu[t%hu.length],a.title=e;let o=document.createElement(`output`);o.textContent=`— ${r}`,n.append(i,a,o),c.append(n),l.set(e,o)});let u=document.createElement(`p`);u.className=`chart-time`;let d=i[0]?.split(`.`)[2],f=r.startsWith(`rad`),p={position:f?`转角`:`位移`,velocity:f?`角速度`:`速度`,acceleration:f?`角加速度`:`加速度`,force:r===`N·m`?`力矩`:`力`}[d]||(i[0]?.startsWith(`load.`)?r===`N·m`?`力矩`:r===`N`?`力`:`输入`:`物理量`),m=document.createElement(`div`);m.className=`chart-card-header`;let h=document.createElement(`div`);h.className=`chart-order-actions`;let g=document.createElement(`button`),_=document.createElement(`button`);for(let[e,t,n]of[[g,-1,`上移`],[_,1,`下移`]])e.type=`button`,e.textContent=t<0?`↑`:`↓`,e.title=`${n}图表`,e.setAttribute(`aria-label`,`${n}${o.textContent}图表`),e.addEventListener(`click`,()=>{this.moveCard(b,t),(e.disabled?t<0?_:g:e).focus()});h.append(g,_),m.append(o,h);let v=JSON.stringify([o.textContent,r,i]),y=t.get(v)||0;t.set(v,y+1);let b={card:a,header:m,heading:o,canvas:s,keys:i,unit:r,values:l,stamp:u,quantity:p,up:g,down:_,id:`${v}:${y}`};s.addEventListener(`pointermove`,e=>{this.cursorPinned||(this.hoverTime=this.pointerTime(e,s),this.draw())}),s.addEventListener(`pointerleave`,()=>{this.cursorPinned||(this.hoverTime=null,this.draw())}),s.addEventListener(`click`,e=>{this.state.series.time.length&&(this.cursorPinned=!this.cursorPinned,this.hoverTime=this.pointerTime(e,s),this.draw())}),s.addEventListener(`dblclick`,()=>{this.viewRange=null,this.cursorPinned||(this.hoverTime=null),this.draw()}),s.addEventListener(`wheel`,e=>{if(!e.shiftKey||this.state.series.time.length<2)return;e.preventDefault();let t=this.state.series.time,n=t[0],r=t.at(-1),i=r-n;if(!(i>0))return;let[a,o]=this.viewRange||[n,r],c=Math.max(0,Math.min(1,(e.clientX-s.getBoundingClientRect().left-66)/Math.max(1,s.clientWidth-82))),l=Math.max(i/1e3,Math.min(i,(o-a)*(e.deltaY>0?1.3:.75))),u=a+c*(o-a),d=Math.max(n,Math.min(r-l,u-c*l));this.viewRange=[d,d+l],this.cursorPinned||(this.hoverTime=null),this.draw()},{passive:!1}),a.append(m,s,u,c),this.container.append(a),this.cards.push(b)}}this.restoreOrder(),this.draw()}pointerTime(e,t){let n=this.state.series.time;if(!n.length)return null;let r=t.getBoundingClientRect(),i=Math.max(0,Math.min(1,(e.clientX-r.left-66)/Math.max(1,r.width-82))),[a,o]=this.viewRange||[n[0],n.at(-1)];return a+i*(o-a)}orderKey(){return`vmail-chart-order:${this.state.task?.id||`unselected`}:${this.state.preview?`preview`:`data`}`}restoreOrder(){let e=this.orderCache.get(this.orderKey());if(!e)try{e=JSON.parse(localStorage.getItem(this.orderKey()))}catch{}if(Array.isArray(e)&&e.every(e=>typeof e==`string`)){let t=new Map(e.map((e,t)=>[e,t]));this.cards.sort((n,r)=>(t.get(n.id)??e.length)-(t.get(r.id)??e.length))}this.arrangeCards()}arrangeCards(){this.container.append(...this.cards.map(e=>e.card)),this.cards.forEach((e,t)=>{e.up.disabled=t===0,e.down.disabled=t===this.cards.length-1})}moveCard(e,t){let n=this.cards.indexOf(e),r=n+t;if(n<0||r<0||r>=this.cards.length)return;this.cards.splice(n,1),this.cards.splice(r,0,e),this.arrangeCards();let i=this.cards.map(e=>e.id);this.orderCache.set(this.orderKey(),i);try{localStorage.setItem(this.orderKey(),JSON.stringify(i))}catch{}}draw(){for(let e of this.cards)this.drawCard(e)}drawCard(e){let{canvas:t,keys:n,unit:r}=e,i=n.filter(e=>this.state.visibleSeries.has(e)),a=i.length===0;if(e.card.classList.toggle(`chart-collapsed`,a),e.heading.hidden=a,e.header.hidden=a,t.hidden=a,e.stamp.hidden=a,a){for(let[t,n]of e.values)n.textContent=`${mu(this.state.series[t]?.at(-1))} ${r}`;return}let o=Math.max(250,t.clientWidth||this.container.clientWidth-28),s=Math.min(window.devicePixelRatio||1,2);(t.width!==Math.round(o*s)||t.height!==220*s)&&(t.width=Math.round(o*s),t.height=220*s);let c=t.getContext(`2d`);c.setTransform(s,0,0,s,0,0),c.fillStyle=`#fcfcfa`,c.fillRect(0,0,o,220),c.font=`11px Segoe UI, Microsoft YaHei UI, sans-serif`,c.fillStyle=`#77816e`,c.fillText(`${e.quantity} / ${r}`,12,17),c.fillText(`时间 / s`,Math.max(72,o-80),214);let l=this.state.series.time,u=l.length-1;if(this.hoverTime!==null&&l.length){let e=this.hoverTime,t=0,n=l.length-1;for(;t<n;){let r=t+n>>1;l[r]<e?t=r+1:n=r}u=t>0&&Math.abs(l[t-1]-e)<Math.abs(l[t]-e)?t-1:t}e.stamp.textContent=u>=0?`${this.cursorPinned?`固定`:this.state.preview?`预览`:this.hoverTime===null?`当前`:`读取`}时刻：${mu(l[u])} s${this.cursorPinned?` · 单击任意图表解除`:``}`:`等待仿真数据`,e.stamp.classList.toggle(`pinned`,this.cursorPinned);for(let[t,n]of e.values)n.textContent=`${mu(this.state.series[t]?.[u])} ${r}`;if(l.length<2||!i.length){c.fillText(i.length?`开始仿真后显示曲线`:`勾选下方曲线以显示`,70,105);return}let[d,f]=this.viewRange||[l[0],l.at(-1)],p=1/0,m=-1/0;for(let e of i){let t=this.state.series[e]||[];for(let e=0;e<t.length;e++)l[e]>=d&&l[e]<=f&&Number.isFinite(t[e])&&(p=Math.min(p,t[e]),m=Math.max(m,t[e]))}if(!Number.isFinite(p)){c.fillText(`暂无有效数据`,70,105);return}let h=p===m?Math.max(1,Math.abs(p)*.1):(m-p)*.08;p-=h,m+=h;let g=o-66-16,_=e=>66+(e-d)/(f-d||1)*g,v=e=>184-(e-p)/(m-p)*156;for(let e=0;e<=4;e++){let t=28+e*156/4;c.strokeStyle=`#e5e8e0`,c.beginPath(),c.moveTo(66,t),c.lineTo(o-16,t),c.stroke(),c.fillStyle=`#77816e`,c.fillText(mu(m-e*(m-p)/4),3,t+4);let n=d+e*(f-d)/4;c.fillText(mu(n),Math.min(o-40,Math.max(61,_(n)-10)),202)}for(let e of i){let t=this.state.series[e]||[];c.strokeStyle=hu[n.indexOf(e)%hu.length],c.lineWidth=1.7,c.beginPath();let r=Math.max(1,Math.ceil(t.length/Math.max(1,g))),i=!1;for(let e=0;e<t.length;e+=r){let n=-1,a=-1;for(let i=e;i<Math.min(e+r,t.length);i++)!Number.isFinite(t[i])||l[i]<d||l[i]>f||((n<0||t[i]<t[n])&&(n=i),(a<0||t[i]>t[a])&&(a=i));if(n<0)i=!1;else for(let e of n<a?[n,a]:n>a?[a,n]:[n])i?c.lineTo(_(l[e]),v(t[e])):(c.moveTo(_(l[e]),v(t[e])),i=!0)}c.stroke()}this.hoverTime!==null&&u>=0&&l[u]>=d&&l[u]<=f&&(c.strokeStyle=`#929b88`,c.setLineDash([3,3]),c.beginPath(),c.moveTo(_(l[u]),28),c.lineTo(_(l[u]),184),c.stroke(),c.setLineDash([]))}};function _u(e){if(e.byteLength<4)throw Error(`模型资源包不完整，请重新加载。`);let t=new DataView(e).getUint32(0,!0),n=4+t;if(n>e.byteLength)throw Error(`模型资源包头部不完整。`);let r=JSON.parse(new TextDecoder().decode(new Uint8Array(e,4,t))),i={};for(let t of r.assets){if(!Number.isSafeInteger(t.bytes)||t.bytes<0||n+t.bytes>e.byteLength)throw Error(`模型配套文件传输不完整。`);i[t.name]=new Uint8Array(e,n,t.bytes),n+=t.bytes}if(n!==e.byteLength)throw Error(`模型资源包长度不匹配。`);return{xml:r.xml,name:r.name,joint_limits:r.joint_limits,assets:i}}function vu(e){let t=fu(e);if(t!==e.replaceAll(`_`,` `))return t;let n={left:`左`,right:`右`,hip:`髋`,knee:`膝`,ankle:`踝`,shoulder:`肩`,elbow:`肘`,wrist:`腕`,waist:`腰`,torso:`躯干`,head:`头`,hand:`手`,finger:`手指`,pitch:`俯仰`,roll:`侧摆`,yaw:`偏航`,joint:`关节`,hinge:`转轴`,slide:`滑动`},r=e.split(`_`);return r.some(e=>n[e])?r.map(e=>n[e]||e).join(``):t.replace(/joint\s*(\d+)/i,`关节 $1`)}var yu=class{constructor(e,{getViewer:t,canEdit:n=()=>!0,onChange:r=()=>{},onReset:i,onBlocked:a=()=>{}}){Object.assign(this,{container:e,getViewer:t,canEdit:n,onChange:r,onReset:i,onBlocked:a}),this.mode=`degree`,this.rows=[],this.lastSync=0;let o=document.createElement(`div`);o.className=`joint-panel-header`;let s=document.createElement(`h2`);s.textContent=`关节姿态`,this.unitSelect=document.createElement(`select`),this.unitSelect.setAttribute(`aria-label`,`关节角度单位`),this.unitSelect.append(new Option(`角度 °`,`degree`),new Option(`弧度 rad`,`radian`)),this.unitSelect.addEventListener(`change`,()=>{this.mode=this.unitSelect.value,this.render(this.items,this.note)}),this.reset=document.createElement(`button`),this.reset.type=`button`,this.reset.className=`quiet-button`,this.reset.textContent=`恢复姿态`,this.reset.addEventListener(`click`,()=>{if(!this.canEdit())return this.onBlocked();this.onReset?.(),this.sync(!0)}),o.append(s,this.unitSelect,this.reset),this.hint=document.createElement(`p`),this.hint.className=`field-help`,this.list=document.createElement(`div`),this.list.className=`joint-panel-list`,e.replaceChildren(o,this.hint,this.list),this.render([])}read(e){return e.read?e.read():this.getViewer()?.getJointPosition(e.id??e.name)??e.value}render(e=this.getViewer()?.getInteractiveControls().joints||[],t=``){this.items=e,this.note=t,this.rows=[],this.list.replaceChildren(),this.hint.textContent=t||(e.length?`调整时暂停仿真；点击运行后从当前姿态继续。`:this.getViewer()?.model?.nflex?`柔性部件不提供关节调节，请通过仿真观察形变。`:`当前模型没有可单独调整的转动或滑动关节。`);for(let t of e){let e=t.angular??t.kindLabel?.includes(`(rad)`)??t.unit===`rad`,n=e&&this.mode===`degree`?180/Math.PI:1,r=e?this.mode===`degree`?`°`:`rad`:`m`,i=document.createElement(`div`);i.className=`joint-row`,i.dataset.jointName=t.name;let a=document.createElement(`div`);a.className=`joint-row-heading`;let o=t.label||vu(t.name),s=document.createElement(`strong`);s.textContent=o,s.title=t.name;let c=document.createElement(`span`);c.textContent=r,a.append(s,c);let l=document.createElement(`div`);l.className=`joint-row-inputs`;let u=document.createElement(`input`);u.type=`range`,u.step=`any`,u.min=t.min*n,u.max=t.max*n,u.setAttribute(`aria-label`,`${o} 滑块`);let d=document.createElement(`input`);d.type=`number`,d.step=`any`,d.setAttribute(`aria-label`,`${o} 数值`),(t.limited!==!1||t.cyclic)&&(d.min=Math.floor(t.min*n*1e4)/1e4,d.max=Math.ceil(t.max*n*1e4)/1e4);let f=document.createElement(`div`);f.className=`joint-row-range`;let p=document.createElement(`span`),m=document.createElement(`span`);p.textContent=this.format(t.min*n),m.textContent=this.format(t.max*n),f.append(p,m);let h=e=>{if(!this.canEdit()){this.onBlocked(),this.sync(!0);return}if(!String(e).trim()||!Number.isFinite(Number(e))){this.sync(!0);return}let r=Number(e)/n;(t.limited!==!1||t.cyclic)&&(r=Math.max(t.min,Math.min(t.max,r)));let i=this.getViewer();i&&((t.apply?t.apply(r):i.setJointPosition(t.id,r))!==!1&&this.onChange(),this.sync(!0))};u.addEventListener(`input`,()=>h(u.value)),d.addEventListener(`change`,()=>h(d.value)),d.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),h(d.value),d.blur())}),l.append(u,d),i.append(a,l,f),this.list.append(i),this.rows.push({item:t,factor:n,slider:u,number:d})}this.sync(!0)}format(e){return Number.isFinite(e)?String(Number(e.toFixed(4))):`0`}sync(e=!1){if(!e&&(performance.now()-this.lastSync<100||!this.container.getClientRects().length))return;this.lastSync=performance.now();let t=!!this.getViewer()?.model&&this.canEdit();this.reset.disabled=!t||!this.rows.length;for(let{item:n,factor:r,slider:i,number:a}of this.rows){if(i.disabled=a.disabled=!t,!e&&(document.activeElement===i||document.activeElement===a))continue;let o=this.read(n);n.cyclic&&(o<n.min||o>n.max)&&(o=(o%(2*Math.PI)+2*Math.PI)%(2*Math.PI));let s=o*r;n.limited===!1&&!n.cyclic&&(i.min=Math.min(n.min*r,s),i.max=Math.max(n.max*r,s)),i.value=s,a.value=this.format(s)}}},bu=16777216;function xu(e){let t=new DOMParser().parseFromString(e,`application/xml`);if(t.querySelector(`parsererror`))throw Error(`XML 格式错误，请检查标签和属性是否完整。`);if(t.documentElement.tagName!==`mujoco`)throw Error(`请选择以 <mujoco> 为根节点的 MuJoCo XML 模型。`);return e}function Su({openButton:e,getEngine:t,onEnter:n,onExit:r,onError:i}){let a=document.getElementById(`modelPreview`),o=document.getElementById(`previewViewport`),s=document.getElementById(`previewStatus`),c=document.getElementById(`previewTitle`),l=document.getElementById(`previewFile`),u=document.getElementById(`closePreview`),d=document.getElementById(`previewLibrary`),f=a.querySelector(`[data-preview-action="play"]`),p=document.getElementById(`previewJoints`),m=document.getElementById(`togglePreviewJoints`),h=[...a.querySelectorAll(`[data-preview-action]`)],g=null,_=0,v=!1,y=null,b=!1,x=!1,S=new yu(document.getElementById(`previewJointControls`),{getViewer:()=>g,canEdit:()=>v&&!x&&!g?.drag,onChange:w,onReset:()=>{g?.reset(),w()}});async function C(e,t){let n=await fetch(e,t?{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}:void 0);if(n.ok&&n.headers.get(`Content-Type`)?.includes(`application/octet-stream`))return _u(await n.arrayBuffer());let r=await n.json();if(!n.ok)throw Error(typeof r.detail==`string`?r.detail:`模型导入失败，请检查输入文件。`);return r}function w(){f.textContent=g&&!g.paused?`暂停仿真`:`运行仿真`,f.classList.toggle(`active`,!(!g||g.paused))}async function T(){if(!b)try{let{models:e}=await C(`/api/preview-models`);d.replaceChildren(new Option(`从模型库选择…`,``));for(let t of e){let e=document.createElement(`optgroup`);e.label=t.title;for(let n of t.entries)e.append(new Option(n,JSON.stringify({model_id:t.id,entry:n})));d.append(e)}b=!0}catch{E(`无法读取模型库，请重启 VMAIL 服务后刷新网页。`,!0)}}function E(e,t=!1){s.textContent=e,s.classList.toggle(`hidden`,!e),s.classList.toggle(`preview-error`,t)}function D(){v||(v=!0,y=document.activeElement,n(),document.getElementById(`app`).inert=!0,a.classList.remove(`hidden`),u.focus(),T())}function O(){v&&(v=!1,_++,g?.clearDrag(),g?.dispose(),g=null,S.render([]),p.classList.add(`hidden`),o.replaceChildren(),c.textContent=`模型预览`,d.value=``,w(),h.forEach(e=>{e.disabled=!0}),E(`拖入 XML 开始预览，也可从上方模型库选择。预览仿真不记录数据。`),a.classList.add(`hidden`),document.getElementById(`app`).inert=!1,r(),y?.focus())}async function k(e,n=null){D();let r=++_;if(!n&&(e.length!==1||!e[0].name.toLowerCase().endsWith(`.xml`))){E(`请一次拖入一个 .xml 文件。`,!0);return}let a=e[0];if(a&&a.size>bu)E(`XML 文件过大：单个 XML 最多 16 MiB（不含外部资源）。`,!0);else{g?.clearDrag(),g?.setPaused(!0),x=!0,S.sync(!0),E(`正在加载 ${a?.name||`模型及配套资源`}…`),h.forEach(e=>{e.disabled=!0});try{let e=await C(`/api/preview-model?binary=true`,n||{xml:xu(await a.text()),filename:a.name}),s=await t();if(r!==_||!v||(g||(g=new uu(o,{recordSamples:!1,useModelKeyframe:!0,onTime:()=>S.sync(),onPausedChange:w,onError:e=>{E(e,!0),i(e)}}),await g.init(s)),r!==_||!v))return;await g.loadModel(e.xml,[],{},e.assets,null,e.joint_limits),g.setMode(`camera`),g.setDuration(1/0),c.textContent=e.name,h.forEach(e=>{e.disabled=!1,e.classList.toggle(`active`,e.dataset.previewAction===`camera`)});for(let e of[`shadows`,`lighting`]){let t=h.find(t=>t.dataset.previewAction===e),n=e===`shadows`?g.shadowsEnabled:g.lightingEnabled;t.classList.toggle(`active`,n),t.setAttribute(`aria-pressed`,String(n))}for(let e of[`loads`,`inertia`,`com`,`axes`]){let t=h.find(t=>t.dataset.previewAction===e),n=e===`axes`?`joints`:e,r=g.overlays?.options[n]??n===`loads`;t.classList.toggle(`active`,r),t.setAttribute(`aria-pressed`,String(r))}x=!1,S.render(),p.classList.remove(`hidden`),m.classList.add(`active`),m.setAttribute(`aria-expanded`,`true`),E(``),w()}catch(e){if(r!==_||!v)return;x=!1,S.sync(!0),E(e.message||`模型加载失败，请检查 XML 和当前 MuJoCo 的支持情况。`,!0),h.forEach(e=>{e.disabled=!g?.model}),w()}}}e.addEventListener(`click`,D),u.addEventListener(`click`,O),document.getElementById(`choosePreviewFile`).addEventListener(`click`,()=>l.click()),l.addEventListener(`change`,()=>{l.files.length&&k([...l.files]),l.value=``}),d.addEventListener(`change`,()=>{d.value&&k([],JSON.parse(d.value))});for(let e of h)e.addEventListener(`click`,()=>{if(!g?.model)return;let t=e.dataset.previewAction;if([`camera`,`pan`,`drag`].includes(t))g.setMode(t),h.filter(e=>[`camera`,`pan`,`drag`].includes(e.dataset.previewAction)).forEach(t=>t.classList.toggle(`active`,t===e));else if(t===`play`)g.posePrepared&&g.beginPreparedExperiment(),g.setPaused(!g.paused);else if(t===`reset`)g.reset(),w(),S.sync(!0);else if(t===`home`)g.homeCamera();else if(t===`contacts`)e.classList.toggle(`active`,g.toggleContacts());else if([`loads`,`inertia`,`com`,`axes`].includes(t)){let n=g.setOverlay(t===`axes`?`joints`:t,e.getAttribute(`aria-pressed`)!==`true`);e.classList.toggle(`active`,n),e.setAttribute(`aria-pressed`,String(n))}else if(t===`shadows`||t===`lighting`){let n=t===`shadows`?g.setShadows(!g.shadowsEnabled):g.setLighting(!g.lightingEnabled);e.classList.toggle(`active`,n),e.setAttribute(`aria-pressed`,String(n))}else if(t===`joints`){let t=p.classList.toggle(`hidden`);e.classList.toggle(`active`,!t),e.setAttribute(`aria-expanded`,String(!t)),S.sync(!0)}});return window.addEventListener(`keydown`,e=>{if(v&&(e.key===`Escape`&&(e.preventDefault(),O()),e.code===`Space`&&!e.target.matches(`input,select,button`)&&(e.preventDefault(),f.click()),e.code===`Space`&&e.stopImmediatePropagation(),e.key===`Tab`)){let t=[...a.querySelectorAll(`button:not(:disabled),select:not(:disabled),input:not(:disabled)`)].filter(e=>e.getClientRects().length),n=t[0],r=t.at(-1);e.shiftKey&&document.activeElement===n?(e.preventDefault(),r.focus()):!e.shiftKey&&document.activeElement===r&&(e.preventDefault(),n.focus())}},{capture:!0}),window.addEventListener(`beforeunload`,()=>g?.dispose()),{isActive:()=>v,loadFiles:e=>k(e),close:O}}var Cu={"panel-left":`<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16m7-10-2 2 2 2"/>`,"panel-right":`<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M15 4v16m-7-10 2 2-2 2"/>`,refresh:`<path d="M20 10a8 8 0 0 0-14-4L3 9m0-5v5h5m-4 5a8 8 0 0 0 14 4l3-3m0 5v-5h-5"/>`,reset:`<path d="M4 9a8 8 0 1 1 0 6m0-11v5h5"/>`,cube:`<path d="m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 9 9-4m-9 4L3 8m9 4v10m-5-17 9 5"/>`,sliders:`<path d="M5 3v7m0 4v7m7-18v2m0 4v12m7-18v10m0 4v4M2 10h6m1-5h6m1 8h6"/>`,orbit:`<ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-35 12 12)"/><path d="M7 6c-1-4 1-5 4-2s7 12 6 16-5 0-7-4"/>`,move:`<path d="M12 3v18M3 12h18M9 6l3-3 3 3m-6 12 3 3 3-3M6 9l-3 3 3 3m12-6 3 3-3 3"/>`,hand:`<path d="M8 12V5a2 2 0 0 1 4 0v7-8a2 2 0 0 1 4 0v8-5a2 2 0 0 1 4 0v9a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-3l-4-6a2 2 0 0 1 3-2l1 1Z"/>`,frame:`<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/><circle cx="12" cy="12" r="3"/>`,step:`<path d="m5 4 12 8-12 8V4Zm14 0v16"/>`,edit:`<path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-5-4L4 15v5Z"/>`,trash:`<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>`,download:`<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>`,upload:`<path d="M12 16V4m-5 5 5-5 5 5M4 16v5h16v-5"/>`,check:`<path d="m5 12 4 4L20 5"/>`,back:`<path d="M20 12H4m6-6-6 6 6 6"/>`};function wu(e){return`<svg class="ui-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Cu[e]||``}</svg>`}function Tu(){document.querySelectorAll(`[data-icon]`).forEach(e=>e.insertAdjacentHTML(`afterbegin`,wu(e.dataset.icon)))}async function Eu(e,t,{cancelled:n=()=>!1}={}){let{mujoco:r,model:i,loadProgram:a}=e;if(!i||!a?.entries?.length)return{time:[]};let o=e.configuredTimestep;if(!Number.isFinite(t)||t<=0||Math.ceil(t/o)>1e6)throw Error(`请设置有效的仿真时长（最多 1000000 步）。`);let s=new r.MjData(i),c=Object.fromEntries([`time`,...Object.keys(a.units)].map(e=>[e,[]])),l=e.posePrepared?e.data:e.experimentStart;try{l&&(s.qpos.set(l.qpos),s.qvel.set(e.posePrepared?new Float64Array(i.nv):l.qvel)),s.ctrl.set(e.data.ctrl),s.act.set(l?.act||e.data.act),s.time=0;let u=0,d=!1;for(;!d;){if(n()||e.model!==i)throw new DOMException(`加载曲线计算已取消`,`AbortError`);let l=i.opt.timestep,f=performance.now()+8;try{do{r.mj_forward(i,s);let e=iu(a,i,s);if(s.time+1e-10>=u||s.time+1e-10>=t){c.time.push(Number(s.time));for(let t of Object.keys(a.units))c[t].push(e[t]);u=s.time+t/5e3}if(s.time+1e-10>=t){d=!0;break}let n=s.time;if(i.opt.timestep=Math.min(o,t-n),r.mj_step(i,s),!Number.isFinite(s.time)||s.time<=n||s.qpos.some(e=>!Number.isFinite(e))||s.qvel.some(e=>!Number.isFinite(e)))throw Error(`加载曲线预计算在 t=${n.toFixed(4)} s 不稳定，请调整参数或步长。`)}while(performance.now()<f)}finally{i.opt.timestep=l}d||await new Promise(e=>setTimeout(e,0))}return c}finally{s.delete()}}function Du(e,n){let r=n.math;if(!r){e.textContent=`请重启后台，以显示格式化公式。`;return}let i=n.type===`wrench`?[`\\mathbf F(t)=\\begin{bmatrix}${r.force.join(`\\\\`)}\\end{bmatrix}\\;\\mathrm{N}`,`\\mathbf M_0(t)=\\begin{bmatrix}${r.torque.join(`\\\\`)}\\end{bmatrix}\\;\\mathrm{N\\cdot m}`]:[`${n.type===`joint`?n.source.unit===`N`?`F`:`M`:`u`}(t)=${r.value}`];for(let n of i){let r=document.createElement(`div`);t.render(n,r,{throwOnError:!1,trust:!1,displayMode:!0,strict:`ignore`,maxExpand:1e3}),e.append(r)}}var Ou=class{constructor(e,t,n){Object.assign(this,{getViewer:e,getTask:t,getDuration:n}),this.version=0}clear(){this.version++,clearTimeout(this.timer),this.charts?.observer.disconnect(),this.charts=null,this.container?.remove(),this.container=null}invalidate(e){this.container&&(this.version++,clearTimeout(this.timer),this.charts?.observer.disconnect(),this.charts=null,this.plot.replaceChildren(),this.status.textContent=e)}mount(e){if(this.clear(),!this.getViewer()?.loadProgram?.entries?.length)return;this.container=document.createElement(`section`),this.container.className=`load-preview`;let t=document.createElement(`h2`);t.textContent=`加载曲线 · 全时程`,this.status=document.createElement(`p`),this.status.className=`field-help`,this.status.setAttribute(`role`,`status`),this.plot=document.createElement(`div`),this.plot.className=`chart-stack`,this.container.append(t,this.status,this.plot),e.append(this.container),this.refresh()}refresh(){if(!this.container)return;let e=++this.version;clearTimeout(this.timer),this.status.textContent=`正在预计算完整加载曲线…`,this.charts?.observer.disconnect(),this.charts=null,this.plot.replaceChildren(),this.timer=setTimeout(async()=>{try{let t=this.getViewer(),n=this.getDuration(),r=await Eu(t,n,{cancelled:()=>e!==this.version});if(e!==this.version)return;let i=this.getTask(),a={task:{...i,ui:{...i.ui,layout:{charts:[]}}},preview:!0,series:r,seriesUnits:t.loadProgram.units,visibleSeries:new Set(Object.keys(t.loadProgram.units))};this.charts=new gu(this.plot,a),this.charts.rebuild(),this.status.textContent=`0–${n} s · 按实验起始姿态预计算。含反馈或随动载荷时，这是预测曲线；实际载荷以“数据”页记录为准。`}catch(t){e===this.version&&t.name!==`AbortError`&&(this.status.textContent=t.message)}},180)}},ku=new Set([`image/png`,`image/jpeg`,`image/gif`,`image/webp`]);function Au(e){return ku.has(e.type)||!e.type&&/\.(png|jpe?g|gif|webp)$/i.test(e.name)}function ju(e){return e.length?e.length===1&&/\.xml$/i.test(e[0].name)?`xml`:e.some(e=>/\.xml$/i.test(e.name))?`mixed`:e.every(Au)?`images`:`unsupported`:`none`}function Mu({onImages:e,onXml:t,onError:n}){let r=document.getElementById(`fileDropHint`),i=0,a=e=>Array.from(e.dataTransfer?.types||[]).includes(`Files`),o=()=>{i=0,r.classList.add(`hidden`)};window.addEventListener(`dragenter`,e=>{a(e)&&(e.preventDefault(),i++,r.classList.remove(`hidden`))}),window.addEventListener(`dragover`,e=>{a(e)&&(e.preventDefault(),e.dataTransfer.dropEffect=`copy`)}),window.addEventListener(`dragleave`,e=>{a(e)&&--i<=0&&o()}),window.addEventListener(`drop`,r=>{if(!a(r))return;r.preventDefault(),o();let i=Array.from(r.dataTransfer.files);switch(ju(i)){case`xml`:t(i);break;case`images`:e(i);break;case`mixed`:n(`图片与 XML 请分开拖入；模型预览一次接收一个 XML 文件。`);break;case`unsupported`:n(`请选择 PNG、JPEG、GIF、WebP 图片，或单个 MuJoCo XML 文件。`)}}),window.addEventListener(`dragend`,o),window.addEventListener(`blur`,o)}function Nu(e){let t=t=>t.every((t,n)=>e[n]===t);return t([137,80,78,71,13,10,26,10])?`image/png`:t([255,216,255])?`image/jpeg`:t([71,73,70,56])&&[55,57].includes(e[4])&&e[5]===97?`image/gif`:t([82,73,70,70])&&[87,69,66,80].every((t,n)=>e[n+8]===t)?`image/webp`:null}function Pu(e,t=0){if(e.length+t>4)throw Error(`每条消息最多添加 4 张图片。`);for(let t of e){if(!Au(t))throw Error(`仅支持 PNG、JPEG、GIF、WebP 图片；XML 请单独拖入模型预览。`);if(!t.size||t.size>5242880)throw Error(`每张图片需大于 0 且不超过 5 MB，请缩小后重试。`)}}async function Fu(e){let t=await new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(String(r.result)),r.onerror=()=>n(Error(`无法读取图片，请重新选择。`)),r.readAsDataURL(e)}),n=t.slice(t.indexOf(`,`)+1),r=Nu(Uint8Array.from(atob(n.slice(0,64)),e=>e.charCodeAt(0)));if(!r)throw Error(`图片内容不是支持的格式，请导出为 PNG 或 JPEG 后重试。`);let i=`data:${r};base64,${n}`,a=new Image;a.src=i;try{await a.decode()}catch{throw Error(`图片无法解码，请重新导出后再上传。`)}if(Math.max(a.naturalWidth,a.naturalHeight)>8192)throw Error(`图片单边最长 8192 像素，请缩小后重试。`);return{name:e.name.slice(0,120),data_url:i}}async function Iu(e,t,n=()=>{}){if(!e.body)throw Error(`浏览器无法读取流式回答，请更换浏览器后重试。`);let r=e.body.getReader(),i=new TextDecoder,a=``,o=!1,s=null;function c(e){if(!e.trim())return;let r=JSON.parse(e);if(r.type===`error`)throw Error(r.message);r.type===`delta`&&t(r.content),r.type===`done`&&(o=!0,s=r.usage),[`status`,`draft`,`task_error`].includes(r.type)&&n(r)}try{for(;;){let e=await r.read();a+=i.decode(e.value,{stream:!e.done});let t;for(;(t=a.indexOf(`
`))>=0;)c(a.slice(0,t)),a=a.slice(t+1);if(e.done)break}if(a.trim()&&c(a),!o)throw Error(`连接提前结束，回答不完整，请重试。`);return s}finally{await r.cancel().catch(()=>{}),r.releaseLock()}}function Lu(e,t,n=[]){let r=e.filter(e=>!e.incomplete).map(({role:e,content:t,images:n})=>({role:e,content:t,...n?.length?{images:n.map(({name:e,data_url:t})=>({name:e,data_url:t}))}:{}})),i=t?`当前任务文件（是否已保存以对话中的程序结果为准）：
`+JSON.stringify(t)+(n.length?`
上次程序报告的问题：
`+n.join(`
`):``):``;if(i&&r.length&&(r[r.length-1].content=i+`

学生消息：
`+r.at(-1).content),r.at(-1)?.content.length>1e5)throw Error(`单次消息或当前任务文件过长，请缩小任务规模或分段描述。`);function a(){let e=r.flatMap(e=>e.images||[]),t=e.reduce((e,t)=>{let n=t.data_url.slice(t.data_url.indexOf(`,`)+1);return e+n.length*.75-(n.endsWith(`==`)?2:+!!n.endsWith(`=`))},0);return r.length>200||r.some(e=>e.content.length>1e5)||r.reduce((e,t)=>e+t.content.length,0)>148e3||e.length>8||t>20971520}let o=0;for(;a()&&r.length>1;)for(r.shift(),o++;r.length>1&&r[0].role===`assistant`;)r.shift(),o++;if(a())throw Error(`当前消息或图片过大，请缩小后再发送。`);return o&&r[0].content.length<99500&&(r[0].content=`[较早的 ${o} 条消息未随本次请求发送，如缺少建模条件请向学生询问。]\n`+r[0].content),{messages:r,omitted:o}}function Ru({onOpen:e,onCreated:t,onError:r,getTask:i=()=>null}){let a=document.getElementById(`panel-assistant`);a.innerHTML=`
    <div class="assistant-heading"><h2>我是菜鸟，需要辅助<span class="panel-kicker">DEEPSEEK</span></h2><button id="aiNew" class="quiet-button" type="button">新对话</button></div>
    <details id="aiSettings" class="assistant-settings">
      <summary><span>历史与连接</span><span class="assistant-summary-state"><span id="aiConnectionState" class="ai-connection-state">读取中</span><span id="aiHistoryState" role="status"></span></span></summary>
      <div class="assistant-history"><label class="sr-only" for="aiHistory">历史对话</label><select id="aiHistory" aria-label="选择历史对话"><option value="">新对话</option></select><button id="aiDelete" class="quiet-button" type="button">删除此对话</button></div>
      <form id="aiConnectionForm" class="assistant-connection">
        <p>使用你自己的 API Key，无需填写账号密码。<a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener noreferrer">获取 API Key ↗</a></p>
        <label>API Key<input id="aiKey" type="password" autocomplete="off" spellcheck="false" placeholder="sk-…" aria-describedby="aiKeyHelp" /></label>
        <label>对话模型<select id="aiModel"><option value="deepseek-flash">DeepSeek Flash（支持图片）</option><option value="deepseek-v4-pro">DeepSeek V4 Pro（仅文字）</option></select></label>
        <label class="assistant-remember"><input id="aiRemember" type="checkbox" />在这台电脑记住密钥（Windows 加密）</label>
        <p id="aiKeyHelp">默认仅在本次运行中保留。对话和草稿会发送给 DeepSeek，费用由你的 API 账户承担。</p>
        <div class="assistant-row"><button id="aiSave" class="primary-button" type="submit">保存连接</button><button id="aiTest" class="quiet-button" type="button">测试连接</button><button id="aiForget" class="quiet-button" type="button">解除绑定</button></div>
      </form>
    </details>
    <div id="aiConversation" class="assistant-conversation" role="log" aria-label="与 DeepSeek 的对话" aria-live="off">
      <div id="aiWelcome" class="assistant-welcome"><span class="assistant-orbit" aria-hidden="true">＋</span><h3>你想研究什么现象？</h3><button id="aiExample" type="button">试试：比较单摆在不同初始角度下的周期 ↗</button></div>
    </div>
    <div class="assistant-bottom">
      <details id="aiDraft" class="assistant-draft hidden">
        <summary class="assistant-draft-heading"><strong>任务文件 <span id="aiFileCount"></span></strong><span id="aiDraftId"></span></summary>
        <div class="assistant-draft-popover" role="region" aria-label="任务文件内容">
          <p id="aiValidation"></p><ul id="aiErrors" class="assistant-errors"></ul>
          <label class="sr-only" for="aiFile">草稿文件</label><select id="aiFile"></select><pre id="aiFileContent" tabindex="0"></pre>
        </div>
      </details>
      <p id="aiStatus" class="assistant-status" role="status"></p>
      <form id="aiChatForm" class="assistant-composer"><div id="aiAttachments" class="assistant-attachments hidden" aria-label="待发送的图片"></div><label class="sr-only" for="aiInput">你的研究问题</label><textarea id="aiInput" rows="3" maxlength="12000" placeholder="描述机构、已知条件；也可以添加题目图或草图…" title="Enter 发送，Shift+Enter 换行"></textarea><input id="aiImageFiles" class="hidden" type="file" accept="image/png,image/jpeg,image/gif,image/webp" multiple /><div class="assistant-compose-actions"><button id="aiChooseImages" class="quiet-button" type="button" aria-label="添加图片">＋ 图片</button><button id="aiStop" class="quiet-button hidden" type="button">停止等待</button><button id="aiSend" class="primary-button" type="submit">发送</button></div></form>
    </div>`;let o=Object.fromEntries(`Settings.ConnectionState.ConnectionForm.Key.Model.Remember.Save.Test.Forget.Conversation.Welcome.Example.New.Draft.DraftId.Validation.Errors.FileCount.File.FileContent.Status.ChatForm.Input.Stop.Send.Attachments.ChooseImages.ImageFiles`.split(`.`).map(e=>[e,document.getElementById(`ai`+e)]));for(let e of[`History`,`Delete`,`HistoryState`])o[e]=document.getElementById(`ai`+e);let s=[],c=null,l=null,u=!1,d=!1,f=null,p=!1,m=[],h=!1,g=`deepseek-flash`,_=crypto.randomUUID(),v=[],y=Promise.resolve(!0),b;async function x(e,{method:t=`GET`,body:n,signal:r}={}){let i=await fetch(`/api/assistant`+e,{method:t,signal:r,headers:{"Content-Type":`application/json`,"X-VMAIL-Assistant":`1`},body:n===void 0?void 0:JSON.stringify(n)});if(!i.ok){let e=(await i.json().catch(()=>({}))).detail;throw Error(typeof e==`string`?e:e?.message?e.message+` `+(e.errors||[]).join(`；`):`请求失败（${i.status}），请检查输入或服务状态。`)}return i}function S(e,t=!1){o.Status.textContent=e,o.Status.classList.toggle(`error`,t)}function C(){o.History.replaceChildren(new Option(`新对话`,``));for(let e of v)o.History.add(new Option(e.title,e.id));o.History.value=v.some(e=>e.id===_)?_:``,O()}function w(){if(clearTimeout(b),!s.length&&!o.Input.value&&!m.length&&!c&&!v.some(e=>e.id===_))return y;let e=_,t=JSON.parse(JSON.stringify({messages:s,input:o.Input.value,attachments:m,draft:c,validation:l,saved_task:p}));return o.HistoryState.textContent=`正在保存…`,y=y.then(async()=>{try{return v=[await(await x(`/conversations/${e}`,{method:`PUT`,body:t})).json(),...v.filter(t=>t.id!==e)],C(),o.HistoryState.textContent=`已保存到本机`,!0}catch(e){return o.HistoryState.textContent=`保存失败，内容仍在页面中`,S(e.message,!0),!1}}),y}function T(){clearTimeout(b),b=setTimeout(w,500)}function E(e={}){s=e.messages||[],c=e.draft||null,l=e.validation||{valid:!1,errors:[]},p=!!e.saved_task,m=e.attachments||[],o.Input.value=e.input||``;for(let e of o.Conversation.querySelectorAll(`.assistant-message`))e.remove();o.Welcome.classList.toggle(`hidden`,!!s.length);for(let e of s){let t=ee(e.role,e.content,!1,e.images||[]);e.incomplete&&(t.classList.add(`incomplete`),t.append(document.createTextNode(`
（本轮未完成；如需继续，请重新发送。）`)))}A(),ne(),C()}async function D(e){let t=await(await x(`/conversations/${e}`)).json();_=e,E(t),o.HistoryState.textContent=`已恢复本机记录`}function O(){let e=d||h;o.Send.disabled=e||!u,o.Input.disabled=e,o.ChooseImages.disabled=e;for(let t of[o.New,o.Save,o.Model,o.Key])t.disabled=e;o.History.disabled=e,o.Delete.disabled=e||!v.some(e=>e.id===_),o.Remember.disabled=e||o.Remember.dataset.supported===`false`,o.Test.disabled=e||!u,o.Forget.disabled=e||!u,o.Attachments.querySelectorAll(`button`).forEach(t=>{t.disabled=e}),o.Stop.classList.toggle(`hidden`,!f),a.setAttribute(`aria-busy`,String(e))}function k(e){u=e.configured,g=e.model,o.ConnectionState.textContent=u?`已绑定`:`未绑定`,o.ConnectionState.classList.toggle(`ready`,u),o.Model.value=e.model,o.Remember.checked=e.remember,o.Remember.dataset.supported=String(e.can_remember),o.Key.placeholder=u?`已保存；留空保留原密钥`:`sk-…`,o.Settings.open=!u,O(),e.notice&&S(e.notice,!0)}function ee(e,t,r=!1,i=[]){o.Welcome.classList.add(`hidden`);let a=document.createElement(`article`);a.className=`assistant-message `+e;let s=document.createElement(`span`);s.className=`assistant-message-role`,s.textContent=e===`user`?`你`:`DeepSeek`;let c=document.createElement(`div`);if(c.className=`task-prose`,e===`user`||r?c.textContent=t:n(c,t),a.append(s),i.length){let e=document.createElement(`div`);e.className=`assistant-message-images`;for(let t of i){let n=document.createElement(`img`);n.src=t.data_url,n.alt=t.name||`上传的图片`,e.append(n)}a.append(e)}return a.append(c),o.Conversation.append(a),a.scrollIntoView({block:`nearest`}),c}function A(){o.Attachments.replaceChildren(),o.Attachments.classList.toggle(`hidden`,!m.length),m.forEach((e,t)=>{let n=document.createElement(`figure`),r=document.createElement(`img`);r.src=e.data_url,r.alt=e.name;let i=document.createElement(`figcaption`);i.textContent=e.name,i.title=e.name;let a=document.createElement(`button`);a.type=`button`,a.textContent=`×`,a.setAttribute(`aria-label`,`移除图片 ${e.name}`),a.addEventListener(`click`,()=>{m.splice(t,1),A(),O(),T(),S(m.length?`还有 ${m.length} 张图片待发送。`:`已移除待发送图片。`)}),n.append(r,i,a),o.Attachments.append(n)})}async function te(e){if(d||h)S(`请等待当前请求处理完成后再添加图片。`,!0);else if(e.length){h=!0,O();try{Pu(e,m.length);let t=await Promise.all(Array.from(e,Fu));m.push(...t),A(),T(),S(u&&g!==`deepseek-flash`?`图片已添加。请在连接设置中切换为 DeepSeek Flash 并保存后发送。`:`已添加 ${t.length} 张图片，点击发送后才会传给 DeepSeek。`)}catch(e){S(e.message,!0)}finally{h=!1,O()}}}function j(e){return e?.total_tokens?`本次 ${e.total_tokens.toLocaleString()} tokens`:``}function ne(){if(o.Draft.open=!1,o.Draft.classList.toggle(`hidden`,!c),!c)return;o.DraftId.textContent=c.task_id;let e=c.operation===`update`;o.Validation.textContent=p?e?`已更新，可在左侧任务列表打开`:`已创建，可在左侧任务列表打开`:l.valid?`文件已通过校验`:e?`修改未保存，可继续对话修正`:`尚未创建，可继续对话修正`,o.Validation.className=l.valid?`passed`:`error`,o.Errors.replaceChildren();for(let e of l.errors||[]){let t=document.createElement(`li`);t.textContent=e,o.Errors.append(t)}o.File.replaceChildren();for(let e of Object.keys(c.files)){let t=document.createElement(`option`);t.value=e,t.textContent=e,o.File.append(t)}o.FileCount.textContent=`（${Object.keys(c.files).length}）`,o.FileContent.textContent=c.files[o.File.value],O()}async function re(){let e=o.Input.value.trim(),a=e||(m.length?`请分析图片中的题目或机构，帮助我明确建模条件和实验方案。`:``);if(!a||d||h||!u)return;if(g!==`deepseek-flash`&&(m.length||s.some(e=>e.images?.length))){o.Settings.open=!0,S(`图片理解需要 DeepSeek Flash，请切换模型并保存；或者新建纯文字对话。`,!0);return}let _=m,v={role:`user`,content:a,incomplete:!0,..._.length?{images:_}:{}};s.push(v),ee(`user`,a,!1,_),m=[],A(),o.Input.value=``,d=!0,f=new AbortController,O(),S(`DeepSeek 正在思考…`),w();let y=ee(`assistant`,`正在连接…`,!0),b=``,C=null;try{let{messages:e,omitted:a}=Lu(s.map(e=>e===v?{...e,incomplete:!1}:e),p&&i()?null:c,p?[]:l?.errors||[]),u=await Iu(await x(`/chat`,{method:`POST`,body:{messages:e,current_task_id:i()},signal:f.signal}),e=>{let t=o.Conversation.scrollHeight-o.Conversation.scrollTop-o.Conversation.clientHeight<100;b+=e,y.textContent=b,t&&(o.Conversation.scrollTop=o.Conversation.scrollHeight)},e=>{e.type===`status`&&S(e.message),e.type===`draft`&&(C=e),e.type===`task_error`&&(b+=`

程序结果：`+e.message)});if(C){if(c=C.draft,l=C.validation,p=!1,l.valid){f=null,O(),S(`正在保存任务…`);try{let e=C.operation===`update`,n=await(await x(e?`/tasks/${encodeURIComponent(c.task_id)}`:`/tasks`,{method:e?`PATCH`:`POST`,body:e?C.edit:c})).json();p=!0,n.task.base_revision&&(c.base_revision=n.task.base_revision),b+=`\n\n程序结果：已${e?`更新`:`创建`}任务「${n.task.title}」，可以在左侧打开。`;try{await t(n.task)}catch(e){r(`任务已保存，刷新列表后可打开。`+e.message)}}catch(e){l={valid:!1,errors:[e.message]}}}l.valid||(b+=`

程序结果：`+(c.operation===`update`?`修改未保存，原任务保留。`:`任务尚未创建。`)+`
`+l.errors.map(e=>`- `+e).join(`
`)+`
可以继续告诉我如何修改，或让我根据错误重试。`),ne()}b.trim()||(b=`本次未保存任务变更，可以继续描述你的需求。`),v.incomplete=!1,n(y,b),s.push({role:`assistant`,content:b}),S([j(u),a?`本次使用近期上下文，较早 ${a} 条消息仍可在上方查看。`:``].filter(Boolean).join(` · `))}catch(t){s.push({role:`assistant`,content:b||`未获得完整回答。`,incomplete:!0}),o.Input.value.trim()||(o.Input.value=e),m.length||(m=_,A()),y.textContent=b||`未获得完整回答。`,y.classList.add(`incomplete`),S(t.name===`AbortError`?`已停止等待；已发出的请求仍可能产生 API 费用。`:t.message,!0)}finally{d=!1,f=null,O(),w(),o.Input.focus()}}o.ChatForm.addEventListener(`submit`,e=>{e.preventDefault(),re()}),o.ChooseImages.addEventListener(`click`,()=>o.ImageFiles.click()),o.ImageFiles.addEventListener(`change`,()=>{te(Array.from(o.ImageFiles.files)),o.ImageFiles.value=``}),o.Input.addEventListener(`paste`,e=>{let t=Array.from(e.clipboardData?.items||[]).filter(e=>e.kind===`file`&&e.type.startsWith(`image/`)).map(e=>e.getAsFile()).filter(Boolean);t.length&&(e.preventDefault(),te(t))}),o.Input.addEventListener(`keydown`,e=>{e.key===`Enter`&&!e.shiftKey&&!e.isComposing&&(e.preventDefault(),re())}),o.Stop.addEventListener(`click`,()=>f?.abort()),o.File.addEventListener(`change`,()=>{o.FileContent.textContent=c?.files[o.File.value]||``}),document.addEventListener(`pointerdown`,e=>{o.Draft.contains(e.target)||(o.Draft.open=!1)}),a.addEventListener(`keydown`,e=>{e.key===`Escape`&&o.Draft.open&&(e.stopPropagation(),o.Draft.open=!1,o.Draft.querySelector(`summary`).focus())}),o.Example.addEventListener(`click`,()=>{o.Input.value=`我想创建一个单摆实验，比较不同初始角度下的周期。请先和我确认建模条件及需要观察的量。`,T(),o.Input.focus()}),o.Input.addEventListener(`input`,T),o.New.addEventListener(`click`,async()=>{d=!0,O();try{if(!await w())return;_=crypto.randomUUID(),E(),o.HistoryState.textContent=``,S(`新对话已开始；之前的对话可从历史列表恢复。`),o.Input.focus()}finally{d=!1,O()}}),o.History.addEventListener(`change`,async()=>{let e=o.History.value;if(!e)o.New.click();else{d=!0,O();try{await w()&&(await D(e),S(`对话已恢复；助手将以左侧当前选中任务为操作对象，也可在消息中指定任务编号。`))}catch(e){S(e.message,!0)}finally{d=!1,C()}}}),o.Delete.addEventListener(`click`,async()=>{if(window.confirm(`删除此对话及其图片、草稿？已创建的任务与实验结果会保留。此操作无法撤销。`)){d=!0,O(),clearTimeout(b);try{await y,await x(`/conversations/${_}`,{method:`DELETE`}),v=v.filter(e=>e.id!==_),_=crypto.randomUUID(),E(),o.HistoryState.textContent=``,S(`对话已删除，已创建的任务与实验结果保留。`)}catch(e){S(e.message,!0)}finally{d=!1,O()}}}),o.ConnectionForm.addEventListener(`submit`,async e=>{if(e.preventDefault(),!d){d=!0,O(),S(`正在保存连接设置…`);try{let e=await x(`/connection`,{method:`PUT`,body:{api_key:o.Key.value,model:o.Model.value,remember:o.Remember.checked}});o.Key.value=``,k(await e.json()),o.Settings.open=!1,S(`连接设置已保存。可测试连接，或直接开始对话。`)}catch(e){S(e.message,!0)}finally{d=!1,O()}}}),o.Test.addEventListener(`click`,async()=>{d=!0,O(),S(`正在验证 API Key 和模型访问权限…`);try{await x(`/connection/test`,{method:`POST`}),S(`连接成功，可以开始对话。`)}catch(e){S(e.message,!0)}finally{d=!1,O()}}),o.Forget.addEventListener(`click`,async()=>{d=!0,O();try{k(await(await x(`/connection`,{method:`DELETE`})).json()),o.Key.value=``,S(`已清除本次运行和本机保存的密钥。`)}catch(e){S(e.message,!0)}finally{d=!1,O()}});function M(){e(),window.innerWidth<=720&&document.getElementById(`collapseTasks`).click(),(u?o.Input:o.Key).focus()}return document.getElementById(`openAssistant`).addEventListener(`click`,M),O(),d=!0,O(),x(`/conversations`).then(e=>e.json()).then(async e=>{v=e.conversations,C(),v.length&&await D(v[0].id)}).catch(e=>S(e.message,!0)).finally(()=>{d=!1,O()}),x(`/connection`).then(e=>e.json()).then(k).catch(e=>{S(e.message,!0),r(e.message)}),{open:M,addImages:te}}function zu(e){let t=document.getElementById(`deleteTaskDialog`);return document.getElementById(`deleteTaskName`).textContent=e.title||e.id,t.returnValue=`cancel`,new Promise(e=>{t.addEventListener(`close`,()=>e(t.returnValue===`delete`),{once:!0}),t.showModal()})}function Bu(e){let t=e.mujoco,n=t.mjtState.mjSTATE_INTEGRATION.value,r=new t.DoubleBuffer(t.mj_stateSize(e.model,n));try{t.mj_getState(e.model,e.data,r,n);let i=Array.from(r.GetView());if(i.some(e=>!Number.isFinite(e)))throw Error(`起始状态含无效数值，请调整模型后重试。`);return i}finally{r.delete()}}var Vu=class{constructor(e,{parameters:t,duration:n,timestep:r,model_revision:i}){if(e.drag||e.posePrepared||Math.abs(e.getTime())>1e-12)throw Error(`请先准备姿态，再从 t=0 开始一次完整实验。`);this.request=structuredClone({parameters:t,duration:n,timestep:r,replay:{version:1,model_revision:i,initial_state:Bu(e),control_events:[],sample_steps:[]}}),this.completed=null}controlChanged(e){if(this.completed)return;let t=e.physicsStep||0,n={step:t,controls:Array.from(e.data.ctrl)},r=this.request.replay.control_events;if(r.at(-1)?.step===t)r[r.length-1]=n;else if(r.length<1e4)r.push(n);else throw Error(`本次实验中途调节次数过多，请重置后减少调节次数。`)}finish(e,t){if(this.completed)return this.completed;let{duration:n,timestep:r}=this.request,i=e.time.at(-1);if(!e.time.length||e.time[0]!==0||Math.abs(i-n)>1e-8)return null;let a=Math.ceil(n/r);return this.request.replay.sample_steps=e.time.map(e=>Math.abs(e-n)<1e-9?a:Math.round(e/r)),this.request.replay.control_events=this.request.replay.control_events.filter(e=>e.step<a),this.completed=structuredClone({request:this.request,series:e,units:t}),this.completed}};function Hu(e,t){let n=0,r=!0,i=e.series,a=t.series;if(i.time.length!==a.time.length)return{consistent:!1,maxAbsolute:1/0};for(let e of Object.keys(i)){if(!a[e]||a[e].length!==i[e].length)return{consistent:!1,maxAbsolute:1/0};i[e].forEach((t,i)=>{let o=a[e][i],s=Math.abs(t-o);t==null||o==null||!Number.isFinite(s)?r=!1:(n=Math.max(n,s),s>1e-8+1e-6*Math.max(Math.abs(t),Math.abs(o))&&(r=!1))})}return{consistent:r,maxAbsolute:n}}Tu();var Q={tasks:[],task:null,viewer:null,viewerReady:!1,simulationStarted:!1,simulationCompleted:!1,parametersDirty:!1,series:{time:[]},seriesUnits:{time:`s`},visibleSeries:new Set,actuatorControlsByTask:new Map,viewerTaskId:null,modelLoadVersion:0,chartFrameId:null,selectionVersion:0,batch:null,seriesMode:`realtime`,modelLoading:!1,runtimeRows:[],experiment:null,appliedInputs:null},$=Object.fromEntries(`taskSidebar.collapseTasks.expandTasks.refreshTasks.taskList.engineBadge.taskTitle.simTime.toggleInspector.mujocoViewport.viewerLoading.resetButton.stepButton.playButton.cameraMode.panMode.dragMode.contactButton.homeCameraButton.shadowButton.lightingButton.selectionLabel.inspector.closeInspector.parameterForm.durationInput.timestepInput.applyParameters.runButton.clearData.exportData.chartStack.dataSource.resultHistory.cancelRun.jointControls.actuatorControls.taskQuestion.topicTags.taskNotes.message.taskResizeHandle.inspectorResizeHandle`.split(`.`).map(e=>[e,document.getElementById(e)])),Uu=new gu($.chartStack,Q),Wu=new Ou(()=>Q.viewer,()=>Q.task,()=>{if(Q.parametersDirty)throw Error(`请先应用参数，再更新加载曲线。`);return Qu().duration}),Gu=new yu($.jointControls,{getViewer:()=>Q.viewerTaskId===Q.task?.id?Q.viewer:null,canEdit:()=>!Q.modelLoading&&!Q.parametersDirty&&!Q.batch&&!Q.viewer?.drag,onBlocked:()=>Ju(`请先应用模型参数或等待计算完成，再调整关节。`,!0),onChange:()=>{Q.seriesMode!==`preparing`&&Sd(`preparing`),fd(),Wu.refresh(),$.dataSource.textContent=`关节姿态已调整，点击开始仿真后计时并采集数据。`},onReset:()=>{Sd(`preparing`),pd(),Q.viewer.prepareJointPose(),fd(),Wu.refresh(),$.dataSource.textContent=`已恢复任务初始姿态，点击开始仿真后采集数据。`}}),Ku,qu=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);function Ju(e,t=!1){clearTimeout(Ku),$.message.textContent=e,$.message.classList.toggle(`hidden`,!e),$.message.classList.toggle(`error`,t),e&&(Ku=window.setTimeout(()=>$.message.classList.add(`hidden`),t?1e4:5e3))}async function Yu(e,t){let n=await fetch(e,t),r=await n.text(),i;try{i=JSON.parse(r)}catch{throw Error(`服务返回异常（${n.status}），请查看启动窗口。`)}if(!n.ok)throw Error(typeof i.detail==`string`?i.detail:`输入无效，请检查参数和数值范围。`);return i}function Xu(e){document.querySelectorAll(`.tab`).forEach(t=>{let n=t.dataset.tab===e;t.classList.toggle(`active`,n),t.setAttribute(`aria-selected`,String(n)),t.tabIndex=n?0:-1}),document.querySelectorAll(`.tab-panel`).forEach(t=>t.classList.toggle(`active`,t.dataset.panel===e)),$.inspector.classList.remove(`collapsed`),e===`data`&&Uu.draw(),e===`parameters`&&(Gu.sync(!0),Wu.charts?.draw())}function Zu(e){let t=!!(Q.modelLoading||Q.batch||!Q.task);for(let e of[...$.parameterForm.querySelectorAll(`input`),$.durationInput,$.timestepInput,$.applyParameters])e.disabled=t;document.querySelectorAll(`#app [data-overlay]`).forEach(t=>{t.disabled=!e;let n=Q.viewer?.overlays?.options[t.dataset.overlay]??t.dataset.overlay===`loads`;t.classList.toggle(`active`,n),t.setAttribute(`aria-pressed`,String(n))});for(let t of[$.resetButton,$.stepButton,$.playButton,$.contactButton,$.homeCameraButton,$.shadowButton,$.lightingButton])t.disabled=!e;if(e)for(let[e,t]of[[$.shadowButton,Q.viewer.shadowsEnabled],[$.lightingButton,Q.viewer.lightingEnabled]])e.classList.toggle(`active`,!!t),e.setAttribute(`aria-pressed`,String(!!t));Gu.sync(!0),yd()}function Qu(){let e=Number($.durationInput.value),t=Number($.timestepInput.value);if(!$.durationInput.value||!Number.isFinite(e)||e<=0||e>3600)throw Error(`仿真时长应大于 0 且不超过 3600 秒。`);if(!$.timestepInput.value||!Number.isFinite(t)||t<1e-5)throw Error(`时间步长至少为 0.00001 秒。`);if(Math.ceil(e/t)>1e6)throw Error(`单次实验最多 1000000 步，请缩短时长或增大步长。`);return{duration:e,timestep:t}}async function $u(){try{Q.viewer=new uu($.mujocoViewport,{onTime:e=>{$.simTime.textContent=`t = ${e.toFixed(3)} s`,Gu.sync()},onSample:xd,onSelection:e=>{$.selectionLabel.textContent=e?`已选中 ${e}`:``},onBeforeDrag:()=>Q.modelLoading||Q.batch||Q.parametersDirty?(Ju(`请先应用参数或等待批量计算完成，再拖动调整姿态。`,!0),!1):!0,onDragStart:()=>{Wu.invalidate(`松开物体后重新计算加载曲线。`),Sd(`preparing`),fd(),Zu(!1),$.dataSource.textContent=`正在拖动调整姿态，不计时、不采集数据。`},onDragEnd:()=>{Wu.refresh(),fd(),Zu(!Q.modelLoading&&!Q.batch),yd(),$.dataSource.textContent=`姿态已调整，点击开始仿真后才计时并采集数据。`},onPausedChange:e=>{e||(Xu(`data`),Q.simulationStarted=!0,Q.simulationCompleted=!1),dd()},onComplete:(e,t)=>{Q.simulationStarted=!0,Q.simulationCompleted=!0,dd(),Ju(`仿真完成：${t.toFixed(3)} s，可选择导出网页数据或后台重算。`)},onError:e=>Ju(e,!0)}),await Q.viewer.init(),Q.viewerReady=!0,$.engineBadge.textContent=`MuJoCo 3.13`,$.engineBadge.classList.remove(`loading`),$.engineBadge.classList.add(`ready`),Q.task?await ud():$.viewerLoading.innerHTML=`<strong>选择任务，开始实验</strong><span>从左侧载入任务，或拖入 XML 预览模型。</span>`}catch(e){$.viewerLoading.innerHTML=`<strong>物理引擎启动失败</strong><span>${qu(e.message)}</span>`,$.engineBadge.textContent=`启动失败`,Ju(e.message,!0)}}async function ed(){Q.tasks=(await Yu(`/api/tasks`)).tasks||[],nd()}var td=null;function nd(){if($.taskList.replaceChildren(),document.getElementById(`taskCount`).textContent=String(Q.tasks.length).padStart(2,`0`),!Q.tasks.length){let e=document.createElement(`p`);e.className=`empty-state`,e.textContent=`暂无学习任务`,$.taskList.append(e)}else for(let e of Q.tasks){let t=document.createElement(`div`);t.className=`task-entry ${Q.task?.id===e.id?`active`:``}`;let n=document.createElement(`button`);n.type=`button`,n.className=`task-item`,n.textContent=e.title||e.id,Q.task?.id===e.id&&n.setAttribute(`aria-current`,`true`),n.addEventListener(`click`,()=>id(e.id));let r=document.createElement(`button`);r.type=`button`,r.className=`rename-task`,r.innerHTML=wu(`edit`),r.title=`修改任务标题`,r.setAttribute(`aria-label`,`修改${e.title||e.id}的标题`),r.addEventListener(`click`,()=>{let n=document.createElement(`input`);n.value=e.title||e.id,n.maxLength=80,n.setAttribute(`aria-label`,`任务新标题`);let r=document.createElement(`button`);r.type=`button`,r.textContent=`保存`;let i=document.createElement(`button`);i.type=`button`,i.textContent=`取消`,i.addEventListener(`click`,nd);let a=async()=>{if(!n.value.trim())Ju(`标题不能为空。`,!0),n.focus();else{r.disabled=!0,i.disabled=!0,n.disabled=!0;try{let t=await Yu(`/api/tasks/${e.id}/title`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify({title:n.value.trim()})});e.title=t.title,Q.task?.id===e.id&&(Q.task.task.title=t.title,$.taskTitle.textContent=t.title),nd(),Ju(`标题已保存，下次打开仍会使用新标题。`)}catch(e){Ju(e.message,!0),r.disabled=!1,i.disabled=!1,n.disabled=!1}}};r.addEventListener(`click`,a),n.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),a()),e.key===`Escape`&&nd()}),t.classList.add(`editing`),t.replaceChildren(n,r,i),n.focus(),n.select()});let i=document.createElement(`button`);i.type=`button`,i.className=`delete-task`,i.innerHTML=wu(`trash`),i.title=`删除整个任务`,i.setAttribute(`aria-label`,`删除${e.title||e.id}`),i.disabled=!!td,i.addEventListener(`click`,()=>rd(e)),t.append(n,r,i),$.taskList.append(t)}}async function rd(e){if(!td){td=e.id,nd();try{if(!await zu(e))return;let t=await Yu(`/api/tasks/${encodeURIComponent(e.id)}`,{method:`DELETE`,headers:{"Content-Type":`application/json`,"X-VMAIL-Assistant":`1`},body:JSON.stringify({confirm_task_id:e.id})}),n=Q.task?.id===e.id;if(n&&(++Q.selectionVersion,++Q.modelLoadVersion),await ed(),n&&Q.task?.id===e.id){if(Q.tasks.length)await id(Q.tasks[0].id);else{Wu.clear(),Q.viewer?.clearDrag(),Q.viewer?.setPaused(!0),Q.viewer?.setSuspended(!0),Q.task=null,Q.viewerTaskId=null,Q.modelLoading=!1,Q.parametersDirty=!1,Q.runtimeRows=[],Uu.rebuild(),Sd(),Zu(!1),$.mujocoViewport.classList.add(`hidden`),$.viewerLoading.innerHTML=`<strong>暂无学习任务</strong><span>可以在 AI 助手中创建新任务。</span>`,$.viewerLoading.classList.remove(`hidden`),$.taskTitle.textContent=`选择一个学习任务`,$.taskQuestion.textContent=`从左侧选择任务，或与 AI 助手对话创建。`;for(let e of[$.taskNotes,$.topicTags,$.parameterForm,$.actuatorControls,$.resultHistory])e.replaceChildren();Gu.render([]),$.applyParameters.disabled=!0,$.runButton.disabled=!0}}Ju(t.files_deleted?`任务及全部文件已删除。`:`任务已移出列表，部分文件被占用，需手动清理：${t.cleanup_path}`,!t.files_deleted)}catch(e){Ju(e.message,!0)}finally{td=null,nd()}}}async function id(e){$.mujocoViewport.classList.remove(`hidden`),Q.viewer?.setSuspended(!1),Wu.clear();let t=++Q.selectionVersion;++Q.modelLoadVersion,Q.modelLoading=!0,Q.viewer?.setPaused(!0),Zu(!1),cd(),Q.batch&&await Ed();try{let n=await Yu(`/api/tasks/${encodeURIComponent(e)}`);if(t!==Q.selectionVersion)return;Q.task=n,Q.parametersDirty=!1,Q.seriesUnits={time:`s`},nd(),ad(),bd(),Uu.rebuild(),Sd(),Xu(`task`),Q.viewerReady&&await ud(),Td()}catch(e){if(t!==Q.selectionVersion)return;Q.modelLoading=!1,Zu(!!Q.viewer?.model&&Q.viewerTaskId===Q.task?.id&&!Q.parametersDirty&&!Q.batch),Ju(e.message,!0)}}function ad(){let e=Q.task;Gu.render([]),$.taskTitle.textContent=e.task.title||e.id,$.taskQuestion.textContent=e.task.question||`请补充研究问题。`,n($.taskNotes,e.notes),$.durationInput.value=e.task.simulation?.duration??5,$.timestepInput.value=e.task.simulation?.timestep??.01,$.topicTags.replaceChildren();for(let t of e.task.theory_topics||[]){let e=document.createElement(`span`);e.textContent=t,$.topicTags.append(e)}od(),$.applyParameters.disabled=!1,$.runButton.disabled=!0}function od(){let e=Q.task.parameters.parameters||{},t=Q.task.ui.layout?.parameter_groups||[{title:`模型参数`,parameters:Object.keys(e)}];$.parameterForm.replaceChildren();for(let n of t){let t=document.createElement(`fieldset`),r=document.createElement(`legend`);r.textContent=n.title||`模型参数`,t.append(r);for(let r of n.parameters||[]){let n=e[r];if(!n)continue;let i=document.createElement(`label`);i.className=`parameter-row`,i.innerHTML=`<span><strong>${qu(n.label||fu(r))}</strong><small>${qu(n.description||``)}</small></span><span class="input-unit"><input name="${qu(r)}" type="number" value="${Number(n.value??0)}" step="any" required /><em>${qu(n.unit||`1`)}</em></span>`;let a=i.querySelector(`input`);n.min!=null&&(a.min=n.min),n.max!=null&&(a.max=n.max),t.append(i)}$.parameterForm.append(t)}}function sd(){let e={};for(let t of $.parameterForm.querySelectorAll(`input`)){if(!t.value.trim()||!Number.isFinite(Number(t.value))||!t.checkValidity())throw Xu(`parameters`),t.reportValidity(),t.focus(),Error(`请检查${Q.task.parameters.parameters[t.name]?.label||fu(t.name)}的数值和范围。`);e[t.name]=Number(t.value)}return e}function cd(){Q.viewerTaskId&&Q.viewer&&Q.actuatorControlsByTask.set(Q.viewerTaskId,Q.viewer.getActuatorControlValues())}function ld(){let e=Object.fromEntries(Object.entries(Q.task.ui.controls?.actuators||{}).map(([e,t])=>[e,t.value??0]));Q.viewer.setActuatorControlValues({...e,...Q.actuatorControlsByTask.get(Q.task.id)||{}}),cd()}async function ud(){if(!Q.task||!Q.viewerReady)return!1;Wu.invalidate(`载入模型后更新加载曲线。`);let e=Q.task,t=++Q.modelLoadVersion;Q.modelLoading=!0,Q.viewer.setPaused(!0),$.viewerLoading.classList.remove(`hidden`),$.viewerLoading.innerHTML=`<strong>正在载入模型</strong><span>请稍候</span>`;try{cd();let{duration:n,timestep:r}=Qu(),i=sd();Zu(!1);let a=await Yu(`/api/tasks/${e.id}/browser-model`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({parameters:i,timestep:r,duration:n})});if(t!==Q.modelLoadVersion||Q.task!==e||(Q.seriesMode=`loading`,Q.appliedInputs={parameters:i,duration:n,timestep:r,model_revision:a.model_revision},await Q.viewer.loadModel(a.xml,a.initial_state,a.observe,a.assets,e.ui.camera,a.joint_limits,a.load_program),t!==Q.modelLoadVersion||Q.task!==e))return!1;Q.viewer.setActuatorLoadVisibility(e.ui.controls?.actuators||{}),Q.viewerTaskId=e.id,Q.seriesUnits=Q.viewer.getObservationUnits(),ld(),Sd();for(let e of Object.keys(a.load_program?.units||{}))Q.visibleSeries.add(e);return Uu.rebuild(),Q.viewer.setDuration(n),Q.viewer.reset(!0),vd(),Q.parametersDirty=!1,Q.modelLoading=!1,fd(),Zu(!Q.batch),$.viewerLoading.classList.add(`hidden`),!0}catch(n){return t!==Q.modelLoadVersion||Q.task!==e||(Q.modelLoading=!1,Q.parametersDirty=!0,Zu(!1),$.viewerLoading.innerHTML=`<strong>模型载入失败</strong><span>${qu(n.message)}</span>`,Ju(n.message,!0)),!1}}function dd(){let e=Q.viewer&&!Q.viewer.paused;$.playButton.textContent=e?`暂停仿真`:Q.simulationCompleted?`重新开始`:Q.simulationStarted?`继续仿真`:`开始仿真`,$.playButton.classList.toggle(`active`,!!e),$.playButton.setAttribute(`aria-pressed`,String(!!e))}function fd(){Q.simulationStarted=!1,Q.simulationCompleted=!1,Q.viewer?.setPaused(!0),dd()}function pd(){cd(),Q.viewer.reset(!0),ld(),Q.viewer.emitSample(!0),yd()}function md(){let e=Q.experiment?.completed||Q.experiment;if(!e){Sd(),pd(),fd();return}let t=Q.viewer,n=t.getActuatorControlValues();Sd(),t.clearDrag(),t.posePrepared=!1,t.loadFailed=!1,t.mujoco.mj_setState(t.model,t.data,e.request.replay.initial_state,t.mujoco.mjtState.mjSTATE_INTEGRATION.value),t.physicsStep=0,t.timeAccumulator=0,t.lastSampleTime=-1/0,t.nextSampleTime=0,t.completionNotified=!1,t.model.opt.timestep=t.configuredTimestep,t.setActuatorControlValues(n),t.mujoco.mj_forward(t.model,t.data),t.updateScene(),t.emitSample(!0),fd()}function hd(){Q.experiment||(Q.experiment=new Vu(Q.viewer,Q.appliedInputs),Q.viewer.emitSample(!0))}function gd(e){let t=new DOMParser().parseFromString(Q.task.model_xml,`application/xml`),n=[...t.querySelectorAll(`actuator > *`)].find(t=>t.getAttribute(`name`)===e),r=[...t.querySelectorAll(`joint`)].find(e=>e.getAttribute(`name`)===n?.getAttribute(`joint`))?.getAttribute(`type`)!==`slide`;return n?.tagName===`velocity`?r?`rad/s`:`m/s`:n?.tagName===`position`?r?`rad`:`m`:`1`}function _d(e,t){let n=document.createElement(`label`);n.className=`runtime-control`,n.innerHTML=`<span><strong>${qu(e.label||fu(e.name))}</strong><small>${qu(e.unit)}</small></span><input class="runtime-slider" type="range" min="${e.min}" max="${e.max}" step="any" value="${e.value}"/><input class="runtime-number" type="number" min="${e.min}" max="${e.max}" step="any" value="${e.value}" aria-label="${qu(e.label||fu(e.name))}"/>`;let r=n.querySelector(`.runtime-slider`),i=n.querySelector(`.runtime-number`),a=n=>{if(n===``||!Number.isFinite(Number(n))){i.value=r.value;return}let a=Math.min(e.max,Math.max(e.min,Number(n)));r.value=a,i.value=a,t(a)};return r.addEventListener(`input`,()=>a(r.value)),i.addEventListener(`change`,()=>a(i.value)),i.addEventListener(`input`,()=>{if(i.value!==``&&Number.isFinite(Number(i.value))){let n=Math.min(e.max,Math.max(e.min,Number(i.value)));r.value=n,t(n)}}),i.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),a(i.value),i.blur())}),Q.runtimeRows.push({item:e,slider:r,number:i}),n}function vd(){Wu.clear(),Q.runtimeRows=[];let e=Q.viewer.getInteractiveControls();$.actuatorControls.innerHTML=e.actuators.length?`<h2>执行器</h2>`:``;let t=Q.task.ui.controls||{};Gu.render(e.joints,t.joint_note||``);let n=new Set((Q.viewer.loadProgram?.entries||[]).filter(e=>e.type===`actuator`).map(e=>e.index));for(let r of e.actuators){let e=t.actuators?.[r.name]||{};Object.assign(r,{label:e.label||fu(r.name),unit:e.unit||gd(r.name),automatic:n.has(r.id)});let i=_d(r,e=>{Q.viewer.setActuatorControl(r.id,e),Q.experiment?.controlChanged(Q.viewer),cd(),Q.viewer.mujoco.mj_forward(Q.viewer.model,Q.viewer.data),Q.viewer.emitSample(!0),Wu.refresh()});n.has(r.id)&&(i.querySelectorAll(`input`).forEach(e=>e.disabled=!0),i.title=`由任务载荷函数自动控制`),$.actuatorControls.append(i)}let r=Q.viewer.loadProgram?.entries||[];if(r.length){let e=document.createElement(`h2`);e.textContent=`自动加载`,$.actuatorControls.append(e);for(let e of r){let t=e.source,n=document.createElement(`section`);n.className=`load-rule`;let r=document.createElement(`strong`);r.textContent=e.label;let i=document.createElement(`p`);i.textContent=e.type===`wrench`?`${t.site?`作用点`:`刚体`} · ${fu(t.site||t.body)} · ${e.frame===`body`?`物体坐标系`:`世界坐标系`}`:`${e.type===`joint`?`关节载荷`:`执行器输入`} · ${fu(t.joint||t.actuator)} · ${t.unit}`;let a=document.createElement(`div`);a.className=`load-math`,Du(a,e),n.append(r,i,a),$.actuatorControls.append(n)}let t=document.createElement(`p`);t.className=`field-help`,t.textContent=`按仿真时间自动加载，载荷曲线在“数据”中查看。规律由任务 loads.yaml 定义，幅值等参数在“参数”中修改。`,$.actuatorControls.append(t),Wu.mount($.actuatorControls)}if(!e.actuators.length&&!r.length){let e=document.createElement(`p`);e.className=`empty-state`,e.textContent=`本任务没有运动控制量。`,$.actuatorControls.append(e)}}function yd(){Gu.sync();for(let{item:e,slider:t,number:n}of Q.runtimeRows){if(t.disabled=n.disabled=!!(e.automatic||Q.modelLoading||Q.parametersDirty||Q.batch||Q.viewerTaskId!==Q.task?.id),document.activeElement===t||document.activeElement===n)continue;let r=Q.viewer.data?.ctrl[e.id];t.value=r,n.value=Number(Number(r).toFixed(5))}}function bd(){Q.visibleSeries=new Set((Q.task?.ui.layout?.charts||[]).flatMap(e=>e.series||[]))}function xd(e){if(!Q.task||Q.seriesMode!==`realtime`||Q.batch||Q.experiment?.completed)return;Q.series.time.length&&e.time<Q.series.time.at(-1)-1e-9&&Sd();let t=Q.series.time.length&&Math.abs(e.time-Q.series.time.at(-1))<1e-12;t||Q.series.time.push(e.time);let n=Q.series.time.length;for(let r of new Set([...Object.keys(Q.series).filter(e=>e!==`time`),...Object.keys(e.values)])){Q.series[r]||(Q.series[r]=Array(n-1).fill(null));let i=e.values[r];t?Q.series[r][n-1]=Number.isFinite(i)?i:null:Q.series[r].push(Number.isFinite(i)?i:null)}Q.chartFrameId===null&&(Q.chartFrameId=requestAnimationFrame(()=>{Q.chartFrameId=null,Uu.draw(),yd()})),Q.simulationCompleted&&Q.experiment?.finish(Q.series,Q.seriesUnits),$.exportData.disabled=!Q.experiment?.completed,$.runButton.disabled=!Q.experiment?.completed,$.dataSource.textContent=`网页实验 · t = ${e.time.toFixed(3)} s${Q.experiment?.completed?` · 已完成，可导出或后台重算`:` · 完成后可导出`}`}function Sd(e=`realtime`){Q.chartFrameId!==null&&cancelAnimationFrame(Q.chartFrameId),Q.chartFrameId=null,Q.series={time:[]},Q.seriesMode=e,Q.experiment=null,Uu.viewRange=null,Uu.hoverTime=null,Uu.cursorPinned=!1,Uu.draw(),$.exportData.disabled=!0,$.runButton.disabled=!0,$.dataSource.textContent=`请先完成一次网页仿真，再选择导出方式。`}function Cd(){let e=Q.experiment?.completed;if(!e)return;let t=e.series,n=t.time,r=Object.keys(t).filter(e=>e!==`time`),i=e=>e==null?``:`"${String(e).replaceAll(`"`,`""`)}"`,a=t=>`${t} [${e.units[t]||`1`}]`,o=[[a(`time`),...r.map(a)].map(i).join(`,`)];n.forEach((e,n)=>o.push([e,...r.map(e=>t[e][n])].map(i).join(`,`)));let s=URL.createObjectURL(new Blob([`﻿`,o.join(`\r
`)],{type:`text/csv;charset=utf-8`})),c=document.createElement(`a`);c.href=s,c.download=`${Q.task.id}_web_${new Date().toISOString().replaceAll(`:`,`-`)}.csv`,c.click(),setTimeout(()=>URL.revokeObjectURL(s),1e3)}function wd(){if(!Q.experiment?.completed||Q.batch){Ju(`请先完成一次网页仿真。`,!0);return}let e=document.getElementById(`exportExperimentDialog`);e.returnValue=`cancel`,e.addEventListener(`close`,()=>{e.returnValue===`web`?Cd():e.returnValue===`native`&&Dd()},{once:!0}),e.showModal()}async function Td(){let e=Q.task;if(e)try{let t=await Yu(`/api/tasks/${e.id}/results`);if(Q.task!==e)return;$.resultHistory.replaceChildren(),t.runs.length||($.resultHistory.textContent=`尚未保存实验。`);for(let e of t.runs){let t=document.createElement(`a`);t.href=e.download,t.download=``,t.textContent=`下载 ${e.run_id.replace(`run_`,``)}`,$.resultHistory.append(t)}}catch(e){Ju(e.message,!0)}}async function Ed(){let e=Q.batch;if(e){e.cancelled=!0;try{await Yu(`/api/runs/${e.token}/cancel`,{method:`POST`})}catch(e){Ju(e.message,!0)}}}async function Dd(){if(Q.batch||!Q.task||Q.modelLoading)return;let e=Q.experiment?.completed;if(!e){Ju(`请先完成一次网页仿真，再按本次实验条件后台重算。`,!0);return}let t,n;try{let r=Q.task.id,i=Q.selectionVersion;Q.viewer?.setPaused(!0),t={token:crypto.randomUUID(),cancelled:!1},Q.batch=t,$.runButton.disabled=!0,$.exportData.disabled=!0,$.runButton.textContent=`计算中…`,$.cancelRun.classList.remove(`hidden`),Zu(!1),$.dataSource.textContent=`后台重算中：继承本次实验参数、调整后的起始姿态与控制记录…`,n=setInterval(async()=>{if(Q.batch===t)try{let e=await Yu(`/api/runs/${t.token}`);Q.batch===t&&($.runButton.textContent=`计算中 ${Math.round(e.progress*100)}%`)}catch{}},700);let a=await Yu(`/api/tasks/${r}/simulate`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({...e.request,run_token:t.token})});if(t.cancelled||i!==Q.selectionVersion||Q.task?.id!==r)return;if(e!==Q.experiment?.completed){Ju(`实验准备条件已改变；刚才的重算结果已保存，可在已保存的实验中下载。`),Td();return}let o=Hu(e,a);$.dataSource.textContent=`本次后台重算已保存 · ${o.consistent?`与网页采样在容差内一致`:`与网页存在超出容差的差异，请检查接触、步长和求解设置`} · 网页曲线保留`;let s=document.createElement(`a`);s.href=`/api/tasks/${r}/results/${a.saved.run_id}/data.csv`,s.download=``,s.click(),Ju(`后台重算完成，CSV 已下载，结果及实验条件已保存。`,!o.consistent),Td()}catch(t){e===Q.experiment?.completed&&($.dataSource.textContent=`后台重算未完成，网页记录保留，可重试或导出网页数据。`),Ju(t.message,!0)}finally{clearInterval(n),t&&Q.batch===t&&(Q.batch=null,$.cancelRun.classList.add(`hidden`),$.runButton.disabled=!Q.experiment?.completed,$.exportData.disabled=!Q.experiment?.completed,$.runButton.textContent=`后台重算`,Zu(!!Q.viewer?.model&&!Q.modelLoading&&Q.viewerTaskId===Q.task?.id))}}function Od(e){Q.viewer?.setMode(e),$.cameraMode.classList.toggle(`active`,e===`camera`),$.panMode.classList.toggle(`active`,e===`pan`),$.dragMode.classList.toggle(`active`,e===`drag`)}function kd(){let e=document.documentElement,t=[{handle:$.taskResizeHandle,panel:$.taskSidebar,other:$.inspector,property:`--task-sidebar-width`,storage:`vmail-task-sidebar-width`,initial:244,min:180,max:420,direction:1},{handle:$.inspectorResizeHandle,panel:$.inspector,other:$.taskSidebar,property:`--inspector-width`,storage:`vmail-inspector-width`,initial:380,min:300,max:620,direction:-1}],n=(t,n)=>{let r=t.other.classList.contains(`collapsed`)?0:t.other.getBoundingClientRect().width,i=Math.max(t.min,window.innerWidth-r-420),a=Math.round(Math.min(t.max,i,Math.max(t.min,n)));return e.style.setProperty(t.property,`${a}px`),a};for(let e of t){try{let t=Number(localStorage.getItem(e.storage));Number.isFinite(t)&&t>0&&n(e,t)}catch{}e.handle.addEventListener(`pointerdown`,t=>{if(t.button!==0||window.matchMedia(`(max-width: 1080px)`).matches)return;t.preventDefault();let r=t.clientX,i=e.panel.getBoundingClientRect().width;e.handle.setPointerCapture(t.pointerId),e.handle.classList.add(`active`),document.body.classList.add(`resizing-sidebar`);let a=t=>{n(e,i+(t.clientX-r)*e.direction)},o=()=>{e.handle.classList.remove(`active`),document.body.classList.remove(`resizing-sidebar`),e.handle.removeEventListener(`pointermove`,a),e.handle.removeEventListener(`pointerup`,o),e.handle.removeEventListener(`pointercancel`,o);try{localStorage.setItem(e.storage,String(Math.round(e.panel.getBoundingClientRect().width)))}catch{}};e.handle.addEventListener(`pointermove`,a),e.handle.addEventListener(`pointerup`,o),e.handle.addEventListener(`pointercancel`,o)}),e.handle.addEventListener(`dblclick`,()=>{n(e,e.initial);try{localStorage.removeItem(e.storage)}catch{}})}}document.querySelectorAll(`.tab`).forEach(e=>e.addEventListener(`click`,()=>Xu(e.dataset.tab))),document.querySelector(`.tabs`).addEventListener(`keydown`,e=>{let t=[...document.querySelectorAll(`.tab`)],n=t.indexOf(document.activeElement);if(n<0||![`ArrowLeft`,`ArrowRight`,`Home`,`End`].includes(e.key))return;e.preventDefault();let r=e.key===`Home`?0:e.key===`End`?t.length-1:(n+(e.key===`ArrowRight`?1:-1)+t.length)%t.length;Xu(t[r].dataset.tab),t[r].focus()}),$.refreshTasks.addEventListener(`click`,()=>ed().catch(e=>Ju(e.message,!0))),$.applyParameters.addEventListener(`click`,()=>{Q.batch||ud()});function Ad(){Q.parametersDirty=!0,Q.viewer?.setPaused(!0),Sd(`preparing`),fd(),Gu.sync(!0),Wu.invalidate(`应用参数后更新加载曲线。`)}$.parameterForm.addEventListener(`input`,Ad),$.timestepInput.addEventListener(`input`,Ad),$.durationInput.addEventListener(`input`,Ad),$.runButton.addEventListener(`click`,Dd),$.cancelRun.addEventListener(`click`,Ed),$.clearData.addEventListener(`click`,()=>{!Q.batch&&Q.viewer?.model&&Q.viewerTaskId===Q.task?.id&&(md(),Wu.refresh())}),$.exportData.addEventListener(`click`,wd),$.resetButton.addEventListener(`click`,()=>{Sd(),pd(),fd(),Wu.refresh()}),$.stepButton.addEventListener(`click`,async()=>{try{if(Qu(),Q.parametersDirty&&!await ud())return;Q.viewer.posePrepared&&(Sd(),Q.viewer.beginPreparedExperiment()),Q.simulationCompleted&&md(),hd(),Q.viewer.setPaused(!0),Q.viewer.step(),Q.simulationStarted=!0,dd(),Xu(`data`)}catch(e){Ju(e.message,!0)}}),$.playButton.addEventListener(`click`,async()=>{try{if(Q.modelLoading||Q.batch||!Q.viewer?.model)return;if(!Q.viewer.paused){Q.viewer.setPaused(!0);return}let{duration:e}=Qu();if(Q.parametersDirty&&!await ud())return;Q.viewer.posePrepared?(Sd(),Q.viewer.beginPreparedExperiment()):Q.simulationCompleted&&md(),hd(),Q.viewer.setDuration(e),Q.simulationStarted=!0,Q.simulationCompleted=!1,Q.viewer.setPaused(!1),Xu(`data`)}catch(e){Ju(e.message,!0)}}),$.cameraMode.addEventListener(`click`,()=>Od(`camera`)),$.panMode.addEventListener(`click`,()=>Od(`pan`)),$.dragMode.addEventListener(`click`,()=>Od(`drag`)),$.contactButton.addEventListener(`click`,()=>$.contactButton.classList.toggle(`active`,Q.viewer.toggleContacts())),document.querySelectorAll(`#app [data-overlay]`).forEach(e=>e.addEventListener(`click`,()=>{let t=Q.viewer.setOverlay(e.dataset.overlay,e.getAttribute(`aria-pressed`)!==`true`);e.classList.toggle(`active`,t),e.setAttribute(`aria-pressed`,String(t))})),$.shadowButton.addEventListener(`click`,()=>{let e=Q.viewer.setShadows(!Q.viewer.shadowsEnabled);$.shadowButton.classList.toggle(`active`,e),$.shadowButton.setAttribute(`aria-pressed`,String(e))}),$.lightingButton.addEventListener(`click`,()=>{let e=Q.viewer.setLighting(!Q.viewer.lightingEnabled);$.lightingButton.classList.toggle(`active`,e),$.lightingButton.setAttribute(`aria-pressed`,String(e))}),$.homeCameraButton.addEventListener(`click`,()=>Q.viewer.homeCamera()),$.collapseTasks.addEventListener(`click`,()=>{$.taskSidebar.classList.add(`collapsed`),$.expandTasks.classList.remove(`hidden`)}),$.expandTasks.addEventListener(`click`,()=>{$.taskSidebar.classList.remove(`collapsed`),$.expandTasks.classList.add(`hidden`)}),$.toggleInspector.addEventListener(`click`,()=>$.inspector.classList.toggle(`collapsed`)),$.closeInspector.addEventListener(`click`,()=>$.inspector.classList.add(`collapsed`)),window.addEventListener(`keydown`,e=>{e.target.matches(`input,textarea,select,[contenteditable]`)||e.code!==`Space`||(e.preventDefault(),$.playButton.click())}),window.addEventListener(`beforeunload`,()=>Q.viewer?.dispose()),kd();var jd=Ru({getTask:()=>Q.task?.id||null,onOpen:()=>{Q.viewer?.setPaused(!0),Xu(`assistant`)},onCreated:async e=>{await ed(),Q.batch||(await id(e.id),Xu(`assistant`)),Ju(`已${e.updated?`更新`:`创建`}任务：${e.title}`)},onError:e=>Ju(e,!0)}),Md=$u(),Nd=Su({openButton:document.getElementById(`openPreview`),getEngine:async()=>{if(await Md,!Q.viewerReady)throw Error(`MuJoCo 引擎尚未就绪，请刷新页面后重试。`);return Q.viewer.mujoco},onEnter:()=>{Q.viewer?.clearDrag(),Q.viewer?.setPaused(!0),Q.viewer?.setSuspended(!0)},onExit:()=>{Q.viewer?.setSuspended(!1),Q.viewer?.resize()},onError:e=>Ju(e,!0)});Mu({onXml:e=>Nd.loadFiles(e),onImages:e=>{Nd.close(),jd.open(),jd.addImages(e)},onError:e=>Ju(e,!0)}),Promise.all([Md,ed()]).catch(e=>Ju(e.message,!0));