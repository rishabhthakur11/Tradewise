import { Lock, UserIcon, Wallet } from "lucide-react";
import React from "react";
import UserItems from "./UserItems";

type Props = {};

const routes = [
  {
    icon: UserIcon,
    label: "Basic Details",
    href: "/profile/user/basic-details",
  },
  {
    icon: Lock,
    label: "Change Password",
    href: "/profile/user/change-password",
  },
  {
    icon: Wallet,
    label: "Wallet",
    href: "/profile/user/balance",
  },
];

function UserRoutes({}: Props) {
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <UserItems
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
}

export default UserRoutes;
