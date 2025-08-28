import * as yup from 'yup';

export const gradeLevelSchema = yup.object({
  id: yup.string(),
  level: yup.string().min(2).required("Name is required"),
  sort: yup.number().required("Sort is required"),
})