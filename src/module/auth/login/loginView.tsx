"use client";

import Image from "next/image";

import LoginService from "@/src/module/auth/login/loginService";

export const LoginView = () => {
  const { submit } = LoginService();

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
            <form className="flex flex-col">
              <input
                className="border-2 border-gray-500 rounded-md p-2 mt-4"
                placeholder="Username"
                type="text"
              />
              <input
                className="border-2 border-gray-500 rounded-md p-2 mt-4"
                placeholder="Password"
                type="password"
              />
              <div className="flex justify-center">
                <button
                  className="w-1/3 bg-blue-400 text-white rounded-md p-2 mt-2"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
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
