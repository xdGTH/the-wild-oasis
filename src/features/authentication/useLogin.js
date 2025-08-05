import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: mutateLogin, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),

    onSuccess: (userData) => {
      //putting the user data in the cache which is later retrieved from getCurrentUser
      queryClient.setQueryData(["user"], userData.user);
      toast.success("Logged in successfully");
      navigate("/dashboard", { replace: true });
    },

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Email or password do not match");
    },
  });

  return { mutateLogin, isLoggingIn };
}
