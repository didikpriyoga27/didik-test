"use client";

import { DarkModeIcon } from "@/components/atoms/Icons";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";

const DarkModeToggleComponent = () => {
  const { theme, systemTheme, setTheme } = useTheme();

  const defaultClassName =
    "bg-gray-200 dark:bg-gray-800 rounded-full py-2 px-4 line-clamp-1 text-foreground";

  const handleToggleTheme = useCallback(() => {
    if (theme === "dark" || (theme === "system" && systemTheme === "dark")) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [setTheme, systemTheme, theme]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleToggleTheme();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [handleToggleTheme]);

  return (
    <button className={defaultClassName} onClick={handleToggleTheme}>
      <DarkModeIcon className="dark:invert" />
    </button>
  );
};

export default DarkModeToggleComponent;
