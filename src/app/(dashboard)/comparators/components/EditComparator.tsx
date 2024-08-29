"use client"
import { Suspense } from "react"
import updateComparator from "../mutations/updateComparator"
import getComparator from "../queries/getComparator"
import { UpdateComparatorSchema } from "../schemas"
import { FORM_ERROR, ComparatorForm } from "./ComparatorForm"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const EditComparator = ({ comparatorId }: { comparatorId: number }) => {
  const [comparator, { setQueryData }] = useQuery(
    getComparator,
    { id: comparatorId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateComparatorMutation] = useMutation(updateComparator)
  const router = useRouter()

  return (
    <div className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Modifier {comparator.name}</CardTitle>
      </CardHeader>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <ComparatorForm
            submitText="Modifier"
            schema={UpdateComparatorSchema}
            initialValues={comparator}
            onSubmit={async (values) => {
              try {
                const updated = await updateComparatorMutation({
                  ...values,
                  id: comparator.id,
                })
                await setQueryData(updated)
                router.refresh()
                router.push(`/comparators/${updated.id}`) // Redirect to the detail page
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
