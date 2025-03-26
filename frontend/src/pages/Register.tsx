import {useForm} from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apliClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import { useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";

export type RegisterFormDataprops = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

const Register = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {register, watch, handleSubmit, formState:{errors}} = useForm<RegisterFormDataprops>()
    const {showToast} = useAppContext()

    const mutation = useMutation({
        mutationFn: apliClient.register,
        onSuccess: async ()=>{
            showToast({message:"Registration Success!", type: "SUCCESS"})
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] })
            navigate("/")
        },
        onError: (error: Error)=>{
            showToast({message: error.message, type: "ERROR"})
        }
    })

    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data)
    })

  return (
    <div className='h-[100vh] flex justify-center
        items-center'
    >
        <div className='w-full max-w-sm mx-auto bg-white
            shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
            <h2 className='text-xl font-semibold mb-4 font-body'>
                Please Register
            </h2>

            <form className="flex flex-col gap-5 font-body"
                onSubmit={onSubmit}>
                <label className="text-gray-700 text-sm font-bold">
                    Name
                    <input 
                        className="border rounded w-full py-1 px-2font-normal"
                        {...register("firstName", {required:"This field is required"})}
                    />
                    {errors.firstName && (
                        <span className="text-red-500">
                            {errors.firstName.message}
                        </span>
                    )}
                </label>

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
                
                <label className="text-gray-700 text-sm font-bold">
                    Confirm Password
                    <input
                        type="password"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("confirmPassword", {
                            validate:(val)=>{
                                if(!val){
                                    return "This field is required"
                                } else if (watch("password") !== val){
                                    return "Your passwords do not match"
                                }
                            }
                        })}
                    />
                    {errors.confirmPassword && (
                        <span className="text-red-500">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </label>

                <div>
                    <button className='bg-black hover:bg-black/80 font-body
                    text-white font-bold py-2 px-8 rounded focus:outline-none'
                    >
                        Register 
                    </button>
                </div>

            </form>
            
            <p className='align-baseline font-medium mt-4 text-sm font-body'>
                Have an account? Please&nbsp;
                <Link to="/sign-in" className='text-deepbrown 
                    hover:text-red-400 font-body'>
                    Login
                </Link>
            </p>

            <p className='mt-5 text-center text-gray-500
                text-xs font-body'>
                ©2025 Booking Store. All rights reserved.
            </p>
        </div>
    </div>
  )
}

export default Register