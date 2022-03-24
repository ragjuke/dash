import PropTypes from 'prop-types';
import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, Typography, Box } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/Iconify';
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.darker,
}));

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 120,
  height: 120,
  opacity: 0.12,
  position: 'absolute',
  right: theme.spacing(-3),
  color: theme.palette.common.white,
}));

// ----------------------------------------------------------------------

AppWidgetUSD.propTypes = {
  chartData: PropTypes.number.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error']),
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default function AppWidgetUSD({ title, total, icon, color = 'primary', chartData }) {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette[color].main],
    chart: { sparkline: { enabled: true } },
    legend: { show: false },
    plotOptions: {
      radialBar: {
        hollow: { size: '78%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            color: theme.palette.common.white,
            fontSize: theme.typography.subtitle2.fontSize,
          },
        },
      },
    },
  });

  return (
    <RootStyle
      sx={{
        bgcolor: theme.palette[color].darker,
      }}
    >
      <ReactApexChart type="radialBar" series={[chartData]} options={chartOptions} width={86} height={86} />
      <Box sx={{ ml: 3, color: 'common.white' }}>
        <Typography variant="h4"> ${total}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.72 }}>
          {title}
        </Typography>
        <Typography sx={{ opacity: 0.72, fontSize: '0.7em' }}>
          <em>Progress to next Level</em>
        </Typography>
      </Box>
      <IconStyle icon={icon} />
    </RootStyle>
  );
}
