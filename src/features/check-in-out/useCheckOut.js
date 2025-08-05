import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    //bookingId is obtained by passing it from mutate function -> checkin(bookingId)
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    //data is returned from the mutation function i.e. updateBooking
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);

      // this will invalidate all the queries that are active on the page
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("There was an error while checking out."),
  });

  return { checkout, isCheckingOut };
}
