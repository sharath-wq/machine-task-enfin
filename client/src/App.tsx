import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import AddBook from './components/add-book-modal';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './components/ui/pagination';
import axios from 'axios';
import { BASE_URL } from './constants';
import useDebounce from './lib/deboune';

export default function Component() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [books, setBooks] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const debouce = useDebounce(searchTerm);

    // Function to fetch books from backend
    const fetchBooks = async (page: number, searchTerm: string) => {
        try {
            const { data } = await axios.get(`${BASE_URL}/books`, {
                params: { page, search: searchTerm },
            });

            setBooks(data.books);
            setTotalPages(data.totalPages);
        } catch (error) {
            handleErrorResponse(error);
        }
    };

    // Fetch initial data when component mounts
    useEffect(() => {
        fetchBooks(currentPage, searchTerm);
    }, [currentPage, debouce]);

    function handleErrorResponse(error: any) {
        let errorMessage = 'There was a problem with your request.';
        if (error.response && error.response.data.errors && error.response.data.errors.length > 0) {
            errorMessage = error.response.data.errors.map((err: { message: string }) => err.message).join(', ');
        }
        toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: errorMessage,
        });
    }

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to page 1 when search term changes
    };

    // Function to generate pagination items with ellipses
    const generatePagination = () => {
        const visiblePages = 2; // Number of visible pages before and after ellipses

        if (totalPages <= visiblePages) {
            return [...Array(totalPages).keys()].map((index) => (
                <PaginationItem key={index}>
                    <PaginationLink isActive={currentPage === index + 1} onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                    </PaginationLink>
                </PaginationItem>
            ));
        } else {
            const pages = [];
            let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
            let endPage = Math.min(totalPages, startPage + visiblePages - 1);

            if (endPage - startPage < visiblePages - 1) {
                startPage = Math.max(1, endPage - visiblePages + 1);
            }

            if (startPage > 1) {
                pages.push(
                    <PaginationItem key={1}>
                        <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
                    </PaginationItem>
                );
                if (startPage > 2) {
                    pages.push(
                        <PaginationItem key='ellipsis_start'>
                            <PaginationEllipsis />
                        </PaginationItem>
                    );
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink isActive={currentPage === i} onClick={() => setCurrentPage(i)}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pages.push(
                        <PaginationItem key='ellipsis_end'>
                            <PaginationEllipsis />
                        </PaginationItem>
                    );
                }
                pages.push(
                    <PaginationItem key={totalPages}>
                        <PaginationLink onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink>
                    </PaginationItem>
                );
            }

            return pages;
        }
    };

    return (
        <div className='container mx-auto px-4 md:px-6 py-12'>
            <div className='flex items-center justify-end mb-8'>
                <div className='flex items-center gap-4'>
                    <Input
                        type='text'
                        placeholder='Search by title or author'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className='w-full max-w-md bg-white dark:bg-gray-950'
                    />
                    <AddBook />
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {books.map((book: any) => (
                    <Card
                        key={book.id}
                        className='w-full max-w-sm bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-900'
                    >
                        <div className='flex flex-col h-full justify-between p-6 space-y-4'>
                            <div className='space-y-2'>
                                <h3 className='text-xl font-bold'>{book.name}</h3>
                                <p className='text-gray-500 dark:text-gray-400'>{book.description}</p>
                                <div className='flex justify-between'>
                                    <p className='text-gray-500 dark:text-gray-400'>
                                        Published on: {new Date(book.publishDate).toLocaleDateString()}
                                    </p>
                                    <div className='top-4 right-4 bg-green-900 text-white px-3 py-1 rounded-full text-sm'>
                                        ₹ {book.price}
                                    </div>
                                </div>
                            </div>
                            <Button type='button' size='lg' className='w-full'>
                                Add to Cart
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
            <div className='mt-10'>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))} />
                        </PaginationItem>
                        {generatePagination()}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
