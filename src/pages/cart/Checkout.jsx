import {
  GetDiscountCode,
  GetPaymentMethod,
  Headings,
  NoCheckout,
  ShippingForm,
  Texts,
} from "@/components";
import { Col, Container, Row } from "react-bootstrap";
import { useStore, useTitle } from "@/hooks";
import { PiNotePencilFill } from "react-icons/pi";
import { Outlet } from "react-router-dom";

export default function Checkout() {
  useTitle("Checkout");
  const { cartItems, step, setStep } = useStore();

  return (
    <Container fluid="xl" className="px-3 py-3 py-lg-5">
      {cartItems.length > 0 ? (
        <div className="mt-4">
          <Headings
            text="Checkout details"
            size="1.8rem"
            className="text-black"
            extra="text-center text-lg-start"
          />
          {step === 4 ? (
            <Outlet />
          ) : (
            <Row className="align-items-center">
              <Col lg={7} className="mb-5">
                <div className="text-center d-lg-none">
                  <PiNotePencilFill size="40px" />
                  <Texts
                    text="Please complete the steps in order to create your order"
                    size="1.2rem"
                    color="var(--bg-zinc-700)"
                    className="fw-semibold mb-0"
                  />
                </div>
                {step === 1 && <ShippingForm step={step} setStep={setStep} />}
                {step === 2 && (
                  <GetDiscountCode step={step} setStep={setStep} />
                )}
                {step === 3 && (
                  <GetPaymentMethod step={step} setStep={setStep} />
                )}
              </Col>
              <Col lg={5} className="mb-5 d-none d-lg-block">
                <div className="text-center">
                  <PiNotePencilFill size="40px" />
                  <Texts
                    text="Please complete the steps in order to create your order"
                    size="1.3rem"
                    color="var(--bg-zinc-700)"
                    className="fw-semibold mb-0"
                  />
                </div>
              </Col>
            </Row>
          )}
        </div>
      ) : (
        <NoCheckout />
      )}
    </Container>
  );
}
