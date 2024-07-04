import { FadeLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <FadeLoader color="#3182CE" />
    </div>
  );
}
