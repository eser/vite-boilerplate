import { useEffect, useRef } from "react";

const updateTitle = function updateTitle(newTitle: string) {
  if (document.title !== newTitle) {
    document.title = newTitle;
  }
};

const useTitle = function useTitle(title: string) {
  if (!("document" in globalThis) /* import.meta.env.SSR */) {
    return;
  }

  const oldTitleRef = useRef(document.title);

  useEffect(() => {
    updateTitle(title);

    return () => {
      updateTitle(oldTitleRef.current);
    };
  }, []);
};

export { useTitle };
