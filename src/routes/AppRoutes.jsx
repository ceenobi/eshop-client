import { Loader, OrderSummary } from "@/components";
import { useStore } from "@/hooks";
import { ProductsLayout, RootLayout } from "@/layouts";
import {
  CartItems,
  CategoryProducts,
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
} from "@/pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedUser } from "./ProtectedRoutes";
import { lazy, Suspense } from "react";
import { categoryService } from "@/api";
const PageNotFound = lazy(() => import("@/components/PageNotFound"));
const Home = lazy(() => import("@/pages/home/Home"));
const Orders = lazy(() => import("@/pages/orders/Orders"));

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
          index: true,
          element: (
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          ),
          loader: async () => {
            const categories = await categoryService.getAllCategories(); 
            return categories;
          }, 
        },
        {
          path: "products",
          element: <ProductsLayout />,
          children: [
            {
              path: ":categoryName",
              element: (
                <Suspense fallback={<Loader />}>
                  <CategoryProducts />
                </Suspense>
              ),
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
