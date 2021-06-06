import * as Yup from "yup";

const phoneRegExp: RegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const loginPhone = Yup.object({
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("requires 10 digit mobile number"),
});
