import React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface SVGImageProps {
  SVG: string | StaticImport;
  width?: number;
  height?: number;
}

const SVGImage = (props: SVGImageProps) => {
  const { SVG, width = 16, height = 16 } = props;
  return <Image src={SVG} alt="Bill" width={width} height={height} />;
};

export default SVGImage;
