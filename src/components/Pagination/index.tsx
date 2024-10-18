"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    Pagination as ShadcnPagination,
} from "../ui/pagination";
import { useCallback, useState } from "react";
import { useTasks } from "@/contexts/tasks.context";

export function Pagination() {
    const { totalPages } = useTasks();
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPage = Number(searchParams.get("page")) || 1;
    const [page, setPage] = useState(currentPage);

    const previousPage = currentPage - 1 || 1;
    const nextPage = page + 1;

    const GoPreviousPage = useCallback(() => {
        const params = new URLSearchParams(searchParams);
        params.set("page", previousPage.toString());
        router.replace(`?${params.toString()}`);
        setPage(previousPage);
    }, [previousPage]);

    const GoNextPage = useCallback(() => {
        const params = new URLSearchParams(searchParams);
        params.set("page", nextPage.toString());
        router.replace(`?${params.toString()}`);
        setPage(nextPage);
    }, [nextPage]);

    return (
        <ShadcnPagination>
            <PaginationContent>
                <PaginationItem
                    className={
                        page === 1 ? "cursor-not-allowed" : "cursor-pointer"
                    }
                >
                    <PaginationPrevious
                        className="text-gray-800 dark:text-gray-300"
                        onClick={() => page !== 1 && GoPreviousPage()}
                    />
                </PaginationItem>

                {page > 1 && (
                    <PaginationItem className="cursor-pointer">
                        <PaginationLink
                            className="text-gray-800 dark:text-gray-300"
                            onClick={() => page !== 1 && GoPreviousPage()}
                        >
                            {previousPage}
                        </PaginationLink>
                    </PaginationItem>
                )}
                <PaginationItem className="cursor-pointer">
                    <PaginationLink className="text-gray-800 border border-gray-800 dark:text-gray-300 dark:border-gray-300 dark:hover:bg-gray-800">
                        {page}
                    </PaginationLink>
                </PaginationItem>
                {page < totalPages && (
                    <PaginationItem className="cursor-pointer">
                        <PaginationLink
                            className="text-gray-800 dark:text-gray-300"
                            onClick={GoNextPage}
                        >
                            {nextPage}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem
                    className={
                        page === totalPages
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                    }
                >
                    <PaginationNext
                        className="text-gray-800 dark:text-gray-300"
                        onClick={() => page < totalPages && GoNextPage()}
                    />
                </PaginationItem>
            </PaginationContent>
        </ShadcnPagination>
    );
}
