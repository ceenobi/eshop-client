import { Card, Container } from "react-bootstrap";
import { FaTruck, FaCcAmazonPay } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";

const data = [
  {
    id: 0,
    Icon: FaTruck,
    text: (
      <>
        <span className="text-warning">Enjoy fast delivery,</span> free delivery
        or easy pickup when you shop with us.
      </>
    ),
    color: "#e82929",
  },
  {
    id: 1,
    Icon: FaCcAmazonPay,
    text: (
      <>
        <span className="text-info">Pay on delivery or at checkout.</span> Enjoy
        flexible payment options.
      </>
    ),
    color: "#29e100",
  },
  {
    id: 2,
    Icon: MdDiscount,
    text: (
      <>
        Take advantage of our <span className="text-primary">discount</span>{" "}
        promos on select products.
      </>
    ),
    color: "#07224e",
  },
];

export default function ShopWithUs() {
  return (
    <>
      <Container className="p-0 px-md-3 mt-lg-4">
        <div
          className="d-flex align-items-center overflow-x-scroll overflow-y-hidden scrollbody"
          style={{ height: "250px" }}
        >
          {data.map(({ id, Icon, text, color }) => (
            <Card
              style={{ minWidth: "20rem", height: "200px" }}
              key={id}
              className="text-center py-3 bg-light shadow-sm rounded-4 border-0 mx-3"
            >
              <Card.Body>
                <Card.Title>
                  <Icon size="40px" color={color} />
                </Card.Title>
                <Card.Text className="fs-5 fw-semibold">{text}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}
