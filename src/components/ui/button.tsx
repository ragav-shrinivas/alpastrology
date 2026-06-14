import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-[#ffe9ad] via-[#e8b54a] to-[#f4a259] text-[#1a1430] font-semibold shadow-[0_8px_30px_-8px_rgba(232,181,74,0.6)] hover:shadow-[0_14px_44px_-8px_rgba(232,181,74,0.85)] hover:-translate-y-0.5",
        secondary:
          "glass-gold text-white hover:border-primary/60 hover:shadow-[0_10px_36px_-10px_rgba(106,167,224,0.55)]",
        outline:
          "border border-primary/50 text-primary-300 hover:bg-primary hover:text-[#1a1430]",
        ghost: "text-white/80 hover:bg-white/10 hover:text-white",
        accent:
          "bg-accent text-[#1a1430] font-semibold hover:bg-accent-300 hover:-translate-y-0.5",
        destructive: "bg-secondary text-white hover:bg-secondary-700",
        link: "text-primary-300 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-13 px-8 text-base py-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
