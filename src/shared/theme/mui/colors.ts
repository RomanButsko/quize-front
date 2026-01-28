import type { PaletteOptions } from '@mui/material/styles';

type PaletteColor = NonNullable<PaletteOptions['primary']>;
type SecondaryColor = NonNullable<PaletteOptions['secondary']>;
type SuccessColor = NonNullable<PaletteOptions['success']>;

export const colors = {
  primary: {
    main: '#F74D50',
  },
  secondary: {
    main: '#696969',
  },
  success: {
    main: '#008000',
  },
} as const satisfies {
  primary: PaletteColor;
  secondary: SecondaryColor;
  success: SuccessColor;
};
