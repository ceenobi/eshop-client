import { ActionButton, Headings, Texts } from "@/components";
import { useStore, useTitle } from "@/hooks";
import { formatCurrency } from "@/utils";
import { Container } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { MdRemoveShoppingCart } from "react-icons/md";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import styles from "../pages.module.css"

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
            />
          </div>
          <br />
          <br />
          <hr style={{ maxWidth: "768px" }} className="mx-auto" />
          <br />
          <br />
          <div style={{ maxWidth: "800px" }} className="mx-auto">
            {cartItems?.map((item) => (
              <div
                className="d-flex justify-content-between mb-4"
                key={item._id}
              >
                <div className="d-flex flex-wrap flex-lg-nowrap gap-2 gap-lg-4">
                  <Link
                    to={`/products/${item.category.toLowerCase()}/${item.slug}`}
                  >
                    <LazyLoadImage
                      effect="blur"
                      src={item.image[0]}
                      alt={item.name}
                      width={130}
                      height={130}
                      className="w-100 h-100 object-fit-cover"
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
                        size="1.3rem"
                        className="mb-0 fw-medium text-capitalize"
                      />
                    </Link>
                    <div className="d-flex gap-5 align-items-center">
                      <Texts
                        text={formatCurrency(item.price)}
                        size="1.2rem"
                        className="mt-3 fw-medium"
                      />
                      <div
                        className="d-flex gap-2 align-items-center  p-1"
                        style={{ width: "100px" }}
                      >
                        <ActionButton
                          text={
                            <>
                              {" "}
                              <CiCircleMinus size="16px" color="black" />
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
                              <CiCirclePlus size="16px" color="black" />
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
                  className="text-primary cursor remove"
                  onClick={() => removeFromCart(item._id)}
                />
              </div>
            ))}
            <br />
            <br />
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
                />
                <Texts
                  text={formatCurrency(priceTotal)}
                  size="1rem"
                  className="text-center"
                />
              </div>
              <hr />
              <ActionButton
                text="Check Out"
                className="mt-2 text-white"
                as={Link}
                to="/checkout"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="mt-5 text-center">
          <MdRemoveShoppingCart size="80px" />
          <Texts
            text="Your cart is empty 😭 "
            size="1.3rem"
            className="mt-2 fw-medium text-center"
          />
        </div>
      )}
    </Container>
  );
}
