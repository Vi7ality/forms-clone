import type { NavigateFunction } from "react-router-dom";

export const navBack = (navigate: NavigateFunction) => {
  if (window.history.length > 1) {
    navigate(-1);
  } else {
    navigate("/");
  }
};
