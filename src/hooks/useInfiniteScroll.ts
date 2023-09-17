import { useEffect, useState, useMemo, useRef, MutableRefObject } from 'react';

import { ProjectType } from '@/components/ProjectList/useProjectList';

export interface InfiniteScrollProps {
  target: MutableRefObject<HTMLDivElement | null>;
  endPoint?: number;
  options: IntersectionObserverOptions;
  list: ProjectType[];
}

export interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

const useInfiniteScroll = ({
  target,
  endPoint = 1,
  options: { root = null, rootMargin = '0px', threshold = 1 },
  list,
}: InfiniteScrollProps) => {
  const [page, setPage] = useState<number>(0);
  const currentChild = useRef<Element | null>(null);

  const observer = useMemo(() => {
    return new IntersectionObserver(
      (entries, observer) => {
        if (target?.current === null) return;
        if (target.current.children.length === list.length) return;
        if (entries[0].isIntersecting) {
          console.log('pageUPdate');
          setPage((v) => {
            return v + 1;
          });
          observer.disconnect();
        }
      },
      { root, rootMargin, threshold },
    );
  }, [target, root, list, rootMargin, threshold]);

  useEffect(() => {
    if (target?.current === null) return;

    const { current } = target;

    const observeChild = current.children[current.children.length - endPoint];
    console.log('observe before', observeChild, currentChild.current);
    if (observeChild && currentChild.current !== observeChild) {
      currentChild.current = observeChild;
      console.log('observe start', observeChild);
      observer.observe(observeChild);
    }

    return () => {
      const { current } = target;

      if (current !== null && observer) {
        observer.unobserve(current);
        console.log('observe 끝');
      }
    };
  }, [page, target, observer, endPoint]);

  return {
    page,
    setPage,
  };
};

export default useInfiniteScroll;
