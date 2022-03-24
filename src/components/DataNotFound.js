import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';
import React from 'react';

// ----------------------------------------------------------------------

DataNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function DataNotFound({ searchQuery = '', ...other }) {
  return searchQuery ? (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        No Data Available
      </Typography>
      <Typography variant="body2" align="center">
        There is no Data to be displayed.
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2"> Please enter keywords</Typography>
  );
}
