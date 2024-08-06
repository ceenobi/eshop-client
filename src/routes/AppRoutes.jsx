import { Error, Loader, OrderSummary } from "@/components";
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
import { categoryService, orderService, productService } from "@/api";
const PageNotFound = lazy(() => import("@/components/PageNotFound"));
const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const ProductsLayout = lazy(() => import("@/layouts/ProductsLayout"));
const Orders = lazy(() => import("@/pages/orders/Orders"));

export default function AppRoutes() {
  const { token, loggedInUser } = useStore();
  const searchParams = new URLSearchParams(window.location.search);
  const getSearchParams = searchParams.get("page");

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
          errorElement: <Error />,
          loader: async () => {
            const categories = await categoryService.getAllCategories();
            const newProducts = await productService.getNewProducts();
            const bestSeller = await productService.getBestSellerProducts();
            return { categories, newProducts, bestSeller };
          },
        },
        {
          path: "products",
          element: (
            <Suspense fallback={<Loader />}>
              <ProductsLayout />{" "}
            </Suspense>
          ),
          children: [
            {
              path: ":categoryName",
              element: <CategoryProducts />,
              errorElement: <Error />,
              loader: ({ params }) =>
                productService.getProductsByCategory(params.categoryName),
            },
            {
              path: ":categoryName/:slug",
              element: <ProductDetail />,
              errorElement: <Error />,
              loader: async ({ params }) => {
                const getAProduct = await productService.getAProduct(
                  params.slug
                );
                const getRecommended =
                  await productService.getRecommendedProducts(params.slug);

                return { getAProduct, getRecommended };
              },
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
          errorElement: <Error />,
          loader: () =>
            orderService.getAllClientOrders(loggedInUser?._id, getSearchParams),
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
