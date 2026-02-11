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
    <Flex direction='column' gap={4} h='100%'>
        <Box overflow='hidden' ref={emblaRef}>
            <Flex>
                {children.map((child, i) => (
                <Box flex='0 0 100%' minW='0' key={i} mr={4}>
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
                    w='14px' h='14px'
                    border='2px solid' borderColor='blue.200' 
                    bg={selectedIndex === i ? 'blue.200' : 'transparent'}
                    onClick={() => emblaApi.scrollTo(i)}
                    cursor='pointer'/>
                ))}
            </Flex>
        </Flex>
    </Flex>
    );
}