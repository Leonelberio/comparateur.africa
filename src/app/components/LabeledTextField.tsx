import { forwardRef, PropsWithoutRef } from "react"
import { useField, useFormikContext, ErrorMessage } from "formik"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const [field] = useField(name)
    const { isSubmitting } = useFormikContext()

    return (
      <div {...outerProps} className="gap-6">
        <Label htmlFor={name}>{label}</Label>
        <Input id={name} {...field} {...props} disabled={isSubmitting} ref={ref} className="mt-2" />
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

LabeledTextField.displayName = "LabeledTextField"

export default LabeledTextField
