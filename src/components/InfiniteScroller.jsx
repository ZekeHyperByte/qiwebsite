import React, { useEffect, useRef } from 'react';

export function InfiniteScroller({
  children,
  fetchNextPage,
  hasNextPage,
  loadingMessage = 'Loading...',
  endingMessage = 'No more content',
  className = '',
}) {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, hasNextPage, fetchNextPage]);

  return (
    <div className={`scroll-container ${className}`}>
      {children}
      <div ref={observerTarget}>
        {hasNextPage ? loadingMessage : endingMessage}
      </div>
    </div>
  );
}
