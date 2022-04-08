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
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete, Input } from '@mui/material';
// routes
import { PATH_ADMIN, PATH_DASHBOARD } from '../../../routes/paths';
//components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';
//
import BlogNewPostPreview from './BlogNewPostPreview';
import dynamic from 'next/dynamic'; 

import Iconify from 'src/components/Iconify';
import axios from '../../../utils/axios';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function BlogEditPostForm(props) {

  const { push } = useRouter();

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const [blog, setBlog] = useState({
    title:'',
    body:'',
    meta_title:'',
    meta_desc:'',
    slug:'',
});

const handleOnChange = e=>{
  const name = e.target.getAttribute('name');
  const value = e.target.value;

  const data = {...blog}
  data[name] = value;
  setBlog(data);
}
const handleEditorChange = () => {
 const data = {...blog}
 //console.log('Content was updated:', content);
 data['body'] = document.getElementsByClassName("ql-editor")[0].innerHTML;

 setBlog(data);
 
}
 

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let fdata = new FormData(e.target); 
    fdata.append('body', document.getElementsByClassName("ql-editor")[0].innerHTML);
        
        let fd = {};
        for (var pair of fdata.entries()) {
            fd[pair[0]] = pair[1];
        }



    // Send the Request
    axios.defaults.withCredentials = true;

    try {

    let response = await axios.patch(`/api/news/${props.id}`, fd);
      if(response.data == 'Updated Successfully'){
        enqueueSnackbar('Post Updated successfully!');
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
                
                <TextField name="title" type="text" variant="outlined" label="Post Title" id="title" defaultValue={props.data?.title} onChange={handleOnChange}/>
                <div>
                  <LabelStyle>Content</LabelStyle>
                  <ReactQuill id="body" name="body" type="text" label="Content" defaultValue={props.data?.body} onEditorChange={handleEditorChange} /> 
                </div>


                {/* <label htmlFor='image'>
                <Input accept="image/*"
                  id="image"
                  label="Select Image"
                  name="image"
                  onChange={handleOnChange}
                  type="file" />
                        <Button variant="contained" color="warning" startIcon={<Iconify icon={'eva:plus-fill'} />} onClick={e=> document.getElementById("image").click()}>
                            Select Image
                        </Button><br/>
                  </label> */}

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

                <TextField name="slug" label="Slug" id="slug" placeholder='Enter Slug' defaultValue={props.data?.slug} onChange={handleOnChange} />

                <TextField name="meta_title" label="Meta title" id="meta_title" placeholder='Enter Meta Title' defaultValue={props.data?.meta_title} onChange={handleOnChange} />

                <TextField name="meta_desc" label="Meta description" id="meta_desc" fullWidth multiline rows={3} placeholder='Enter Meta Description'  defaultValue={props.data?.meta_desc} onChange={handleOnChange}/>

              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              
              <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                Update Post
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>

    </>
  );
}
