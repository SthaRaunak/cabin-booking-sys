import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth";


export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: logout, isLoading: isLoggingOut } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            navigate('/login', { replace: true })
            queryClient.removeQueries() //this will simply remove all the queires from the cache we could go in depth and remove specific by passing object in side the function but for here we will remove all the cached data

        },
        onError: (error) => {
            toast.error(error.message);

        }
    })

    return { logout, isLoggingOut };
}