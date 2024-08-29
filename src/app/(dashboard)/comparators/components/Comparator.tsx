"use client"

import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import deleteComparator from "../mutations/deleteComparator"
import getComparator from "../queries/getComparator"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Edit, Trash } from "lucide-react"
import Image from "next/image"

export const Comparator = ({ comparatorId }: { comparatorId: number }) => {
  const router = useRouter()
  const [deleteComparatorMutation] = useMutation(deleteComparator)
  const [comparator] = useQuery(getComparator, { id: comparatorId })

  const handleDelete = async () => {
    if (window.confirm("This will be deleted")) {
      await deleteComparatorMutation({ id: comparator.id })
      router.push("/comparators")
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{comparator.name}</CardTitle>
        <CardDescription>{new Date(comparator.createdAt).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-4">
          <Image
            alt={`Logo of ${comparator.name}`}
            className="rounded-md object-cover"
            height={100} // Smaller logo
            src={comparator.logo || "/placeholder.svg"}
            width={100} // Smaller logo
          />
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Comparator Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Name</span>
              <span>{comparator.name}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Description</span>
              <span>{comparator.description}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Color</span>
              <span
                className="block h-6 w-6 rounded"
                style={{ backgroundColor: comparator.color }}
              />
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
      </CardContent>
      <CardFooter className="flex items-center border-t bg-muted/50 px-6 py-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => router.push(`/comparators/${comparator.id}/edit`)}
        >
          Edit
        </Button>
        <Button variant="destructive" size="sm" className="ml-2" onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
