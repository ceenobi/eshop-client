import { Headings, Paginate, Texts, AllOrders } from "@/components";
import { useStore, useTitle } from "@/hooks";
import { Container } from "react-bootstrap";
import {
  useNavigate,
  useSearchParams,
  useLocation,
  Outlet,
  useLoaderData,
} from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useEffect, useState } from "react";

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useLoaderData();
  console.log(data);
  const [searchParams] = useSearchParams();
  const { itemsPerPage, loggedInUser } = useStore();
  useTitle(`${loggedInUser?.username} orders`);
  const navigate = useNavigate();
  const location = useLocation();
  const page = searchParams.get("page");
  const params = new URLSearchParams(searchParams);
  //paginate
  const { totalPages, count, orders } = data;
  useEffect(() => {
    const pageParam = searchParams.get("page");
    setCurrentPage(pageParam ? parseInt(pageParam) : 1);
  }, [searchParams]);
  const prevPage = itemsPerPage * (currentPage - 1) > 0;
  const nextPage = itemsPerPage * (currentPage - 1) + itemsPerPage < count;
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
