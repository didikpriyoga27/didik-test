import { ReactElement } from "react";

const TextAreaComponent = (
  props: React.InputHTMLAttributes<HTMLTextAreaElement>
): ReactElement => {
  return (
    <textarea
      className="bg-gray-200 dark:bg-gray-800 rounded-full p-2 px-4 text-black dark:text-white"
      {...props}
    />
  );
};

export default TextAreaComponent;
