"use server";
import { destroyAuthSession } from "@/lib/utils/auth";
import { redirect } from "next/navigation";

export default async function logout() {
  await destroyAuthSession();
  redirect("/");
}
