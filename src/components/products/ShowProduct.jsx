import { Col, Row } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaExpand } from "react-icons/fa";
import ModalView from "../ModalView";
import {
  ActionButton,
  Headings,
  ImageSlide,
  ProductImageModal,
  Texts,
} from "..";
import { formatCurrency } from "@/utils";
import { useNavigate } from "react-router-dom";

export default function ShowProduct({
  product,
  active,
  updateImage,
  expandImg,
  showPicModal,
  setShowPicModal,
  addToCart,
}) {
  const navigate = useNavigate();

  const searchBrand = (brandName) => {
    navigate(`/search?query=${brandName}`);
  };
  return (
    <>
      <Row className="justify-content-lg-between">
        <Col md={6} className="mb-5">
          <div className="d-none d-lg-flex gap-4">
            <div>
              {product?.data?.image?.map((item, i) => (
                <div key={i} className="d-none d-lg-block mb-3">
                  <LazyLoadImage
                    effect="blur"
                    src={item}
                    alt="product images"
                    width={70}
                    height={70}
                    className={`object-fit-contain cursor ${
                      i === active && "border border-primary"
                    }`}
                    onClick={() => updateImage(i)}
                  />
                </div>
              ))}
            </div>
            <div>
              {product?.data?.image?.map((item, i) => (
                <div key={i} className="position-relative">
                  {i === active && (
                    <>
                      <LazyLoadImage
                        effect="blur"
                        src={item}
                        alt={product?.name}
                        width={450}
                        height={500}
                      />

                      <div
                        className="position-absolute top-0 end-0 p-2"
                        title="click to view full size"
                      >
                        <FaExpand
                          color="black"
                          className="cursor"
                          size="24px"
                          onClick={() => expandImg(i)}
                        />
                      </div>
                      <ModalView
                        show={showPicModal}
                        handleClose={() => setShowPicModal(false)}
                        fullscreen
                        backdrop="static"
                      >
                        <ProductImageModal product={product} />
                      </ModalView>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex d-lg-none">
            <ImageSlide image={product?.data?.image} expandImg={expandImg} />
          </div>
        </Col>
        <Col md={6} lg={5} className="mb-5">
          <div>
            <Headings text={product.data?.name} size="1.6rem" />
            <Texts
              text={
                <>
                  BRAND:{" "}
                  <span
                    className="fw-medium cursor"
                    title={`see ${product.data?.brand} products`}
                    onClick={() => searchBrand(product.data?.brand)}
                  >
                    {product.data?.brand}
                  </span>
                </>
              }
              size="1.2rem"
              color="var(--bg-zinc-700)"
            />
            <Texts
              text={formatCurrency(
                product.data?.price ? product.data?.price : 0
              )}
              size="1.2rem"
              color="var(--bg-zinc-700)"
            />

            <ActionButton
              text={product.data?.inStock ? "Add To Cart" : " Out of stock"}
              onClick={() => addToCart(product?.data)}
              className="w-100 border-0 py-2"
              style={{ backgroundColor: "var(--bg-blue-400" }}
              disabled={!product.data?.inStock}
            />

            <Texts
              text="DESCRIPTION"
              size="1.2rem"
              className="mt-5 fw-medium"
            />
            <Texts
              text={product.data?.description}
              color="var(--bg-zinc-600)"
            />
          </div>
        </Col>
      </Row>
    </>
  );
}
