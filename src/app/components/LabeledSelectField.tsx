import { forwardRef, PropsWithoutRef } from "react"
import { useField, useFormikContext, ErrorMessage } from "formik"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export interface LabeledSelectFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["select"]> {
  name: string
  label: string
  options: { value: string; label: string }[]
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledSelectField = forwardRef<HTMLSelectElement, LabeledSelectFieldProps>(
  ({ name, label, options, outerProps, ...props }, ref) => {
    const [field, , helpers] = useField(name)
    const { isSubmitting } = useFormikContext()

    return (
      <div {...outerProps} className="gap-6">
        <Label htmlFor={name}>{label}</Label>
        <Select
          value={field.value}
          onValueChange={(value) => helpers.setValue(value)}
          disabled={isSubmitting}
        >
          <SelectTrigger id={name} className="mt-2">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ErrorMessage name={name}>
          {(msg) => (
            <div role="alert" className="text-red-500 text-sm mt-1">
              {msg}
            </div>
          )}
        </ErrorMessage>
      </div>
    )
  }
)

LabeledSelectField.displayName = "LabeledSelectField"

export default LabeledSelectField
