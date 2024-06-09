import React from "react";
import { PresetSave } from "./preset-save";
import { PresetShare } from "./preset-share";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import Link from "next/link";

async function Header() {
  const session = await auth();
  if (!session) {
    return null;
  }

  return (
    <div>
      <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <Link href={"/"}>
          <h2 className="text-lg font-semibold">Playground</h2>
        </Link>
        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
          <PresetSave />
          <div className="hidden space-x-2 md:flex">
            {/* <CodeViewer /> */}
            <Link href={"/transactions"}>
              <Button variant="secondary">Transactions</Button>
            </Link>
          </div>
          {/* <PresetActions /> */}
          <form
            action={async () => {
              "use server";
              await signOut();
              redirect("/auth");
            }}
          >
            <Button variant="secondary" type="submit">
              Sign Out
            </Button>
          </form>
        </div>
      </div>
      <Separator />
    </div>
  );
}

export default Header;
