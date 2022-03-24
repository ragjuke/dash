import PropTypes from 'prop-types';
import * as Yup from 'yup';
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

export default function ResetPasswordForm({ onSent, onGetEmail }) {
  const { enqueueSnackbar } = useSnackbar();

  const isMountedRef = useIsMountedRef();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const csrf = await axios.get('/sanctum/csrf-cookie');
      await  axios.post('/forgot-password', {email: data.email})
      .then((response) => {
        // console.log(response);

        // if (isMountedRef.current) {
          onSent();
          onGetEmail(data.email);
        // }


      } )
      .catch((e) => {
        console.log(e.errors.email[0]);
          if(e.errors.email[0] == 'We can\'t find a user with that email address.'){
            enqueueSnackbar(e.errors.email[0], {variant: 'warning'});
          }else{
            enqueueSnackbar(e.errors.email[0], {variant: 'warning'});
          }
        }
         );

      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Reset Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
