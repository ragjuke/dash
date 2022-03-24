import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';

// @mui
import { MenuItem, IconButton } from '@mui/material';
// routes
import { PATH_ADMIN, PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/Iconify';
import MenuPopover from '../../../../components/MenuPopover';



// ----------------------------------------------------------------------

PagesMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  id: PropTypes.string,
};

export default function PagesMoreMenu({ onDelete, id, pathurl }) {
  const [open, setOpen] = useState(null);
  const { push } = useRouter();
  const pathNameEdit = pathurl;


  const editData = (x) => {
    let data = {
      pathname: pathNameEdit,
      query: { id: x }
      }
    
    push(pathNameEdit, data);
  }
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
        
          {/* <MenuItem onClick={e=> editData(id) }>
            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2, width: 24, height: 24 }} />
            Edit
          </MenuItem> */}

          <NextLink href={`${pathNameEdit}?id=${id}`}>
            <MenuItem>
              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2, width: 24, height: 24 }} />
              Edit
            </MenuItem>
          </NextLink>

          <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
            <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
            Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}
