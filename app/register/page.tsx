"use client";

import React, { useState } from "react";
import img from "@/public/hero-bg-pattern.svg";
import Image from "next/image";
import pix from "../../public/hero-bg-pattern.svg";
import { signIn } from "next-auth/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const page = () => {
  const [toggle, setToggle] = useState<boolean>(true);

  const onToggle = () => {
    setToggle(!toggle);
  };

  const formSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = handleSubmit(async (res) => {
    console.log(res);

    signIn("credentials", { email: res.email, password: res.password });
  });

  return (
    <div
      className="w-full h-[calc(100vh-102px)] text-white flex justify-center items-center"
      style={{
        backgroundImage: `url(${pix.src})`,
      }}
    >
      <div className="w-[500px] min-h-[300px] border rounded-md bg-white text-neutral-900 p-4 overflow-hidden ">
        <div className="flex gap-5 border-b transition-all duration-300">
          <p
            className={`cursor-pointer pb-4 transition-all duration-300 ${
              toggle && "border-b-blue-600 border-b-4 "
            } `}
            onClick={onToggle}
          >
            Register
          </p>
          <p
            className={`cursor-pointer pb-4 transition-all duration-300 ${
              !toggle && "border-b-blue-600 border-b-4 "
            }  `}
            onClick={onToggle}
          >
            Sign In
          </p>
        </div>

        <div className="mt-5 transition-all duration-300 ">
          {toggle ? (
            <div
              className={`w-full h-full transition-all duration-300 ${
                !toggle ? "right-[100%]" : ""
              }`}
            >
              <form className="flex flex-col w-[500px] ">
                <div className="my-2 flex flex-col">
                  <label className="text-[12px] font-semibold">
                    companyName
                  </label>
                  <input
                    placeholder="Enter Company Name"
                    className="h-[45px] w-[94%] pl-2 border rounded-md"
                  />
                </div>

                <div className="my-2  flex flex-col">
                  <label className="text-[12px] font-semibold">Email</label>
                  <input
                    placeholder="Enter Emauk"
                    className="h-[45px] w-[94%] pl-2 border rounded-md"
                  />
                </div>

                <div className="my-2  flex flex-col">
                  <label className="text-[12px] font-semibold">Password</label>
                  <input
                    placeholder="Enter Password"
                    className="h-[45px] w-[94%] pl-2 border rounded-md"
                  />
                </div>

                <div className="flex items-center justify-center h-16 mt-4 rounded-md mb-10 bg-blue-950 text-white w-[94%]">
                  Register
                </div>
              </form>
            </div>
          ) : (
            <div>
              <form onSubmit={onSubmit} className="flex flex-col w-[500px] ">
                <div className="my-2  flex flex-col">
                  <label className="text-[12px] font-semibold">Email</label>
                  <input
                    {...register("email")}
                    placeholder="Enter Emauk"
                    className="h-[45px] w-[94%] pl-2 border rounded-md"
                  />
                </div>

                <div className="my-2  flex flex-col">
                  <label className="text-[12px] font-semibold">Password</label>
                  <input
                    {...register("password")}
                    placeholder="Enter Password"
                    className="h-[45px] w-[94%] pl-2 border rounded-md"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center h-16 mt-4 rounded-md mb-10 bg-blue-950 text-white w-[94%] cursor-pointer "
                >
                  Sign In
                </button>
              </form>
            </div>
          )}

          <div>
            <hr />
          </div>
          <div
            onClick={() => {
              signIn("github");
            }}
          >
            social
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
