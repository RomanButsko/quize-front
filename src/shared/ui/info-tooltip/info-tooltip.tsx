'use client';

import { ReactNode, useState, MouseEvent } from 'react';
import { Box, IconButton, Popover, Tooltip, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useMobile } from '@/shared/providers';
import { sx } from '@/shared/lib';

const styles = sx({
  iconButton: {
    color: 'primary.main',
  },
  popoverContent: {
    p: 2,
    maxWidth: 280,
  },
  tooltipContent: {
    p: 0.5,
  },
  title: {
    fontWeight: 600,
    mb: 1,
  },
  list: {
    m: 0,
    pl: 2,
    '& li': {
      mb: 0.5,
      '&:last-child': {
        mb: 0,
      },
    },
  },
});

export type InfoTooltipProps = {
  title: string;
  items: string[];
  iconSize?: 'small' | 'medium';
  children?: ReactNode;
};

export const InfoTooltip = ({ title, items, iconSize = 'small', children }: InfoTooltipProps) => {
  const { isMobile } = useMobile();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const content = children ?? (
    <>
      <Typography
        variant='body2'
        sx={styles.title}
      >
        {title}
      </Typography>
      <Box
        component='ul'
        sx={styles.list}
      >
        {items.map((item, index) => (
          <li key={index}>
            <Typography variant='body2'>{item}</Typography>
          </li>
        ))}
      </Box>
    </>
  );

  if (isMobile) {
    return (
      <>
        <IconButton
          size={iconSize}
          sx={styles.iconButton}
          onClick={handleClick}
        >
          <InfoOutlinedIcon fontSize={iconSize} />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box sx={styles.popoverContent}>{content}</Box>
        </Popover>
      </>
    );
  }

  return (
    <Tooltip
      title={<Box sx={styles.tooltipContent}>{content}</Box>}
      arrow
      placement='bottom-start'
    >
      <IconButton
        size={iconSize}
        sx={styles.iconButton}
      >
        <InfoOutlinedIcon fontSize={iconSize} />
      </IconButton>
    </Tooltip>
  );
};
