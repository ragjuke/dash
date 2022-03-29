import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// form
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';

// @mui
import { Alert, Button, Card, Stack, Typography, Box, Modal, Input } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFRadioGroup, RHFTextField, InputAdornment, IconButton } from '../../../../components/hook-form';
import axios from '../../../../utils/axios';
import Iconify from '../../../../components/Iconify';

import { useState } from 'react';

// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
// ----------------------------------------------------------------------

export default function AccountTwoFA() {
  const { user } = useAuth();

  const[twoFactor, setTwoFactor] = useState(user.twofa_type);
  const[twoFactorRecovery, setTwoFactorRecovery] = useState([]);
  const[twoFactorQR, setTwoFactorQR] = useState('');

  const [error, setError] = useState('');

  const [showQR, setShowQR] = useState(true);

  const [isLoading,setIsLoading] = useState(false);


  const [open, setOpen] = useState(false);
  const handleOpen = (x) => {setOpen(true)};
  const handleClose = () => {setOpen(false)};


  const { enqueueSnackbar } = useSnackbar();

  const NewAddressSchema = Yup.object().shape({
    twofa: Yup.string().required('You should select an option'),
  });

  const defaultValues = {
    twofa: user.twofa_type == 0 ? 'Turn Off' : user.twofa_type == 1 ? 'QR/Recovery Code (Aunthenticator)' : 'Email Code'
  };

  const methods = useForm({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const confirmPass = async (id) => {

    let password = document.getElementById("password").value;

             await axios.post(`/user/confirm-password`, {password: password})
              .then(response => {
                setOpen(false);
                return;
              })
              .catch(error => {
                console.log(error);
                if(error.message == 'The given data was invalid.'){
                  setError('Incorrect Password');
                }
                return;
              });
          
              console.log(twoFactor);

          if(twoFactor == 1){

            await axios.post('/user/two-factor-authentication', {
            } ).then(response => {
                // Enqueue Here
                runEnqueue(1);
            }).catch((error) => { });

          } else if(twoFactor == 2){
                // Enqueue Here
                runEnqueue(2);
          } else {
            await axios.delete('/user/two-factor-authentication', {
            } ).then(response => {
                // Enqueue Here
                runEnqueue(0);
            }).catch((error) => { });
          } 
  
  }


  const authEnable = async (x) => {
    // e.preventDefault();
    const csrf = await axios.get('/sanctum/csrf-cookie');
        if(x == 1){
            await axios.post('/user/two-factor-authentication', {
            } ).then(response => {
                setTwoFactor('1');
                runEnqueue(1);
            }).catch((error) => {
                setTwoFactor('1');

                if(error.message === "Password confirmation required."){
                  setOpen(true);
                  return;
                }

                // if(error.response.status === 423){
                //     console.log('requires password');
                //     setOpen(true);
                //     return;
                // }

                // Display an info toast with no title
                setOpen(false);
            });
        }else {
            await axios.delete('/user/two-factor-authentication', {
            }).then(response => {
              console.log('we are deleting');

                // Enqueue Here
                if(x == 2){ setTwoFactor('2'); runEnqueue(2); } else { setTwoFactor('0'); runEnqueue(0); }

            }).catch((error) => {
                console.log(error);
                setTwoFactor('0');

                // Enqueue Here
                if(x == 2){ setTwoFactor('2'); } else { setTwoFactor('0'); }

                // if(error.response.status === 423){
                //     console.log('requires password');
                //     return;
                // }
                if(error.message === "Password confirmation required."){
                  console.log('requires password');
                  setOpen(true);
                  return 'password';
                }
                // Display an info toast with no title
                setOpen(false);

              
            });
        }
    
}

const getQR = async () => {
  const csrf = await axios.get('/sanctum/csrf-cookie');
          await axios.get('/user/two-factor-qr-code').then(response => {
              // console.log(response.data.svg);
              setTwoFactorQR(response.data.svg);
          }).catch((error) => {
              console.log(error);
          });
      

}

const getRecoveryCodes = async () => {
  const csrf = await axios.get('/sanctum/csrf-cookie');
          await axios.get('/user/two-factor-recovery-codes').then(response => {
              if(response.data.length != 0){
                  setTwoFactorRecovery(response.data);
                  getQR();
                  setTwoFactor(1);
                  console.log(response.data);
              }else{
                  setTwoFactor(0);
              }
          }).catch((error) => {
              console.log(error);
          });
      
  
}

const showCodes = ()=> {
  setIsLoading(true);
  console.log("This code runs");
  setShowQR(true);
  // e.preventDefault();
  getRecoveryCodes();
  // setIsLoading(false);
}


const runEnqueue = async (x) => {

  await axios.get('/sanctum/csrf-cookie').then(response => {

    axios.post('/api/user/twofa/change', {type: x
       } ).then(response => {
           console.log(response);
       }).catch((error) => { });

 });
     if(x == 1){
        enqueueSnackbar('2FA Updated to Authenticator!');
     } else if (x == 2){
        enqueueSnackbar('2FA Updated to Email Verification!');
     } else {
        enqueueSnackbar('2FA Turned Off!');
     }

}


  const onSubmit = async (data) => {

    // console.log(data);
    let datafa = 0;
    if(data.twofa === 'Email Code' ){
      datafa = 2;
    }else if(data.twofa === 'QR/Recovery Code (Aunthenticator)'){
      datafa = 1;
    }else {
      datafa = 0;
    }

    try {
                  if(datafa == 1){
                    await authEnable(1);

                  } else if(datafa == 2){
                    await authEnable(2);
                  
                  } else {
                    await authEnable(0);

                  }

      // await new Promise((resolve) => setTimeout(resolve, 500));
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
              Activate 2-Factor Authentication
            </Typography>

            <Stack spacing={1}>
              <RHFRadioGroup name="twofa" options={['Turn Off', 'QR/Recovery Code (Aunthenticator)', 'Email Code']} />
            </Stack>
          </Stack>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>


{ twoFactor == 1 &&


          <Stack spacing={3} alignItems="flex-end">

              <Typography sx={{ margin: "6px 0", fontSize: "1em", fontWeight: "400", color:"red" }} >
                This option enables the use of Recovery codes or third party Authenticators such as Google Authenticator.<br/> <small>These are one time codes, make sure to save before you continue.</small>
              </Typography> 

                <Stack sx={{ width: 1 }} direction={{ xs: 'column', sm: 'row', md: "row" }} spacing={{ xs: 1, sm: 2, md: 4 }}>

                    <Stack spacing={1}>

                        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                          Generate QR Code
                        </Typography>
                            <QRCode />
                    </Stack>

                    <Stack spacing={1}>
                        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                          Recovery Codes
                        </Typography>
                            <RecoveryCodes />

                    </Stack>

                    
                </Stack>

                <Button type="submit" color="success" variant="contained" disabled={isLoading} onClick={e=> showCodes()}>
                        Generate Codes
                    </Button>
          </Stack>
}





<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Password
          </Typography>
            <form onSubmit={e=> {e.preventDefault();confirmPass(twoFactor)}}>
                {error != ''  && <Alert severity="error">Incorrect Password. Try Again</Alert>}

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Enter password <br/>

                      <Stack direction={{ xs: 'column', sm: 'column' }} pt="20px">
                        <Input 
                        size="normal"
                        label="Confirm Password"
                        name="password"
                        id="password"
                        type="password"
                        onChange={e=>{ setError('');}}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="small" edge="end">
                                <Iconify icon={'akar-icons:money'} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }} />

                      <br/>
                      <Button type="submit" variant="contained" >
                        Confirm
                    </Button>
                    </Stack>
                </Typography>
            </form>
        </Box>
      </Modal>


    </Card>
  );







  function QRCode(){
    return (
        <>
        {showQR && <div dangerouslySetInnerHTML={{ __html: `${twoFactorQR}` }} />}
        </>
    );
}

function RecoveryCodes() {
    return <>
              { twoFactorRecovery.map(el=>{ return <li>{el}</li>}) }
          </>
  }



}
