import { toast, ToastOptions, Id } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const showSuccessToast = (message: string, options?: ToastOptions): Id => {
  return toast.success(message, { ...defaultOptions, ...options });
};

export const showErrorToast = (message: string, options?: ToastOptions): Id => {
  return toast.error(message, { ...defaultOptions, autoClose: 5000, ...options });
};

export const showInfoToast = (message: string, options?: ToastOptions): Id => {
  return toast.info(message, { ...defaultOptions, ...options });
};

export const showWarningToast = (message: string, options?: ToastOptions): Id => {
  return toast.warning(message, { ...defaultOptions, ...options });
};

export const showLoadingToast = (message: string, options?: ToastOptions): Id => {
  return toast.loading(message, { ...defaultOptions, autoClose: false, ...options });
};

export const updateToast = (toastId: Id, options: ToastOptions & { render?: string }): void => {
  toast.update(toastId, options);
};

export const dismissToast = (toastId?: Id): void => {
  if (toastId) {
    toast.dismiss(toastId);
  } else {
    toast.dismiss();
  }
};
