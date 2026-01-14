import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label?: string;
  helperText?: React.ReactNode;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
};

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      className,
      containerClassName,
      type = "text",
      disabled,
      ...props
    },
    ref
  ) => {
    const reactId = React.useId();
    const inputId = id ?? `tf-${reactId}`;
    const helperId = `${inputId}-help`;
    const errorId = `${inputId}-error`;
    const describedBy = error ? errorId : helperText ? helperId : undefined;

    return (
      <div className={cn("space-y-1.5", containerClassName)}>
        {label ? (
          <Label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium",
              error ? "text-destructive" : "text-foreground",
              disabled ? "opacity-70" : null
            )}
          >
            {label}
          </Label>
        ) : null}

        <div className="relative">
          {leftIcon ? (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          ) : null}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              [
                "flex h-9 w-full rounded-md border bg-background px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow]",
                "border-input text-foreground placeholder:text-muted-foreground",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "disabled:cursor-not-allowed disabled:opacity-50",
                leftIcon ? "pl-10" : null,
                rightIcon ? "pr-10" : null,
                error
                  ? "border-destructive focus-visible:ring-destructive/20"
                  : null,
              ]
                .filter(Boolean)
                .join(" "),
              className
            )}
            {...props}
          />

          {rightIcon ? (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          ) : null}
        </div>

        {error ? (
          <p id={errorId} className="text-sm text-destructive">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

TextField.displayName = "TextField";
