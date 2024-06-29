import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaExpand } from "react-icons/fa6";

export default function ImageSlide({ image, expandImg }) {
  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      {image?.map((item, index) => (
        <SwiperSlide key={index} className="position-relative">
          <LazyLoadImage
            effect="blur"
            src={item}
            alt="product image"
            width={"100%"}
            height={500}
            className="w-100 h-100"
          />
          <div
            className="position-absolute top-0 end-0 p-2"
            title="click to view full size"
          >
            <FaExpand
              color="black"
              className="cursor"
              size="24px"
              onClick={() => expandImg(index)}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
