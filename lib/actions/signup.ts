"use server";
import createUser from "@/lib/database/create-user";
import { hashUserPassword } from "@/lib/utils/hash";
import FormState from "@/types/FormState";
import { redirect } from "next/navigation";
import { createAuthSession } from "@/lib/utils/auth";
import { userSchema } from "@/lib/utils/schema";

export default async function signup(prevState: any, formData: FormData) {
  const email = formData.get("email") as string | undefined;
  const password = formData.get("password") as string | undefined;

  // VALIDATE DTO
  const validatedFields = userSchema.safeParse({
    email,
    password,
  });

  let formState = {} as FormState;

  if (!validatedFields.success) {
    formState.errors = validatedFields.error.flatten().fieldErrors;
    return formState;
  }

  // HASH PASSWORD
  const hashedPassword = hashUserPassword(password!);

  // STORE IT IN DB
  try {
    const userId = createUser(email!, hashedPassword);

    await createAuthSession(String(userId));

    redirect("/training");
  } catch (error) {
    if ((error as any).code === "SQLITE_CONSTRAINT_UNIQUE") {
      formState.errors = {
        server: "It's seems like an account for the chosen email already exists",
      };

      return formState;
    }

    throw error;
  }
}
