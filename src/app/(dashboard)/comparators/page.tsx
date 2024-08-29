import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { ComparatorsList } from "./components/ComparatorsList"

export const metadata: Metadata = {
  title: "Comparators",
  description: "List of comparators",
}

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ComparatorsList />
      </Suspense>
    </div>
  )
}
