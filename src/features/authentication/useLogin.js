import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";



export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { data: credential, isLoading: isLoggingIn, mutate: login } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (data) => {
            console.log(data.user); // data coming from useLogin has two propetiest sesion and user we just need the user data to be set into the query;
            queryClient.setQueryData(['user'], data.user);
            navigate('/dashboard')

        },
        onError: (error) => {
            console.error("ERROR ", error.message)
            toast.error("Provided email or password are incorrect ");

        }
    })

    return ({ credential, isLoggingIn, login })
}