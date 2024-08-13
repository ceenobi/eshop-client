import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Texts from "../Texts";

export default function DisplayCategories({ categories }) {
  return (
    <div className="mt-5 d-flex justify-content-lg-center gap-3 overflow-x-auto overflow-y-hidden scrollbody">
      {categories?.map(({ _id, name, image }) => (
        <Link to={`/products/${name.toLowerCase()}`} key={_id} className="px-3">
          <LazyLoadImage
            effect="blur"
            src={image}
            alt={name}
            width={190}
            height={200}
            className="object-fit-fill"
          />
          <Texts
            text={name}
            className="mt-2 text-center fw-bold text-dark"
            size="14px"
          />
        </Link>
      ))}
    </div>
  );
}
