import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues } from "react-hook-form";
import { z } from "zod";

import {
  emailSchema,
  nameScheme,
  passwordSchema,
  regNumberSchema,
} from "../schema";
import { SignupUser } from "../services/authService";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const signupSchema = z
  .object({
    name: nameScheme,
    email: emailSchema,
    regNumber: regNumberSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export type FormData = z.infer<typeof signupSchema>;

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onSubmit = async (data: FieldValues) => {
    const msg = await SignupUser(data);
    setError(msg);
    navigate("/");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      regNumber: "",
    },
    mode: "onBlur",
  });
  return (
    <div className="w-screen h-screen flex justify-center overflow-y-auto md:items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-screen h-screen  p-[clamp(24px,2vw,36px)] gap-[clamp(10px,4vh,24px)] md:bg-white md:opacity-[90%] md:border-gray-300 md:border justify-center md:w-[clamp(650px,2vw,1000px)] md:h-[clamp(550px,2vh,800px)] md:rounded-[6px] font-primary"
      >
        <div>
          <h1 className="font-bold font-primary text-[24px] text-blue">
            Create Account
          </h1>
        </div>

        <div className="flex flex-col w-full gap-1">
          <label htmlFor="name" className="font-primary font-medium">
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="p-2 text-[16px] border border-gray-300 rounded-md font-medium font-primay"
            placeholder="Awais"
          />
          {errors.name && (
            <p className="text-red-800 font-primary font-medium text-sm">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="font-primary font-medium">
              Email
            </label>
            <input
              {...register("email")}
              type="text"
              id="email"
              className="p-2 text-[16px] border border-gray-300 rounded-md font-medium font-primay"
              placeholder="mhawais@gmail.com"
            />
            {errors.email && (
              <p className="text-red-800 font-primary font-medium text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="regNumber" className="font-primary font-medium">
              Reg Number
            </label>
            <input
              {...register("regNumber")}
              type="text"
              id="regNumber"
              className="p-2 text-[16px] border border-gray-300 rounded-md font-medium font-primay"
              placeholder="2022-CS-186"
            />
            {errors.regNumber && (
              <p className="text-red-800 font-primary font-medium text-sm">
                {errors.regNumber.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full">
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="password" className="font-primary font-medium">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              id="password"
              className="p-2 text-[16px] border border-gray-300 rounded-md font-medium font-primary"
              placeholder="1233445"
            />
            {errors.password && (
              <p className="text-red-800 text-sm font-primary font-medium">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full gap-1">
            <label
              htmlFor="confirmPassword"
              className="font-primary font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              id="confirmPassword"
              className="p-2 text-[16px] border border-gray-300 rounded-md font-medium font-primary"
              placeholder="1233445"
            />
            {errors.confirmPassword && (
              <p className="text-red-800 font-primary font-medium  text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <input
          type="submit"
          value={"Register"}
          className="w-full bg-blue p-2 rounded-[10px] text-[16px] font-primary font-semibold text-white"
        />
        <div className="flex justify-center">
          <p className="text-sm text-gray-600 font-primary font-medium">
            Already have an account?&nbsp;
            <a
              href="/"
              className="text-blue hover:underline font-medium font-primary"
            >
              Login here
            </a>
          </p>
        </div>
        {error && (
          <p className="text-red-800 font-primary font-medium">{error}</p>
        )}
      </form>
    </div>
  );
}
