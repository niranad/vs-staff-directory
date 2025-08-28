import { gradeLevelSchema } from "@/schemas/gradeLevel.schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

export const useGradeLevelForm = () => {
  const { control, getValues, reset, trigger, setValue, formState } = useForm({
    resolver: yupResolver(gradeLevelSchema),
    defaultValues: {
      id: '',
      level: '',
      sort: 0,
    },
    mode: 'onChange'
  })

  return { control, formState, reset, trigger, setValue, getValues }
}