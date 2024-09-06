"use client";
import React from "react";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

const SidebarNavigation = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  // const [subMenuOpen, setSubMenuOpen] = React.useState(false);
  const Menus = [
    {
      name: "Dashboard",
      icon: "AiFillEnvironment",
      link: "/dashboard",
    },
    {
      name: "Master Data PKB",
      icon: "AiFillEnvironment",
      link: "/pkb",
    },
    {
      name: "History PKB",
      icon: "AiFillEnvironment",
      link: "/history-pkb",
    },
    {
      name: "Profile",
      icon: "AiFillEnvironment",
      link: "/profile",
    },
    // {
    //   'name': 'Settings',
    //   'icon': 'AiFillEnvironment',
    //   'link': '/settings',
    //   'subMenus': [
    //     {
    //       'name': 'Profile',
    //       'link': '/profile'
    //     },{
    //       'name': 'Account',
    //       'link': '/account'
    //     }
    //   ]
    // }
  ];

  return (
    <div
      className={`bg-gray-50 h-screen border-r-2 border-gray-200 p-5 pt-8 ${isOpen ? "w-72" : "w-20"} duration-300 relative`}
    >
      <BsArrowLeftShort
        className={`bg-blue-300 text-white text-3xl rounded-full absolute -right-3 top-9 cursor-pointer ${!isOpen && "duration-300 rotate-180"}`}
        onClick={() => setIsOpen(!isOpen)}
      />
      {/* Sidebar */}
      <div className="inline-flex">
        <Image
          alt=""
          height={200}
          src="/images/logo-astra-sidebar.png"
          width={200}
        />
        {/* <AiFillEnvironment className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${isOpen && "rotate-[360deg]"}`} />
          <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!isOpen && 'scale-0'}`}>Tailwind</h1> */}
      </div>

      <div
        className={`flex items-center rounded-md bg-gray-100 mt-6 ${!isOpen ? "px-2.5" : "px-4"} py-2`}
      >
        <BsSearch
          className={`text-black text-lg block float-left cursor-pointer mr-2 ${isOpen && "mr-2"}`}
        />
        <input
          className={`text-base bg-transparent w-full text-black focus:outline-none ${!isOpen && "hidden"}`}
          placeholder="Search..."
          type={`search`}
        />
      </div>

      <ul className="pt-2">
        {Menus.map((menu, index) => (
          <Link key={index} href={menu.link}>
            <li
              key={index}
              className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-500 hover:text-white rounded-md mt-2"
            >
              <span className="text-2xl block float-left">
                <RiDashboardFill />
              </span>
              <span
                className={`text-base font-medium text-black flex-1 ${!isOpen && "hidden"}`}
              >
                {menu.name}
              </span>
              {/* {menu.subMenus && isOpen && (
                  <BsChevronDown className={`${subMenuOpen && "rotate-180"}`} onClick={()=>{
                    setSubMenuOpen(!subMenuOpen)
                  }}/>
                )} */}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SidebarNavigation;
