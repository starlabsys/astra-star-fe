import { useState } from "react";

import { login } from "@/src/repository/auth/authRepository";

const LoginService = () => {
  const [email, setEmail] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  const submit = async () => {
    const resp = await login(email, password);

    if (resp === null) {
      // notify("Invalid username or password");
      return null;
    }
    // call1();
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    submit,
    // notify,
  };
};

export default LoginService;
