import { Loader, OrderSummary } from "@/components";
import { useStore } from "@/hooks";
import { ProductsLayout, RootLayout } from "@/layouts";
import {
  CartItems,
  CategoryProducts,
  Checkout,
  EditProfile,
  ForgotPassword,
  Home,
  Login,
  OrderDetails,
  Orders,
  ProductDetail,
  Profile,
  Register,
  ResetPassword,
  Search,
} from "@/pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedUser } from "./ProtectedRoutes";
import { lazy, Suspense } from "react";
const PageNotFound = lazy(() => import("@/components/PageNotFound"));

export default function AppRoutes() {
  const { token } = useStore();

  const routes = [
    {
      path: "/",
      name: "Root",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "products",
          element: <ProductsLayout />,
          children: [
            {
              path: ":categoryName",
              element: <CategoryProducts />,
            },
            {
              path: ":categoryName/:slug",
              element: <ProductDetail />,
            },
          ],
        },
        {
          path: "search",
          element: <Search />,
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
            <ProtectedUser isAuth={token}>
              <Orders />
            </ProtectedUser>
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
        <ProtectedUser isAuth={!token}>
          <Login />
        </ProtectedUser>
      ),
    },
    {
      path: "/register",
      element: (
        <ProtectedUser isAuth={!token}>
          <Register />
        </ProtectedUser>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <ProtectedUser isAuth={!token}>
          <ForgotPassword />
        </ProtectedUser>
      ),
    },
    {
      path: "reset-password/:userId/:token",
      element: (
        <ProtectedUser isAuth={!token}>
          <ResetPassword />
        </ProtectedUser>
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
