import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { staffSchema } from "../../../schemas/staff.schema";

export const useStaffForm = () => {
  const { 
    getValues, 
    control,
    formState: { isValid, errors }
  } = useForm({
    resolver: yupResolver(staffSchema),
    defaultValues: {
      id: '',
      name: '',
      role: '',
      department: '',
      address: '',
      country: '',
      state: '',
      gradeLevel: null,
    }
  })

  return { isValid, control, errors, getValues }
}
