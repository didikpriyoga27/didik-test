import { useCallback } from "react";

const useParseImageStringHook = () => {
  const parseImageString = useCallback((str: string) => {
    return str.match(/https?:\/\/[^\\"\]]+/)?.[0];
  }, []);

  return { parseImageString };
};

export default useParseImageStringHook;
