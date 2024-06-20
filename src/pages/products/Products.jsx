import { lazy, Suspense } from "react";
import { productService } from "@/api";
import { Headings, Loader, Paginate, Texts } from "@/components";
import { useFetch, useStore, useTitle } from "@/hooks";
import { useMemo } from "react";
import { Alert, Col, Image, Row } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const ProductCard = lazy(() => import("@/components/products/ProductCard"));

export default function Products() {
  const [searchParams] = useSearchParams();
  const { itemsPerPage, categories } = useStore();
  const { categoryName } = useParams();
  useTitle(`Products ${categoryName}`);
  const navigate = useNavigate();
  const page = searchParams.get("page") || 1;
  const { data, error, loading } = useFetch(
    productService.getProductsByCategory,
    categoryName,
    page
  );
  const catProducts = useMemo(() => data, [data]);
  const params = new URLSearchParams(searchParams);
  //paginate
  const { totalPages, count, products } = catProducts;
  const prevPage = itemsPerPage * (parseInt(page) - 1) > 0;
  const nextPage = itemsPerPage * (parseInt(page) - 1) + itemsPerPage < count;
  const firstPage = 1;
  const lastPage = Math.ceil(count / itemsPerPage);

  const handlePageChange = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    navigate(window.location.pathname + "?" + params.toString());
  };

  const handleFirstPage = () => {
    params.set("page", firstPage);
    navigate(window.location.pathname + "?" + params.toString());
  };

  const handleLastPage = () => {
    params.set("page", lastPage);
    navigate(window.location.pathname + "?" + params.toString());
  };

  const getFormattedCatName =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  const matchedCatName = categories.filter(
    (cat) => cat.name.toLowerCase() === getFormattedCatName.toLowerCase()
  );

  return (
    <>
      <div className="mt-lg-5 mb-5 d-flex justify-content-between align-items-center">
        <Headings
          text={categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
          className="fw-bold text-black"
        />
        <div className="d-flex align-items-center gap-1">
          <Image
            src="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png"
            roundedCircle
            className="object-fit-cover"
            alt="avatar"
            style={{ width: "35px", height: "35px" }}
          />
          <div>
            <Texts
              text="Need shopping help?"
              size="1rem"
              className="mb-0 fw-medium"
            />
            <span className="text-primary text-decoration-underline">
              Ask a specialist
            </span>
          </div>
        </div>
      </div>
      <Headings
        text={
          <>
            <span className="fw-bold text-black me-2">Catalog.</span>
            {matchedCatName[0]?.description}
          </>
        }
        color="var(--bg-zinc-600)"
        size="1.5rem"
      />
      {error && (
        <Alert variant="danger" className="mt-5">
          {error?.response?.data?.error || error.message}
        </Alert>
      )}
      <Suspense fallback={<Loader />}>
        {loading && (
          <Row className="my-5">
            {Array.from({ length: 4 }, (_, index) => (
              <Col md={4} lg={3} key={index}>
                <Skeleton
                  height="320px"
                  containerClassName="product-skeleton"
                  className="rounded-4"
                />
              </Col>
            ))}
          </Row>
        )}
        {!error && !loading && products?.length > 0 && (
          <Row className="my-5">
            {products?.map((product) => (
              <Col md={4} lg={3} key={product._id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Suspense>
      {!error && products?.length === 0 && (
        <Texts text="No products to display" size="1.3rem" />
      )}
      <Paginate
        prevPage={prevPage}
        nextPage={nextPage}
        page={page}
        handleLastPage={handleLastPage}
        handleFirstPage={handleFirstPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
        lastPage={lastPage}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
}
