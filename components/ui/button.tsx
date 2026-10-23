import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap",
    "rounded-sm font-semibold leading-none",
    "transition-[transform,background-color,border-color,color] duration-100 ease-out active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-navy-700 sheen",
        brand: "bg-honey-400 text-navy-900 hover:bg-honey-500 sheen",
        outline: "border-[1.5px] border-navy-900 text-navy-900 hover:bg-navy-100",
        "outline-inverse": "border-[1.5px] border-white/25 text-white hover:border-white/60",
        ghost: "text-navy-900 hover:bg-accent",
        "ghost-inverse": "text-white hover:bg-white/10",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        link: "text-navy-900 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 text-ui",
        sm: "h-10 px-4 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
