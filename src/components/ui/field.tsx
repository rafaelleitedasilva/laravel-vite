"use client";

import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

const controlClass =
  "w-full rounded-md border border-border-strong bg-bg-elev px-3 py-2.5 text-sm text-text placeholder:text-text-dim focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-accent";

function Label({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
      {children}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-danger">
      {children}
    </p>
  );
}

export function Field({
  label,
  error,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(controlClass, error && "border-danger")}
        {...props}
      />
      <ErrorText id={errorId}>{error}</ErrorText>
    </div>
  );
}

export function TextareaField({
  label,
  error,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <textarea
        id={id}
        rows={6}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(controlClass, "resize-y", error && "border-danger")}
        {...props}
      />
      <ErrorText id={errorId}>{error}</ErrorText>
    </div>
  );
}
