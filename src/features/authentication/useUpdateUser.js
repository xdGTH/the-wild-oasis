import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: mutateUpdateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateCurrentUser,

    //userData or destructure it to {user}
    onSuccess: (userData) => {
      toast.success("User Updated Successfully");
      queryClient.setQueryData(["user"], userData.user);
      // queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { mutateUpdateUser, isUpdatingUser };
}
