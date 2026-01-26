import type { PaletteOptions } from '@mui/material/styles';

type PaletteColor = NonNullable<PaletteOptions['primary']>;

export const colors = {
  primary: {
    main: '#F74D50',
  },
} as const satisfies {
  primary: PaletteColor;
};
