import { Container } from "react-bootstrap";
import styles from "../pages/pages.module.css";
import { Link } from "react-router-dom";
import { GiWingfoot } from "react-icons/gi";
import { Texts } from "@/components";

export default function AuthLayout({ children, caption }) {
  return (
    <main className={`${styles.customBg}`}>
      <Container fluid="xl" className="px-3 py-3 py-lg-5 min-vh-100">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Link to="/">
            <GiWingfoot size="35px" color="#3f3f46" />
          </Link>
          <Texts
            text={caption}
            size="1.3rem"
            className="fw-semibold mt-2"
            color="var(--bg-zinc-700)"
          />
          <div className="shadow-sm p-3 text-center bg-white rounded-4">
            {children}
          </div>
        </div>
      </Container>
    </main>
  );
}
