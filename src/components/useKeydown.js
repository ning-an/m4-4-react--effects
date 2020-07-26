import { useEffect } from "react";

export const useKeydown = (code, callback) => {
  const handleCookieClick = (e) => {
    if (e.code === code) {
      callback();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleCookieClick);

    return () => {
      window.removeEventListener("keydown", handleCookieClick);
    };
  });
};
