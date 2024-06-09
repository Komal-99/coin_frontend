"use client";
import React from "react";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function SignOut() {
  const navigate = useRouter();
  return (
    <Button
      onClick={() => {
        signOut();
        // navigate.push("/auth");
      }}
    >
      Signout
    </Button>
  );
}

export default SignOut;
