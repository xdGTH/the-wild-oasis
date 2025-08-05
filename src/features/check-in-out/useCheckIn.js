import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    //bookingId is obtained by passing it from mutate function -> checkin(bookingId)
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        //sending empty breakfast object will not spread this operator and only update status and isPaid
        ...breakfast,
      }),

    //data is returned from the mutation function i.e. updateBooking
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);

      // this will invalidate all the queries that are active on the page
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => toast.error("There was an error while checking in."),
  });

  return { checkin, isCheckingIn };
}
