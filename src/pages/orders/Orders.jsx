import { Headings, Paginate, Texts, AllOrders } from "@/components";
import { useFetch, useStore, useTitle } from "@/hooks";
import { Alert, Container } from "react-bootstrap";
import {
  useNavigate,
  useSearchParams,
  useLocation,
  Outlet,
} from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useMemo } from "react";
import { orderService } from "@/api";

export default function Orders() {
  const [searchParams] = useSearchParams();
  const { itemsPerPage, loggedInUser } = useStore();
  useTitle(`${loggedInUser?.username} orders`);
  const page = searchParams.get("page") || 1;
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { data, error } = useFetch(
    orderService.getAllClientOrders,
    loggedInUser?._id,
    page
  );
  const yourOrders = useMemo(() => data, [data]);
  const { totalPages, count, orders } = yourOrders;
  //paginate
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
          {orders && orders?.length > 0 && (
            <>
              {orders?.map((order) => (
                <AllOrders key={order._id} {...order} />
              ))}
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
          )}
          {orders && orders?.length === 0 && (
            <div className="mt-5 text-center">
              <CiShoppingCart size="50px" />
              <Texts
                text="Your have no orders made yet!"
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
