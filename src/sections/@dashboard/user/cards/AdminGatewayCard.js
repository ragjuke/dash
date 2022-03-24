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

  const { id, name, image, minimum, maximum, percent, exchange, valone, valtwo, valthree, currency, fixed, status } = packageitem;
  const [packageID, setPackageID] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = (x) => {
    setPackageID(x);
    setOpen(true); 

  };
  const handleClose = () => {setOpen(false); setPackageID(0)};


  const GatewaySchema = Yup.object().shape({
    name: Yup.string().required('You must fill in Name'),
    image: Yup.string(),
    min: Yup.string().required('You must fill in Min. Amount'),
    max: Yup.string().required('You must fill in Max Amount'),
    percent: Yup.string().required('You must fill in Percentage Fee'),
    fixed: Yup.string().required('You must fill in Fixed Fee'),
    valone: Yup.string().required('You must fill in Value 1'),
    valtwo: Yup.string().required('You must fill in Value 2'),
    valthree: Yup.string().required('You must fill in Value 3'),
    exchange: Yup.string().required('You must fill in Exchange'),
    currency: Yup.string(),
    status: Yup.string(),
  });

  const defaultValues = {
    name: name,
    image: image,
    min: minimum,
    max: maximum,
    percent: percent,
    fixed: fixed,
    valone: valone,
    valtwo: valtwo,
    valthree: valthree,
    exchange: exchange,
    currency: currency,
    status: status,

  };

  const methods = useForm({
    resolver: yupResolver(GatewaySchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onEditSubmit = async (data) => {



    let statusSwitch = data.status == 'true' ? 1 : 0;

    let sendData = {
        name: data.name,
        img: data.image,
        min: data.min,
        max: data.max,
        perc_fee: data.percent,
        fixed_fee: data.fixed,
        val1: data.valthree,
        val2: data.valtwo,
        val3: data.valthree,
        exchange: data.exchange,
        currency: data.currency,
        status: statusSwitch,
    }

    try {

      await  axios.patch(`/api/gateway/${packageID}`, sendData)
      .then((response) => {
        enqueueSnackbar('Gateway Updated!');
        // reset();
        setTimeout(()=>{
          push(PATH_ADMIN.admin.gateways);
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
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
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
        {/* {description} */}
      </Typography>

      <Stack alignItems="center">
        {/* <SocialsButton initialColor sx={{ my: 2.5 }} /> */}
            <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />} style={{ margin: "20px"}} onClick={e=>handleOpen(id)}>
                Edit Gateway
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
            Currency
          </Typography>
          <Typography variant="subtitle1">{currency}</Typography>
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
                        label="Gateway Title"
                        name="name"
                        id="name"
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
                        label="Fixed Fee"
                        name="fixed"
                        id="fixed"
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="small" edge="end">
                                <Iconify icon={'akarr-icons:money'} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }} />
                        <br/>


                        <RHFTextField 
                        size="normal"
                        label="Percentage Cut"
                        name="percent"
                        id="percent"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="small" edge="end">
                                <Iconify icon={'fluent:document-multiple-percent-20-regular'} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }} />
                  </Box>
                        <br/>

                  <Box sx={{display: "flex", direction:"column"}}>
                        <RHFTextField 
                        size="normal"
                        label="Val 1"
                        name="valone"
                        id="valone"
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
                        label="Val 2"
                        id="valtwo"
                        name="valtwo"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="small" edge="end">
                                <Iconify icon={'gg:details-more'} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }} />
                    </Box>

                    <br/>

                    <Box sx={{display: "flex", direction:"column"}}>
                        <RHFTextField 
                        size="normal"
                        label="Val 3"
                        name="valthree"
                        id="valthree"
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
                        label="Currency"
                        id="currency"
                        name="currency"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="small" edge="end">
                                <Iconify icon={'gg:details-more'} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }} />
                    </Box>

                        <br/>

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
