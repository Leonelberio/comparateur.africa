import { forwardRef, PropsWithoutRef } from "react"
import { useField, useFormikContext, ErrorMessage } from "formik"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface LabeledColorFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledColorField = forwardRef<HTMLInputElement, LabeledColorFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const [field] = useField(name)
    const { isSubmitting } = useFormikContext()

    return (
      <div {...outerProps} className="gap-6">
        <Label htmlFor={name}>{label}</Label>
        <Input
          id={name}
          {...field}
          type="color"
          disabled={isSubmitting}
          {...props}
          ref={ref}
          className="mt-2 h-10 w-16 border-none p-0"
        />
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

LabeledColorField.displayName = "LabeledColorField"

export default LabeledColorField
