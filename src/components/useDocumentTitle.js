import { useEffect } from "react";

export const useDocumentTitle = (title, fallbackTitle) => {
  useEffect(() => {
    document.title = `${title} cookies - Cookie Clicker`;
    return fallbackTitle;
  }, [title, fallbackTitle]);
};
