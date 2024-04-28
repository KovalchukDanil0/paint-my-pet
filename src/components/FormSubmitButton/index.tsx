"use client";

import { Button, Spinner } from "flowbite-react";
import { useFormStatus } from "react-dom";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function FormSubmitButton({
  children,
  className,
  ...props
}: Readonly<Props>) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} className={className} disabled={pending} type="submit">
      {pending && <Spinner className="mr-3" />}
      {children}
    </Button>
  );
}
