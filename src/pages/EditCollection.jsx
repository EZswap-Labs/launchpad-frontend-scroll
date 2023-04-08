/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container, Typography, Box, Button, TextField, InputAdornment,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { uploadImage } from '../service/account';
import { queryCollections, updateCollection } from '../service/collection';
import { CollectionStatusMap, CollectionStatus } from '../config/constant';
import UploadArtwork from '../components/UploadArtwork';
import UploadBanner from '../components/UploadBanner';

export default function EditCollection() {
  const [imageUrl, setImageUrl] = useState('');
  const [artImageUrl, setArtImageUrl] = useState('');
  const account = useAccount();
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: -1,
      symbol: '',
      description: '',
      collectionName: '',
      price: 1,
      royalties: 0,
      publicStartTime: Date.now(),
      publicEndTime: Date.now(),
      status: CollectionStatusMap?.Draft,
    },
    validationSchema: Yup.object({
      symbol: Yup
        .string()
        .max(255)
        .required('Symbol is required'),
      price: Yup
        .number()
        .required('Mint Price is required'),
      description: Yup
        .string()
        .required('Description is required'),
      collectionName: Yup
        .string()
        .max(255)
        .required('Collection Name is required'),
    }),
    onSubmit: async (e, { setErrors, setSubmitting }) => {
      if (!account?.address) {
        toast.error('Please connect your wallet');
        return;
      }
      if (!imageUrl) {
        toast.error('Please upload a banner');
        return;
      }
      if (!artImageUrl) {
        toast.error('Please upload a artWork');
        return;
      }
      const {
        symbol, description, collectionName, royalties, id,
        publicStartTime, publicEndTime, price, status,
      } = formik?.values || {};
      const data = {
        id,
        symbol,
        description,
        collectionName,
        walletAddress: account?.address,
        royalties: royalties / 100,
        publicStartTime,
        publicEndTime,
        publicPrice: price,
        bannerUrl: imageUrl,
        imgUrl: artImageUrl,
        userId: userInfo?.id,
        status,
      };
      try {
        const res = await updateCollection(data);
        if (res === 'success') {
          toast.success('Update collection successfully');
          navigate('/myCollections');
        }
      } catch (error) {
        setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    const userString = localStorage.getItem('userInfo');
    const info = JSON.parse(userString);
    if (info?.walletAddress === account?.address) {
      setUserInfo(info);
    }
  }, [account?.address]);
  const fillback = (formData) => {
    formik.setValues({
      ...formData?.[0],
      royalties: (formData?.[0]?.royalties || 0) * 100,
      price: (formData?.[0]?.publicPrice || 0),
    });
    setImageUrl(formData?.[0]?.bannerUrl);
    setArtImageUrl(formData?.[0]?.imgUrl);
  };

  useEffect(() => {
    const cid = window?.location?.hash?.split('?cid=')?.[1];
    if (cid) {
      queryCollections({ id: cid }).then((res) => {
        fillback(res);
      });
    }
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          width: 640,
          display: 'flex',
          flexDirection: 'column',
          mt: 14,
        }}
      >
        <Box>
          <Box sx={{ position: 'relative' }}>
            <Box sx={{
              width: '50%',
              height: '200px',
              background: '#fff',
              display: 'flex',
              justifyContent: 'center',
            }}
            >
              {imageUrl ? (
                <Box
                  component="img"
                  src={imageUrl}
                  alt="test"
                  sx={{
                    width: '100%',
                    objectFit: 'cover',
                    height: 140,
                  }}
                />
              ) : null}
            </Box>
            <Typography
              sx={{
                position: 'absolute',
                bottom: 60,
                left: 0,
                p: 1,
                width: '50%',
                borderBottom: '1px solid #000',
                fontSize: 24,
              }}
            >
              New Collection
            </Typography>
            <Typography
              sx={{
                position: 'absolute',
                bottom: 20,
                left: 0,
                p: 1,
                width: '50%',
                fontSize: 16,
              }}
            >
              Status:
              {' '}
              {CollectionStatus[(formik?.values?.status || 1)]}
            </Typography>
          </Box>
          <UploadBanner setImageUrl={setImageUrl} imageUrl={imageUrl} />
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            error={Boolean(formik.touched.collectionName && formik.errors.collectionName)}
            fullWidth
            helperText={formik.touched.collectionName && formik.errors.collectionName}
            label="Collection Name"
            placeholder="E.g. Bored Ape Yacht Club"
            margin="normal"
            name="collectionName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.collectionName}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.symbol && formik.errors.symbol)}
            fullWidth
            helperText={formik.touched.symbol && formik.errors.symbol}
            label="Symbol"
            placeholder="E.g. BAYC"
            margin="normal"
            name="symbol"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.symbol}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.description && formik.errors.description)}
            fullWidth
            helperText={formik.touched.description && formik.errors.description}
            label="Description"
            margin="normal"
            name="description"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.description}
            variant="outlined"
            multiline
            rows={8}
          />
          {artImageUrl ? (
            <Box sx={{
              width: '100%',
              maxHeight: '300px',
              background: '#fff',
              display: 'flex',
              justifyContent: 'center',
            }}
            >
              {artImageUrl ? (
                <Box
                  component="img"
                  src={artImageUrl}
                  alt="test"
                  sx={{
                    width: '100%',
                    objectFit: 'contain',
                  }}
                />
              ) : null}
            </Box>
          ) : <UploadArtwork setArtImageUrl={setArtImageUrl} />}
          <Box sx={{ my: 2, display: 'flex', justifyContent: 'space-between' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <DateRangePicker
                label="Date desktop"
                localeText={{
                  start: '',
                  end: '',
                }}
              /> */}
              <DateTimePicker
                sx={{
                  width: '50%',
                  mr: 2,
                }}
                label="Mint Start Date"
                value={dayjs(formik.values.publicStartTime)}
                onChange={(value) => {
                  formik.setFieldValue('publicStartTime', Date.parse(value));
                }}
                // renderInput={(params) => <TextField {...params} />}
              />
              <DateTimePicker
                sx={{
                  width: '50%',
                  ml: 2,
                }}
                label="Mint End Date"
                value={dayjs(formik.values.publicEndTime)}
                onChange={(value) => {
                  formik.setFieldValue('publicEndTime', Date.parse(value));
                }}
                // renderInput={(params) => <TextField {...params} />}
                // value={value}
                // onChange={handleChange}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <TextField
              error={Boolean(formik.touched.price && formik.errors.price)}
              fullWidth
              helperText={formik.touched.price && formik.errors.price}
              label="Mint Price"
              placeholder="E.g. BAYC"
              margin="normal"
              name="price"
              value={formik.values.price}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              variant="outlined"
              sx={{ mr: 2 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
              }}
            />
            <TextField
              error={Boolean(formik.touched.royalties && formik.errors.royalties)}
              fullWidth
              helperText={formik.touched.royalties && formik.errors.royalties}
              label="Royalties"
              margin="normal"
              name="royalties"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.royalties}
              variant="outlined"
              sx={{ ml: 2 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Box>
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              disabled={formik.isSubmitting}
              size="large"
              variant="contained"
              sx={{
                background: '#000',
                width: 200,
                borderRadius: '50px',
                color: '#fff',
                mr: 2,
                '&:hover': {
                  background: '#000',
                },
              }}
              onClick={() => {
                formik.setFieldValue('status', CollectionStatusMap?.Deployed);
                formik.submitForm();
              }}
            >
              Deploy
            </Button>
            {formik?.values?.status === 1 ? (
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                size="large"
                variant="contained"
                sx={{
                  background: '#fff',
                  width: 200,
                  borderRadius: '50px',
                  color: '#000',
                  '&:hover': {
                    background: '#fff',
                  },
                }}
                onClick={() => {
                  formik.setFieldValue('status', CollectionStatusMap?.Draft);
                  formik.submitForm();
                }}
              >
                Save as Draft
              </Button>
            ) : null}
          </Box>
        </form>
      </Box>
      <Button
        startIcon={<ArrowBack sx={{ fontSize: 20 }} />}
        sx={{
          position: 'fixed',
          left: 20,
          top: 100,
          color: '#000',
          fontSize: 20,
          fontFamily: 'Georgia',
        }}
        onClick={() => {
          navigate(-1);
        }}
      >
        back
      </Button>
    </Container>
  );
}
