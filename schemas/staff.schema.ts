import * as yup from 'yup';

export const staffSchema = yup.object({
  id: yup.string(),
  name: yup.string().min(3).required("Name is required"),
  role: yup.string().required("Position is required"),
  department: yup.string().required("Department is required"),
  address: yup.string().required("Address is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  gradeLevel: yup.string().nullable(),
})