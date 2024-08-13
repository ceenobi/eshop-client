import { lazy, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Loader from "../Loader";

const ProductCard = lazy(() => import("@/components/products/ProductCard"));

export default function RecommendProducts({ recommended }) {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper d-none d-lg-block"
        slidesPerView={4}
        spaceBetween={24}
      >
        {recommended?.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="d-lg-none mt-3 d-flex gap-3 overflow-x-scroll overflow-y-hidden scrollbody">
        <Suspense fallback={<Loader />}>
          {recommended?.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </Suspense>
      </div>
    </>
  );
}
