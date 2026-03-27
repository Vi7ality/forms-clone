export const navBack = (navigate: (to: number | string) => void) => {
  if (window.history.length > 1) {
    navigate(-1);
  } else {
    navigate("/");
  }
};
