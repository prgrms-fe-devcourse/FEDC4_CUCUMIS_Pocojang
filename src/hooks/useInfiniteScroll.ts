import { useEffect, useState, useMemo, useRef, MutableRefObject } from 'react';

export interface InfiniteScrollProps {
  target: MutableRefObject<HTMLDivElement | null>;
  targetArray: Array<unknown>;
  endPoint?: number;
  options: IntersectionObserverOptions;
}

export interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

const useInfiniteScroll = ({
  target,
  targetArray,
  endPoint = 1,
  options: { root = null, rootMargin = '0px', threshold = 1 },
}: InfiniteScrollProps) => {
  const [page, setPage] = useState<number>(0);
  const currentChild = useRef<Element | null>(null);

  const observer = useMemo(() => {
    return new IntersectionObserver(
      (entries, observer) => {
        if (target?.current === null) return;

        if (entries[0].isIntersecting) {
          setPage((v) => v + 1);
          observer.disconnect();
        }
      },
      { root, rootMargin, threshold },
    );
  }, [target, root, rootMargin, threshold]);

  useEffect(() => {
    if (target?.current === null) return;

    const observeChild =
      target.current.children[target.current.children.length - endPoint];
    if (observeChild && currentChild.current !== observeChild) {
      currentChild.current = observeChild;
      observer.observe(observeChild);
    }

    return () => {
      const { current } = target;

      if (current !== null && observer) {
        observer.unobserve(current);
      }
    };
  }, [page, target, targetArray, observer, endPoint]);

  return {
    page,
    setPage,
  };
};

export default useInfiniteScroll;
