import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.tagert)) {
          handler();
        }
      }
      //third argument is passed here as true so that the click event is only handled in the capturing phase
      //otherwise the click will be detected as outside even when we click the Add Cabin button and the modal will open and immediately close
      document.addEventListener("click", handleClick, listenCapturing);

      //
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
