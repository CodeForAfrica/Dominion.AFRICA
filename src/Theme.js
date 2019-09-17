import { createTheme } from '@codeforafrica/hurumap-ui';

const FONT_FAMILY_HEADING = '"Lora", "serif"';
const FONT_FAMILY_TEXT = '"Montserrat", "sans-serif"';

/**
 * Used color bender to extend the 2 dominion colors: KHAKI_GREEN ('#7f9442') & DULL_ORANGE (#de9f3a)
 * https://meyerweb.com/eric/tools/color-blend/#DE9F3A:7F9442:6:hex
 */
const COLOR_SCALE = [
  '#7F9442',
  '#DE9F3A',
  '#8D9641',
  '#D09D3B',
  '#9A9740',
  '#C39C3C',
  '#A8993F',
  '#B59A3D'
];

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1280,
      xl: 1980
    }
  },
  chart: {
    colorScale: COLOR_SCALE,
    pie: {
      colorScale: COLOR_SCALE,
      height: 250,
      legendWidth: 150,
      origin: { x: 150, y: 125 },
      padding: 0,
      style: {
        data: {
          fontFamily: FONT_FAMILY_TEXT,
          fontSize: 10
        },
        labels: {
          fontFamily: FONT_FAMILY_TEXT,
          fontSize: 16,
          fill: 'rgb(0,0,0)'
        }
      },
      width: 450
    },
    area: {
      colorScale: COLOR_SCALE
    },
    group: {
      colorScale: COLOR_SCALE
    },
    bar: {
      barWidth: 25,
      domainPadding: { x: [25, 25] },
      height: 300,
      offset: 50,
      style: {
        data: {
          fill: COLOR_SCALE[0],
          fontFamily: FONT_FAMILY_TEXT,
          fontSize: 10
        },
        labels: {
          fill: 'rgb(0,0,0)',
          fontFamily: FONT_FAMILY_TEXT,
          fontSize: 10
        }
      }
    },
    axis: {
      style: {
        tickLabels: {
          fill: 'rgb(0,0,0)',
          fontFamily: FONT_FAMILY_TEXT,
          fontSize: 10
        },
        axisLabels: {
          fontFamily: FONT_FAMILY_TEXT,
          fontSize: 10,
          fill: 'rgb(0,0,0)'
        }
      }
    }
  },
  palette: {
    primary: { main: '#2b3129', light: '#f1f1ed', dark: '#222822' },
    secondary: { main: '#000000', dark: '#2c2c2a', grey: '#2b3129' },
    highlight: { main: '#e7e452' }
  },
  typography: {
    fontFamily: FONT_FAMILY_TEXT,
    fontHeading: FONT_FAMILY_HEADING,
    h1: {
      color: '#293229',
      fontFamily: FONT_FAMILY_HEADING,
      fontSize: '5rem',
      fontWeight: 400
    },
    h2: {
      color: '#293229',
      fontFamily: FONT_FAMILY_HEADING,
      textTransform: 'capitalize',
      fontWeight: 400,
      fontSize: '3.57143rem'
    },
    h4: {
      color: '#2b3129',
      fontFamily: FONT_FAMILY_HEADING,
      textTransform: 'capitalize',
      fontSize: '1.7143rem'
    },
    h5: {
      fontFamily: FONT_FAMILY_HEADING,
      textTransform: 'capitalize',
      fontSize: '1.4286rem',
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
      fontFamily: FONT_FAMILY_TEXT,
      fontSize: '0.85715rem'
    },
    subtitle1: {
      fontFamily: FONT_FAMILY_TEXT,
      fontSize: '0.786rem',
      lineHeight: 1.92
    },
    subtitle2: {
      fontFamily: FONT_FAMILY_TEXT,
      fontSize: '0.9286rem',
      fontWeight: 500
    },
    fontSmallDefault: {
      fontSize: 11,
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
theme.typography.h3 = {
  color: '#293229',
  fontFamily: FONT_FAMILY_HEADING,
  fontWeight: 'normal',
  fontSize: '1.5rem',
  lineHeight: 1.17,
  [theme.breakpoints.up('md')]: {
    color: '#222822',
    lineHeight: 1,
    fontSize: '2.8572rem'
  }
};

export default theme;
