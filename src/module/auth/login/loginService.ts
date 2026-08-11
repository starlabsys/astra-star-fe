"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation for app directory

import { login } from "@/src/repository/auth/authRepository";
import { UMUR_SESI_JAM, setICookiesJam } from "@/src/utils/ICookies";

const LoginService = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter(); // Initialize useRouter

  const submit = async () => {
    setIsLoading(true);
    const resp = await login(username, password);

    if (resp !== null) {
      // Cookie kedaluwarsa bersamaan dengan token-nya, jadi sesi yang habis
      // langsung terlihat sebagai "belum login" alih-alih menyamar jadi
      // halaman kosong.
      await setICookiesJam("token", resp.result.token, UMUR_SESI_JAM);
      await setICookiesJam(
        "status_token",
        resp.result.user.statusToken,
        UMUR_SESI_JAM,
      );
      await setICookiesJam("name", resp.result.user.name, UMUR_SESI_JAM);
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
