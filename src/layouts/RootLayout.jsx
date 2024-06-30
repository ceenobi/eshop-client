import { Nav, Texts } from "@/components";
import { Container } from "react-bootstrap";
import { useOutlet } from "react-router-dom";

export default function RootLayout() {
  const outlet = useOutlet();
  return (
    <main>
      <Nav />
      <div style={{ minHeight: "80vh" }}>{outlet}</div>
      <Container
        fluid="xl"
        className="px-3 mt-4 d-flex align-items-center justify-content-between text-uppercase fw-bold"
      >
        <Texts text={<>&copy;Footsy, inc</>} size="12px" />
        <Texts
          text={
            <>
              Powered by{" "}
              <a
                href="https://teemcommerce.netlify.app"
                className="text-primary"
                target="_blank"
                rel="noopener noreferrer" // Added for security and performance
              >
                TEEM
              </a>
            </>
          }
          size="12px"
        />
      </Container>
    </main>
  );
}
