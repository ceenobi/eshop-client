import { ActionButton, Headings, Texts } from "@/components";
import { useStore, useTitle } from "@/hooks";
import { formatCurrency } from "@/utils";
import { Container } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { CiCirclePlus, CiCircleMinus, CiShoppingCart } from "react-icons/ci";
import styles from "../pages.module.css";

export default function CartItems() {
  useTitle("Your cart");
  const {
    priceTotal,
    cartItems,
    removeFromCart,
    decreaseCartQuantity,
    increaseCartQuantity,
  } = useStore();

  return (
    <Container fluid="xl" className="px-3 py-3 py-lg-5">
      {cartItems.length > 0 ? (
        <>
          <div className="mt-4 text-center">
            <Headings
              text={`Your cart total is ${formatCurrency(priceTotal)}.`}
              size="1.8rem"
              extra="text-black"
            />
            <Texts text="Look for available discounts during checkout" />
            <ActionButton
              text="Check Out"
              className="mt-2 text-white"
              as={Link}
              to="/checkout"
              style={{ backgroundColor: "var(--bg-blue-400)" }}
            />
          </div>
          <br />
          <br />
          <hr style={{ maxWidth: "800px" }} className="mx-auto" />
          <br />
          <br />
          <div style={{ maxWidth: "800px" }} className="mx-auto">
            {cartItems?.map((item) => (
              <div
                className="d-md-flex justify-content-between mb-4"
                key={item._id}
              >
                <div
                  className="d-flex flex-wrap flex-md-nowrap gap-2 gap-lg-4"
                  style={{ maxWidth: "700px" }}
                >
                  <Link
                    to={`/products/${item.category.toLowerCase()}/${item.slug}`}
                  >
                    <LazyLoadImage
                      effect="blur"
                      src={item.image[0]}
                      alt={item.name}
                      width={130}
                      height={130}
                      className="object-fit-cover"
                    />
                  </Link>
                  <div>
                    <Link
                      to={`/products/${item.category?.toLowerCase()}/${
                        item.slug
                      }`}
                    >
                      <Texts
                        text={item.name}
                        size="1.2rem"
                        className="mb-0 fw-medium text-capitalize"
                        color="var(--bg-zinc-700)"
                      />
                    </Link>
                    <div className="d-flex justify-content-between justify-content-md-start gap-md-5 align-items-center">
                      <Texts
                        text={formatCurrency(item.price)}
                        size="1rem"
                        className="mt-3"
                        color="var(--bg-zinc-700)"
                      />
                      <div
                        className="d-flex gap-2 align-items-center  p-1"
                        style={{ width: "100px" }}
                      >
                        <ActionButton
                          text={
                            <>
                              <CiCircleMinus size="20px" color="black" />
                            </>
                          }
                          size="sm"
                          variant="none"
                          onClick={() => decreaseCartQuantity(item)}
                        />
                        <span className="fs-6 fw-medium">{item.quantity}</span>
                        <ActionButton
                          text={
                            <>
                              {" "}
                              <CiCirclePlus size="20px" color="black" />
                            </>
                          }
                          size="sm"
                          variant="none"
                          onClick={() => increaseCartQuantity(item)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Texts
                  text="Remove"
                  size="1rem"
                  className="cursor remove"
                  onClick={() => removeFromCart(item._id)}
                  color="var(--bg-blue-400)"
                />
              </div>
            ))}

            <br className="d-none d-md-block" />
            <hr />
            <br />
            <br />
            <div
              className={`d-flex flex-column justify-content-md-end ms-md-auto ${styles.cartWidth}`}
            >
              <div className="d-flex justify-content-between w-100">
                <Texts
                  text="Subtotal"
                  size="1rem"
                  className="fw-medium text-center"
                  color="var(--bg-zinc-700)"
                />
                <Texts
                  text={formatCurrency(priceTotal)}
                  size="1rem"
                  className="text-center"
                  color="var(--bg-zinc-700)"
                />
              </div>
              <hr />
              <ActionButton
                text="Check Out"
                className="mt-2 text-white py-2"
                as={Link}
                to="/checkout"
                style={{ backgroundColor: "var(--bg-blue-400)" }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="mt-5 text-center">
          <CiShoppingCart size="50px" />
          <Texts
            text="Your Cart is Empty!"
            size="1.3rem"
            className="mt-2 mb-0 fw-medium text-center"
          />
          <Texts
            text="Browse all categories and discover our new arrivals"
            size="1rem"
            className="text-center"
          />
          <ActionButton
            text="Buy Now"
            variant="primary"
            as={Link}
            to="/products"
            size="lg"
            style={{ width: "200px", backgroundColor: "var(--bg-blue-400)" }}
            className="text-white"
          />
        </div>
      )}
    </Container>
  );
}
