import { Col, Row } from "react-bootstrap";
import Headings from "../Headings";
import Texts from "../Texts";
import styles from "../../pages/pages.module.css";
import ActionButton from "../ActionButton";
import { Link } from "react-router-dom";
import { BsCartX } from "react-icons/bs";

export default function NoCheckout() {
  return (
    <div className="mt-4">
      <Headings
        text="Checkout."
        size="1.8rem"
        className="text-black"
        extra="text-center text-lg-start"
      />
      <Row className="mt-5">
        <Col lg={7} className="mb-5">
          <div className="text-center">
            <Texts
              text="Oops you have no orders to process"
              size="1.3rem"
              className="fw-semibold"
              color="var(--bg-zinc-700)"
            />
            <BsCartX size="45px" />
          </div>
        </Col>
        <Col lg={5} className="mb-5">
          <div className="d-lg-flex justify-content-between">
            <div
              style={{ height: "250px" }}
              className="border d-none d-lg-block"
            ></div>
            <hr className="d-lg-none" />
            <div className="mt-5 mt-lg-0 text-center">
              <Texts
                text="Can't see checkout?"
                size="1.3rem"
                className="fw-semibold mb-0"
                color="var(--bg-zinc-700)"
              />
              <Texts text="Start by adding items to your cart" size="1.2rem" />
              <ActionButton
                text="Proceed"
                className={`mt-3 border-0 text-white p-2 ${styles.form}`}
                variant="dark"
                as={Link}
                to="/products"
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
