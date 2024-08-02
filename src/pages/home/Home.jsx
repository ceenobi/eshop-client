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
import { Container, Image } from "react-bootstrap";
import { useTitle } from "@/hooks";
import { Link, useLoaderData } from "react-router-dom";

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
  const homeData = useLoaderData();

  return (
    <div className="py-5">
      <Container fluid="xl" className="px-0">
        <div className="px-3 mt-lg-5 d-flex flex-wrap justify-content-between align-items-center">
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
        <DisplayCategories categories={homeData.categories} />
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
          <LatestProducts newProducts={homeData.newProducts} />
        </div>
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
          <BestSeller bestSellerProducts={homeData.bestSeller} />
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
