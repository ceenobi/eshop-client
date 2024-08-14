import {
  ActionButton,
  Headings,
  ShopWithUs,
  Texts,
  DisplayCategories,
} from "@/components";
import styles from "../pages.module.css";
import { Alert, Container, Image, Spinner } from "react-bootstrap";
import { useFetch, useTitle } from "@/hooks";
import { Link } from "react-router-dom";
import { categoryService, productService } from "@/api";
import { lazy, useMemo, Suspense } from "react";

const LatestProducts = lazy(() => import("@/components/home/LatestProducts"));
const BestSeller = lazy(() => import("@/components/home/BestSeller"));
const FeaturedProducts = lazy(
  () => import("@/components/home/FeaturedProducts")
);

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
    border: "1px solid blue",
  },
];

export default function Home() {
  useTitle("Footsy Home");
  const { data: cat, error: errCat } = useFetch(
    categoryService.getAllCategories
  );
  const { data: newProductsData, error } = useFetch(
    productService.getNewProducts
  );
  const { data: bestSelling, error: err } = useFetch(
    productService.getBestSellerProducts
  );
  const { data: featured, error: errFeat } = useFetch(
    productService.getFeaturedProducts
  );
  const categories = useMemo(() => cat, [cat]);
  const newProducts = useMemo(() => newProductsData, [newProductsData]);
  const bestSellerProducts = useMemo(() => bestSelling, [bestSelling]);
  const featuredProducts = useMemo(() => featured, [featured]);

  return (
    <div className="py-5">
      <Container fluid="xl" className="px-0">
        <div className="px-3 mt-lg-5 d-flex flex-wrap justify-content-between align-items-center">
          <Headings
            text={
              <>
                <span className="fw-bold text-black me-2">Baggit.</span>The best
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
          {errCat && (
            <Alert variant="danger" className="mt-5">
              {errCat?.response?.data?.error || errCat.message}
            </Alert>
          )}
        </div>
        <DisplayCategories categories={categories} />
        
        <div style={{ marginTop: "6rem" }}>
          <Headings
            text={
              <>
                <span className="fw-bold text-black me-2">Featured.</span>Take a
                look at our featured products.
              </>
            }
            color="var(--bg-zinc-600)"
            extra={`${styles.heroAdjust} mb-4 px-3`}
            size="1.5rem"
          />
          {errFeat && (
            <Alert variant="danger" className="mt-5">
              {errFeat?.response?.data?.error || errFeat.message}
            </Alert>
          )}
          <Suspense
            fallback={
              <div className="text-center my-3">
                <Spinner animation="border" size="sm" />
              </div>
            }
          >
            <FeaturedProducts featuredProducts={featuredProducts} />
          </Suspense>
        </div>
        <div style={{ marginTop: "6rem" }}>
          <Headings
            text={
              <>
                <span className="fw-bold text-black me-2">The latest.</span>Take
                a look at what’s new, right now.
              </>
            }
            color="var(--bg-zinc-600)"
            extra={`${styles.heroAdjust} mb-4 px-3`}
            size="1.5rem"
          />
          {error && (
            <Alert variant="danger" className="mt-5">
              {error?.response?.data?.error || error.message}
            </Alert>
          )}
          <Suspense
            fallback={
              <div className="text-center my-3">
                <Spinner animation="border" size="sm" />
              </div>
            }
          >
            <LatestProducts newProducts={newProducts} />
          </Suspense>
        </div>
        <div style={{ marginTop: "6rem" }}>
          <Headings
            text={
              <>
                <span className="fw-bold text-black me-2">
                  The Baggit difference.
                </span>
                Even more reasons to shop with us.
              </>
            }
            color="var(--bg-zinc-600)"
            extra={`${styles.heroAdjust} px-3`}
            size="1.5rem"
          />
          <ShopWithUs />
        </div>
        <div style={{ marginTop: "6rem" }}>
          <Headings
            text={
              <>
                <span className="fw-bold text-black me-2">Best seller.</span>See
                our best selling products.
              </>
            }
            color="var(--bg-zinc-600)"
            extra={`${styles.heroAdjust} mb-4 px-3`}
            size="1.5rem"
          />
          {err && (
            <Alert variant="danger" className="mt-5">
              {err?.response?.data?.error || err.message}
            </Alert>
          )}
          <Suspense
            fallback={
              <div className="text-center my-3">
                <Spinner animation="border" size="sm" />
              </div>
            }
          >
            <BestSeller bestSellerProducts={bestSellerProducts} />
          </Suspense>
        </div>
        <div style={{ marginTop: "6rem" }} className="px-3">
          <Headings
            text="Quick Links"
            className="text-black fw-semibold"
            extra={styles.heroAdjust}
            size="1.5rem"
          />
          <div className="mt-3 d-flex gap-3">
            {links.map(({ id, name, path, color, variant }) => (
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
