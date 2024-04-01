"use client";

import { Button, Spinner } from "flowbite-react";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<typeof Button>;

export default function FormSubmitButton({
  children,
  className,
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} className={className} disabled={pending} type="submit">
      {pending && <Spinner className="mr-3" />}
      {children}
    </Button>
  );
}
