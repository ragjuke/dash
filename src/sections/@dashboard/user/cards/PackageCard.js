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
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

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

  const { id, name, cover, description, minimum, percent, avatarUrl, maximum } = packageitem;
  const [packageID, setPackageID] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = (x) => {setOpen(true); setPackageID(x)};
  const handleClose = () => {setOpen(false); setPackageID(0)};


  const InvestSchema = Yup.object().shape({
    amount: Yup.string().required('You must fill in Amount'),
  });

  const defaultValues = {
    amount: '',
    package_id: 'packageID',
    run: '1',
  };

  const methods = useForm({
    resolver: yupResolver(InvestSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log('here')

    try {
      await axios.post('/api/investment/create', {
        amount: data.amount,
        package_id: packageID,
        run: 1,
      })
      .then((response) => {
        if(response.data == 'Investment Created Successfully'){
          enqueueSnackbar(response.data, {variant: 'success'}); // Toastr
          reset();

          setTimeout(()=>{
            push(PATH_DASHBOARD.transactions.list);
            // location.reload();
          }, 
            1000);

          return;
        }
        // enqueueSnackbar(response.data, {variant: 'warning'}); // Toastr

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
          src={avatarUrl}
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
        <Image src={cover} alt={cover} ratio="16/9" />
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
                Invest
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
          <Typography variant="subtitle1">{percent}</Typography>
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
            Invest in "{name}" pack
          </Typography>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Enter amount you wish to invest <br/>

                      <Stack direction={{ xs: 'column', sm: 'column' }} pt="20px">
                        <RHFTextField 
                        size="normal"
                        label="Amount in USD"
                        name="amount"
                        id="amount"
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
                      <LoadingButton type="submit" variant="contained" loading={isSubmitting} >
                        Invest
                    </LoadingButton>
                    </Stack>
                </Typography>
            </FormProvider>
        </Box>
      </Modal>
    </Card>
  );
}
