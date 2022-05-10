import { Typography } from '@mui/material';
import React from 'react';

function EditorHeader(props: { children: React.ReactChild }) {
  return (
    <Typography sx={{ marginTop: '1rem', fontWeight: 'bold' }} variant="h5">
      {props.children}
    </Typography>
  );
}

export default EditorHeader;
