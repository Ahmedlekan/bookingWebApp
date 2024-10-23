
import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutBtn = () => {
    
    const {showToast} = useAppContext()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: apiClient.signOut,
        onSuccess: async ()=>{
            await queryClient.invalidateQueries({queryKey: ["validateToken"]});
            showToast({ message: "Signed Out!", type: "SUCCESS" });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
          },
    })
    const handleClick = ()=>{
        mutation.mutate()
    }
  return (
    <button
      onClick={handleClick}
      className="text-blue-600 font-bold px-2 py-1 md:px-3 md:py-2
      bg-white hover:bg-gray-100 text-sm md:text-lg "
    >
      Sign Out
    </button>
  )
}

export default SignOutBtn