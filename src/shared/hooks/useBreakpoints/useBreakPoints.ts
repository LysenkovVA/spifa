import { useEffect, useState } from "react";

export enum ScreenWidth {
  "xs" = 0,
  "sm" = 600,
  "md" = 960,
  "lg" = 1280,
  "xl" = 1920,
}

export class Breakpoints {
  _screenWidth: ScreenWidth;

  constructor(screenWidth: ScreenWidth) {
    this._screenWidth = screenWidth;
  }

  get xs() {
    return this._screenWidth === ScreenWidth.xs;
  }

  get sm() {
    return this._screenWidth === ScreenWidth.sm;
  }

  get md() {
    return this._screenWidth === ScreenWidth.md;
  }

  get lg() {
    return this._screenWidth === ScreenWidth.lg;
  }

  get xl() {
    return this._screenWidth === ScreenWidth.xl;
  }
}

/**
 * Хук для определения размера экрана устройства
 */
const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState<ScreenWidth>(0);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    if (0 < windowSize.width && windowSize.width < 600) {
      setBreakPoint(0);
    }
    if (600 < windowSize.width && windowSize.width < 960) {
      setBreakPoint(600);
    }
    if (960 < windowSize.width && windowSize.width < 1280) {
      setBreakPoint(960);
    }
    if (1280 < windowSize.width && windowSize.width < 1920) {
      setBreakPoint(1280);
    }
    if (windowSize.width >= 1920) {
      setBreakPoint(1920);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize.width]);
  return new Breakpoints(breakpoint);
};

export default useBreakpoint;
