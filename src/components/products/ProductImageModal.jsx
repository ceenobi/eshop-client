import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export default function ProductImageModal({ product }) {
  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      {product?.image?.map((img, i) => (
        <SwiperSlide key={i}>
          <LazyLoadImage
            effect="blur"
            src={img}
            alt="pin-images"
            width="100%"
            height={700}
            className="object-fit-contain"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
