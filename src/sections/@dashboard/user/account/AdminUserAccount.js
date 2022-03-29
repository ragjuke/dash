import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
// utils
import { fData } from '../../../../utils/formatNumber';
// _mock
import { countries } from '../../../../_mock';
// components
import { FormProvider, RHFSwitch, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';

import axios from '../../../../utils/axios';


// ----------------------------------------------------------------------

export default function AdminUserAccount(props) {

  const { enqueueSnackbar } = useSnackbar();

  const user = props.user;

  const UpdateUserSchema = Yup.object().shape({
    fname: Yup.string().required('First Name is required'),
    lname: Yup.string().required('Last Name is required'),
    profile: Yup.string(),
    mobile: Yup.string(),
    country: Yup.string(),
    street: Yup.string(),
    state: Yup.string(),
    city: Yup.string(),
    post_code: Yup.string(),
    btc_address: Yup.string(),
  });

  const defaultValues = {
    fname: user?.fname || '',
    lname: user?.lname || '',
    email: user?.email || '',
    profile: user?.profile_photo_path || '',
    mobile: user?.mobile || '',
    country: user?.country || '',
    street: user?.street || '',
    state: user?.state || '',
    city: user?.city || '',
    post_code: user?.post_code || '',
    btc_address: user?.btc_address || '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {

    console.log(data);
    

    try {

      await  axios.patch(`/api/admin/user/${user?.id}`, data)
      .then(({ data }) => console.log(data))
      .catch((e) => console.log(e));

      enqueueSnackbar('Update success!');
      setTimeout(()=>{
        // push(PATH_DASHBOARD.user.profile);
        location.reload();
      }, 
        1000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'profile',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (<>

<Grid container spacing={3}>

        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Typography><Typography color="red">Balance:</Typography> <strong>${user?.balance}</strong></Typography>
              <Typography><Typography color="red">Level:</Typography> <strong>{user?.level_name}</strong></Typography>
              <Typography><Typography color="red">User Level Data:</Typography> <strong>{user?.level_members} members (${user?.level_amount})</strong></Typography>
              
            </Box>

          </Card>
        </Grid>
      </Grid>

      <br/>




    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>

        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="fname" label="First Name" />
              <RHFTextField name="lname" label="Last Name" />
              <RHFTextField name="email" label="Email Address" readonly/>

              <RHFTextField name="phoneNumber" label="Phone Number" />
              <RHFTextField name="street" label="Street" />

              <RHFSelect name="country" label="Country" placeholder="Country">
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="state" label="State/Region" />

              <RHFTextField name="city" label="City" />
              <RHFTextField name="post_code" label="Zip/Code" />
              <RHFTextField name="mobile" label="Phone Number" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="btc_address" multiline rows={1} label="BTC Address" />

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
    </>
  );
}
