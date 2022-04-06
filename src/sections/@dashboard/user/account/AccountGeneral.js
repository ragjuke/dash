import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import {convertJsonToFormData} from '../../../../utils/funcs';
import { useRouter } from 'next/router';

import { PATH_DASHBOARD } from 'src/routes/paths';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography, Input, TextField, Select, MenuItem, Button } from '@mui/material';
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
import Iconify from 'src/components/Iconify';


// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();


  const { enqueueSnackbar } = useSnackbar();

  const { user, siteSettings } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    fname: Yup.string().required('First Name is required'),
    lname: Yup.string().required('Last Name is required'),
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

  const onSubmitUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // console.log(document.getElementById("profile").value);

    let fd = new FormData(e.target);

  //   for (var value of fd.entries()) {
  //     console.log(value[0]+ ', '+ value[1] + ' ' + typeof(value[1]));
  //  }

    try {

    let response = await axios.post('/api/profile/upload', fd);
        // console.log(response)
      if(response.data == 'Profile Photo Successfully Uploaded'){
        enqueueSnackbar('Avatar Upload Successful!');
        setIsLoading(false);
        setTimeout(()=>{
          push(PATH_DASHBOARD.user.profile);
          location.reload();
        }, 
          1000);
        // return;
      }else{
        enqueueSnackbar('An Error might have occured. Reload Page.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {

    // let fd = convertJsonToFormData(data);

  //   for (var value of fd.entries()) {
  //     console.log(value[0]+ ', '+ value[1] + ' ' + typeof(value[1]));
  //  }

    try {

    // let fd = new FormData();
    // let fd = new FormData(e.target);
    // let ff = document.getElementById("uploadData");
    // fd.append("profile", document.getElementById("profile").files[0]);
    // console.log(fd);
    // return;
    // let fd = new FormData(document.getElementById("uploadData"));

      await  axios.patch('/api/user/update/profile', data)
      .then(({ data }) => console.log(data))
      .catch((e) => console.log(e));

      enqueueSnackbar('Update success!');

      setTimeout(()=>{
        push(PATH_DASHBOARD.transactions.list);
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

  return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
        <form action="#" encType="multipart/form-data" id="kyc-form" onSubmit={e=> onSubmitUpload(e)}>
        <Stack spacing={3} alignItems="flex-end">

              <label htmlFor='profile'>
                <Input accept="image/*"
                  // style={{ display: 'none' }}
                  id="profile"
                  label="Select Profile Image"
                  name="profile"
                  type="file" />
                    <Button variant="contained" color="warning" startIcon={<Iconify icon={'eva:plus-fill'} />} onClick={e=> document.getElementById("profile").click()} sx={{ margin: '10px' }}>
                        Select Profile Image
                    </Button><br/>
                    {/* {!isEmpty(document.getElementById("front").value) && <small sx={{ color: 'red' }}>x..Front Image Selected</small>} */}
              </label>

                          <LoadingButton type="submit" variant="contained" loading={isLoading}>
                            Upload Photo
                          </LoadingButton>
                
        </Stack>
      </form>
        </Grid>

    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} id="uploadData">

        <Grid item xs={12} md={12}  sx={{ marginTop: '20px' }}>
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
    </FormProvider>
      </Grid>
  );
}
