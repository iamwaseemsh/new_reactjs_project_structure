import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Initialize the toast container
// toast.configure();

const toastService = {
  success(message) {
    toast.success(message);
  },

  error(message) {
    toast.error(message);
  },

  info(message) {
    toast.info(message);
  },

  warning(message) {
    toast.warn(message);
  },
};

export default toastService;
