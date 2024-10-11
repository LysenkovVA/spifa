import { useEffect, useState } from "react";

export enum ScreenSize {
  "xs" = 0,
  "sm" = 600,
  "md" = 960,
  "lg" = 1280,
  "xl" = 1920,
}

export class ScreenWidth {
  readonly _screenSize: ScreenSize;

  constructor(screenWidth: ScreenSize) {
    this._screenSize = screenWidth;
  }

  get xs() {
    return this._screenSize === ScreenSize.xs;
  }

  get sm() {
    return this._screenSize === ScreenSize.sm;
  }

  get md() {
    return this._screenSize === ScreenSize.md;
  }

  get lg() {
    return this._screenSize === ScreenSize.lg;
  }

  get xl() {
    return this._screenSize === ScreenSize.xl;
  }
}

/**
 * Хук для определения размера экрана устройства
 */
const useScreenWidth = () => {
  const [breakpoint, setBreakPoint] = useState<ScreenSize>(0);
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
  return new ScreenWidth(breakpoint);
};

export default useScreenWidth;
