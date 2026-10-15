import Image from "next/image";
import smiuLogo from "@/images/smiu-logo.png";

type LogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

/** SMIU logo. The source image has a white background, so place it on white surfaces. */
export default function Logo({ size = 48, className = "", priority = false }: LogoProps) {
  return (
    <Image
      src={smiuLogo}
      alt="Sindh Madressatul Islam University"
      width={size}
      height={size}
      priority={priority}
      className={className}
    />
  );
}
