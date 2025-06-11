import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/validation";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useState } from "react";
import { z } from "zod";
import type { AxiosError } from "axios";

function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
}

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setFormError(null); // clear previous errors
    try {
      const result = await loginUser(data);
      localStorage.setItem("token", result.access_token);
      dispatch(setCredentials({ token: result.access_token, user: {} }));
      navigate("/invoices");
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 401) {
        setFormError("Invalid email or password.");
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-[300px] mx-auto text-blue-500"
    >
      {formError && (
        <p className="text-red-500 text-sm bg-red-100 p-2 rounded">
          {formError}
        </p>
      )}

      <input
        {...register("email")}
        placeholder="Email"
        className="w-full p-2 border"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <input
        type="password"
        {...register("password")}
        placeholder="Password"
        className="w-full p-2 border"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Login
      </button>
    </form>
  );
}
