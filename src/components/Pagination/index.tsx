import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

import { Input } from '../ui/input';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) => {
  const handlePageChange = (page: number) => setCurrentPage(page);
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPageItems = 5; // Fixed number of page items to display
    let startPage = Math.max(currentPage - Math.floor(totalPageItems / 2), 1);
    let endPage = startPage + totalPageItems - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - totalPageItems + 1, 1);
    }

    if (startPage > 1) {
      pageNumbers.push(1, '...');
    }
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
    if (endPage < totalPages) {
      pageNumbers.push('...', totalPages);
    }

    useEffect(() => {
      if (totalPages !== 0 && currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    }, [currentPage, totalPages]);

    return pageNumbers.map((page, index) => (
      <li key={index}>
        {typeof page === 'number' ? (
          <Button
            variant="ghost"
            className={`w-12 h-12 text-xl transition-colors ${
              page === currentPage
                ? 'bg-blue-500 text-primary-foreground hover:bg-blue-500 hover:text-primary-foreground'
                : 'hover:bg-blue-400 hover:text-primary-foreground'
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ) : (
          <span className="px-3 py-2 text-muted-foreground">{page}</span>
        )}
      </li>
    ));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center my-8">
        <nav className="flex items-center gap-4">
          <Button
            variant="primary2"
            className="pl-3 pr-6 py-6 text-xl transition-colors"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-6 h-6" />
            Prev
          </Button>
          <ul
            className={cn(
              'flex items-center gap-2 justify-center',
              totalPages > 5 && 'w-[350px]'
            )}
          >
            {renderPageNumbers()}
          </ul>
          <Button
            variant="primary2"
            className="pl-6 pr-3 py-6 text-xl transition-colors"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="w-6 h-6" />
          </Button>
        </nav>
      </div>
      <div className="flex gap-3 items-center">
        <div className="text-lg text-gray-600">Jump to:</div>
        <Input
          value={currentPage}
          type="number"
          min={1}
          onChange={(e) => {
            if (e.target.value === '') e.target.value = '0';
            if (parseInt(e.target.value) > totalPages)
              e.target.value = totalPages.toString();
            setCurrentPage(parseInt(e.target.value));
          }}
          className="w-20 text-xl text-gray-800 pl-2 py-2 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
};

export default Pagination;
