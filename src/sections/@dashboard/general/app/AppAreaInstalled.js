import merge from 'lodash/merge';
import { useState } from 'react';
// @mui
import { Card, CardHeader, Box, TextField } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    year: 2019,
    data: [
      { name: 'Asia', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
      { name: 'America', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
    ],
  },
  {
    year: 2020,
    data: [
      { name: 'Asia', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
      { name: 'America', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
    ],
  },
];

export default function AppAreaInstalled() {
  const [seriesData, setSeriesData] = useState(2019);

  const handleChangeSeriesData = (event) => {
    setSeriesData(Number(event.target.value));
  };

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
  });

  return (
    <Card>
      <CardHeader
        title="Bitcoin Price Chart"
        subheader="BTC price chart."
        // action={
          

          // <TextField
          //   select
          //   fullWidth
          //   value={seriesData}
          //   SelectProps={{ native: true }}
          //   onChange={handleChangeSeriesData}
          //   sx={{
          //     '& fieldset': { border: '0 !important' },
          //     '& select': {
          //       pl: 1,
          //       py: 0.5,
          //       pr: '24px !important',
          //       typography: 'subtitle2',
          //     },
          //     '& .MuiOutlinedInput-root': {
          //       borderRadius: 0.75,
          //       bgcolor: 'background.neutral',
          //     },
          //     '& .MuiNativeSelect-icon': {
          //       top: 4,
          //       right: 0,
          //       width: 20,
          //       height: 20,
          //     },
          //   }}
          // >
          //   {CHART_DATA.map((option) => (
          //     <option key={option.year} value={option.year}>
          //       {option.year}
          //     </option>
          //   ))}
          // </TextField>
        // }
      />

      {/* {CHART_DATA.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart type="line" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))} */}

      <CoinTicker />
    </Card>
  );
}

const CoinTicker = () =>{

  return (
    // <div style={{height: '560px', backgroundColor: '#FFFFFF', overflow: 'hidden', boxSizing: 'border-box', border: '1px solid #56667F', borderRadius: '4px', textAlign: 'right', lineHeight: '14px', fontSize: '12px', fontFeatureSettings: 'normal', textSizeAdjust: '100%', boxShadow: 'inset 0 -20px 0 0 #56667F', padding: '0px', margin: '0px', width: '100%'}}><div style={{height: '540px', padding: '0px', margin: '0px', width: '100%'}}><iframe src="https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1505" width="100%" height="536px" scrolling="auto" marginWidth={0} marginHeight={0} frameBorder={0} border={0} style={{border: 0, margin: 0, padding: 0, lineHeight: '14px'}} /></div><div style={{color: '#FFFFFF', lineHeight: '14px', fontWeight: 400, fontSize: '11px', boxSizing: 'border-box', padding: '2px 6px', width: '100%', fontFamily: 'Verdana, Tahoma, Arial, sans-serif'}}><a href="https://coinlib.io" target="_blank" style={{fontWeight: 500, color: '#FFFFFF', textDecoration: 'none', fontSize: '11px'}}>Cryptocurrency Prices</a>&nbsp;by Coinlib</div></div>
    <div>
      <div id="btcChartBuild"></div>
      <div className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
    );
}
