/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react';

export interface InfiniteScrollProps {
  isFetching: boolean;
  options?: IntersectionObserverInit;
}

const useInfiniteScroll = ({ isFetching, options }: InfiniteScrollProps) => {
  const pageEnd = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const initPage = useCallback(() => {
    setPage(0);
  }, []);
  const loadMore = () => {
    if (isFetching) return;
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (!pageEnd.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadMore();
      }
    }, options);

    observer.observe(pageEnd.current);

    return () => {
      if (pageEnd.current) observer.disconnect();
    };
  }, []);

  return { page, pageEnd, initPage };
};

export default useInfiniteScroll;
