import Image from "next/image";
import ahmedPhoto from "@/images/ahmed-hassan.jpg";
import { DEMO_USER, initials, type User } from "@/lib/auth";

/** Profile photo for the demo student; initials for everyone else. */
export default function Avatar({ user, size, className = "" }: { user: User; size: number; className?: string }) {
  if (user.email === DEMO_USER.email) {
    return (
      <Image
        src={ahmedPhoto}
        alt={user.name}
        width={size}
        height={size}
        className={`shrink-0 rounded-full object-cover object-[50%_15%] ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-brand-700 font-semibold text-white ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials(user.name)}
    </span>
  );
}
