import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {
  icon: any;
  label: string;
  href: string;
};

function UserItems({ icon: Icon, label, href }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const active =
    (pathname === "/profile/user/basic-details" &&
      href === "/profile/user/basic-details") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500  font-[400] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 text-md",
        active &&
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={20}
          className={cn("text-slate-500", active && "text-sky-700")}
        />
      </div>
      {label}
    </button>
  );
}

export default UserItems;
