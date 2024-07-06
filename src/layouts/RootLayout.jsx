import { Nav, Texts } from "@/components";
import { Container } from "react-bootstrap";
import { useOutlet } from "react-router-dom";

export default function RootLayout() {
  const outlet = useOutlet();
  return (
    <>
      <header>
        <Nav />
      </header>
      <main style={{ minHeight: "85vh" }}>{outlet}</main>
      <footer>
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
                  style={{ color: "var(--bg-blue-400" }}
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
      </footer>
    </>
  );
}
