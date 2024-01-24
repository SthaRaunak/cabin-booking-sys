import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom";



export function useCheckin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isLoading: isCheckingIn, mutate: checkin } = useMutation({
        mutationFn: ({ bookingId, breakfast }) => updateBooking(bookingId, {
            status: 'checked-in', isPaid: true,
            ...breakfast,
        }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} sucessfully checked in.`)
            queryClient.invalidateQueries({
                active: true, // this is another way of invalidating queries where all active quries on that page are invalidated (i.e made stale so they are fetched again) this way we dont have to remember which query key to invalidate
            })
            navigate("/dashboard")
        },
        onError: (error) => {
            toast.error(`There was an error while checking in. error: ${error.message}`)
        }
    })
    return { checkin, isCheckingIn }
}   