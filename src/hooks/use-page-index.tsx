import { RefObject, useCallback, useEffect, useRef, useState } from "react";

type usePageIndexReturn = [
  RefObject<HTMLDivElement>,
  () => void,
  number,
  (nextPage: boolean) => () => void
];

function usePageIndex(dataLength: number): usePageIndexReturn {
  const [pageIndex, setPageIndex] = useState(0);
  const presentationView = useRef<HTMLDivElement>(null);

  const getCenteredElementIndex = useCallback(() => {
    if (!presentationView.current) return 0;

    const container = presentationView.current;
    const containerRect = container.getBoundingClientRect();
    const children = Array.from(container.children);

    let closestChildIndex = 0;
    let closestChildDistance = Number.MAX_VALUE;

    children.forEach((child, index) => {
      const childRect = child.getBoundingClientRect();
      const childCenter = (childRect.top + childRect.bottom) / 2;
      const containerCenter = (containerRect.top + containerRect.bottom) / 2;
      const distance = Math.abs(childCenter - containerCenter);

      if (distance < closestChildDistance) {
        closestChildDistance = distance;
        closestChildIndex = index;
      }
    });

    return closestChildIndex;
  }, []);

  const handleScroll = useCallback(() => {
    const newIndex = getCenteredElementIndex();
    setPageIndex(newIndex);
  }, [getCenteredElementIndex]);

  useEffect(() => {
    const container = presentationView.current;
    container?.addEventListener("scroll", handleScroll);
    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const changePageIndex = (nextPage: boolean) => {
    return () => {
      const newPageIndex = nextPage
        ? Math.min(pageIndex + 1, dataLength - 1)
        : Math.max(pageIndex - 1, 0);

      const activePage = presentationView?.current?.children?.[newPageIndex];

      if (activePage)
        activePage.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
    };
  };

  return [presentationView, handleScroll, pageIndex, changePageIndex];
}

export default usePageIndex;
