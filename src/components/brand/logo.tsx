import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  className?: string;
};

export function Logo({ href = "/", className }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="Go to homepage"
      className={cn("inline-flex items-center", className)}
    >
      {/* Mobile */}
      <span className="sm:hidden">
        <Image
          src="/logo-mobile-light.png"
          alt="Coinpay"
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-auto dark:hidden"
        />
        <Image
          src="/logo-mobile-dark.png"
          alt="Coinpay"
          width={0}
          height={0}
          sizes="100vw"
          className="hidden h-full w-auto dark:block"
        />
      </span>

      {/* Desktop */}
      <span className="hidden sm:block">
        <Image
          src="/logo-desktop-light.png"
          alt="Coinpay"
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-auto dark:hidden"
        />
        <Image
          src="/logo-desktop-dark.png"
          alt="Coinpay"
          width={0}
          height={0}
          sizes="100vw"
          className="hidden h-full w-auto dark:block"
        />
      </span>
    </Link>
  );
}
