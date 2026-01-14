import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  className?: string; // use this to control HEIGHT: e.g. "h-6 sm:h-7"
};

export function Logo({ href = "/", className }: LogoProps) {
  const imgClass = cn("h-full w-auto", className);

  return (
    <Link
      href={href}
      aria-label="Go to homepage"
      className={cn("inline-flex items-center shrink-0", className)}
    >
      {/* Mobile */}
      <span className={cn("sm:hidden", className)}>
        <Image
          src="/logo-mobile-light.png"
          alt="Coinpay"
          width={48}
          height={48}
          className={cn("h-full w-auto dark:hidden")}
          priority
        />
        <Image
          src="/logo-mobile-dark.png"
          alt="Coinpay"
          width={48}
          height={48}
          className={cn("hidden h-full w-auto dark:block")}
          priority
        />
      </span>

      {/* Desktop */}
      <span className={cn("hidden sm:block", className)}>
        <Image
          src="/logo-desktop-light.png"
          alt="Coinpay"
          width={160}
          height={32}
          className={cn("h-full w-auto dark:hidden")}
          priority
        />
        <Image
          src="/logo-desktop-dark.png"
          alt="Coinpay"
          width={160}
          height={32}
          className={cn("hidden h-full w-auto dark:block")}
          priority
        />
      </span>
    </Link>
  );
}
