import { ButtonHTMLAttributes } from "react";

export interface IButtonComponentProps {
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}
