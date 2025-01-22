import { useState } from "react"

export const useForm = <T extends Record<string, unknown>>(initialValue: T) => {
  const [formState, setFormState] = useState<T>(initialValue)

  const handleChange = (key: keyof T, value: unknown) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }

  const reset = () => {
    setFormState(initialValue)
  }

  return {
    formState,
    setFormState,
    handleChange,
    reset,
  }
}
