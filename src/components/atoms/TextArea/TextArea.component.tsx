import { ReactElement } from "react";

/**
 * A basic textarea component.
 *
 * @example
 * <TextAreaComponent />
 *
 * @param {React.InputHTMLAttributes<HTMLTextAreaElement>} props - The props for the textarea component.
 *
 * @returns {ReactElement} A JSX element representing the textarea component.
 */
const TextAreaComponent = (
  props: React.InputHTMLAttributes<HTMLTextAreaElement>
): ReactElement => {
  return (
    <textarea
      className="bg-gray-200 dark:bg-gray-800 rounded-full p-2 px-4 text-black dark:text-white h-40"
      {...props}
    />
  );
};

export default TextAreaComponent;
