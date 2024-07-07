import { orderService } from "@/api";
import {
  ActionButton,
  Headings,
  ModalView,
  Paypal,
  Paystack,
  Texts,
} from "@/components";
import { useFetch, useStore } from "@/hooks";
import { formatDate, orderProgress, tryCatchFn } from "@/utils";
import { useMemo, useState } from "react";
import { Alert, Badge, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack, IoMdCash } from "react-icons/io";
import { FaPaypal } from "react-icons/fa6";
import { SiPicpay } from "react-icons/si";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

export default function OrderDetails() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelOrderModal, setShowCancelOrderModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { token } = useStore();
  const { orderId } = useParams();
  const { data, error, setData, loading } = useFetch(
    orderService.getASingleOrder,
    orderId
  );
  const order = useMemo(() => data, [data]);
  const navigate = useNavigate();

  const updatePayment = tryCatchFn(async (reference) => {
    const { status, data } = await orderService.updatePaymentInfo(
      orderId,
      { isPaid: true, reference: reference },
      token
    );
    if (status === 200) {
      setShowSuccessModal(true);
      setData(data.updatedOrder);
    }
  });

  const deleteOrder = tryCatchFn(async () => {
    setIsDeleting(true);
    const res = await orderService.cancelOrder(orderId, token);
    if (res.status === 200) {
      toast.success(res.data.msg);
      window.location.replace("/orders");
    }
    setIsDeleting(false);
  });

  return (
    <>
      {error && (
        <Alert variant="danger" className="mt-5">
          {error?.response?.data?.error || error.message}
        </Alert>
      )}
      <Texts
        text={
          <>
            <IoMdArrowBack />
            Orders
          </>
        }
        size="16px"
        className="fw-bold mb-5 cursor"
        onClick={() => navigate("/orders")}
      />
      <Headings
        text={
          <>
            Order: <span className="fs-6 text-success">{orderId}</span>
          </>
        }
        size="1.5rem"
      />
      {loading && (
        <>
          {Array.from({ length: 1 }, (_, index) => (
            <Row className="my-5" key={index}>
              <Col md={6} lg={7} className="mb-4">
                <Skeleton
                  height="380px"
                  containerClassName="product-skeleton"
                  className="rounded-3"
                />
              </Col>
              <Col md={6} lg={5} className="mb-4">
                <Skeleton
                  height="150px"
                  containerClassName="product-skeleton"
                  className="rounded-3"
                />
              </Col>
            </Row>
          ))}
        </>
      )}
      <Row className="justify-content-between">
        <Col md={6} lg={7}>
          <div className="mt-4 bg-light shadow-sm rounded-3 p-3 border">
            <Texts
              text="Order status"
              size="1rem"
              className="mb-4 fw-semibold border-bottom border-1 border-dark"
              style={{ width: "fit-content" }}
            />
            <div className="d-flex justify-content-between align-items-center">
              {orderProgress.map(({ id, name, Icon, color }) => (
                <div key={id}>
                  <Icon
                    size="36px"
                    color={order.orderStatus === name ? color : ""}
                  />
                  <small>{name}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 bg-light shadow-sm rounded-3 p-3 border">
            <Texts
              text="Shipping details"
              size="1rem"
              className="mb-4 fw-semibold border-bottom border-1 border-dark"
              style={{ width: "fit-content" }}
            />
            <div className="d-flex justify-content-between">
              <Texts
                text="Receiver's name:"
                size="1rem"
                className="fw-medium"
              />
              <Texts text={order?.shippingDetails?.fullname} size="1rem" />
            </div>
            <div className="d-flex justify-content-between">
              <Texts
                text="Receiver's address:"
                size="1rem"
                className="fw-medium"
              />
              <Texts text={order?.shippingDetails?.address} size="1rem" />
            </div>
            <div className="d-flex justify-content-between">
              <Texts
                text="Receiver's phone:"
                size="1rem"
                className="fw-medium"
              />
              <Texts text={order?.shippingDetails?.phone} size="1rem" />
            </div>
            <div className="d-flex justify-content-between">
              <Texts text="State:" size="1rem" className="fw-medium" />
              <Texts text={order?.shippingDetails?.state} size="1rem" />
            </div>
            <div className="d-flex justify-content-between">
              <Texts text="Country:" size="1rem" className="fw-medium" />
              <Texts text={order?.shippingDetails?.country} size="1rem" />
            </div>
          </div>
          <div className="mt-4 bg-light shadow-sm rounded-3 p-3 border">
            <Texts
              text="Payment status"
              size="1rem"
              className="fw-semibold border-bottom border-1 border-dark"
              style={{ width: "fit-content" }}
            />
            <div className="d-flex justify-content-between align-items-center">
              <Texts text="isPaid:" size="1rem" className="fw-medium mt-3" />
              <Badge pill bg={order.isPaid ? "success" : "warning"}>
                {order.isPaid ? "Paid" : "Not Paid"}
              </Badge>
            </div>
            {order.paidAt && (
              <div className="d-flex justify-content-between align-items-center">
                <Texts text="Paid At:" size="1rem" className="fw-medium" />
                <Texts
                  text={formatDate(order.paidAt)}
                  size="1rem"
                  className="fw-medium"
                />
              </div>
            )}
          </div>
          <div className="mt-4 bg-light shadow-sm rounded-3 p-3 border">
            <Texts
              text="Delivery status"
              size="1rem"
              className="fw-semibold border-bottom border-1 border-dark"
              style={{ width: "fit-content" }}
            />
            <div className="d-flex justify-content-between align-items-center">
              <Texts
                text="isDelivered:"
                size="1rem"
                className="fw-medium mt-3"
              />
              <Badge pill bg={order.isDelivered ? "success" : "warning"}>
                {order.isDelivered ? "Delivered" : "Not Delivered"}
              </Badge>
            </div>
            {order.deliveredAt && (
              <div className="d-flex justify-content-between align-items-center">
                <Texts text="Delivered At:" size="1rem" className="fw-medium" />
                <Texts
                  text={formatDate(order.deliveredAt)}
                  size="1rem"
                  className="fw-medium"
                />
              </div>
            )}
          </div>
        </Col>
        <Col md={6} lg={5}>
          {!order.isPaid ? (
            <div className="mt-4 bg-light shadow-sm rounded-3 p-3 border mb-3">
              <Texts
                text="Payment method"
                size="1rem"
                className="mb-2 fw-semibold border-bottom border-1 border-dark"
                style={{ width: "fit-content" }}
              />
              <Texts
                text={
                  <>
                    You selected:{" "}
                    {order.paymentMethod === "Pay on delivery" && (
                      <>
                        {order.paymentMethod}{" "}
                        <IoMdCash className="text-success" size="36px" />
                      </>
                    )}
                    {order.paymentMethod === "Paypal" && (
                      <>
                        {order.paymentMethod}{" "}
                        <FaPaypal size="24px" color="skyblue" />
                      </>
                    )}
                    {order.paymentMethod === "Paystack" && (
                      <>
                        {order.paymentMethod}{" "}
                        <SiPicpay size="24px" color="skyblue" />
                      </>
                    )}
                  </>
                }
                size="1rem"
                className="fw-medium"
              />
              {order.paymentMethod === "Paypal" && (
                <Paypal updatePayment={updatePayment} total={order.total} />
              )}
              {order.paymentMethod === "Paystack" && (
                <Paystack updatePayment={updatePayment} order={order} />
              )}
            </div>
          ) : (
            <div className="mt-4 text-center bg-light shadow-sm rounded-3 p-3 border mb-3">
              <FaMoneyBillTransfer size="40px" color="green" />
              <Texts
                text="Your payment was received 😎"
                size="0.9rem"
                className="fw-semibold text-center mb-0"
              />
              <small>Mode: {order.paymentMethod}</small>
            </div>
          )}
          {!order.isPaid && (
            <div className="text-end">
              <ActionButton
                text="Cancel Order"
                type="button"
                variant="danger"
                style={{
                  width: "fit-content",
                }}
                onClick={() => setShowCancelOrderModal(true)}
              />
            </div>
          )}
        </Col>
      </Row>
      <ModalView
        show={showSuccessModal}
        handleClose={() => setShowSuccessModal(false)}
        size="sm"
        backdrop="static"
      >
        <div className="text-center">
          <IoCheckmarkCircle size="40px" color="green" />
          <Texts
            text="Your payment was successfull"
            size="1rem"
            className="fw-semibold mb-3"
            color="var(--bg-zinc-700)"
          />
          <ActionButton
            text="Close"
            variant="success"
            onClick={() => setShowSuccessModal(false)}
          />
        </div>
      </ModalView>
      <ModalView
        show={showCancelOrderModal}
        handleClose={() => setShowCancelOrderModal(false)}
        title="Cancel order"
        backdrop="static"
      >
        <Texts
          text="You are about to permanently delete this order."
          className="fw-bold"
        />
        <Texts text="Deleting this order is permanent and cannot be reversed. Are you sure?" />
        <div className="d-flex justify-content-end align-items-center gap-3">
          <Texts
            text="Cancel"
            className="fw-bold cursor mt-3"
            role="button"
            onClick={() => setShowCancelOrderModal(false)}
          />
          <ActionButton
            text="DELETE ORDER"
            pending={isDeleting}
            disabled={isDeleting}
            className="border-0 p-2"
            style={{
              fontSize: "14px",
              width: "170px",
              backgroundColor: "var(--bg-zinc-700)",
            }}
            onClick={deleteOrder}
          />
        </div>
      </ModalView>
    </>
  );
}
