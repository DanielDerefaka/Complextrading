"use client";

import {
  AgencySidebarOption,
  SubAccount,
  SubAccountSidebarOption,
} from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ChevronsUpDown, Compass, Menu } from "lucide-react";
import clsx from "clsx";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { icons } from "@/lib/constant";

type Props = {
  defaultOpen?: Boolean;
  subAccounts: SubAccount[];
  sidebarOptions: AgencySidebarOption[] | SubAccountSidebarOption[];
  sidebarLogo: string;
  details: any;
  user: any;
  id: string;
};

const MenuOptions = ({
  details,
  id,
  sidebarOptions,
  subAccounts,
  user,
  defaultOpen,
  sidebarLogo,
}: Props) => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  );
  return (
    <Sheet
      modal={false}
      {...openState}
      // open={true}
    >
      <SheetTrigger
        asChild
        className="absolute left-4 top-4 z-[100] md:!hidden felx"
      >
        <Button variant="outline" size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        showX={!defaultOpen}
        side={"left"}
        className={clsx(
          "bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6",
          {
            "hidden md:inline-block z-0 w-[300px]": defaultOpen,
            "inline-block md:hidden z-[100] w-full": !defaultOpen,
          }
        )}
      >
        <div>

          <p className="text-muted-foreground text-xs mb-2">MENU LINKS</p>
          <Separator className="mb-4" />
          <nav className="relative">
            <Command className="rounded-lg overflow-visible bg-transparent">
              <CommandInput placeholder="Search..." />
              <CommandList className="py-4 overflow-visible">
                <CommandEmpty>No Results Found</CommandEmpty>
                <CommandGroup className="overflow-visible">
                  <CommandItem className="md:w-[320px] w-full mb-2">
                    <Link
                      href="/admin/adminpage/dashboard"
                      className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                    >
                      <span> Home</span>
                    </Link>
                  </CommandItem>

                  <CommandItem className="md:w-[320px] w-full mb-2">
                    <Link
                      href="/admin/adminpage/users"
                      className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                    >
                      <span> USERS</span>
                    </Link>
                  </CommandItem>

                  <CommandItem className="md:w-[320px] w-full mb-2">
                    <Link
                      href="/admin/adminpage/deposit"
                      className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                    >
                      <span> Deposit</span>
                    </Link>
                  </CommandItem>

                  <CommandItem className="md:w-[320px] w-full mb-2">
                    <Link
                      href="/admin/adminpage/withdraw"
                      className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                    >
                      <span> Withdraw</span>
                    </Link>
                  </CommandItem>

                </CommandGroup>
              </CommandList>
            </Command>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
