"use server";
import signup from "@/lib/actions/signup";
import login from "@/lib/actions/login";

export async function auth(mode: string, prevState: any, formData: FormData) {
  if (mode === "login") return login(prevState, formData);
  return signup(prevState, formData);
}
