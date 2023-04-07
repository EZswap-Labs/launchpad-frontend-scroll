/* eslint-disable react/jsx-props-no-spreading */
import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
import { Button } from '@mui/material';
import { uploadImage } from '../service/collection';

function UploadBanner({ setImageUrl }) {
  const onDrop = useCallback(async (acceptedFiles) => {
    const imgUrl = await uploadImage(acceptedFiles?.[0]);
    setImageUrl(imgUrl);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button
        variant="contained"
        sx={{
          my: 2,
        }}
      >
        UPLOAD BANNER
      </Button>
    </div>
  );
}

export default UploadBanner;
