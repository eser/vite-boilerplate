import { useEffect } from "react";

const useTitle = function useTitle(title: string) {
  useEffect(() => {
    if (document.title !== title) {
      document.title = title;
    }
  }, []);
};

export { useTitle };
