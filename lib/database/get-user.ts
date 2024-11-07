import db from "@/lib/database/db";
import User from "@/types/User";

export default function getUser(email: string) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email) as User;
}
