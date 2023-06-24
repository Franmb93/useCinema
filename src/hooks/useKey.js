import { useEffect } from "react";

export function useKey(key, callback) {
  useEffect(() => {
    function listener(e) {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    }

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [key, callback]);
}
