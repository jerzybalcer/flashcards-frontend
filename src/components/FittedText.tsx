import { Text } from "@chakra-ui/react";
import { useLayoutEffect, useRef, useState } from "react";

interface FittedTextProps {
    content: string;
    containerRef: React.RefObject<HTMLDivElement>;
    minFontSize?: number;
}

export const FittedText: React.FC<FittedTextProps> = ({content, containerRef, minFontSize = 20}) => {
    const [fontSize, setFontSize] = useState<number>(0);
    const [isDoneResizing, setIsDoneResizing] = useState<boolean>(false);

    const textRef = useRef<HTMLParagraphElement>(null);

    const scaleText = () => {
        if(!textRef.current || !containerRef.current) return;

        // make font size bigger when text is still smaller than container
        if((textRef.current.scrollWidth <= containerRef.current.scrollWidth) && 
            (textRef.current.scrollHeight <= containerRef.current.scrollHeight)){
            setFontSize(fontSize + 4);
            return;
        }
        // when text finally overflows container, make it just a bit smaller to fit
        else {
            setFontSize(fontSize - 4);
            setIsDoneResizing(true);
            return;
        }
    };

    const resetTextToDefault = () => {
        setFontSize(minFontSize);
        setIsDoneResizing(false);
    };

    useLayoutEffect(() => {
        resetTextToDefault();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content]);

    useLayoutEffect(() => {
        if(!isDoneResizing)
            scaleText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fontSize]);

    useLayoutEffect(() => {
        window.addEventListener('resize', resetTextToDefault);

        return () => window.removeEventListener('resize', resetTextToDefault);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Text ref={textRef} fontSize={fontSize}>{content}</Text>
}