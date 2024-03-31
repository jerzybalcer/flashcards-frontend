import { Text } from "@chakra-ui/react";
import { useLayoutEffect, useRef, useState } from "react";

interface FittedTextProps {
    content: string;
    containerRef: React.RefObject<HTMLDivElement>;
    maxFontSize?: number;
}

export const FittedText: React.FC<FittedTextProps> = ({content, containerRef, maxFontSize = 150}) => {
    const [fontSize, setFontSize] = useState<number>(maxFontSize);

    const textRef = useRef<HTMLParagraphElement>(null);

    const scaleDownText = () => {
        if(!textRef.current || !containerRef.current) return;

        if((textRef.current.scrollWidth > containerRef.current.scrollWidth) || 
            (textRef.current.scrollHeight > containerRef.current.scrollHeight)){
            setFontSize(fontSize - 4);
            return;
        }
    };

    useLayoutEffect(() => {
        setFontSize(maxFontSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content]);

    useLayoutEffect(() => {
        scaleDownText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fontSize]);

    return <Text ref={textRef} fontSize={fontSize}>{content}</Text>
}