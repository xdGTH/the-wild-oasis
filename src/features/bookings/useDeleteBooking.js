import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: mutateDeleteBooking } = useMutation({
    mutationFn: deleteBooking,

    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({
        //this will invalidate all the queries with bookings in the array itself
        queryKey: ["bookings"],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, mutateDeleteBooking };
}
