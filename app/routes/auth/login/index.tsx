import { pb } from "@/api/pocketbase";
import SimpleInput from "@/components/SimpleInput";
import { extract_pb_error } from "@/helpers/funcs";
import { ClientResponseError } from "pocketbase";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { toast } from "sonner";

export default function index() {
  const form = useForm();
  console.log("PB URL:", import.meta.env.VITE_PB_URL);

  const { register } = form;
  const nav = useNavigate();
  const onSubmit = async (data: { username: string; password: string }) => {
    toast.promise(
      async () =>
        await pb
          .collection("users")
          .authWithPassword(data.username, data.password),
      {
        loading: "Logging in...",
        success: () => {
          nav("/");
          return "Logged in!";
        },
        error: extract_pb_error,
      },
    );
    // console.log(data);
  };
  return (
    <div className="  relative  ">
      <div className="fixed h-dvh flex top-0 left-0 w-full  -z-10 ">
        <div className="relative flex-1 flex isolate">
          <img
            src="/auth_bg.webp"
            alt=""
            className="flex-1 blur-md object-cover"
          />
          <div className="size-full absolute  bg-gradient-to-t from-black"></div>
        </div>
      </div>
      <div className="h-dvh flex items-center justify-center relative z-10">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          action=""
          className="card w-md bg-base-100 shadow-xl p-8 space-y-6"
        >
          <legend className="fieldset-legend card-title text-3xl mb-6 justify-center">
            Login
          </legend>
          <div className=" flex flex-col gap-4 ">
            <SimpleInput
              {...register("username")}
              required
              label="Username or Email"
              placeholder="Username or Email"
            />
            <SimpleInput
              {...register("password")}
              label="Password"
              required
              placeholder="Password"
              type="password"
            />
          </div>
          <div className="form-control mb-4">
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </div>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="link link-primary font-semibold">
              Sign up
            </Link>
          </p>
          <div className="divider">OR</div>
          <div className="form-control">
            <button
              disabled
              type="button"
              className="btn btn-outline btn-block"
            >
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
