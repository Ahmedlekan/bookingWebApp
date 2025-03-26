
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
    >
      SIGN OUT
    </button>
  )
}

export default SignOutBtn