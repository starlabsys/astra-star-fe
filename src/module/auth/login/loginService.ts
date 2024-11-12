"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation for app directory

import { login } from "@/src/repository/auth/authRepository";
import { setICookies } from "@/src/utils/ICookies";

const LoginService = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter(); // Initialize useRouter

  const submit = async () => {
    setIsLoading(true);
    const resp = await login(username, password);

    if (resp !== null) {
      await setICookies("token", resp.result.token, 1);
      await setICookies("status_token", resp.result.user.statusToken, 1);
      await setICookies("name", resp.result.user.name, 1);
      router.push("/dashboard");
    } else {
      setIsLoading(false);
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
