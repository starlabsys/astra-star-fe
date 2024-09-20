import Image from "next/image";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import LoginService from "@/src/module/auth/login/loginService";

export const LoginView = () => {
  const { username, setUsername, password, setPassword, submit, isLoading } =
    LoginService();

  return (
    <div className="grid grid-cols-2">
      <div className="h-screen w-full flex items-center justify-center">
        <div className="w-2/4">
          <div className="flex justify-start">
            <Image
              alt=""
              height={200}
              src="/images/logo-astra.png"
              width={200}
            />
          </div>
          <div>
            <div className="text-xl font-bold text-gray-500 text-center">
              Masukkan Username dan Password yang telah terdaftar
            </div>
            <div className="flex flex-col">
              <Input
                className="my-2"
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                className="my-2"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-center">
                {/* <button
                  className="w-1/3 bg-blue-400 text-white rounded-md p-2 mt-2"

                  onClick={()=> submit()}
                >
                  Login
                </button> */}
                <Button
                  className="w-1/3 mt-2"
                  color="primary"
                  isLoading={isLoading}
                  variant="ghost"
                  onClick={() => submit()}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen relative">
        {/* Background Image */}
        <Image
          alt=""
          layout="fill"
          objectFit="cover"
          src="/images/bg-login.png"
        />

        {/* Centered Large Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            alt=""
            height={600}
            src="/images/logo-astra-large.png"
            width={600}
          />
        </div>
      </div>
    </div>
  );
};
