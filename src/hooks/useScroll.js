import { useRef } from "react";

export default function useScroll() {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const { current } = scrollRef;
    direction === "left"
      ? (current.scrollLeft -= 800)
      : (current.scrollLeft += 800);
  };
  return [scroll, scrollRef];
}
