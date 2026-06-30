import { useCallback, useEffect, useState } from "react";
import { smoothScroll, getScrollPosition, isElementInViewport } from "../utils";

export const useSmoothScroll = () =>
{
    const [ scrollPosition, setScrollPosition ] = useState(0);
    const [ isScrolling, setIsScrolling ] = useState(false);

    // Update scroll position
    useEffect(() =>
    {
        const handleScroll = () =>
        {
            setScrollPosition(getScrollPosition());
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll to element
    const scrollToElement = useCallback((elementId: string, offset: number = 0) =>
    {
        setIsScrolling(true);
        smoothScroll.toElement(elementId, offset);

        // Reset scrolling state after animation
        setTimeout(() => setIsScrolling(false), 1000);
    }, []);

    // Scroll to top
    const scrollToTop = useCallback(() =>
    {
        setIsScrolling(true);
        smoothScroll.toTop();
        setTimeout(() => setIsScrolling(false), 1000);
    }, []);

    // Scroll to bottom
    const scrollToBottom = useCallback(() =>
    {
        setIsScrolling(true);
        smoothScroll.toBottom();
        setTimeout(() => setIsScrolling(false), 1000);
    }, []);

    // Scroll by amount
    const scrollByAmount = useCallback((amount: number) =>
    {
        setIsScrolling(true);
        smoothScroll.byAmount(amount);
        setTimeout(() => setIsScrolling(false), 1000);
    }, []);

    // Check if element is in viewport
    const checkElementInViewport = useCallback((elementId: string): boolean =>
    {
        const element = document.getElementById(elementId);
        return element ? isElementInViewport(element) : false;
    }, []);

    return {
        scrollPosition,
        isScrolling,
        scrollToElement,
        scrollToTop,
        scrollToBottom,
        scrollByAmount,
        checkElementInViewport,
    };
};
