import { toast } from "react-toastify";

const customId = "custom-id-yes";

const handleError = (error) => {
  console.error(error);
  if (error?.message === "Network Error") {
    return toast.error("Server is down, pls wait a bit and reload", {
      toastId: customId,
    });
  }
  if (error?.response) {
    return toast.error(
      error.response.data?.message ||
        error.response.data?.error ||
        error.response.data?.errors[0]?.msg ||
        "An error occured",
      {
        toastId: customId,
      }
    );
  }
  toast.error("An unexpected error occured", {
    toastId: customId,
  });
};

export default handleError;
