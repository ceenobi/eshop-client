import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Texts from "../Texts";
import { Badge, Col, Row } from "react-bootstrap";
import { formatDate } from "@/utils";
import ActionButton from "../ActionButton";

export default function AllOrders({
  _id,
  orderItems,
  quantity,
  createdAt,
  isPaid,
  reference,
}) {
  return (
    <>
      <div className="my-4 border shadow-sm p-3 ">
        <Texts
          text={
            <>
              Reference:{" "}
              <small className="text-success">
                {reference ? reference : _id}
              </small>
            </>
          }
          size="1rem"
          color="var(--bg-zinc-600)"
          className="fw-medium"
        />
        <Row>
          <Col md={6} className="mb-2">
            {orderItems.map((item) => (
              <div
                className="d-flex gap-3 mb-2 bg-light shadow-sm rounded-3 p-3 border"
                key={item._id}
              >
                <Link
                  to={`/product/${item.category.toLowerCase()}/${item.slug}`}
                >
                  <LazyLoadImage
                    effect="blur"
                    src={item.image[0]}
                    alt={"productimage"}
                    width={60}
                    height={60}
                    className="w-100 h-100 object-fit-contain mb-2"
                  />
                </Link>
                <div>
                  <Texts text={item.name} size="0.8rem" className="mb-1" />
                  <Texts
                    text={formatDate(createdAt)}
                    size="0.8rem"
                    className="fw-medium"
                  />
                </div>
              </div>
            ))}
          </Col>
          <Col md={2} className="mb-2">
            <Texts text={`QTY: (${quantity})`} size="1rem" />
          </Col>
          <Col md={2} className="mb-4">
            <div>
              <Texts text="Payment status" size="1rem" className="mb-1" />
              <Badge pill bg={isPaid ? "success" : "warning"}>
                {isPaid ? "Paid" : "Not Paid"}
              </Badge>
            </div>
          </Col>
          <Col md={2} className="mb-2">
            <ActionButton
              text="See Details"
              className="text-white"
              as={Link}
              to={`/orders/${_id}`}
              style={{
                width: "fit-content",
                backgroundColor: "var(--bg-blue-400)",
              }}
            />         
          </Col>
        </Row>
      </div>
    </>
  );
}
