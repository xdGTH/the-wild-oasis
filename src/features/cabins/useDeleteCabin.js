import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: mutateDeleteCabin } = useMutation({
    // mutationFn: (id) => deleteCabin(id), //Since we are calling mutate function with the id the mutate will call this arrow function
    //So write call the below
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    //Here the error is catched from the getCabin which throws any error if any
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, mutateDeleteCabin };
}
