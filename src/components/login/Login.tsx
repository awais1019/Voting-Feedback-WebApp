import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues } from "react-hook-form";
import { z } from "zod";
import { emailSchema, passwordSchema } from "../../zodSchema";

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type FormData = z.infer<typeof loginSchema>;
export default function Login() {
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-screen h-screen p-[clamp(24px,2vw,36px)] gap-[clamp(12px,2vw,24px)] md:bg-white md:opacity-[90%] md:border-gray-300 md:border justify-center md:w-[clamp(500px,3vw,900px)] md:h-[clamp(400px,2vh,800px)] md:rounded-[6px] font-primary"
      >
        <h1 className="font-bold font-primary text-[24px] text-blue">Login</h1>
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="email" className="font-primary font-light">
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
            <p className="text-red-800 font-primary font-light">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="password" className="font-primary font-light">
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
            <p className="text-red-800 font-primary font-light">
              {errors.password.message}
            </p>
          )}
        </div>

        <input
          type="submit"
          value={"Login"}
          className="w-full bg-blue p-2 rounded-[10px] text-[16px] font-primary font-semibold text-white"
        />
      </form>
    </div>
  );
}
