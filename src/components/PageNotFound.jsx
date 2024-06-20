import { ActionButton } from "@/components";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <section className="mt-5">
      <Container fluid="xl" className="py-5 px-4">
        <p className="mt-5">
          Oops! This hurts me more than it hurts you,
          <br />
          The page you are looking for does not exist, might have been removed,
          had its name changed, <br />
          Or is temporarily unavailable.
        </p>
        <ActionButton
          style={{ backgroundColor: "var(--bg-zinc-700)" }}
          text="Click to go home"
          variant="none"
          className="text-white"
          onClick={() => navigate("/")}
        />
      </Container>
    </section>
  );
}
