import { Alert, Card } from "react-bootstrap";
import styles from "../../pages/pages.module.css";
import { useFetch, useStore, useTitle } from "@/hooks";
import { formatCurrency, tryCatchFn } from "@/utils";
import { Link, useNavigate } from "react-router-dom";
import { orderService } from "@/api";
import { FaListAlt } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader";
import Texts from "../Texts";
import ActionButton from "../ActionButton";
// import ModalView from "../ModalView";
// import Headings from "../Headings";

export default function OrderSummary() {
  useTitle("Your order summary");
  // const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    cartItems,
    shippingDetails,
    paymentMethod,
    cartQuantity,
    priceTotal,
    discountCode,
    token,
    setStep,
    generateOrder,
    setCartItems,
    setDiscountCode,
  } = useStore();
  const { error, data, loading } = useFetch(
    orderService.checkoutSummary,
    generateOrder,
    token
  );
  const totalSummary = useMemo(() => data, [data]);

  const goBack = () => {
    setStep((prev) => prev - 1);
  };

  const onOrderCreate = tryCatchFn(async () => {
    setIsLoading(true);
    const { status, data } = await orderService.createOrder(
      generateOrder,
      token
    );
    if (status === 201) {
      // setOrderId(data?.order._id);
      // setShowModal(true);
      setCartItems([]);
      toast.success(data.msg);
      setDiscountCode(null);
      setStep(1);
      navigate(`/orders/${data.order._id}`);
    }
    setIsLoading(false);
  });

  return (
    <>
      {error && (
        <Alert variant="danger" className="mt-5">
          {error?.response?.data?.error || error.message}
        </Alert>
      )}
      {loading && <Loader />}
      {!loading && !error && (
        <div className="d-lg-flex justify-content-between align-items-center">
          <div className={`${styles.form} mt-4 mx-auto`}>
            <Texts
              text={
                <>
                  <FaListAlt size="24px" />
                  {""} - Order summary
                </>
              }
              size="1.2rem"
              className="fw-semibold text-center"
              color="var(--bg-zinc-700)"
            />
            <div className="d-lg-none text-center">
              <IoCheckmarkCircle size="40px" color="green" />
              <Texts
                text="Steps completed"
                size="1.3rem"
                className="fw-semibold mb-0"
                color="var(--bg-zinc-700)"
              />
              <Texts text="Proceed to create your order" size="1.2rem" />
            </div>
            <Card border="dark" style={{ width: "100%" }}>
              <Card.Header>Info</Card.Header>
              <Card.Body>
                <>
                  <div className="d-flex justify-content-between align-items-center">
                    <Texts
                      text="Name"
                      size="1rem"
                      color="var(--bg-zinc-700)"
                      className="fw-semibold mb-2"
                    />
                    <Texts
                      text={shippingDetails.fullname}
                      size="14px"
                      color="var(--bg-zinc-700)"
                      className="mb-0"
                    />
                  </div>
                  <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <Texts
                      text="Address"
                      size="1rem"
                      color="var(--bg-zinc-700)"
                      className="fw-semibold mb-2"
                    />
                    <Texts
                      text={shippingDetails.address}
                      size="14px"
                      color="var(--bg-zinc-700)"
                      className="mb-0"
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Texts
                      text="Phone"
                      size="1rem"
                      color="var(--bg-zinc-700)"
                      className="fw-semibold mb-2"
                    />
                    <Texts
                      text={shippingDetails.phone}
                      size="14px"
                      color="var(--bg-zinc-700)"
                      className="mb-0"
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Texts
                      text="State"
                      size="1rem"
                      color="var(--bg-zinc-700)"
                      className="fw-semibold mb-2"
                    />
                    <Texts
                      text={shippingDetails.state}
                      size="14px"
                      color="var(--bg-zinc-700)"
                      className="mb-0"
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Texts
                      text="Country"
                      size="1rem"
                      color="var(--bg-zinc-700)"
                      className="fw-semibold mb-2"
                    />
                    <Texts
                      text={shippingDetails.country}
                      size="14px"
                      color="var(--bg-zinc-700)"
                      className="mb-2"
                    />
                  </div>
                </>
                <hr />
                <>
                  <Texts
                    text="Items"
                    size="1rem"
                    color="var(--bg-zinc-700)"
                    className="fw-semibold mb-0"
                  />
                  {cartItems.map((item) => (
                    <div
                      className="d-flex justify-content-between align-items-center"
                      key={item._id}
                    >
                      <Link
                        to={`/products/${item.category.toLowerCase()}/${
                          item.slug
                        }`}
                      >
                        <Texts
                          text={item.name.slice(0, 20) + "..."}
                          size="14px"
                          color="var(--bg-zinc-700)"
                          className="mb-0"
                        />
                      </Link>
                      <Texts
                        text={`(${item.quantity})`}
                        size="14px"
                        color="var(--bg-zinc-700)"
                        className="mb-0"
                      />
                      <Texts
                        text={formatCurrency(item.price)}
                        size="14px"
                        color="var(--bg-zinc-700)"
                        className="mb-0"
                      />
                    </div>
                  ))}
                </>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <Texts
                    text="Payment Method"
                    size="1rem"
                    color="var(--bg-zinc-700)"
                    className="fw-semibold mb-0"
                  />
                  <Texts
                    text={paymentMethod}
                    size="14px"
                    color="var(--bg-zinc-700)"
                    className="mb-0"
                  />
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <Texts
                    text="Quantity"
                    size="1rem"
                    color="var(--bg-zinc-700)"
                    className="fw-semibold mb-0"
                  />
                  <Texts
                    text={cartQuantity}
                    size="14px"
                    color="var(--bg-zinc-700)"
                    className="mb-0"
                  />
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <Texts
                    text="Subtotal"
                    size="1rem"
                    color="var(--bg-zinc-700)"
                    className="fw-semibold mb-0"
                  />
                  <Texts
                    text={formatCurrency(priceTotal)}
                    size="14px"
                    color="var(--bg-zinc-700)"
                    className="mb-0"
                  />
                </div>
                {discountCode && (
                  <>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                      <Texts
                        text="Discount code"
                        size="1rem"
                        color="var(--bg-zinc-700)"
                        className="fw-semibold mb-0"
                      />
                      <Texts
                        text={discountCode}
                        size="14px"
                        color="var(--bg-zinc-700)"
                        className="mb-0"
                      />
                    </div>
                  </>
                )}
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <Texts
                    text="Discount"
                    size="1rem"
                    color="var(--bg-zinc-700)"
                    className="fw-semibold mb-0"
                  />
                  <Texts
                    text={formatCurrency(totalSummary.discountValue)}
                    size="14px"
                    color="var(--bg-zinc-700)"
                    className="mb-0"
                  />
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <Texts
                    text="Shipping fee"
                    size="1rem"
                    color="var(--bg-zinc-700)"
                    className="fw-semibold mb-0"
                  />
                  <Texts
                    text={formatCurrency(totalSummary.getShippingFee)}
                    size="14px"
                    color="var(--bg-zinc-700)"
                    className="mb-0"
                  />
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <Texts
                    text="Tax (set based on shipping state)"
                    size="1rem"
                    color="var(--bg-zinc-700)"
                    className="fw-semibold mb-0"
                  />
                  <Texts
                    text={formatCurrency(totalSummary.calcTax)}
                    size="14px"
                    color="var(--bg-zinc-700)"
                    className="mb-0"
                  />
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <Texts
                    text="Total"
                    size="1rem"
                    color="var(--bg-zinc-700)"
                    className="fw-semibold mb-0"
                  />
                  <Texts
                    text={formatCurrency(totalSummary.total)}
                    size="14px"
                    className="mb-0 text-success fw-bold"
                  />
                </div>
              </Card.Body>
            </Card>
          </div>
          <hr className="mt-4 d-lg-none" />

          <div className="text-center">
            <div className="d-none d-lg-block">
              <IoCheckmarkCircle size="40px" color="green" />
              <Texts
                text="Steps completed"
                size="1.3rem"
                className="fw-semibold mb-0"
                color="var(--bg-zinc-700)"
              />
              <Texts text="Proceed to create your order" size="1.2rem" />
            </div>
            <ActionButton
              text="Create Order"
              className={`mt-3 border-0 p-2 ${styles.form}`}
              variant="dark"
              pending={isLoading}
              disabled={isLoading}
              onClick={onOrderCreate}
            />
            <div>
              <ActionButton
                text="Go back"
                className={`mt-3 p-2 ${styles.form}`}
                variant="outline-dark"
                onClick={goBack}
              />
            </div>
          </div>
        </div>
      )}

      {/* <ModalView
        show={showModal}
        handleClose={() => setShowModal(false)}
        backdrop="static"
      >
        <Headings text="Hurray 👏 👏 👏" extra="text-center" size="1.4rem" />
        <Texts
          text="Your order was successfully created"
          className="text-center"
          size="1.2rem"
        />
        <div className="text-center">
          <ActionButton
            text="View order details"
            className={`mt-2 text-center`}
            variant="success"
            onClick={() => navigate(`/orders/${orderId}`)}
          />
        </div>
      </ModalView> */}
    </>
  );
}
