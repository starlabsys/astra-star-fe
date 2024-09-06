import { toast } from "react-toastify";

export const callToastLoading = (id: string) => {
  toast.loading("Logging in...", {
    toastId: id,
  });
};

export const notify = () => {
  // toast.loading("Logging in...",{
  //   toastId: "loading",
  // });
};

export function callToastSuccess(message: string) {
  toast.success(message);
}

export function callToastError(message: string) {
  toast.error(message);
}

export function callToastDone(id: string) {
  toast.done(id);
}
