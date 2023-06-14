import React from 'react';

const LoadingErrorWrapper = ({ isError, error, isLoading, children }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred: {error.message}</div>;
  }

  return <>{children}</>;
};

export default LoadingErrorWrapper;
