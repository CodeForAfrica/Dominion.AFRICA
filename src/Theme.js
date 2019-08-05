import { createTheme } from '@codeforafrica/hurumap-ui';
import { createMuiTheme } from '@material-ui/core';

const FONT_FAMILY_HEADING = '"Lora", "serif"';
const FONT_FAMILY_TEXT = '"Montserrat", "sans-serif"';
const defaultTheme = createMuiTheme();
const Theme = createTheme({
  palette: {
    primary: { main: '#2b3129', light: '#f1f1ed', dark: '#222822' },
    secondary: { main: '#000000', dark: '#2c2c2a', grey: '#2b3129' },
    highlight: { main: '#e7e452' }
  },
  typography: {
    fontFamily: FONT_FAMILY_TEXT,
    fontHeading: FONT_FAMILY_HEADING,
    fontSize: 12,
    h1: {
      color: '#293229',
      fontFamily: FONT_FAMILY_HEADING,
      fontSize: '4.375rem',
      fontWeight: 400
    },
    h2: {
      color: '#293229',
      fontFamily: FONT_FAMILY_HEADING,
      textTransform: 'capitalize',
      fontWeight: 400
    }, // Hero section  heading
    h3: {
      color: '#293229',
      fontFamily: FONT_FAMILY_HEADING,
      // textTransform: 'capitalize',
      fontWeight: 'normal',
      fontSize: '1.5rem',
      lineHeight: 1.17,
      [defaultTheme.breakpoints.up('md')]: {
        color: '#222822',
        lineHeight: 1,
        fontSize: '3.125rem'
      }
    }, // Section heading
    h4: {
      color: '#2b3129',
      fontFamily: FONT_FAMILY_HEADING,
      textTransform: 'capitalize',
      fontSize: '1.25rem'
    },
    h5: {
      fontFamily: FONT_FAMILY_HEADING,
      textTransform: 'capitalize',
      fontSize: '20px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '0.86px',
      color: '#293229'
    },
    h6: {
      fontFamily: FONT_FAMILY_HEADING,
      fontSize: '13px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      textTransform: 'capitalize',
      color: '#2c2c2a'
    },
    body2: {
      color: 'rgb(34, 40, 34)',
      fontFamily: FONT_FAMILY_TEXT
    },
    subtitle1: {
      fontFamily: FONT_FAMILY_TEXT,
      fontSize: '0.75rem',
      fontWeight: 800,
      lineHeight: 1.92,
      color: '#222822'
    },
    subtitle2: {
      fontFamily: FONT_FAMILY_TEXT,
      fontSize: '0.75rem',
      fontWeight: 500
    },
    fontSmallDefault: {
      fontSize: 13,
      fontFamily: FONT_FAMILY_TEXT
    },
    useNextVariants: true
  },
  overrides: {
    MuiButton: {
      root: {
        border: '0.125rem solid #ffff',
        borderRadius: 0,
        color: '#fff'
      }
    },
    MuiCard: {
      root: {
        borderRadius: 0,
        boxShadow: 'none'
      }
    }
  }
});

export default Theme;
