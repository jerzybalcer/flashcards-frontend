import { Flex } from "@chakra-ui/react";

interface ScrollableProps {
    children: JSX.Element[] | JSX.Element;
    scrollableRef?: React.RefObject<HTMLDivElement>;
    horizontal?: boolean;
}

export const Scrollable: React.FC<ScrollableProps> = ({ children, scrollableRef = null, horizontal = false }) => {

    if(horizontal){
        return (
            <Flex ref={scrollableRef} overflowY='hidden' overflowX='scroll' direction='row' position='relative' h='100%'>
                <Flex position='relative' direction='row' w='100%' h='100%' pr={2}>
                    {children}
                </Flex>
            </Flex>
            );
    }else{
        return (
            <Flex ref={scrollableRef} overflowY='scroll' overflowX='hidden' direction='column' position='relative' h='100%'>
                <Flex position='absolute' direction='column' w='100%' h='100%' pr={2}>
                    {children}
                </Flex>
            </Flex>
            );
    }

}