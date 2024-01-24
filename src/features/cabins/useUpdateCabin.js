import { useQueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useUpdateCabin() {

    const queryClient = useQueryClient();

    const { isLoading: isEditing, mutate: updateCabin } = useMutation({
        mutationFn: ({ newCabinData, id }) => {
            createEditCabin(newCabinData, id)
        },
        onSuccess: () => {
            toast.success("Cabin Edited Succesfully");
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })


    return { isEditing, updateCabin }
}