import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useState, useEffect } from 'react';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card, Typography, Select, MenuItem, TextField, Input, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField, RHFUploadSingleFile, RHFUpload, RHFSelect } from '../../../../components/hook-form';

import axios from '../../../../utils/axios';
import { fData } from 'src/utils/formatNumber';
import Iconify from 'src/components/Iconify';
import { isEmpty } from 'lodash';


// ----------------------------------------------------------------------

export default function KYCUpdate() {
  const { enqueueSnackbar } = useSnackbar();


    const [kycData, setKycData] = useState([]);
    const [counter, setCounter] = useState(0);
    const [selType, setSelType] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
            axios.get('/api/kyc/logged/user').then( ({data}) => {
                setKycData(data);
                })
            
            .catch(error => { console.log(error);  });    
     }, [counter]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(document.getElementById("front").value);

     isEmpty

    if(
      isEmpty(document.getElementById("front").value) || 
      isEmpty(document.getElementById("back").value) 
    // isEmpty(document.getElementById("type").value) || 
    // isEmpty(document.getElementById("number").value) 
    )
    {
      enqueueSnackbar('Make sure you fill all fields correctly!', {variant: 'warning'}); 
      setIsLoading(false);

      return;

    }

    let fd = new FormData(e.target)

  //   for (var value of fd.entries()) {
  //     console.log(value[0]+ ', '+ value[1] + ' ' + typeof(value[1]));
  //  }

    try {

    let response = await axios.post('/api/kyc/upload', fd);
      if(response.data == 'Successfully Uploaded and waiting for approval'){
        setCounter(1);
        enqueueSnackbar('Update success!');
        setIsLoading(fasle);
      }else{
        enqueueSnackbar('An Error might have occured. Reload Page.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3 }}>


            { kycData.length == 0 ? <Form />
                : kycData.length == undefined && kycData.status == 0 ? <Pending />
                : kycData.length == undefined && kycData.status == 1 ? <Approved />
                : kycData.length == undefined && kycData.status == 2 ? <><Rejected /> <Form/></>
                : null
            }

    </Card>
  );




  function Form(){
    return(
      <form action="#" encType="multipart/form-data" id="kyc-form" onSubmit={e=> onSubmit(e)}>
        <Stack spacing={3} alignItems="flex-end">

              <label htmlFor='front'>
                <Input accept="image/*"
                  // style={{ display: 'none' }}
                  id="front"
                  label="Select Front Image"
                  name="front"
                  type="file" />
                    <Button variant="contained" color="warning" startIcon={<Iconify icon={'eva:plus-fill'} />} onClick={e=> document.getElementById("front").click()}>
                        Select Front Image
                    </Button><br/>
                    {/* {!isEmpty(document.getElementById("front").value) && <small sx={{ color: 'red' }}>x..Front Image Selected</small>} */}
              </label>

              <label htmlFor='back'>
                <Input accept="image/*"
                  // style={{ display: 'none' }}
                  id="back"
                  label="Select Back Image"
                  name="back"
                  type="file" />
                    <Button variant="contained" color="warning" startIcon={<Iconify icon={'eva:plus-fill'} />} onClick={e=> document.getElementById("back").click()}>
                        Select Back Image
                    </Button><br/>
                    {/* {!isEmpty(document.getElementById("back").value) && <small sx={{ color: 'red' }}>x..Back Image Selected</small>} */}
              </label>

            <Select
                labelId="type"
                id="type"
                name="type"
                label="Dcoument Type"
                value={selType}
                onChange={e=> setSelType(document.getElementById("type").value)}
              >
                <MenuItem value={0}>Select Document Type</MenuItem>
                <MenuItem value="1">International Passport</MenuItem>
                <MenuItem value="2">National ID</MenuItem>
                <MenuItem value="3">Drivers License</MenuItem>
              </Select>

          <TextField id="number" variant="outlined" name="number" type="text" label="Document Number" />

          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            Upload KYC
          </LoadingButton>
        </Stack>
      </form>
    );
  }

  function Pending(){
    return(
      <h2 className="title">Your Submitted KYC is under review. </h2>
    );
  }

  function Approved(){
    return(
      <h2 className="title">Hurray! Your Submitted KYC has been approved.</h2>
    );
  }

  function Rejected(){
    return(
      <h3 className="title">Your Submitted KYC is was rejected. Use the Form Below to Submit a Valid Dcoument. </h3>   
    );
  }
}
