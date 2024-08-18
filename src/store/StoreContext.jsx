import { categoryService, userService } from "@/api";
import { useFetch, usePersist } from "@/hooks";
import { createContext, useCallback, useEffect, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const ContextStore = createContext({});

export const StoreProvider = ({ children }) => {
  const { data } = useFetch(categoryService.getAllCategories);
  const categories = useMemo(() => data, [data]);
  const [cartItems, setCartItems] = usePersist("cart", []);
  const [loggedInUser, setLoggedInUser] = usePersist("clientLoggedIn", null);
  const [token, setToken] = usePersist("clientToken", null);
  const [shippingDetails, setShippingDetails] = usePersist(
    "shippingDetails",
    {}
  );
  const [step, setStep] = usePersist("step", 1);
  const [paymentMethod, setPaymentMethod] = usePersist("paymentMethod", null);
  const [discountCode, setDiscountCode] = usePersist("discountCode", null);

  function isTokenValid(token) {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      return decoded.exp > now;
    } catch (error) {
      return false;
    }
  }

  const itemsPerPage = 10;

  const increaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item._id === id._id) == null) {
        return [...currItems, { ...id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item._id === id._id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item._id === id._id)?.quantity === 1) {
        return currItems.filter((item) => item._id !== id._id);
      } else {
        return currItems.map((item) => {
          if (item._id === id._id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const cartQuantity = cartItems?.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const priceTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const removeFromCart = (id) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item._id !== id);
    });
  };

  //get user
  const getUser = useCallback(async () => {
    if (!token || !isTokenValid(token)) return;
    try {
      const { data } = await userService.authUser(token);
      setLoggedInUser(data);
    } catch (error) {
      console.error(error);
    }
  }, [setLoggedInUser, token]);

  const refreshUserToken = useCallback(async () => {
    if (!loggedInUser?.username) return;
    try {
      const {
        data: { refreshToken },
      } = await userService.getRefreshToken(loggedInUser.username);
      const {
        data: { accessToken },
      } = await userService.refreshToken({ refreshToken });
      setToken(accessToken);
      getUser();
    } catch (error) {
      console.error(error);
      // setToken(null);
      setStep(1);
    }
  }, [loggedInUser?.username, setToken, getUser, setStep]);

  const logout = useCallback(() => {
    if (!token) {
      return;
    } else {
      toast.info("You are logged out.", { toastId: "logout-id" });
      setLoggedInUser(null);
      setToken(null);
      setStep(1);
      setDiscountCode(null);
    }
  }, [setDiscountCode, setLoggedInUser, setStep, setToken, token]);

  useEffect(() => {
    if (loggedInUser) {
      return;
    } else {
      getUser();
    }
  }, [getUser, loggedInUser]);

    useEffect(() => {
      if (!token) return;

      const refresh = async () => {
        const tokenExp = new Date(jwtDecode(token).exp * 1000);
        if (tokenExp - new Date() < 60 * 1000) {
          try {
            await refreshUserToken();
          } catch (error) {
            console.error(error);
            // setToken(null);
            setStep(1)
          }
        }
      };

      const interval = setInterval(
        () => {
          refreshUserToken();
          refresh();
        },
        13 * 60 * 1000
      );

      refresh();
      return () => clearInterval(interval);
    }, [refreshUserToken, setStep, setToken, token]);

  const generateOrder = {
    orderItems: cartItems,
    quantity: cartQuantity,
    shippingDetails: shippingDetails,
    paymentMethod: paymentMethod,
    discountCode: discountCode,
    subTotal: priceTotal,
  };

  const contextData = {
    categories,
    itemsPerPage,
    increaseCartQuantity,
    cartItems,
    setCartItems,
    cartQuantity,
    priceTotal,
    removeFromCart,
    decreaseCartQuantity,
    token,
    setToken,
    loggedInUser,
    setLoggedInUser,
    logout,
    shippingDetails,
    setShippingDetails,
    paymentMethod,
    setPaymentMethod,
    discountCode,
    setDiscountCode,
    step,
    setStep,
    generateOrder,
  };

  return (
    <ContextStore.Provider value={contextData}>
      {children}
    </ContextStore.Provider>
  );
};
