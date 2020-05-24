import { toast } from "react-toastify";

const options:any = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
};

export const Notification = (message: string, type = 'info', notificationOptions = options) =>{
    switch(type){
        case 'info': return toast.info(message, notificationOptions);
    }
}
         