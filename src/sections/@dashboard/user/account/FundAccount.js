import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../../components/hook-form';

import axios from '../../../../utils/axios';
import { useState } from 'react';


// ----------------------------------------------------------------------

export default function FundAccount(props) {
  const user = props.user;
  const [transType, setTransType] = useState('add')

  const { enqueueSnackbar } = useSnackbar();

  const TopUpSchema = Yup.object().shape({
    amount: Yup.string().required('Amount is required'),
  });

  const defaultValues = {
    amount: '0',
  };

  const methods = useForm({
    resolver: yupResolver(TopUpSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {

    let newbalance = 0;
      
    if(transType == 'add'){
      newbalance = +user?.balance + +data.amount;
    }else{
      newbalance = +user?.balance - +data.amount;
    }

    try {
      await axios.patch(`/api/admin/user/${user?.id}`, {
        balance: newbalance
      })
      .then((response) => {
          enqueueSnackbar(response.data, {variant: 'success'}); // Toastr
          reset();
          location.reload();
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.data, {variant: 'warning'}); // Toastr
        
      });

    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.data, {variant: 'warning'}); // Toastr
      
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="amount" type="text" label="Enter Amount" />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting} onClick={e=> setTransType('add')} >
            Add to Balance
          </LoadingButton>


          <LoadingButton type="submit" variant="contained" loading={isSubmitting} onClick={e=> setTransType('sub')}>
            Subtract From Balance
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
