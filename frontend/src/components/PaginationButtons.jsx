import { Link, useLocation, useSearchParams } from 'react-router-dom';

function PaginationButtons({ totalPages }) {
  const { pathname } = useLocation();
  const [searchParams, _] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams();
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className='flex justify-center items-center mt-8'>
      {currentPage > 1 && (
        <Link
          to={createPageURL(currentPage - 1)}
          className='px-2 py-1 border-2 border-red-500 rounded-md mr-4 text-2xl'
        >
          Previous
        </Link>
      )}
      <span className='text-2xl mx-4'>
        Page {totalPages ? currentPage : 0} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
          to={createPageURL(currentPage + 1)}
          className='px-4 py-1 border-2 border-red-500 rounded-md text-2xl'
        >
          Next
        </Link>
      )}
    </div>
  );
}

export default PaginationButtons;
