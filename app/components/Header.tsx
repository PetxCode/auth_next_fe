"use client";

// import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const session: any = useSession();
  return (
    <div className="h-[70px] w-full flex items-center border-b">
      <div className="gap-4 flex">
        <Link href="/">
          {" "}
          <button className="border rounded-md py-4 px-8">Home</button>
        </Link>
        {session?.data?.user?.role === "admin" && (
          <Link href="/personal">
            {" "}
            <button className="border rounded-md py-4 px-8">Personal</button>
          </Link>
        )}
        {session?.data ? (
          <div>
            <button
              className="border rounded-md py-4 px-8"
              onClick={() => {
                signOut();
              }}
            >
              Log Out
            </button>
          </div>
        ) : (
          <Link href="/register">
            <button className="border rounded-md py-4 px-8">Register</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
