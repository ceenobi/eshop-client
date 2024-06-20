import {
  ActionButton,
  Headings,
  Loader,
  ShopWithUs,
  Texts,
} from "@/components";
import styles from "../pages.module.css";
import { Alert, Container, Image } from "react-bootstrap";
import { categoryService, productService } from "@/api";
import { useMemo, lazy, Suspense } from "react";
import { useFetch, useTitle } from "@/hooks";
import { Link } from "react-router-dom";

const DisplayCategories = lazy(() =>
  import("@/components/home/DisplayCategories")
);
const LatestProducts = lazy(() => import("@/components/home/LatestProducts"));
const BestSeller = lazy(() => import("@/components/home/BestSeller"));

const links = [
  {
    id: 1,
    path: "/orders",
    name: "Orders",
  },
  {
    id: 2,
    path: "/profile",
    name: "Profile",
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
          <div className="d-flex align-items-center gap-1">
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
            {error?.response?.data?.error || error.message}
          </Alert>
        )}
      </Container>
      <Suspense fallback={<Loader />}>
        <DisplayCategories categories={categories} />
      </Suspense>
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
          {error && (
            <Alert variant="danger" className="mt-5">
              {error?.response?.data?.error || error.message}
            </Alert>
          )}
        </div>
      </Container>
      <Suspense fallback={<Loader />}>
        <LatestProducts newProducts={newProducts} />
      </Suspense>
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
          {err && (
            <Alert variant="danger" className="mt-5">
              {err?.response?.data?.error || err.message}
            </Alert>
          )}
        </div>
      </Container>
      <Suspense fallback={<Loader />}>
        <BestSeller bestSellerProducts={bestSellerProducts} />
      </Suspense>
      <Container fluid="xl" className="px-3">
        <div style={{ marginTop: "6rem" }}>
          <Headings
            text="Quick Links"
            className="text-black"
            extra={styles.heroAdjust}
            size="1.5rem"
          />
          <div className="mt-3 d-flex gap-3">
            {links.map(({ id, name, path }) => (
              <ActionButton
                key={id}
                text={name}
                as={Link}
                to={path}
                className="text-white rounded-4 btns"
                variant="none"
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
