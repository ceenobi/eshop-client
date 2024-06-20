import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Texts from "../Texts";

export default function DisplayCategories({ categories }) {
  return (
    <div className="mt-5 px-3 d-flex justify-content-center gap-5 overflow-x-auto overflow-y-hidden">
      {categories.map(({ _id, name, image }) => (
        <Link to={`/products/${name.toLowerCase()}`} key={_id}>
          <LazyLoadImage
            effect="blur"
            src={image}
            alt={name}
            width={150}
            height={150}
            className="object-fit-contain mb-0 rounded-4"
          />
          <Texts text={name} className="text-center fw-bold" />
        </Link>
      ))}
    </div>
  );
}
