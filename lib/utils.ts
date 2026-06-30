import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[])
{
  return twMerge(clsx(inputs));
}

// Smooth scroll utilities
export const smoothScroll = {
  // Scroll to element by ID
  toElement: (elementId: string, offset: number = 0) =>
  {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  },

  // Scroll to top of page
  toTop: () =>
  {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },

  // Scroll to bottom of page
  toBottom: () =>
  {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  },

  // Scroll by specific amount
  byAmount: (amount: number) =>
  {
    window.scrollBy({
      top: amount,
      behavior: "smooth",
    });
  },

  // Scroll to element with custom duration (for browsers that support it)
  toElementWithDuration: (elementId: string, duration: number = 1000, offset: number = 0) =>
  {
    const element = document.getElementById(elementId);
    if (!element) return;

    const startPosition = window.pageYOffset;
    const targetPosition = element.offsetTop - offset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) =>
    {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  },
};

// Easing function for smooth animation
const easeInOutCubic = (t: number, b: number, c: number, d: number): number =>
{
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
};

// Check if smooth scrolling is supported
export const isSmoothScrollSupported = (): boolean =>
{
  return "scrollBehavior" in document.documentElement.style;
};

// Get scroll position
export const getScrollPosition = (): number =>
{
  return window.pageYOffset || document.documentElement.scrollTop;
};

// Check if element is in viewport
export const isElementInViewport = (element: HTMLElement): boolean =>
{
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
