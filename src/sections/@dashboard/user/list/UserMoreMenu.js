import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { MenuItem, IconButton } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_ADMIN } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/Iconify';
import MenuPopover from '../../../../components/MenuPopover';

import { useSnackbar } from 'notistack';
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

UserMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  userName: PropTypes.string,
  id: PropTypes.string,
  editPath: PropTypes.string,
  emailPath: PropTypes.string,
  loading: PropTypes.func,
};

export default function UserMoreMenu({ onDelete, userName, id, editPath, emailPath, loading }) {
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

  const userActivate = (e, activate, id) => {
    e.preventDefault();
    loading(true);

    if (activate) {
      axios
        .post('/api/admin/activate-user', { id: id })
        .then((r) => {
          console.log(r)
          enqueueSnackbar(r.data);
          location.reload();
        })
        .catch((err) => {
          enqueueSnackbar('An Error Occured!');
        });
    } else {
      axios
        .post('/api/admin/deactivate-user', { id: id })
        .then((r) => {
          enqueueSnackbar(r.data);
          location.reload();
        })
        .catch((err) => {
          enqueueSnackbar('An Error Occured!');
        });
    }
    loading(false);

  };
  const paidActivate = (e, activate, id) => {
    e.preventDefault();
    loading(true);

    if (activate) {
      axios
        .post('/api/admin/paid/activate', { id: id })
        .then((r) => {
          enqueueSnackbar(r.data);
          location.reload();

        })
        .catch((err) => {
          enqueueSnackbar('An Error Occured!');
        });
    } else {
      axios
        .post('/api/admin/paid/deactivate', { id: id })
        .then((r) => {
          enqueueSnackbar(r.data);
          location.reload();
        })
        .catch((err) => {
          enqueueSnackbar('An Error Occured!');
        });
    }
    loading(false);

  };
  const banActivate = (e, activate, id) => {
    e.preventDefault();
    loading(true);

    if (activate) {
      axios
        .post('/api/admin/ban', { id: id })
        .then((r) => {
          enqueueSnackbar(r.data);
          location.reload();
        })
        .catch((err) => {
          enqueueSnackbar('An Error Occured!');
        });
    } else {
      axios
        .post('/api/admin/unban', { id: id })
        .then((r) => {
          enqueueSnackbar(r.data);
          location.reload();
        })
        .catch((err) => {
          enqueueSnackbar('An Error Occured!');
        });
    }
    loading(false);

  };
  const twoFAActivate = (e, activate, id) => {
    e.preventDefault();
    loading(true);

    if (activate) {
      axios
        .post('/api/admin/twofa', { id: id })
        .then((r) => {
          enqueueSnackbar(r.data);
          location.reload();
        })
        .catch((err) => {
          enqueueSnackbar('An Error Occured!');
        });
    }
    loading(false);

  };

  const sendUserEmail = (x) => {
    let data = {
      pathname: pathNameEmail,
      query: { username: x }
      }
    
    push(pathNameEmail, data);
  }

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

        <NextLink href={`${PATH_ADMIN.admin.userRoot}/${id}`}>
          <MenuItem>
            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2, width: 24, height: 24 }} />
            Edit User
          </MenuItem>
        </NextLink>

        <MenuItem onClick={(e) => userActivate(e, true, id)}>
          <Iconify icon={'akar-icons:check-box-fill'} sx={{ ...ICON }} />
          Activate
        </MenuItem>

        <MenuItem onClick={(e) => userActivate(e, false, id)}>
          <Iconify icon={'fluent:checkbox-unchecked-12-filled'} sx={{ ...ICON }} />
          Deactivate
        </MenuItem>

        <MenuItem onClick={(e) => paidActivate(e, true, id)}>
          <Iconify icon={'akar-icons:check-box-fill'} sx={{ ...ICON }} />
          Paid Activate
        </MenuItem>

        <MenuItem onClick={(e) => paidActivate(e, false, id)}>
          <Iconify icon={'fluent:checkbox-unchecked-12-filled'} sx={{ ...ICON }} />
          Paid DeAct.
        </MenuItem>

        <MenuItem onClick={(e) => banActivate(e, true, id)}>
          <Iconify icon={'fa-solid:ban'} sx={{ ...ICON }} />
          Ban
        </MenuItem>

        <MenuItem onClick={(e) => banActivate(e, false, id)}>
          <Iconify icon={'akar-icons:check-box-fill'} sx={{ ...ICON }} />
          UnBan
        </MenuItem>

        <MenuItem onClick={(e) => twoFAActivate(e, false, id)}>
          <Iconify icon={'dashicons:unlock'} sx={{ ...ICON }} />
          Unlock 2FA
        </MenuItem>

        <MenuItem onClick={(e) => sendUserEmail(userName) }>
          <Iconify icon={'eva:email-outline'} sx={{ ...ICON }} />
          Send Email
        </MenuItem>

        {/* <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem> */}

        
      </MenuPopover>
    </>
  );
}
