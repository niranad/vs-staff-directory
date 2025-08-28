import { gradeLevelSchema } from "@/schemas/gradeLevel.schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

export const useGradeLevelForm = () => {
  const { control, getValues, formState: { isValid }} = useForm({
    resolver: yupResolver(gradeLevelSchema),
    defaultValues: {
      id: '',
      level: '',
      sort: 0,
    }
  })

  return { control, isValid, getValues }
}