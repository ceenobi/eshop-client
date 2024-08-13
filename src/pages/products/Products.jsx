import { productService } from "@/api";
import { Headings, Paginate, Texts, ProductCard } from "@/components";
import { useFetch, useStore, useTitle } from "@/hooks";
import { useMemo } from "react";
import { Alert, Col, Image, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function Products() {
  const [searchParams] = useSearchParams();
  const { itemsPerPage, categories } = useStore();
  const { categoryName } = useParams();
  useTitle(`Products ${categoryName}`);
  const navigate = useNavigate();
  const page = searchParams.get("page") || 1;
  const params = new URLSearchParams(searchParams);
  const { data, error, loading } = useFetch(
    productService.getProductsByCategory,
    categoryName,
    page
  );
  const catProducts = useMemo(() => data, [data]);
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
      <div className="mt-lg-5 mb-5 d-md-flex justify-content-between align-items-center">
        <Headings
          text={categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
          extra="fw-bold text-black mb-4 mb-md-0"
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
        size="1.1rem"
        extra="mb-5"
      />
      {error && (
        <Alert variant="danger" className="mt-5">
          {error?.response?.data?.error || error.message}
        </Alert>
      )}
      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" size="sm" />
        </div>
      )}
        {products?.length > 0 && (
          <Row className="my-2">
            {products?.map((product) => (
              <Col xs={6} md={4} lg={3} key={product._id} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
        {products?.length === 0 && (
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
