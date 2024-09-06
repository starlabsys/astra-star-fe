import { Input } from "@nextui-org/input";
import React from "react";
import Image from "next/image";

import { SearchIcon } from "./icons";

const NavbarNavigation = () => {
  return (
    <div className="px-7 py-5">
      <div className="flex justify-between items-center">
        <div>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </div>
        <div className="flex w-52 mr-4">
          <Image
            alt=""
            className="rounded-full object-cover mr-2"
            height={50}
            src="/images/profile.png"
            width={50}
          />
          <div className="ml-2">
            <div className="text-black text-xl font-medium">Junior Garcia</div>
            <div className="text-gray-300 text-md">Software Engineer</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarNavigation;
