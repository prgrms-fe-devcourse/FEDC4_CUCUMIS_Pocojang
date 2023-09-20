/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';

export interface InfiniteScrollProps {
  options?: IntersectionObserverInit;
}

const useInfiniteScroll = ({ options }: InfiniteScrollProps) => {
  const pageEnd = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (!pageEnd.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loadMore();
    }, options);

    observer.observe(pageEnd.current);

    () => {
      if (pageEnd.current) observer.unobserve(pageEnd.current);
    };
  }, []);

  return { page, pageEnd };
};

export default useInfiniteScroll;
