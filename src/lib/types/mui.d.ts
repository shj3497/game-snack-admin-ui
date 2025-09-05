import {PaletteColor, SimplePaletteColorOptions} from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    success: PaletteColor;
  }
  interface PaletteOptions {
    success?: SimplePaletteColorOptions;
  }
  interface PaletteColor {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  }

  interface SimplePaletteColorOptions {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  }
}
