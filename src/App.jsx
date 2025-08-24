import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import { QueryClient, QueryClientProvider, useInfiniteQuery } from '@tanstack/react-query';
import { InfiniteScroller } from './components/InfiniteScroller';
import Layout from './components/Layout';

const queryClient = new QueryClient();

const Home = () => {
  const fetchSections = async ({ pageParam = 0 }) => {
    // In a real app, you might fetch data from an API here.
    // For this example, we'll just return the sections.
    return { sections: ['hero', 'projects'], nextPage: pageParam + 1 };
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['sections'],
    queryFn: fetchSections,
    getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
    initialPageParam: 0,
  });

  if (status === "error") return <p>Error {error.message}</p>;
  if (status === "pending")
    return <p className="h-[312px]">Loading from client...</p>;

  return (
    <InfiniteScroller
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      endingMessage="Portfolio End"
      loadingMessage="Loading more..."
    >
      {data && data.pages.map((page, i) => (
        <React.Fragment key={i}>
          <Hero />
          <Projects />
        </React.Fragment>
      ))}
    </InfiniteScroller>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
