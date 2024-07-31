import { useNavigation, Outlet } from "react-router-dom";

const AppWrap = () => {
  const { state } = useNavigation();
  console.log(state);

  if (state === "loading") {
    return <div>lading....</div>;
  }

  return <Outlet />;
};

export default AppWrap;
