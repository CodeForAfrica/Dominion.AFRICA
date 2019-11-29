import { useMediaQuery, useTheme } from '@material-ui/core';

/**
 * Computes number of columns to show based on screen size.
 */
function useColsMediaQuery() {
  const theme = useTheme();
  let cards = 4;
  if (useMediaQuery(theme.breakpoints.down('md'))) {
    cards = 2;
  }
  if (useMediaQuery(theme.breakpoints.down('sm'))) {
    cards = 1;
  }

  return cards;
}

export default useColsMediaQuery;
