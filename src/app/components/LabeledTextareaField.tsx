import { forwardRef, PropsWithoutRef } from "react"
import { useField, useFormikContext, ErrorMessage } from "formik"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export interface LabeledTextareaFieldProps
  extends PropsWithoutRef<JSX.IntrinsicElements["textarea"]> {
  name: string
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextareaField = forwardRef<HTMLTextAreaElement, LabeledTextareaFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const [field] = useField(name)
    const { isSubmitting } = useFormikContext()

    return (
      <div {...outerProps} className="gap-6">
        <Label htmlFor={name}>{label}</Label>
        <Textarea
          id={name}
          {...field}
          {...props}
          disabled={isSubmitting}
          ref={ref}
          className="mt-2"
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

LabeledTextareaField.displayName = "LabeledTextareaField"

export default LabeledTextareaField
