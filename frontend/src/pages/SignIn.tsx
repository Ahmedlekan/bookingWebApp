import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  const {register,formState: { errors },handleSubmit,} = useForm<SignInFormData>();

  const mutation = useMutation( {
    mutationFn: apiClient.signIn,
    onSuccess: async () => {
        showToast({ message: "Sign in Successful!", type: "SUCCESS" });
        await queryClient.invalidateQueries({queryKey:["validateToken"]});
        navigate(location.state?.from?.pathname || "/");
      },
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className='h-[100vh] flex justify-center
        items-center'
    >
        <div className='w-full max-w-sm mx-auto bg-white
            shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
            <h2 className='text-xl font-semibold mb-4 font-body'>
                Please Login
            </h2>

            <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                <h2 className="text-3xl font-bold font-body">
                  Create an Account
                </h2>

                <label className="text-gray-700 text-sm font-bold">
                    Email
                    <input
                        type="email"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("email", {required:"This field is required"})}
                    />
                    {errors.email && (
                        <span className="text-red-500">
                          {errors.email.message}
                        </span>
                    )}
                </label>

                <label className="text-gray-700 text-sm font-bold">
                    Password
                    <input
                        type="password"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("password", {required:"This field is required", minLength:{
                            value: 6,
                            message: "Password must be atleast 6 characters"
                        }})}
                    />
                    {errors.password && (
                        <span className="text-red-500">
                          {errors.password.message}
                        </span>
                    )}
                </label>

                <div>
                    <button className='bg-black hover:bg-black/80 font-body
                    text-white font-bold py-2 px-8 rounded focus:outline-none'>
                        Sign In 
                    </button>
                </div>

            </form>
            
            <p className='align-baseline font-medium mt-4 text-sm font-body'>
                Haven't an account? Please&nbsp;
                <Link to="/register" className='text-deepbrown 
                  hover:text-red-400 font-body'>
                    Register
                </Link>
            </p>

            <p className='mt-5 text-center text-gray-500
                text-xs font-body'>
                ©2025 Booking Store. All rights reserved.
            </p>
        </div>
    </div>
  );
};

export default SignIn;