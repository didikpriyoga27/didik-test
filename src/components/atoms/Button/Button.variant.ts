import { cva } from "class-variance-authority";
import { ButtonVariantsFunction } from "./type";

//@ts-expect-error for later
const ButtonVariants: ButtonVariantsFunction = cva(
  "transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none rounded-full py-2 px-4 line-clamp-1 text-foreground dark:text-background",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 text-blue-100 hover:text-white",
        warning:
          "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-800 text-orange-100 hover:text-white",
        danger:
          "bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 text-orange-100 hover:text-white",
        inverse:
          "bg-gray-600 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-900 text-blue-100 hover:text-white",
        success:
          "bg-green-600 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900 text-teal-100 hover:text-white",
        purple:
          "bg-indigo-700 da hover:bg-indigo-800 dark:bg-indigo-700 dark:hover:bg-indigo-500 text-white",
        default:
          "bg-gray-200 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-400 text-blue-100 dark:text-white",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  }
);

export { ButtonVariants };
