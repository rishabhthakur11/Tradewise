"use client";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import qs from "query-string";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const debouncedValue = useDebounce(value);
  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[500px] pl-9 rounded-md bg-white focus-visible:ring-slate-200"
        placeholder="What are you looking for today?"
      />
    </div>
  );
};
