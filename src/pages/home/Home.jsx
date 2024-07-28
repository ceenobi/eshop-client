import {
  ActionButton,
  Headings,
  ShopWithUs,
  Texts,
  DisplayCategories,
  LatestProducts,
  BestSeller,
} from "@/components";
import styles from "../pages.module.css";
import { Alert, Container, Image } from "react-bootstrap";
import { categoryService, productService } from "@/api";
import { useMemo } from "react";
import { useFetch, useTitle } from "@/hooks";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const links = [
  {
    id: 1,
    path: "/orders",
    name: "Orders",
    variant: "primary",
    color: "text-white",
  },
  {
    id: 2,
    path: "/profile",
    name: "Profile",
    variant: "outline-primary",
    color: "text-primary",
    border: "1px solid blue"
  },
];

export default function Home() {
  useTitle("Footsy Home");
  const {
    data: cat,
    error: errCat,
    loading: catLoad,
  } = useFetch(categoryService.getAllCategories);
  const {
    data: newProductsData,
    error: errNew,
    loading: newLoad,
  } = useFetch(productService.getNewProducts);
  const {
    data: bestSelling,
    error: errBest,
    loading: bestLoad,
  } = useFetch(productService.getBestSellerProducts);
  const categories = useMemo(() => cat, [cat]);
  const newProducts = useMemo(() => newProductsData, [newProductsData]);
  const bestSellerProducts = useMemo(() => bestSelling, [bestSelling]);

  return (
    <div className="py-5">
      <Container fluid="xl" className="px-3">
        <div className="mt-lg-5 d-flex flex-wrap justify-content-between align-items-center">
          <Headings
            text={
              <>
                <span className="fw-bold text-black me-2">Footsy.</span>The best
                way to buy the products you love.
              </>
            }
            color="var(--bg-zinc-600)"
            extra={styles.heroAdjust}
          />
          <div className="mt-4 mt-md-0 d-flex align-items-center gap-1">
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
        {errCat && (
          <Alert variant="danger" className="mt-5">
            {errCat?.response?.data?.error || errCat?.message}
          </Alert>
        )}
        {catLoad && (
          <div className="mt-5 px-3 d-flex justify-content-center gap-3 overflow-x-auto overflow-y-hidden">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton
                key={index}
                height="150px"
                width="190px"
                containerClassName="product-skeleton"
                className="rounded-4"
              />
            ))}
          </div>
        )}
      </Container>
      <DisplayCategories categories={categories} />
      <Container fluid="xl" className="px-3">
        <div style={{ marginTop: "6rem" }}>
          <Headings
            text={
              <>
                <span className="fw-bold text-black me-2">The latest.</span>Take
                a look at what’s new, right now.
              </>
            }
            color="var(--bg-zinc-600)"
            extra={`${styles.heroAdjust} mb-4`}
            size="1.5rem"
          />
          {errNew && (
            <Alert variant="danger" className="mt-5">
              {errNew?.response?.data?.error || errNew.message}
            </Alert>
          )}
        </div>
        {newLoad && (
          <div className="mt-5 px-3 d-flex justify-content-md-center gap-3 overflow-x-auto overflow-y-hidden">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton
                key={index}
                height="400px"
                width="300px"
                containerClassName="product-skeleton"
                className="rounded-4"
              />
            ))}
          </div>
        )}
      </Container>
      <LatestProducts newProducts={newProducts} />
      <Container fluid="xl" className="px-3">
        <div style={{ marginTop: "6rem" }}>
          <Headings
            text={
              <>
                <span className="fw-bold text-black me-2">
                  The Footsy difference.
                </span>
                Even more reasons to shop with us.
              </>
            }
            color="var(--bg-zinc-600)"
            extra={styles.heroAdjust}
            size="1.5rem"
          />
        </div>
      </Container>
      <ShopWithUs />
      <Container fluid="xl" className="px-3">
        <div style={{ marginTop: "6rem" }}>
          <Headings
            text={
              <>
                <span className="fw-bold text-black me-2">Best seller.</span>See
                our best selling products.
              </>
            }
            color="var(--bg-zinc-600)"
            extra={`${styles.heroAdjust} mb-4}`}
            size="1.5rem"
          />
          {errBest && (
            <Alert variant="danger" className="mt-5">
              {errBest?.response?.data?.error || errBest.message}
            </Alert>
          )}
        </div>
        {bestLoad && (
          <div className="mt-5 px-3 d-flex gap-3 overflow-x-auto overflow-y-hidden">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton
                key={index}
                height="400px"
                width="300px"
                containerClassName="product-skeleton"
                className="rounded-4"
              />
            ))}
          </div>
        )}
      </Container>
      <BestSeller bestSellerProducts={bestSellerProducts} />
      <Container fluid="xl" className="px-3">
        <div style={{ marginTop: "6rem" }}>
          <Headings
            text="Quick Links"
            className="text-black fw-semibold"
            extra={styles.heroAdjust}
            size="1.5rem"
          />
          <div className="mt-3 d-flex gap-3">
            {links.map(({ id, name, path, color, variant}) => (
              <ActionButton
                key={id}
                text={name}
                as={Link}
                to={path}
                className={`rounded-4 ${color} ${id === 2 && "btn-success text-white"}`}
                variant={variant}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
