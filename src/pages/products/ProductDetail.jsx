import { productService } from "@/api";
import { useFetch, useStore, useTitle } from "@/hooks";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useMemo, useState, lazy, Suspense } from "react";
import { Headings, Loader } from "@/components";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

const RecommendProducts = lazy(() =>
  import("@/components/products/RecommendProducts")
);
const ShowProduct = lazy(() => import("@/components/products/ShowProduct"));

export default function ProductDetail() {
  const [active, setActive] = useState(0);
  const [showPicModal, setShowPicModal] = useState(false);
  const { slug } = useParams();
  useTitle(`${slug}`);
  const { data, error, loading } = useFetch(productService.getAProduct, slug);
  const {
    data: dataB,
    error: err,
    loading: isLoading,
  } = useFetch(productService.getRecommendedProducts, slug);

  const product = useMemo(() => data, [data]);
  const recommended = useMemo(() => dataB, [dataB]);
  const { increaseCartQuantity } = useStore();

  const updateImage = (index) => {
    setActive(index);
  };
  const expandImg = (index) => {
    setShowPicModal(true);
    setActive(index);
  };

  const addToCart = (product) => {
    increaseCartQuantity(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <>
      {error && (
        <Alert variant="danger" className="mt-5">
          {error?.response?.data?.error || error.message}
        </Alert>
      )}
      {loading ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <ShowProduct
            addToCart={addToCart}
            expandImg={expandImg}
            updateImage={updateImage}
            showPicModal={showPicModal}
            setShowPicModal={setShowPicModal}
            product={product}
            active={active}
            setActive={setActive}
          />
        </Suspense>
      )}
      <div style={{ marginTop: "6rem" }}>
        <Headings text="You may also like" extra="mb-4" size="1.4rem" />
        {err && (
          <Alert variant="danger" className="mt-5">
            {err?.response?.data?.error || err.message}
          </Alert>
        )}
        {isLoading && (
          <>
            <div className="d-flex align-items-center gap-4 overflow-x-scroll overflow-y-hidden scrollbody">
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton
                  height="430px"
                  width="250px"
                  containerClassName="product-skeleton"
                  className="rounded-4"
                  key={index}
                />
              ))}
            </div>
          </>
        )}
        {!err && !isLoading && dataB?.length > 0 && (
          <Suspense fallback={<Loader />}>
            <RecommendProducts recommended={recommended} />
          </Suspense>
        )}
      </div>
    </>
  );
}
