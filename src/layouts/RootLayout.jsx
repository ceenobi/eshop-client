import { Nav, Texts } from "@/components";
import { Container } from "react-bootstrap";
import { ScrollRestoration, useOutlet } from "react-router-dom";

export default function RootLayout() {
  const outlet = useOutlet();
  return (
    <>
      <header>
        <Nav />
      </header>
      <main style={{ minHeight: "85vh" }}>
        {outlet}
        <ScrollRestoration
          getKey={(location) => {
            return location.key;
          }}
        />
      </main>
      <footer>
        <Container
          fluid="xl"
          className="px-3 mt-4 d-flex align-items-center justify-content-between text-uppercase fw-bold"
        >
          <Texts text={<>&copy;Baggit, inc</>} size="12px" />
          <Texts
            text={
              <>
                Powered by{" "}
                <a
                  href="https://teem-seller.vercel.app/"
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
