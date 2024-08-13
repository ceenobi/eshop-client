import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate, useOutlet } from "react-router-dom";

export default function ProductsLayout() {
  const outlet = useOutlet();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    location.pathname === "/products" && navigate("/");
  }, [location.pathname, navigate]);

  return (
    <Container fluid="xl" className="px-3 py-5">
      {outlet}
    </Container>
  );
}
