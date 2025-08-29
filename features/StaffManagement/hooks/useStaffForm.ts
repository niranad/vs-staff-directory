import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { staffSchema } from "../../../schemas/staff.schema";

export const useStaffForm = () => {
  const { 
    getValues, 
    control,
    reset,
    setValue,
    trigger,
    formState,
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
      gradeLevel: '',
    },
    mode: 'onChange'
  })

  return { control, formState, reset, trigger, setValue, getValues }
}
