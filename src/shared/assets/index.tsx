import SVGImage from "@/shared/UI/SVGImage/ui/SVGImage";
import companySVG from "./svg/company.svg";
import usersSVG from "./svg/users.svg";

export interface SVGProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

export const CompanySvg = (props: SVGProps) => {
  return (
    <SVGImage
      SVG={companySVG}
      style={props.style}
      width={props.width}
      height={props.height}
    />
  );
};

export const UsersSvg = (props: SVGProps) => {
  return (
    <SVGImage
      SVG={usersSVG}
      style={props.style}
      width={props.width}
      height={props.height}
    />
  );
};
