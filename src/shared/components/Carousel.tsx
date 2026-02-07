import { Box, Flex } from '@chakra-ui/react';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';

interface Props {
    children: JSX.Element[];
}

export const Carousel: React.FC<Props> = ({ children }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop : true });
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => { 
        emblaApi.off("select", onSelect); 
    }
    }, [emblaApi]);

    return (
    <>
        <Box overflow='hidden' ref={emblaRef}>
            <Flex gap={4}>
                {children.map((child, i) => (
                <Box flex='0 0 100%' minW='0' key={i}>
                    {child}
                </Box>
                ))}
            </Flex>
        </Box>
        <Flex justify='center' w='100%'>
            <Flex gap={4}>
                {emblaApi?.scrollSnapList().map((_, i) => (
                    <Box key={i} 
                    borderRadius='50%' 
                    w='16px' h='16px'
                    border='2px solid' borderColor='blue.200' 
                    bg={selectedIndex === i ? 'blue.200' : 'transparent'}
                    onClick={() => emblaApi.scrollTo(i)}/>
                ))}
            </Flex>
        </Flex>
    </>
    );
}