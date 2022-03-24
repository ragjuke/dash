import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Box, Card, Chip, Stack, Button, TextField, Typography, Autocomplete, Input, InputAdornment } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_ADMIN } from '../../../routes/paths';
//components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';

import axios from '../../../utils/axios';


// ----------------------------------------------------------------------

// const LabelStyle = styled(Typography)(({ theme }) => ({
//   ...theme.typography.subtitle2,
//   color: theme.palette.text.secondary,
//   marginBottom: theme.spacing(1),
// }));

// ----------------------------------------------------------------------

export default function SendDMNewsForm(props) {
  // Pull Router Data
  // const { router, push } = useRouter();
  const router = useRouter()
  const { username, uid } = router.query
  // const [recUser, setRecUser] = useState('');
  const recUser = username == '' ? props.id : '';

  console.log(uid);

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();


  const onSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    let sendData = {
        receiver_id: uid,
        message: document.getElementById('message').value,
    }

    console.log(sendData);

    try {
                    await  axios.post('/api/message/create', sendData)
                  .then((response) => {
                    setIsSubmitting(true);

                    console.log(response)
                    enqueueSnackbar('DM Sent!');
                    // reset();
                    // push(PATH_DASHBOARD.chat.root);
                    window.location.href = PATH_DASHBOARD.chat.root;
                  } )
                  .catch((e) => {
                    // enqueueSnackbar('An Error Occured!');
                  } );

            


    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={e=>onSubmit(e)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>

                <Typography>You are sending a DM to {username}</Typography>

                  <Input
                    fullWidth
                    name="message"
                    id="message"
                    disableUnderline
                    // onChange={(event) => setMessage(event.target.value)}
                    placeholder="Type a message"
                  />

              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={12}>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>

              <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                Send DM
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
