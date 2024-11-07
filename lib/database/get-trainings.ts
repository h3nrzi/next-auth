import db from "./db";
import { Training } from "@/types/Training";

export default function getTrainings() {
  const stmt = db.prepare("SELECT * FROM trainings");
  return stmt.all() as Training[];
}
