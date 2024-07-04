import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Texts from "../Texts";
import { formatCurrency } from "@/utils";
import { IoCartSharp } from "react-icons/io5";
import { useStore } from "@/hooks";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const { increaseCartQuantity } = useStore();
  const { slug, category, image, name, price } = product;

  const addToCart = (product) => {
    increaseCartQuantity(product);
    toast.success(`${name} added to cart`);
  };

  return (
    <div className="cardBox mb-4" style={{ minWidth: "260px" }}>
      <Link to={`/products/${category.toLowerCase()}/${slug}`}>
        <LazyLoadImage
          effect="blur"
          src={image[0]}
          alt={name}
          width={"100%"}
          height={300}
          className="w-100 h-100 object-fit-cover rounded-3 border"
        />
      </Link>
      <Link to={`/products/${category.toLowerCase()}/${slug}`}>
        <Texts
          text={name}
          className="my-2 fw-semibold text-start"
          size="0.9rem"
          color="var(--bg-zinc-700)"
        />
      </Link>
      <div className="mt-2 d-flex justify-content-between">
        <Texts text={formatCurrency(price)} size="0.9rem" />
        <IoCartSharp
          size="22px"
          onClick={() => addToCart(product)}
          className="cursor"
          title="Add item to cart"
          color="#3f3f46"
        />
      </div>
    </div>
  );
}
