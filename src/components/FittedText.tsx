import { useEffect, useRef, useState } from "react";
import { Text } from "@chakra-ui/react";

interface FittedTextProps {
    content: string;
    containerRef: React.RefObject<HTMLDivElement>;
}

export const FittedText: React.FC<FittedTextProps> = ({content, containerRef}) => {
    const [fontSize, setFontSize] = useState<number>(100);
    
    const textRef = useRef<HTMLParagraphElement>(null);

    const adjustFontSize = () => {
        const container = containerRef.current;

        if (container) {
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;

        // Adjust font size based on a simple formula considering the container size
        // This example uses a simple proportion, you might need more complex logic
        // depending on your exact requirements
        const newFontSize = Math.min(containerWidth / 10, containerHeight / 2);
        setFontSize(newFontSize);
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

    return <Text ref={textRef} fontSize={fontSize}>{content}</Text>
}