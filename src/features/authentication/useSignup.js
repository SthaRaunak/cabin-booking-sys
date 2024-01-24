import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";


export function useSignup() {
    const { isLoading: isSigningUp, mutate: signup } = useMutation({
        mutationFn: ({ fullName, email, password }) => signupApi({ fullName, email, password }),
        onSuccess: () => {
            // console.log(user)
            toast.success("Account successfully created! Please verify the new account from the user's email address.");

        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    return { signup, isSigningUp }
}