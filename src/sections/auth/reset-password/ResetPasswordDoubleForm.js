import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useSnackbar } from 'notistack';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
};

export default function ResetPasswordForm({ onSent, onGetEmail, token }) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter()
  const { email } = router.query

  const isMountedRef = useIsMountedRef();

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    confirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { password: '', confirm: ''},
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const csrf = await axios.get('/sanctum/csrf-cookie');

      await axios
        .post('/reset-password ', {
          token: token,
          email: email,
          password: data.password,
          password_confirmation: data.confirm,
        })
        .then((response) => {
          console.log(response);
          onSent();
          onGetEmail(data.email);
        })
        .catch((e) => {

          console.log(e.errors.email[0]);

          if (e.errors.email[0] == 'This password reset token is invalid.') {
            enqueueSnackbar('You followed an Expired password reset link', {variant: 'error'});
          }
          
          if (e.errors.password[0]) {
            enqueueSnackbar(e.errors.password[0], {variant: 'error'});
          }

            enqueueSnackbar('An error occured', {variant: 'error'});
          
        });

      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="password" type="password" label="Enter New Password" />
        <RHFTextField name="confirm" type="password" label="Confirm New Password" />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Change Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
