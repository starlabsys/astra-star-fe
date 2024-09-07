"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation for app directory

import { login } from "@/src/repository/auth/authRepository";

const LoginService = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter(); // Initialize useRouter

  const submit = async () => {
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
  };
};

export default LoginService;
