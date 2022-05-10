import 'styles/App.scss';

import { Grid } from '@mui/material';
import Containt from 'components/Containt';
import Header from 'components/Header';
import React from 'react';

function App() {
  return (
    <Grid container direction="column">
      <Header />
      <div style={{ padding: 20 }}>
        <Containt />
      </div>
    </Grid>
  );
}

export default App;
