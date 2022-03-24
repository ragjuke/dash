import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

// next
import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, TextField, InputAdornment, Input, Checkbox, FormGroup, FormControlLabel, FormControl, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login, loginQR } = useAuth();
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();



  // const [code, setCode] = useState('');
  // const [recoveryCode, setRecoveryCode] = useState('');
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [codeError, setCodeError] = useState('')

  const [isSending, setIsSending] = useState(false);

  const recmode = () => {
    let tickElement = document.getElementById('recovery_tick');
    // console.log(tickElement.checked);
    // return;
    // if (tickElement.checked === true) {
    //   setRecoveryMode(true);
    // } else {
    //   setRecoveryMode(false);
    // }
      setRecoveryMode(tickElement.checked);

  };


  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email/Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await login(data.email, data.password);
      // console.log(response);
      if (response == 'LoginQR') {
        setError('loginQR', 'LoginQR');
      }

    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  const onSubmitQR = async (e) => {
    e.preventDefault();
    setIsSending(true);
    let data = {};

    let recoveryCodeData = document.getElementById('recovery_code').value;
    let codeData = document.getElementById('qrcode').value;

    if(recoveryMode){
      data.recovery_code = recoveryCodeData;
    } else {
      data.code = codeData;
    }

    try {

      const csrf = await axios.get('/sanctum/csrf-cookie');
    
      await loginQR(data)
      .then((res) => {

        console.log(res);
      })
      .catch((err) => {
          console.log('An Error occured');
          if(err.message == 'The given data was invalid.'){
            enqueueSnackbar('You entered an Invalid Code.', {variant: 'error'});

          }
          console.log(err);
          new Promise((resolve) => setTimeout(()=>{
            push(PATH_DASHBOARD.root); // Load the dashboard
          }, 500));

      });
      
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setCodeError('afterSubmit', error);
      }
    }

    setIsSending(false);

  };

  return (
  <>

{!!errors.loginQR ?
      <QRCode />
    :
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">Your login credentials match no record</Alert>}

        <RHFTextField name="email" label="Email/Username" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <NextLink href={PATH_AUTH.resetPassword} passHref>
          <Link variant="subtitle2">Forgot password?</Link>
        </NextLink>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>

        }
    </>
  );

  function QRCode(){
    return (
      <form onSubmit={e => onSubmitQR(e)}>
      <Stack spacing={3}>
        {codeError != '' && <Alert severity="error">You entered an invalid code.</Alert>}

        <FormGroup>
              <TextField id="recovery_code" name="recovery_code" label="Enter Recovery Code" variant="outlined" sx={{ display:  recoveryMode ? 'flex' : 'none' }} /> 
              <TextField id="qrcode" name="qrcode" label="Enter Authentication Code" variant="outlined" sx={{ display:  recoveryMode ? 'none' : 'flex' }} />
        </FormGroup>

      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <FormGroup>
          <FormControlLabel control={<Checkbox onChange={(e) => {recmode()}} id="recovery_tick" />} name="recovery_tick" label="Use Recovery Code"  />
        </FormGroup>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSending}>
        Proceed to Login
      </LoadingButton>
    </form>
    );
  }
}
