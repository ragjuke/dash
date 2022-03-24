import * as Yup from 'yup';
import { useCallback, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete } from '@mui/material';
// routes
import { PATH_ADMIN, PATH_DASHBOARD } from '../../../routes/paths';
//components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';
//
import AlertNewPostPreview from './AlertNewPostPreview';

import axios from '../../../utils/axios';



// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function AlertEditPostForm(props) {

  console.log(props.data.body)

  const { push } = useRouter();

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewAlertSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    
  });

  const defaultValues = {
    title: props.data.title, 
    content: props.data.body,
    
  };

  const methods = useForm({
    resolver: yupResolver(NewAlertSchema),
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
        title: data.title,
        body: data.content,
        
    }

    try {


      await  axios.patch(`/api/alert/${props.id}`, sendData)
      .then(({ data }) => {
        enqueueSnackbar('Alert Updated!');
        setTimeout(()=>{
          push(PATH_ADMIN.admin.alerts);
          // location.reload();
        }, 
          1000);
      } )
      .catch((e) => enqueueSnackbar('An Error Occured!') );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'cover',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );


  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="Alert Title"  defaultValue={props.data.title} />
                <div>
                  <LabelStyle>Content</LabelStyle>
                  <RHFEditor name="content"  defaultValue={props.data.title} />
                </div>

                {/* <div>
                  <LabelStyle>Cover</LabelStyle>
                  <RHFUploadSingleFile name="cover" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
                </div> */}
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={12}>
          

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              
              <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                Update Alert
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>

      <AlertNewPostPreview
        values={values}
        isOpen={open}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
}
