import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";

const page = async () => {
  const session = await getServerSession(options);

  console.log(session);

  if (session?.user.role !== "admin") {
    return {
      redirect: {
        destination: "/deny",
        permanent: false,
      },
    };
  }
  return (
    <div>
      <div>For Personal Access Only</div>
    </div>
  );
};

export default page;
