import { Loader, OrderSummary } from "@/components";
import { useStore } from "@/hooks";
import {
  CartItems,
  Checkout,
  EditProfile,
  ForgotPassword,
  Login,
  OrderDetails,
  ProductDetail,
  Profile,
  Register,
  ResetPassword,
  Search,
  Home,
  CategoryProducts,
} from "@/pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedUser, PublicRoutes } from "./ProtectedRoutes";
import { lazy, Suspense } from "react";
const PageNotFound = lazy(() => import("@/components/PageNotFound"));
const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const ProductsLayout = lazy(() => import("@/layouts/ProductsLayout"));
const Orders = lazy(() => import("@/pages/orders/Orders"));

export default function AppRoutes() {
  const { token } = useStore();

  const routes = [
    {
      path: "/",
      name: "Root",
      element: (
        <Suspense fallback={<Loader />}>
          <RootLayout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "products",
          element: (
            <Suspense fallback={<Loader />}>
              <ProductsLayout />
            </Suspense>
          ),
          children: [
            {
              path: ":categoryName",
              element: <CategoryProducts />,
            },
            {
              path: ":categoryName/:slug",
              element: <ProductDetail />,
            },
            {
              path: "search",
              element: <Search />,
            },
          ],
        },
        {
          path: "cart",
          element: <CartItems />,
        },
        {
          path: "checkout",
          element: (
            <ProtectedUser isAuth={token}>
              <Checkout />
            </ProtectedUser>
          ),
          children: [
            {
              path: "summary",
              element: <OrderSummary />,
            },
          ],
        },
        {
          path: "orders",
          element: (
            <Suspense fallback={<Loader />}>
              <ProtectedUser isAuth={token}>
                <Orders />
              </ProtectedUser>
            </Suspense>
          ),
          children: [
            {
              path: ":orderId",
              element: <OrderDetails />,
            },
          ],
        },
        {
          path: "profile",
          element: (
            <ProtectedUser isAuth={token}>
              <Profile />
            </ProtectedUser>
          ),
          children: [
            {
              path: ":edit",
              element: <EditProfile />,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: (
        <PublicRoutes isAuth={token}>
          <Login />
        </PublicRoutes>
      ),
    },
    {
      path: "/register",
      element: (
        <PublicRoutes isAuth={token}>
          <Register />
        </PublicRoutes>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <PublicRoutes isAuth={token}>
          <ForgotPassword />
        </PublicRoutes>
      ),
    },
    {
      path: "reset-password/:userId/:token",
      element: (
        <PublicRoutes isAuth={token}>
          <ResetPassword />
        </PublicRoutes>
      ),
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<Loader />}>
          <PageNotFound />
        </Suspense>
      ),
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
