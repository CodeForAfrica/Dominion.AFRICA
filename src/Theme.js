import { createMuiTheme } from '@material-ui/core/styles';

const FONT_FAMILY_HEADING = '"Lora", "serif"';
const FONT_FAMILY_TEXT = '"Montserrat", "sans-serif"';
const defaultTheme = createMuiTheme();
const Theme = createMuiTheme({
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
      textTransform: 'capitalize',
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
      textTransform: 'capitalize'
    },
    h5: {
      color: '#2b3129',
      fontFamily: FONT_FAMILY_HEADING,
      textTransform: 'capitalize'
    },
    h6: {
      color: '#2b3129',
      fontFamily: FONT_FAMILY_HEADING,
      textTransform: 'capitalize'
    },
    body2: {
      color: 'rgba(34, 40, 34, 0.8)',
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
