import sum from 'lodash/sum';
import { useSnackbar } from 'notistack';

import axios from '../../../../utils/axios';

// next
import NextLink from 'next/link';
// @mui
import { Box, Grid, Card, Button, Divider, CardHeader, Typography, TextField, CardContent, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import {
  deleteCart,
  onNextStep,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
} from '../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import EmptyContent from '../../../../components/EmptyContent';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';


// ----------------------------------------------------------------------

export default function Deposit() {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const [address, setAddress] = useState('');
  const [btcAmount, setBtcAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [fixedFee, setFixedFee] = useState(0);
  const [percFee, setPercFee] = useState(0);
  const [gatewayId, setGatewayId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const generateAddress = async () => {
    if(amount == 0){
      enqueueSnackbar('Make sure you entered an amount', {variant: 'warning'}); // Toastr
      return;
    }
    
    setIsLoading(true);

    try {
        await axios.get('/sanctum/csrf-cookie');
        // Register POST REQUEST
        const response = await axios.post('/api/deposit', {
          amount: amount,
          gateway_id: gatewayId,
        });
        console.log(response.data);

        setFixedFee(response.data.fixed_fee);
        setPercFee(response.data.perc_fee);
        setAddress(response.data.address);
        setBtcAmount(response.data.btc_amount);
        enqueueSnackbar('Address Generated', {variant: 'success'}); // Toastr
        setIsLoading(false);
        setBtnDisabled(true);


    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.data, {variant: 'warning'}); // Toastr
      setIsLoading(false);

      
    }
  
  }

 

  return (
    <Grid container spacing={3}>


  {address != '' &&
      <Grid item xs={12} md={12}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Sacn QR Code
                {/* <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({totalItems} item)
                </Typography> */}
              </Typography>
            }
            sx={{ mb: 3 }}
          />

            <EmptyContent
              title={`Deposit <Typography sx={{ color: 'red' }}>${btcAmount}BTC</Typography> to ${address} on the BTC network`}
              description="QR code for deposit would be generated here."
              address = {address}
              amount = {btcAmount}
              img={`http://api.qrserver.com/v1/create-qr-code/?data=${address}&size=150x150&bgcolor=ffffff`}
            />
        </Card>

        <NextLink href={PATH_DASHBOARD.transactions.list} passHref>
          <Button color="inherit" startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}>
            Back to Transactions
          </Button>
        </NextLink>
      </Grid>

      }

      <Grid item xs={12} md={12}>
        

      <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Deposit Summary"
      />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Deposit Amount
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
            <Typography variant="subtitle2">{percFee==0 ? 'N/A': '$'+percFee}</Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {percFee==0? 'N/A' : <>${parseFloat(amount) + parseFloat(fixedFee) + parseFloat(percFee)}</> }
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
                  Generate Address
            </LoadingButton>
      </Grid>

      


    </Grid>
  );
}
