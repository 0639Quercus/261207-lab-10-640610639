import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;

  if (req.method !== "DELETE") return;

  const rooms = readDB();
  const roomIdx = rooms.findIndex((x) => x.roomId === roomId);
  if (roomIdx === -1)
    return res.status(404).json({ ok: false, message: "Invalid room id" });

  const messageIdx = rooms[roomIdx].findIndex((x) => x.messageId === messageId);
  if (messageIdx === -1)
    return res.status(404).json({ ok: false, message: "Invalid message id" });

  //valid request
  rooms[roomIdx].splice(messageIdx, 1);
  writeDB(rooms);
  return res.json({ ok: true });
}
