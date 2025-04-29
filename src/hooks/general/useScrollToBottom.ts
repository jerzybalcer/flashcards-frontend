import { useCallback, useEffect } from "react";

export const useScrollToBottom = 
( 
    ref: React.RefObject<HTMLElement>, 
    onScrolledToBottom: () => void,
) => {
    const handleScroll = useCallback((element: HTMLElement) => {
        const isScrolledToBottom = element.scrollHeight - element.scrollTop <= element.clientHeight;

        if (isScrolledToBottom) {
            onScrolledToBottom();
        }
    }, [onScrolledToBottom]);

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;

        const handler = () => handleScroll(element);

        element.addEventListener("scroll", handler);

        return () => element.removeEventListener("scroll", handler);
    }, [handleScroll, ref]);
}
