import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Texts from "../Texts";

export default function DisplayCategories({ categories }) {
  return (
    <>
      {/* {isLoading && <p className="mt-5 text-center fs-3">Loading....</p>} */}
      <div className="mt-5 px-3 d-flex justify-content-md-center gap-3 overflow-x-auto overflow-y-hidden scrollbody">
        {categories?.data.map(({ _id, name, image }) => (
          <Link
            to={`/products/${name.toLowerCase()}`}
            key={_id}
            style={{ width: "190px" }}
          >
            <LazyLoadImage
              effect="blur"
              src={image}
              alt={name}
              width={190}
              height={120}
              className="object-fit-cover p-4"
            />
            <Texts
              text={name}
              className="text-center fw-bold text-dark"
              size="14px"
            />
          </Link>
        ))}
      </div>
    </>
  );
}
