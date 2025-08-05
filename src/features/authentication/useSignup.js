import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: mutateSignup, isPending: isSigningUp } = useMutation({
    mutationFn: signup,

    onSuccess: (user) => {
      console.log(user);
      toast.success("Signed up successfully");
    },
  });

  return { mutateSignup, isSigningUp };
}
