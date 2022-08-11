import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFSwitch } from '../../../../components/hook-form';
// import useAuth from '../../../../hooks/useAuth';

import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------


const USER_OPTIONS = [
  { value: 'kyc', label: 'KYC Verified' },
  { value: 'ver_status', label: 'Email Verified' },
  { value: 'paid_status', label: 'Paid Verified' },
  { value: 'banned', label: 'Banned' },
];



// ----------------------------------------------------------------------

export default function AdminUserToggles({user}) {
  const { enqueueSnackbar } = useSnackbar();


  const USER_SETTINGS = {
    kyc: user.kyc == 1 ? true : false,
    banned: user.banned == 1 ? true : false,
    paid: user.paid_status == 1 ? true : false,
    ver: user.ver_status == 1 ? true : false,
  };


  const defaultValues = {
    kyc: USER_SETTINGS.kyc,
    banned: USER_SETTINGS.banned,
    paid_status: USER_SETTINGS.paid,
    ver_status: USER_SETTINGS.ver,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {

    let myData = {
      kyc: data.kyc ? 1 : 0,
      banned: data.banned ? 1 : 0,
      paid_status: data.paid_status ? 1 : 0,
      ver_status: data.ver_status ? 1 : 0
    }

    try {
      
      await axios.patch(`/api/admin/user/${user.id}`, myData)
        .then(res=>{ 
          console.log(res);
          enqueueSnackbar('Update success!');
          // location.reload();
        })
        .catch(err=>{alert('An error occured');});

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <Stack spacing={2} sx={{ width: 1 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Activity
            </Typography>

            <Stack spacing={1}>
              {USER_OPTIONS.map((activity) => (
                <RHFSwitch key={activity.value} name={activity.value} label={activity.label} sx={{ m: 0 }} />
              ))}
            </Stack>
          </Stack>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
