import { ToastContainer, Bounce } from "react-toastify";
import { AppRoutes } from "@/routes";
import { StoreProvider } from "@/store";

function App() {
  return (
    <StoreProvider>
      <ToastContainer
        position="top-right"
        transition={Bounce}
        theme="colored"
        className="text-capitalize"
      />
      <AppRoutes />
    </StoreProvider>
  );
}

export default App;
