import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import {useState} from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from '../../../../utils/axios';
// next
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Card, Avatar, Divider, Typography, Stack, Modal, TextField, InputAdornment, IconButton } from '@mui/material';
// utils
import cssStyles from '../../../../utils/cssStyles';
import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Image from '../../../../components/Image';
import SvgIconStyle from '../../../../components/SvgIconStyle';
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFTextField, RHFSwitch, RHFSelect} from '../../../../components/hook-form';
// routes
import { PATH_ADMIN, PATH_DASHBOARD } from '../../../../routes/paths';

import { LoadingButton } from '@mui/lab';


// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

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

PackageCard.propTypes = {
  packageitem: PropTypes.object.isRequired,
};

export default function PackageCard({ packageitem }) {
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();

  const { id, name, image, description, minimum, maximum, percent, run, time, bonus, status } = packageitem;
  const [packageID, setPackageID] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = (x) => {
    setPackageID(x);

    setOpen(true); 

  };
  const handleClose = () => {setOpen(false); setPackageID(0)};


  const PackageSchema = Yup.object().shape({
    title: Yup.string().required('You must fill in Title'),
    description: Yup.string().required('You must fill in Description'),
    image: Yup.string(),
    min: Yup.string().required('You must fill in Min. Amount'),
    max: Yup.string().required('You must fill in Max Amount'),
    percent: Yup.string().required('You must fill in Percentage'),
    run: Yup.string().required('You must fill in Run'),
    time: Yup.string().required('You must fill in Time in Hours'),
    bonus: Yup.string(),
    status: Yup.string(),
  });

  const defaultValues = {
    title: name,
    description: description,
    image: image,
    min: minimum,
    max: maximum,
    percent: percent,
    run: run,
    time: time,
    bonus: bonus,
    status: status,

  };

  const methods = useForm({
    resolver: yupResolver(PackageSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onCreateSubmit = async (data) => {
    let statusSwitch = data.status ? 0 : 1;

    try {
      await axios.post('/api/package/create', {
        title: data.title,
        description: data.description,
        img: data.image,
        min: data.min,
        max: data.max,
        percent: data.percent,
        run: data.run,
        time_hours: data.time,
        bonus: data.bonus,
        status: statusSwitch,
      })
      .then((response) => {
        if(response.data == 'Package Created Successfully'){
          enqueueSnackbar(response.data, {variant: 'success'}); // Toastr
          reset();
          
          setTimeout(()=>{
            push(PATH_DASHBOARD.transactions.list);
            location.reload();
          }, 
            1000);

          return;
        }
        enqueueSnackbar(response.data, {variant: 'warning'}); // Toastr

      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.data, {variant: 'warning'}); // Toastr
        
      });

    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.data, {variant: 'warning'}); // Toastr
      
    }
  };

  const onEditSubmit = async (data) => {

    let statusSwitch = data.status == 'true' ? 1 : 0;

    let sendData = {
        title: data.title,
        description: data.description,
        img: data.image,
        min: data.min,
        max: data.max,
        percent: data.percent,
        run: data.run,
        time_hours: data.time,
        bonus: data.bonus,
        status: statusSwitch,
    }

    try {

      await  axios.patch(`/api/package/${packageID}`, sendData)
      .then((response) => {
        enqueueSnackbar('Package Updated!');

        setTimeout(()=>{
          push(PATH_ADMIN.admin.packages);
          location.reload();
        }, 
          1000);
        
      } )
      .catch((e) => {enqueueSnackbar('An Error Occured!'); console.log(e)} );
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://s-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          alt={name}
          src={image}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />
        <OverlayStyle />
        <Image src={image} alt={image} ratio="16/9" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6 }}>
        {name}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {description}
      </Typography>

      <Stack alignItems="center">
        {/* <SocialsButton initialColor sx={{ my: 2.5 }} /> */}
            <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />} style={{ margin: "20px"}} onClick={e=>handleOpen(id)}>
                Edit Package
            </Button>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ py: 3, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Minimum
          </Typography>
          <Typography variant="subtitle1">${fShortenNumber(minimum)}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Percentage/Days
          </Typography>
          <Typography variant="subtitle1">{`${percent} in ${time/24}`} Day(s)</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Maximum
          </Typography>
          <Typography variant="subtitle1">${fShortenNumber(maximum)}</Typography>
        </div>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit "{name}" pack
          </Typography>
            <FormProvider methods={methods} onSubmit={handleSubmit(onEditSubmit)}>
                {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
                  {/* Enter amount you wish to invest <br/> */}

                      <Stack direction={{ xs: 'column', sm: 'column' }} pt="20px">
                        <RHFTextField 
                        size="normal"
                        label="Package Title"
                        name="title"
                        id="title"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="small" edge="end">
                                <Iconify icon={'fluent:app-title-24-regular'} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }} />
                        <br/>

                        <RHFTextField 
                        size="normal"
                        label="Description"
                        name="description"
                        id="description"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="small" edge="end">
                                <Iconify icon={'gg:details-more'} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }} />
                        <br/>


                        <RHFTextField 
                        size="normal"
                        label="Image URL"
                        name="image"
                        id="image"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="small" edge="end">
                                <Iconify icon={'carbon:image-copy'} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }} />
                        <br/>

                  <Box sx={{display: "flex", direction:"column"}}>
                        <RHFTextField 
                        size="normal"
                        label="Min Amount"
                        name="min"
                        type="number"
                        id="min"
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


                        <RHFTextField 
                        size="normal"
                        label="Max Amount"
                        name="max"
                        type="number"
                        id="max"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="small" edge="end">
                                <Iconify icon={'akar-icons:money'} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }} />
                  </Box>
                        <br/>


                  <Box sx={{display: "flex", direction:"column"}}>
                        <RHFTextField 
                        size="normal"
                        label="ROI in %"
                        name="percent"
                        id="percent"
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="small" edge="end">
                                <Iconify icon={'fluent:document-multiple-percent-20-regular'} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }} />
                        <br/>


                        <RHFTextField 
                        size="normal"
                        label="Number of Runs"
                        name="run"
                        id="run"
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="small" edge="end">
                                <Iconify icon={'ic:outline-run-circle'} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }} />
                  </Box>
                        <br/>

                  <Box sx={{display: "flex", direction:"column"}}>
                        <RHFTextField 
                        size="normal"
                        label="Time in Hours"
                        name="time"
                        id="time"
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="small" edge="end">
                                <Iconify icon={'bx:time'} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }} />
                        <br/>

                        <RHFTextField 
                        size="normal"
                        label="Bonus (5/3/2/1)"
                        name="bonus"
                        id="bonus"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="small" edge="end">
                                <Iconify icon={'mdi:sack-percent'} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }} />
                    </Box>

                        <RHFSwitch name="status" labelPlacement="start" label="Package Status (OFF/ON)" sx={{ mt: 5 }} />

                      <br/>
                      <LoadingButton type="submit" variant="contained" loading={isSubmitting} >
                        Update
                    </LoadingButton>
                    </Stack>
                {/* </Typography> */}
            </FormProvider>
        </Box>
      </Modal>
    </Card>
  );
}
