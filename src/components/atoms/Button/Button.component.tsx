"use client";

import Link from "next/link";
import { ReactElement } from "react";
import { IButtonComponentProps } from "./type";

/**
 * A component that renders a button with a rounded rectangle style.
 *
 * If the `href` prop is provided, the component renders a `Link` component
 * with the given href. Otherwise, it renders a `button` element with the
 * given `onClick` handler.
 *
 * The button has a default class name of
 * `bg-gray-200 dark:bg-gray-800 rounded-full py-2 px-4 line-clamp-1 text-foreground`,
 * which can be overridden by providing a `className` prop.
 *
 * @param {IButtonComponentProps} props - The props object, which contains a
 * `children` property that is the content of the button, an `onClick` property
 * that is the click handler for the button, and an `href` property that is the
 * href of the button.
 *
 * @returns {ReactElement} A JSX element representing the button component.
 */
const ButtonComponent = ({
  children,
  onClick,
  href,
  className,
}: IButtonComponentProps): ReactElement => {
  const defaultClassName =
    "bg-gray-200 dark:bg-gray-800 rounded-full py-2 px-4 line-clamp-1 text-foreground dark:text-background";
  const combinedClassName = `${defaultClassName} ${className || ""}`.trim();

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default ButtonComponent;
