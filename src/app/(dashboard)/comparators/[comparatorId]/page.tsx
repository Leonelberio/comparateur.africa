import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getComparator from "../queries/getComparator"
import { Comparator } from "../components/Comparator"
import { Button } from "@/components/ui/button"
import { CardHeader, CardTitle } from "@/components/ui/card"

export async function generateMetadata({ params }: ComparatorPageProps): Promise<Metadata> {
  const Comparator = await invoke(getComparator, {
    id: Number(params.comparatorId),
  })
  return {
    title: `Comparator ${Comparator.id} - ${Comparator.name}`,
  }
}

type ComparatorPageProps = {
  params: { comparatorId: string }
}

export default async function Page({ params }: ComparatorPageProps) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Detail {params.comparatorId}</CardTitle>
      </CardHeader>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Comparator comparatorId={Number(params.comparatorId)} />
        </Suspense>
      </div>
    </div>
  )
}
