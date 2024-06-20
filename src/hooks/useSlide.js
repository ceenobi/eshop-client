// import { useState } from "react";

export default function useSlide(product, active, setActive) {
  //   const [current, setCurrent] = useState(0);
  let imgLength = product;

  const nextSlide = () => {
    setActive(active === imgLength - 1 ? 0 : active + 1);
  };

  const prevSlide = () => {
    setActive(active === 0 ? imgLength - 1 : active - 1);
  };

  return { nextSlide, prevSlide };
}
