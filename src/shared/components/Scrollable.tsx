import { Flex } from "@chakra-ui/react";

interface ScrollableProps {
    children: JSX.Element[] | JSX.Element;
    scrollableRef?: React.RefObject<HTMLDivElement>;
}

export const Scrollable: React.FC<ScrollableProps> = ({ children, scrollableRef = null }) => {
    return (
    <Flex ref={scrollableRef} overflowY='scroll' overflowX='hidden' direction='column' position='relative' h='100%'>
        <Flex position='absolute' direction='column' w='100%' h='100%' pr={2}>
            {children}
        </Flex>
    </Flex>
    );
}