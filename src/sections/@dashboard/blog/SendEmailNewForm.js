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
import { Grid, Box, Card, Chip, Stack, Button, TextField, Typography, Autocomplete } from '@mui/material';
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

export default function SendEmailNewForm(props) {
  // Pull Router Data
  // const { router, push } = useRouter();
  const router = useRouter()
  const { username } = router.query
  // const [recUser, setRecUser] = useState('');
  const recUser = username == '' ? props.id : '';
  console.log(router.query.username);

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const SendNewEmailSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    username: Yup.string(),
    content: Yup.string().required('Content is required'),
  });

  const defaultValues = {
    title: '',
    username: username,
    content: '',
  };

  const methods = useForm({
    resolver: yupResolver(SendNewEmailSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {

    let sendData = {
        subject: data.title,
        username: data.username,
        message: data.content,
    }

    try {

            if (username == undefined ){
                    await  axios.post('/api/admin/email/all/users', {subject: data.title, message: data.content})
                  .then((response) => {
                    console.log(response)
                    enqueueSnackbar('Email Sent to all Users!');
                    reset();
                    // push(PATH_ADMIN.admin.dashboard);
                  } )
                  .catch((e) => enqueueSnackbar('An Error Occured!') );

            } else {
                      await  axios.post('api/admin/email/single', sendData )
                    .then((response) => {
                      enqueueSnackbar( `Email Sent to ${data.username}` );
                      reset();
                      // push(PATH_ADMIN.admin.dashboard);
                    } )
                    .catch((e) => enqueueSnackbar('An Error Occured!') );

            }    


    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" id="title" label="Email Subject" /><br/>

                <Box display={username==undefined ? 'none' : 'block' }>
                  <RHFTextField name="username" id="username" label="Enter Username" /><br/>
                </Box>

                <div>
                  {/* <LabelStyle>Content</LabelStyle> */}
                  <RHFEditor name="content" id="content" />
                </div>

              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={12}>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>

              <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                Send Email
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
