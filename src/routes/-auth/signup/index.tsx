import { pb } from "@/api/pocketbase";
import BackgroundGrid from "@/components/BackgrounGrid";
import SimpleInput from "@/components/SimpleInput";
import { extract_pb_error, generateId } from "@/helpers/funcs";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
interface SignupProps {
  username: string;
  password: string;
  email: string;
  passwordConfirm: string;
}
export default function index({}: SignupProps) {
  const nav = useNavigate();
  const form = useForm<SignupProps>();
  const { register, handleSubmit } = form;
  const onSubmit = handleSubmit(
    async (data) => {
      toast.promise(
        () => {
          return pb.collection("users").create({
            ...data,
          });
        },
        {
          success: () => {
            nav("/auth/login");
            return "Account Created";
          },
          error: extract_pb_error,
          loading: "creating user",
        },
      );
    },
    (error) => {
      const errors = Object.values(error);
      errors.map((error) => toast.error(error.message));
    },
  );

  return (
    <div className="min-h-dvh  flex relative ">
      <BackgroundGrid />
      {/*<div className="bg-red-200 flex-1"></div>*/}
      <div className="bg-gradient-to-r from-primary/50 to-accent/50 fixed size-full top-0 left-0 -z-20"></div>
      <div className="flex-1 grid place-items-center">
        <form
          autoComplete="off"
          onSubmit={onSubmit}
          className="flex-col flex bg-base-200 p-12 w-full max-w-xl rounded-xl shadow-lg"
        >
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold">Register</h2>
            <p className="mt-2 label">Sign up to create an account.</p>
          </div>
          <div className="space-y-4">
            <SimpleInput
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username must be at most 20 characters",
                },
              })}
              label="Username"
              type="text"
              name="username"
            />
            <SimpleInput {...register("email")} label="Email" type="email" />
            <SimpleInput
              autoComplete="new-password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Password must be at most 100 characters",
                },
              })}
              label="Password"
              type="password"
            />
            <SimpleInput
              autoComplete="new-password"
              {...register("passwordConfirm", {
                required: "Password confirmation is required",
                validate: (value) =>
                  value === form.getValues("password") ||
                  "Passwords do not match",
              })}
              label="Confirm Password"
              type="password"
            />
          </div>
          <div className="mt-6">
            <button className="btn btn-primary btn-block">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}
