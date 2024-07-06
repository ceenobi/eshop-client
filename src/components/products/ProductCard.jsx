import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Texts from "../Texts";
import { formatCurrency } from "@/utils";
import { IoCartSharp } from "react-icons/io5";
import { useStore } from "@/hooks";
import { toast } from "react-toastify";
import { Badge } from "react-bootstrap";

export default function ProductCard({ product }) {
  const { increaseCartQuantity } = useStore();
  const { slug, category, image, name, price, inStock } = product;

  const addToCart = (product) => {
    increaseCartQuantity(product);
    toast.success(`${name} added to cart`);
  };

  return (
    <div className="d-flex flex-column justify-content-between cardBox bg-white rounded-3 border mb-4 position-relative shadow-sm">
      {!inStock && (
        <Badge bg="secondary" className="position-absolute top-0 m-3 z-3">
          Out of stock
        </Badge>
      )}
      <div>
        <Link to={`/products/${category.toLowerCase()}/${slug}`}>
          <LazyLoadImage
            effect="blur"
            src={image[0]}
            alt={name}
            width="100%"
            height={210}
            className="object-fit-cover rounded-top-3"
          />
        </Link>
        <Link to={`/products/${category.toLowerCase()}/${slug}`}>
          <Texts
            text={name?.length > 35 ? name?.slice(0, 35) + "..." : name}
            className="px-1 my-2 mb-0 fw-semibold text-start"
            size="0.8rem"
            color="var(--bg-zinc-700)"
          />
        </Link>
      </div>
      <div className="px-1 mt-2 d-flex">
        <Texts
          text={formatCurrency(price)}
          size="0.9rem"
          color="var(--bg-zinc-600)"
          className="flex-grow-1 text-start"
        />
        <IoCartSharp
          size="22px"
          onClick={() => addToCart(product)}
          className="cursor d-none d-lg-block"
          title="Add item to cart"
          color="#3f3f46"
        />
      </div>
    </div>
  );
}
