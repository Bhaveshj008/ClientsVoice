export const LoadingState = ({ isLoading, hasMore, testimonials }) => {
    if (isLoading) {
      return (
        <div className="text-center text-gray-400 mt-4">
          Loading more testimonials...
        </div>
      );
    }
  
    if (!hasMore && testimonials.length > 0) {
      return (
       <></>
      );
    }
  
    return null;
  };
  
  export const BrandFooter = () => (
    <div className="flex items-center justify-center mt-8">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center">
          <img src='/logo.jpg' alt='LOGO' className="w-7 h-7 mr-2 rounded-md" />
        </div>
        <span className="text-2xl font-bold">
          Clients
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Voice
          </span>
        </span>
      </div>
    </div>
  );