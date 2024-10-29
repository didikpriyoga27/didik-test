import { PropsWithChildren, ReactElement } from "react";

/**
 * A basic button component.
 *
 * @example
 * <Button>Click me</Button>
 *
 * @param {ReactNode} children - The content of the button.
 * @returns {ReactElement} A JSX element representing the button.
 */
const ButtonComponent = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <button className="bg-gray-200 dark:bg-gray-800 rounded-full py-2 px-4 line-clamp-1 text-foreground">
      {children}
    </button>
  );
};

export default ButtonComponent;
