import { useStore, useTitle } from "@/hooks";
import { useLoaderData } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import { Headings, Loader } from "@/components";
import { toast } from "react-toastify";

const RecommendProducts = lazy(
  () => import("@/components/products/RecommendProducts")
);
const ShowProduct = lazy(() => import("@/components/products/ShowProduct"));

export default function ProductDetail() {
  const [active, setActive] = useState(0);
  const [showPicModal, setShowPicModal] = useState(false);
  const { getAProduct, getRecommended } = useLoaderData();
  useTitle(`${getAProduct?.data?.name}`);
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
      <Suspense fallback={<Loader />}>
        <ShowProduct
          addToCart={addToCart}
          expandImg={expandImg}
          updateImage={updateImage}
          showPicModal={showPicModal}
          setShowPicModal={setShowPicModal}
          product={getAProduct}
          active={active}
          setActive={setActive}
        />
      </Suspense>

      <div style={{ marginTop: "6rem" }}>
        <Headings text="You may also like" extra="mb-4" size="1.4rem" />
        {getRecommended?.data?.length > 0 && (
          <Suspense fallback={<Loader />}>
            <RecommendProducts recommended={getRecommended} />
          </Suspense>
        )}
      </div>
    </>
  );
}
