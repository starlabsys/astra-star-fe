"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation for app directory

import { login } from "@/src/repository/auth/authRepository";

const LoginService = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter(); // Initialize useRouter

  const submit = async () => {
    setIsLoading(true);
    const resp = await login(username, password);

    if (resp !== null) {
      // Redirect to /dashboard after successful login
      router.push("/dashboard");
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    submit,
    isLoading,
    setIsLoading,
  };
};

export default LoginService;
