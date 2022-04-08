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
import { Grid, Button, Card, Chip, Stack, TextField, Typography, Autocomplete, Input } from '@mui/material';
// routes
import { PATH_ADMIN, PATH_DASHBOARD } from '../../../routes/paths';
//components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';
//
import BlogNewPostPreview from './BlogNewPostPreview';
import Iconify from 'src/components/Iconify';

import axios from '../../../utils/axios';
import dynamic from 'next/dynamic'; 

import { isEmpty } from 'lodash';
import Editor from 'src/components/editor';
// import ReactQuill from 'react-quill';


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {

  const { push } = useRouter();

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if(
      isEmpty(document.getElementById("image").value)
    )
    {
      enqueueSnackbar('Make sure you select an image', {variant: 'warning'}); 
      setIsSubmitting(false);

      return;

    }

    let fd = new FormData(e.target)
    fd.append('body', document.getElementsByClassName("ql-editor")[0].innerHTML);

    // console.log(document.getElementsByClassName("ql-editor")[0].innerHTML);
    // return

  //   for (var value of fd.entries()) {
  //     console.log(value[0]+ ', '+ value[1] + ' ' + typeof(value[1]));
  //  }

    try {

    let response = await axios.post('/api/news', fd);
      if(response.data == 'News Successfully created'){
        enqueueSnackbar('Post Sent successfully!');
        setIsSubmitting(false);
        setTimeout(()=>{
          push(PATH_ADMIN.admin.news);
          // location.reload();
        }, 
          1000);
      }else{
        enqueueSnackbar('An Error might have occured. Reload Page.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };


  return (
    <>
      <form encType="multipart/form-data" id="news-form" onSubmit={e=> onSubmit(e)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <TextField name="title" type="text" variant="outlined" label="Post Title" id="title" />
                <div>
                  <LabelStyle>Content</LabelStyle>

                    <ReactQuill id="body" name="body" type="text" label="Content" /> 

                </div>


                <label htmlFor='image'>
                <Input accept="image/*"
                  // style={{ display: 'none' }}
                  id="image"
                  label="Select Image"
                  name="image"
                  type="file" />
                        <Button variant="contained" color="warning" startIcon={<Iconify icon={'eva:plus-fill'} />} onClick={e=> document.getElementById("image").click()}>
                            Select Image
                        </Button><br/>
                        {/* {!isEmpty(document.getElementById("front").value) && <small sx={{ color: 'red' }}>x..Front Image Selected</small>} */}
                  </label>

                {/* <div>
                  <LabelStyle>Cover</LabelStyle>
                  <RHFUploadSingleFile name="cover" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
                </div> */}
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>

                <TextField name="slug" label="Slug" id="slug" placeholder='Enter Slug' />

                <TextField name="meta_title" label="Meta title" id="meta_title" placeholder='Enter Meta Title' />

                <TextField name="meta_desc" label="Meta description" id="meta_desc" fullWidth multiline rows={3} placeholder='Enter Meta Description' />

              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              
              <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                Post
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>

      
    </>
  );
}
