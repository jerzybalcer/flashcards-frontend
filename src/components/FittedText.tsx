import { Text } from "@chakra-ui/react";
import { useLayoutEffect, useRef, useState } from "react";

interface FittedTextProps {
    content: string;
    containerRef: React.RefObject<HTMLDivElement>;
    minFontSize?: number;
}

export const FittedText: React.FC<FittedTextProps> = ({content, containerRef, minFontSize = 32}) => {
    const [fontSize, setFontSize] = useState<number>(0);
    const [isDoneResizing, setIsDoneResizing] = useState<boolean>(false);
    
    const textRef = useRef<HTMLParagraphElement>(null);

    const scalingStep = 4;
    
    const scaleText = () => {
        if(!textRef.current || !containerRef.current) return;

        const scalingFactor = scalingStep * Math.ceil(fontSize / 100);

        // make font size bigger when text is still smaller than container
        if((textRef.current.offsetWidth <= getWidthWithoutPadding(containerRef.current)) && 
            (textRef.current.offsetHeight <= getHeightWithoutPadding(containerRef.current))){
            setFontSize(fontSize + scalingFactor);
            return;
        }
        // when text finally overflows container, make it just a bit smaller to fit
        else {
            setFontSize(fontSize - scalingFactor);
            setIsDoneResizing(true);
            return;
        }
    };

    const getWidthWithoutPadding = (element: HTMLDivElement) => {
        const paddingLeft = parseFloat(window.getComputedStyle(element, null).getPropertyValue('padding-left'));
        const paddingRight = parseFloat(window.getComputedStyle(element, null).getPropertyValue('padding-right'));
        return element.offsetWidth - paddingLeft - paddingRight;
    };

    const getHeightWithoutPadding = (element: HTMLDivElement) => {
        const paddingTop = parseFloat(window.getComputedStyle(element, null).getPropertyValue('padding-top'));
        const paddingBottom = parseFloat(window.getComputedStyle(element, null).getPropertyValue('padding-bottom'));
        return element.offsetWidth - paddingTop - paddingBottom;
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