import LabeledColorField from "@/src/app/components/LabeledColorField"
import LabeledSelectField from "@/src/app/components/LabeledSelectField"
import LabeledTextareaField from "@/src/app/components/LabeledTextareaField"
import LabeledTextField from "@/src/app/components/LabeledTextField"
import React from "react"
import { Form, FormProps } from "src/app/components/Form"
import { z } from "zod"

export { FORM_ERROR } from "src/app/components/Form"

export function ComparatorForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
      <LabeledSelectField
        name="toolType"
        label="Tool Type"
        options={[
          { value: "comparator", label: "Comparator" },
          // Add more tool types if needed
        ]}
      />
      {/* <LabeledTextField name="ownerId" label="Owner Id" placeholder="Owner Id" type="text" /> */}
      <LabeledTextField name="name" label="Name" placeholder="Name" type="text" />
      <LabeledTextareaField name="description" label="Description" placeholder="Description" />
      <LabeledTextField name="logo" label="Logo" placeholder="Logo URL" type="text" />
      <LabeledColorField name="color" label="Color" placeholder="Color" />
    </Form>
  )
}
