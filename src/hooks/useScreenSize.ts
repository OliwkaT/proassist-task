import { useMediaQuery, useTheme } from "@mui/material";

const useScreenSize = (): {
  isTablet: boolean;
  isMobile: boolean;
} => {
  const { breakpoints } = useTheme();
  const isTablet = useMediaQuery(breakpoints.down("md"));
  const isMobile = useMediaQuery(breakpoints.down("sm"));

  return { isTablet, isMobile };
};

export default useScreenSize;
