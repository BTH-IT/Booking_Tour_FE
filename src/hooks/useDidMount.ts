import { useEffect } from "react";

const useDidMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
export default useDidMount;
