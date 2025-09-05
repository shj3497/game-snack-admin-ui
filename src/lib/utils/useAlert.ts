'use client';

import {useSnackbar} from 'notistack';

const useAlert = () => {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const showAlert = enqueueSnackbar;
  const closeAlert = closeSnackbar;

  return {showAlert, closeAlert};
};

export default useAlert;
