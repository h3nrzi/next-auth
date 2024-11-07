"use client";
import { useFormState } from "react-dom";
import Link from "next/link";
import FormState from "@/types/FormState";
import { useSearchParams } from "next/navigation";
import { auth } from "@/lib/actions/auth";
import { toast } from "react-toastify";

export default function AuthForm() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "signup";

  const [formState, formAction] = useFormState(auth.bind(null, mode), {} as FormState);

  if (formState.errors?.server) return toast.success(formState.errors.server);
  console.log("form-state", formState.errors);

  return (
    <form id="auth-form" action={formAction}>
      <h1 style={{ color: "purple" }}>{mode.toUpperCase()}</h1>

      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>

      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      {formState?.errors?.email &&
        formState.errors.email.map((msg, i) => (
          <p key={i} id="form-errors">
            {msg}
          </p>
        ))}

      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState?.errors?.password &&
        formState.errors.password.map((msg, i) => (
          <p key={i} id="form-errors">
            {msg}
          </p>
        ))}

      <p>
        <button type="submit" onClick={() => toast.success("ok")}>
          {mode === "login" ? "Log in" : "Create Account"}
        </button>
      </p>
      <p>
        {mode === "login" ? (
          <Link href="/">Create an account.</Link>
        ) : (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
      </p>

      {formState?.errors?.server && <p id="form-errors">{formState?.errors?.server}</p>}
    </form>
  );
}
