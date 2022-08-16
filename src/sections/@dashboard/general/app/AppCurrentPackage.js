import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, CardHeader, Typography } from '@mui/material';
// utils
import { fNumber, fShortenNumber } from '../../../../utils/formatNumber';
//
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 300;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

const CHART_DATA = [12244, 53345, 44313, 78343];

export default function AppCurrentPackage( { txnData } ) {
  const theme = useTheme();
  // console.log(txnData)

  const calDay = (x) => {
    // return ( parseInt((new Date().getTime()/1000).toFixed(0)) - parseInt((new Date(x).getTime() / 1000).toFixed(0)) );
    return ( parseInt((new Date().getTime()/1000).toFixed(0)) - parseInt((new Date(Date.parse(x.replace(/[-]/g,'/').replace('.000000Z', ' ').replace('T', ' '))).getTime() / 1000).toFixed(0)) );
 }

 // Calculates the Number of Days from original package
 const finalDay = () => {

  // return txnData.last_package_data;

  if(txnData.last_package_data != undefined){

    let days = (calDay(txnData.last_package_data?.created_at)/86400).toFixed(2);
    
    let next_due = (calDay(txnData.last_package_data?.next_due)/86400).toFixed(2);

    // If Next Due is Equal to or greater than zero, return zero
    if(next_due >= 0){
        return "0";
    }else{
        return days;
    }
  }else {
    return 0;
  }

 }

 const finalCalAmount = () =>{
  let investment = txnData.last_package_data.amount;
  let days = (calDay(txnData.last_package_data.created_at)/86400).toFixed(4);
  let daily_pay = ( ((txnData.last_package_helper.percent/100)*24)/txnData.last_package_helper.time_hours ).toFixed(4);
  let amount = (investment * days * daily_pay).toFixed(2);

  let next_due = (calDay(txnData.last_package_data.next_due)/86400).toFixed(2);

  // If Next Due is Equal to or greater than zero, return zero
  if(next_due >= 0){
      return "Last Pack Complete";
  }else{
      return amount +' USD';
  }

}




  // const chartOptions = merge(BaseOptionChart(), {
  //   colors: [
  //     theme.palette.primary.lighter,
  //     theme.palette.primary.light,
  //     theme.palette.primary.main,
  //     theme.palette.primary.dark,
  //   ],
  //   labels: ['fund', 'deposit', 'activate plan', 'earn'],
  //   stroke: { colors: [theme.palette.background.paper] },
  //   legend: { floating: true, horizontalAlign: 'center' },
  //   tooltip: {
  //     fillSeriesColor: false,
  //     y: {
  //       formatter: (seriesName) => fNumber(seriesName),
  //       title: {
  //         formatter: (seriesName) => `${seriesName}`,
  //       },
  //     },
  //   },
  //   plotOptions: {
  //     pie: {
  //       donut: {
  //         size: '90%',
  //         labels: {
  //           value: {
  //             formatter: (val) => fNumber(val),
  //           },
  //           total: {
  //             formatter: (w) => {
  //               const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
  //               return fNumber(sum);
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });


  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette['primary'].main],
    chart: { sparkline: { enabled: true } },
    legend: { show: false },
    plotOptions: {
      radialBar: {
        hollow: { size: '78%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: true },
          value: {
            offsetY: 6,
            color: theme.palette.text.primary,
            fontSize: theme.typography.subtitle2.fontSize,
          },
        },
      },
    },
  });

  const charm = 50;

  return (
    <Card>
      <CardHeader title={`Current Plan Data`} sx={{ marginBottom: '20px' }} />
      <ChartWrapperStyle dir="ltr" sx={{ margin: "0 auto !important" }}>
        
      
        {/* <ReactApexChart type="donut" series={CHART_DATA} options={chartOptions} height={280} /> */}
        { txnData.hasOwnProperty('last_package_data') ?
          <ReactApexChart type="radialBar" series={(txnData.last_package_data && txnData.last_package_helper) ? [( (finalDay()/ (txnData.last_package_helper.time_hours/24).toFixed(2) ).toFixed(2) * 100 ).toFixed(2)] : 0 } options={chartOptions} width={150} height={150}  sx={{ margin: "0 auto !important" }}/>
        :
        <Typography sx={{ padding: '20px', textAlign: 'center', color: 'red' }}><h3>No Plan Running</h3></Typography>
        }



        {/* <div className="circular">
              <div className="inner"></div>
              <div className="number">${!!txnData?.last_package_data ? fShortenNumber(txnData?.last_package_data.amount) : '0'}</div>
              <div className="circle">
                    <div className="bar left">
                      <div className="progress"></div>
                    </div>
                    <div className="bar right">
                      <div className="progress"></div>
                    </div>
              </div>
        </div> */}



        <Box style={{ padding: "20px", marginTop: '20px', textAlign: 'center'}}>
          {/* {console.log(finalDay())} */}
          {/* {console.log( ( (finalDay()/ (txnData.last_package_helper.time_hours/24).toFixed(2) ).toFixed(2) * 100 ) )} */}
            <Typography >Current Package: <span style={{ color: "#f12d2b" }}>{txnData?.last_package}</span></Typography>
            <Typography >Days so far: <span style={{ color: "#f12d2b" }}>{(txnData.last_package_data && txnData.last_package_helper) ? finalDay() : null}</span></Typography>
            <Typography >Earned so far: <span style={{ color: "#f12d2b" }}>{(txnData.last_package_data && txnData.last_package_helper) ? finalCalAmount() : null}</span></Typography>         
        </Box>
      </ChartWrapperStyle>
    </Card>
  );
}
