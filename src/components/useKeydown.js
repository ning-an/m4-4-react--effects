import { useEffect } from "react";

export const useKeydown = (code, handleKeydown) => {
  useEffect(() => {
    window.addEventListener("keydown", (e) => handleKeydown(e, code));

    return () => {
      window.removeEventListener("keydown", (e) => handleKeydown(e, code));
    };
  }, []);
};
