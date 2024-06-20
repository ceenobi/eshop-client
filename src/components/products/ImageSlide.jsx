import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ImageSlide({ image }) {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
    >
      {image?.map((item, i) => (
        <SwiperSlide key={i}>
          <LazyLoadImage
            effect="blur"
            src={item}
            alt="product image"
            width={"100%"}
            height={500}
            className="w-100 h-100"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
