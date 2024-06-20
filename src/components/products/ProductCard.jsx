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
    <div className="cardBox rounded-4 shadow-sm border mb-4">
      <Link to={`/products/${category.toLowerCase()}/${slug}`}>
        <LazyLoadImage
          effect="blur"
          src={image[0]}
          alt={name}
          width={"100%"}
          height={280}
          className="w-100 h-100 object-fit-cover rounded-top-4"
        />
      </Link>
      <Link to={`/products/${category.toLowerCase()}/${slug}`}>
        <Texts
          text={name?.length > 45 ? name.slice(0, 45) + "..." : name}
          className="fw-medium small px-2 mt-2"
        />
      </Link>
      <div className="px-2">
        <div className="d-flex justify-content-between align-items-center ">
          <Texts text={formatCurrency(price)} size="0.9rem" className="" />
          <IoCartSharp
            size="20px"
            onClick={() => addToCart(product)}
            className="z-3 cursor text-primary"
            title="Add item to cart"
          />
        </div>
      </div>
    </div>
  );
}
