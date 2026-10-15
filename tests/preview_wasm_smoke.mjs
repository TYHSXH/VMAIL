import fs from "node:fs";
import loadMujoco from "@mujoco/mujoco";

const mj = await loadMujoco();
for (const path of process.argv.slice(2)) {
  const payload = JSON.parse(fs.readFileSync(path, "utf8"));
  const vfs = new mj.MjVFS();
  let model, data;
  try {
    for (const [name, encoded] of Object.entries(payload.assets)) vfs.addBuffer(name, new Uint8Array(Buffer.from(encoded, "base64")));
    model = mj.MjModel.from_xml_string(payload.xml, vfs);
    data = new mj.MjData(model);
    for (let i = 0; i < 10; i++) mj.mj_step(model, data);
    if (!(data.time > 0) || !Array.from(data.qpos).every(Number.isFinite)) throw new Error("Physics did not advance to a finite state");
    console.log(JSON.stringify({ name: payload.name, meshes: model.nmesh, bodies: model.nbody, time: data.time }));
  } finally { data?.delete(); model?.delete(); vfs.delete(); }
}
