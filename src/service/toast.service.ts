import Toast, {
  ToastType,
  ToastPosition,
  ToastHideParams,
  ToastShowParams,
} from 'react-native-toast-message';

interface ToastProps {
  position?: ToastPosition;
  type?: ToastType;
  isVisible?: boolean;
  text1?: string | undefined;
  text2?: string | undefined;
  show?: (params: ToastShowParams) => void;
  hide?: (params: ToastHideParams) => void;
  onPress?: () => void;
}

export const showToast = (toastProps: ToastProps) => {
  Toast.show(toastProps);
};
