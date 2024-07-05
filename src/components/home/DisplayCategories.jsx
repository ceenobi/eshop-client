import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Texts from "../Texts";

export default function DisplayCategories({ categories }) {
  return (
    <div className="mt-5 px-3 d-flex justify-content-md-center gap-3 gap-md-5 overflow-x-auto overflow-y-hidden scrollbody">
      {categories.map(({ _id, name, image }) => (
        <Link
          to={`/products/${name.toLowerCase()}`}
          key={_id}
          style={{ width: "150px" }}
        >
          <LazyLoadImage
            effect="blur"
            src={image}
            alt={name}
            width={150}
            height={150}
            className="object-fit-fill"
          />
          <Texts
            text={name}
            className="mt-2 text-center fw-medium text-black"
          />
        </Link>
      ))}
    </div>
  );
}
