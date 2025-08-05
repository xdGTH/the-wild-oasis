import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: mutateLogout, isPending: isLoggingOut } = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      toast.success("Logged out successfully");
      //not specifying which query to remove will remove all of them
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { mutateLogout, isLoggingOut };
}
