import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Texts from "../Texts";
import { formatCurrency } from "@/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Container } from "react-bootstrap";

export default function BestSeller({ bestSellerProducts }) {
  return (
    <div className="mt-4">
      <Container className="px-3">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper d-none d-lg-block"
          slidesPerView={3}
          spaceBetween={20}
        >
          {bestSellerProducts?.products?.map((item) => (
            <SwiperSlide
              key={item._id}
              className="cardBox position-relative rounded-4"
            >
              <Link
                to={`/products/${item.category.toLowerCase()}/${item.slug}`}
              >
                <LazyLoadImage
                  effect="blur"
                  src={item.image[0]}
                  alt={item.name}
                  width={"100%"}
                  height={450}
                  className="w-100 h-100 rounded-4 mb-0"
                />
                <div className="position-absolute top-0 p-4">
                  <Texts text={item.name} className="fw-bold" />
                  <Texts
                    text={formatCurrency(item.price)}
                    className="fw-medium"
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
      {/* mobile */}
      <div className="px-3 d-lg-none d-flex align-items-center gap-4 overflow-x-scroll overflow-y-hidden scrollbody">
        {bestSellerProducts?.products?.map((item) => (
          <Link
            key={item._id}
            className="cardBox position-relative rounded-4 "
            to={`/products/${item.category.toLowerCase()}/${item.slug}`}
          >
            <LazyLoadImage
              effect="blur"
              src={item.image[0]}
              alt={item.name}
              width={300}
              height={450}
              className="w-100 h-100 object-fit-cover rounded-4 mb-0"
            />
            <div className="position-absolute top-0 p-4">
              <Texts text={item.name} className="fw-bold" />
              <Texts text={formatCurrency(item.price)} className="fw-medium" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
