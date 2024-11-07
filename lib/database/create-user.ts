import db from "./db";

export default function createUser(email: string, password: string) {
  const result = db
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .run(email, password);

  return result.lastInsertRowid;
}
