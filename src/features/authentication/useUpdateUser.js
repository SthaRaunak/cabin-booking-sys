import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";



export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { isLoading: isUpdatingUser, mutate: updateUser } = useMutation({
        mutationFn: updateCurrentUser, //here in this function we pass an object
        onSuccess: ({ user }) => {
            console.log(user);
            toast.success("User account updated successfully");
            // queryClient.setQueryData("user",user);

            queryClient.invalidateQueries({
                queryKey: ["user"],
            })
        },
        onError: (err) => {
            toast.error(err.message);
        }
    })

    return { updateUser, isUpdatingUser } //update User takes object 
}