import { useEffect, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

interface PaginationProps{
    items: unknown[];
    itemsPerPage: number;
    onPageChange: (page: unknown[]) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ items, itemsPerPage, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const getMaxPages = (): number => {
        return Math.ceil(items.length / itemsPerPage)
    }

    const getItemsForPage = (page: number): unknown[] => {
        return items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    };

    const canChangePage = (change: 1 | -1): boolean => {
        if(currentPage + change < 1) return false;

        if((currentPage + change) * itemsPerPage > items.length + itemsPerPage) return false;

        return true;
    } 

    const handlePageChange = (change: 1 | -1): void => {
        setCurrentPage(currentPage + change);
        const currentItems = getItemsForPage(currentPage + change);
        onPageChange(currentItems);
    };

    useEffect(() => {
        onPageChange(getItemsForPage(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Flex justifyContent='space-between' alignItems='center' w='100%'>
            <Button isDisabled={!canChangePage(-1)} onClick={() => handlePageChange(-1)}>
                <IconArrowLeft />
            </Button>
            <Text opacity={0.8}>
                Page {currentPage} of {getMaxPages()}
            </Text>
            <Button isDisabled={!canChangePage(1)} onClick={() => handlePageChange(1)}>
                <IconArrowRight />
            </Button>
        </Flex>
}