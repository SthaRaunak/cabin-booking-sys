import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";


export function useBooking() {
    const { bookingId } = useParams();

    const { data: booking, isLoading, error } = useQuery({
        queryKey: ['booking',bookingId],
        queryFn: () => getBooking(bookingId),
        retry: false, // enabling this will not auto fetch when fetching is error by default it fetches for 3 times before it stops
        //because in our case if its and error its mostly because that booking doesnt exist so theres no reason to refetch
    })

    return { booking, isLoading, error }
}
