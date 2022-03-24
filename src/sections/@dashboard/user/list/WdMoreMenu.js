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
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

WdMoreMenu.propTypes = {
  id: PropTypes.string,
  detail: PropTypes.string,
  amount: PropTypes.string,
  wd_id: PropTypes.string,
  editPath: PropTypes.string,
  emailPath: PropTypes.string,
  loading: PropTypes.func,
};

export default function WdMoreMenu({ id, detail, amount, wd_id, editPath, emailPath, loading }) {
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

  const payUser = (e, id, address, amount, reference) => {
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
          } else {
            enqueueSnackbar('An Error Occured!');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
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
          loading(false);
          location.reload()
        })
        .catch((error) => {
          console.log(error);
        });
    });
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

        <MenuItem onClick={(e) => withdrawActivate(e, id, 'pay')}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Mark Paid
        </MenuItem>

        <MenuItem onClick={(e) => withdrawActivate(e, id, 'unpay')}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Mark Unpaid
        </MenuItem>

        <MenuItem onClick={(e) => withdrawActivate(e, id, 'delete')} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem>

        
      </MenuPopover>
    </>
  );
}
