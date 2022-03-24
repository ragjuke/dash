import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFSwitch } from '../../../../components/hook-form';
import useAuth from '../../../../hooks/useAuth';

import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------


const APPLICATION_OPTIONS = [
  { value: 'sms_toggle', label: 'SMS Notification' },
  { value: 'email_toggle', label: 'Email Notification' },
  { value: 'ref_deep_bonus', label: 'Referral Depth Bonus' },
  { value: 'user_level_bonus', label: 'User Level Bonus System' },
  { value: 'rinv', label: 'Enable Re-Invest Before Withdraw' },
];



// ----------------------------------------------------------------------

export default function AdminToggles() {
  const { enqueueSnackbar } = useSnackbar();
  const { siteSettings } = useAuth();


  const SWITCH_SETTINGS = {
    sms: siteSettings.sms_toggle == 1 ? true : false,
    email: siteSettings.email_toggle == 1 ? true : false,
    referral: siteSettings.ref_deep_bonus == 1 ? true : false,
    levels: siteSettings.user_level_bonus == 1 ? true : false,
    rinvest: siteSettings.rinv == 1 ? true : false,
  };


  const defaultValues = {
    sms_toggle: SWITCH_SETTINGS.sms,
    email_toggle: SWITCH_SETTINGS.email,
    ref_deep_bonus: SWITCH_SETTINGS.referral,
    user_level_bonus: SWITCH_SETTINGS.levels,
    rinv: SWITCH_SETTINGS.rinvest,
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
      sms_toggle: data.sms_toggle ? 1 : 0,
      email_toggle: data.email_toggle ? 1 : 0,
      ref_deep_bonus: data.ref_deep_bonus ? 1 : 0,
      user_level_bonus: data.user_level_bonus ? 1 : 0,
      rinv: data.rinv ? 1 : 0
    }

    try {

      await axios.patch('/api/settings', myData)
        .then(res=>{ 
          console.log(res);
          enqueueSnackbar('Update success!');
          location.reload();
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
              {APPLICATION_OPTIONS.map((activity) => (
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
