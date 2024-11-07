import FormState from "@/types/FormState";
import { userSchema } from "@/lib/utils/schema";
import getUser from "@/lib/database/get-user";
import { verifyPassword } from "@/lib/utils/hash";
import { createAuthSession } from "@/lib/utils/auth";
import { redirect } from "next/navigation";

export default async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string | undefined;
  const password = formData.get("password") as string | undefined;

  // Validate dto
  const validatedFields = userSchema.safeParse({
    email,
    password,
  });

  let formState = {} as FormState;

  if (!validatedFields.success) {
    formState.errors = validatedFields.error.flatten().fieldErrors;
    return formState;
  }

  // Check for existing user
  const user = getUser(email!);
  if (!user) {
    formState.errors = {
      server: "Invalid email or password",
    };

    return formState;
  }

  // Check for correct password
  const isValidPassword = verifyPassword(user.password, password!);
  if (!isValidPassword) {
    formState.errors = {
      server: "Invalid email or password",
    };

    return formState;
  }

  // Create auth session and redirecting
  await createAuthSession(String(user.id));
  redirect("/training");
}
