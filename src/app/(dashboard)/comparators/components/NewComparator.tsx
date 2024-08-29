"use client"

import { CreateComparatorSchema } from "../schemas"
import { useMutation } from "@blitzjs/rpc"
import createComparator from "../mutations/createComparator"
import { useRouter } from "next/navigation"
import { ComparatorForm, FORM_ERROR } from "./ComparatorForm"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense } from "react"

export function New__ModelName() {
  const [createComparatorMutation] = useMutation(createComparator)
  const router = useRouter()
  return (
    <div className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Créer un comparateur</CardTitle>
      </CardHeader>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <ComparatorForm
            submitText="Créer le comparateur"
            schema={CreateComparatorSchema}
            onSubmit={async (values) => {
              try {
                const comparator = await createComparatorMutation(values)
                // After creating the comparator, navigate to the datasource selection step
                router.push(`/comparators/${comparator.id}/select-datasource`)
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Suspense>
      </div>
    </div>
  )
}
