"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MapPinIcon,
  HomeIcon,
  BellIcon,
  HeartIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
const Sidebar = () => {
  const router = useRouter();

  const sidebarItems = [
    { icon: HomeIcon, label: "Dashboard", active: true },
    { icon: MapPinIcon, label: "Explore City", active: false },
    { icon: BellIcon, label: "Notification", active: false, badge: 2 },
    { icon: HeartIcon, label: "Favorite", active: false },
    { icon: SettingsIcon, label: "Settings", active: false },
  ];

  return (
    <aside className="w-64 md:block hidden bg-white h-screen shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-black">Hotel Ranking</h1>
      </div>
      <nav className="mt-6">
        {sidebarItems.map((item, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={`w-full flex items-center px-4 py-2 mt-2 text-gray-600 ${
                    item.active
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-100"
                  } ${!item.active && "opacity-50 cursor-not-allowed"}`}
                  disabled={!item.active}
                >
                  <item.icon className="w-5 h-5 mr-4" />
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              </TooltipTrigger>
              {!item.active && (
                <TooltipContent>
                  <p>Work in progress</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>
      <div className="absolute bottom-0 w-64 p-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={() => router.push("/login")}
        >
          <LogOutIcon className="w-5 h-5 mr-2" />
          Log Out
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
