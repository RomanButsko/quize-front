import { SxProps, Theme } from '@mui/material';

export const sx = <T extends SxProps<Theme>>(styles: T) => styles;
