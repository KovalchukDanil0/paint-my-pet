"use client";

import { RefObject } from "react";
import { Button, ButtonProps, Progress } from "react-daisyui";
import { useFormStatus } from "react-dom";

interface Props extends ButtonProps {
  ref?: RefObject<HTMLButtonElement>;
}

export default function FormSubmitButton({
  children,
  className,
  ...props
}: Readonly<Props>) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} className={className} disabled={pending} type="submit">
      {pending && <Progress className="mr-3" />}
      {children}
    </Button>
  );
}
