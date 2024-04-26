import { useEffect, useRef } from "react";
import { Text } from "@chakra-ui/react";

interface FittedTextProps {
    content: string;
    containerRef: React.RefObject<HTMLDivElement>;
    singleLine?: boolean;
    padding?: number;
    maxFontSize?: number;
}

export const FittedText: React.FC<FittedTextProps> = ({content, containerRef, singleLine = false, padding = 0, maxFontSize = 100}) => {
    const textRef = useRef<HTMLParagraphElement>(null);

    const adjustFontSize = () => {
        const container = containerRef.current;
        if (container) {
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;

            let calculatedFontSize = maxFontSize;
            let isOverflowing = false;

            do {
                container.style.fontSize = `${calculatedFontSize}px`;
                isOverflowing = container.scrollWidth > containerWidth || container.scrollHeight > containerHeight;

                if (isOverflowing) {
                    calculatedFontSize--;
                } else {
                    calculatedFontSize++;
                }
            } while (isOverflowing && calculatedFontSize > 0);
        }
    };

    useEffect(() => {
        if (textRef.current && containerRef.current) {
            const resizeObserver = new ResizeObserver(() => adjustFontSize());
            resizeObserver.observe(textRef.current);
            resizeObserver.observe(containerRef.current)

            // Adjust font size once on component mount
            adjustFontSize();

            return () => {
                resizeObserver.disconnect();
            };
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Text p={padding} whiteSpace={singleLine ? 'nowrap' : 'initial'} ref={textRef}>{content}</Text>
}