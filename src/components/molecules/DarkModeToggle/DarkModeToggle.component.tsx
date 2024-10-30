"use client";

import ButtonComponent from "@/components/atoms/Button";
import { DarkModeIcon } from "@/components/atoms/Icons";
import { useTheme } from "next-themes";
import { useCallback } from "react";

const DarkModeToggleComponent = () => {
  const { theme, systemTheme, setTheme } = useTheme();

  const handleToggleTheme = useCallback(() => {
    if (theme === "dark" || (theme === "system" && systemTheme === "dark")) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [setTheme, systemTheme, theme]);

  return (
    <ButtonComponent onClick={handleToggleTheme}>
      <DarkModeIcon className="dark:invert" />
    </ButtonComponent>
  );
};

export default DarkModeToggleComponent;
