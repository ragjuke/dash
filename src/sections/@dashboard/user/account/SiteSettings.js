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

export default function SiteSettings() {

  const { enqueueSnackbar } = useSnackbar();

  const { user, siteSettings } = useAuth();
  const [depositGateway, setDepositGateway] = useState(siteSettings.dp);


  const purgeCache = async (e) => {

     await axios
        .get('/api/settings/purge')
        .then((res) => {
          console.log(res);
          enqueueSnackbar('Purged Successfully');
        })
        .catch((err) => {
          enqueueSnackbar('An Error Occured');

        });
    
  };

  const UpdateUserSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    tagline: Yup.string().required('Tagline is required'),
    email: Yup.string(),
    mobile: Yup.string(),
    address: Yup.string(),
    logo: Yup.string(),
    facebook: Yup.string(),
    twitter: Yup.string(),
    linkedin: Yup.string(),
    instagram: Yup.string(),
    youtube: Yup.string(),
    min: Yup.string(),
    deposit: Yup.string(),
  });

  const defaultValues = {
    title: siteSettings?.title || '',
    tagline: siteSettings?.tagline || '',
    email: siteSettings?.email || '',
    mobile: siteSettings?.mobile || '',
    address: siteSettings?.address || '',
    logo: siteSettings?.logo || '',
    facebook: siteSettings?.facebook || '',
    twitter: siteSettings?.twitter || '',
    linkedin: siteSettings?.linkedin || '',
    instagram: siteSettings?.instagram || '',
    youtube: siteSettings?.youtube || '',
    min: siteSettings?.min_wd || '',
    deposit: siteSettings?.dp || '',
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

      await  axios.patch('/api/settings', data)
      .then(({ data }) => console.log(data))
      .catch((e) => console.log(e));

      enqueueSnackbar('Settings Updated!');
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

  return (
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
              <RHFTextField name="title" label="Site Title" />
              <RHFTextField name="tagline" label="Site Tagline" />
              <RHFTextField name="email" label="Site Email Address" />

              <RHFTextField name="mobile" label="Phone Number" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="logo" label="Logo URL" />
            {/* </Box>


            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            > */}
              <RHFTextField name="facebook" label="Facebook URL" />
              <RHFTextField name="twitter" label="Twitter URL" />
              <RHFTextField name="linkedin" label="LinkedIn URL" />
              <RHFTextField name="instagram" label="Instagram URL" />
              <RHFTextField name="youtube" label="Youtube URL" />
            {/* </Box>


            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            > */}
              <RHFTextField name="min" label="Minimum Withdrawal Amount" />
              <RHFSelect name="deposit" label="Deposit Gateway" placeholder="Country"  onChange={(e) => setDepositGateway(e.target.value)}>
                <option value="0" />
                <option value="1" key="1">Block.IO</option>
                <option value="4" key="4">AlfaCoins</option>
                <option value="5" key="5">CoinGate</option>
              </RHFSelect>
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
