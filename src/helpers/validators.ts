import * as Yup from "yup";

const phoneRegExp: RegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const loginPhone = Yup.object({
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("requires 10 digit mobile number"),
});

export const notificationFormValidator = Yup.object({
  title: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
});

export const addBannerValidator = Yup.object({
  sellerId: Yup.string().required("Required"),
  position: Yup.string().required("Required"),
});
