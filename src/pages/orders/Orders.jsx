import { orderService } from "@/api";
import { Headings, Loader, Paginate, Texts } from "@/components";
import { useFetch, useStore, useTitle } from "@/hooks";
import { useMemo, lazy, Suspense } from "react";
import { Alert, Container } from "react-bootstrap";
import {
  useNavigate,
  useSearchParams,
  useLocation,
  Outlet,
} from "react-router-dom";
import { MdRemoveShoppingCart } from "react-icons/md";

const AllOrders = lazy(() => import("@/components/orders/AllOrders"));

export default function Orders() {
  const [searchParams] = useSearchParams();
  const { itemsPerPage, loggedInUser } = useStore();
  useTitle(`${loggedInUser?.username} orders`);
  const navigate = useNavigate();
  const location = useLocation();
  const page = searchParams.get("page") || 1;
  const { data, error } = useFetch(
    orderService.getAllClientOrders,
    loggedInUser?._id,
    page
  );
  const yourOrders = useMemo(() => data, [data]);
  const params = new URLSearchParams(searchParams);
  //paginate
  const { totalPages, count, orders } = yourOrders;
  const prevPage = itemsPerPage * (parseInt(page) - 1) > 0;
  const nextPage = itemsPerPage * (parseInt(page) - 1) + itemsPerPage < count;
  const firstPage = 1;
  const lastPage = Math.ceil(count / itemsPerPage);

  const handlePageChange = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    navigate(window.location.pathname + "?" + params.toString());
  };

  const handleFirstPage = () => {
    params.set("page", firstPage);
    navigate(window.location.pathname + "?" + params.toString());
  };

  const handleLastPage = () => {
    params.set("page", lastPage);
    navigate(window.location.pathname + "?" + params.toString());
  };

  console.log(yourOrders);

  return (
    <Container fluid="xl" className="px-3 py-5">
      {location.pathname === "/orders" ? (
        <>
          <Headings text="Orders" size="1.8rem" />
          {error && (
            <Alert variant="danger" className="mt-5">
              {error?.response?.data?.error || error.message}
            </Alert>
          )}
          {!error && orders?.length > 0 ? (
            <>
              <Suspense fallback={<Loader />}>
                {orders?.map((order) => (
                  <AllOrders key={order._id} {...order} />
                ))}
              </Suspense>
              <Paginate
                prevPage={prevPage}
                nextPage={nextPage}
                page={page}
                handleLastPage={handleLastPage}
                handleFirstPage={handleFirstPage}
                handlePageChange={handlePageChange}
                totalPages={totalPages}
                lastPage={lastPage}
                itemsPerPage={itemsPerPage}
              />
            </>
          ) : (
            <div className="mt-5 text-center">
              <MdRemoveShoppingCart size="80px" />
              <Texts
                text="Your have no orders made yet 😭 "
                size="1.3rem"
                className="mt-2 fw-medium text-center"
              />
            </div>
          )}
        </>
      ) : (
        <Outlet />
      )}
    </Container>
  );
}
