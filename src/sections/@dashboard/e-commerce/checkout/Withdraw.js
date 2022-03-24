import sum from 'lodash/sum';
import { useSnackbar } from 'notistack';

import axios from '../../../../utils/axios';
import useAuth from '../../../../hooks/useAuth';


// next
import NextLink from 'next/link';
// @mui
import { Box, Grid, Card, Button, Divider, CardHeader, Typography, TextField, CardContent, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/Iconify';
import { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';


// ----------------------------------------------------------------------

export default function Withdraw() {

  const { user } = useAuth();



  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const [address, setAddress] = useState(user?.btc_address);
  const [error, setError] = useState(0);
  const [amount, setAmount] = useState(0);
  const [fixedFee, setFixedFee] = useState(0);
  const [percFee, setPercFee] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const [gatewayId, setGatewayId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);



  useEffect(() => {
    axios
      .get('/api/withdraw/method/1')
      .then((response) => {
        setFixedFee(response.data.fixed_fee);
        setPercFee(response.data.perc_fee);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const generateAddress = async () => {
    if(amount == 0){
      enqueueSnackbar('Make sure you entered an amount', {variant: 'warning'}); // Toastr
      return;
    }

    if(address == null){
      enqueueSnackbar('Update your BTC address from your profile', {variant: 'warning'}); // Toastr
      return;
    }
    
    setIsLoading(true);
    setTotalFee(  parseFloat(fixedFee) + parseFloat( (percFee/100).toFixed(2) * parseFloat(amount) )  );

    try {
        await axios.get('/sanctum/csrf-cookie');
        // Register POST REQUEST
        const response = await axios.post('/api/withdraw', {
          amount: amount,
          method_name: 'default',
          detail: address,
          fee: totalFee,
        });
        console.log(response.data);

        if (response.data === 'Withdraw Request Successful') {
          enqueueSnackbar(response.data, {variant: 'success'}); // Toastr  
        } else {
          enqueueSnackbar(response.data, {variant: 'warning'}); // Toastr
          setError(response.data);
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        setBtnDisabled(true);


    } catch (error) {
      console.log(error.detail);
      enqueueSnackbar(error.detail, {variant: 'warning'}); // Toastr
      setIsLoading(false);

      
    }
  
  }

 

  return (
    <Grid container spacing={3}>


  {btnDisabled &&
      <Grid item xs={12} md={12}>
        <Card sx={{ mb: 3, p: 3 }}>

            <h3 style={{ color: '#ff0303 !important' }}>Your Withdrawal Request has been submitted and is now pending!</h3>
        </Card>

        
      </Grid>

      }

      <Grid item xs={12} md={12}>
        

      <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Withdraw Summary"
      />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Withdraw Amount
            </Typography>
            <Typography variant="subtitle2">${amount}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Fixed Fee
            </Typography>
            <Typography variant="subtitle2">{fixedFee==0 ? 'N/A': '$'+fixedFee}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Percentage Fee
            </Typography>
            <Typography variant="subtitle2">{percFee==0 ? 'N/A': percFee+'%'}</Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">You Get</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {amount==0? 'N/A' : <>${parseFloat(amount) - parseFloat(fixedFee) - parseFloat( (percFee/100).toFixed(2) * parseFloat(amount) )}</> }
              </Typography>
            </Box>
          </Stack>

          
            <TextField
              fullWidth
              placeholder="Enter Amount"
              defaultValue=""
              type="number"
              name="amount"
              onChange={ e => setAmount(e.target.value)}
              disabled={btnDisabled}
            />
          
        </Stack>
      </CardContent>
    </Card>



            <LoadingButton fullWidth type="submit" size="large" variant="contained" loading={isLoading} onClick={e=>generateAddress()} disabled={btnDisabled}>
                  Withdraw Fund
            </LoadingButton>
      </Grid>

      


    </Grid>
  );
}
