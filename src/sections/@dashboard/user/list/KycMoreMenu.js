import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { MenuItem, IconButton } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/Iconify';
import MenuPopover from '../../../../components/MenuPopover';

import { useSnackbar } from 'notistack';
import axios from '../../../../utils/axios'

// ----------------------------------------------------------------------

KycMoreMenu.propTypes = {
  id: PropTypes.string,
  editPath: PropTypes.string,
  emailPath: PropTypes.string,
  loading: PropTypes.func,
};

export default function KycMoreMenu({ id, editPath, emailPath, loading }) {
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();

  const [open, setOpen] = useState(null);
  const pathNameEdit = editPath;
  const pathNameEmail = emailPath;

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };


  const handleApprove = async (e, id) => {
      
    e.preventDefault();
    loading(true);

    await axios.get('/sanctum/csrf-cookie');


          axios
            .post('/api/admin/user-kyc-update', { id: id, kyc: 1, status: 1 } )
            .then((res) => {
              // console.log(response.data);
              enqueueSnackbar(res.data);
              loading(false);
              location.reload();
            })
            .catch((error) => {
              console.log(error.response.data);
            });

    // let res = await axios.post(`/api/admin/user-kyc-update`, { id: id, kyc: 1, status: 1 });

    // await axios.get('/sanctum/csrf-cookie');
    // await axios.patch(`api/admin/user/${id}`, { kyc: 1 });
    // await axios.get('/sanctum/csrf-cookie');
    // let res = await axios.patch(`api/admin/user-kyc/${id}`, { status: 1 });

    // enqueueSnackbar(res.data);
    // location.reload();

    // loading(false);

    
  };




  const handleReject = async (e, id) => {

    e.preventDefault();
    loading(true);

    await axios.get('/sanctum/csrf-cookie');
    // let res = await axios.post(`/api/admin/user-kyc-update`, { id: id, kyc: 0, status: 2 });


          axios
            .post('/api/admin/user-kyc-update', { id: id, kyc: 0, status: 2 } )
            .then((res) => {
              // console.log(response.data);
              enqueueSnackbar(res.data);
              loading(false);
              location.reload();
            })
            .catch((error) => {
              console.log(error.response.data);
            });

    // await axios.get('/sanctum/csrf-cookie');
    // await axios.patch(`api/admin/user/${id}`, { kyc: 0 });
    // await axios.get('/sanctum/csrf-cookie');
    // let res = await axios.patch(`api/admin/user-kyc/${id}`, { status: 2 });

    // enqueueSnackbar(res.data);
    // location.reload();

        // loading(false);
    
  };


  const payUser = (e, id, address, amount, reference) => {
    loading(true);

    e.target.setAttribute('disabled', true);
    let data = {
      id: id,
      address: address,
      amount: amount,
      reference: reference,
    };

    axios.get('/sanctum/csrf-cookie').then((response) => {
      axios
        .post(`/api/admin/auto-pay-alfacoin`, data)
        .then((response) => {
          const { data } = response;
          if (data === 'paid') {
            enqueueSnackbar('Payment Sent');
          location.reload();
          } else {
            enqueueSnackbar('An Error Occured!');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });

    loading(false);

  };


  const withdrawActivate = (e, id, option) => {
    e.preventDefault();
    loading(true);

    axios.get('/sanctum/csrf-cookie').then((response) => {
      axios
        .post(`/api/admin/withdraw-update`, { id: id, option: option })
        .then((response) => {
          const { data } = response;
          enqueueSnackbar(data);
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    });
    loading(false);

  };

  
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >

        <MenuItem onClick={(e) => handleApprove(e, id)}>
            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2, width: 24, height: 24 }} />
            Approve
          </MenuItem>

        <MenuItem onClick={(e) => handleReject(e, id)}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Reject
        </MenuItem>
        
      </MenuPopover>
    </>
  );
}
