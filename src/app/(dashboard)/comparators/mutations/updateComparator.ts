import { Ctx } from "blitz"
import db from "db"
import { UpdateComparatorSchema } from "../schemas"
import { z } from "zod"

export default async function updateComparator(
  input: z.infer<typeof UpdateComparatorSchema>,
  ctx: Ctx
) {
  // Ensure the user is authenticated
  ctx.session.$authorize()

  // Get the current user id
  const userId = ctx.session.userId

  // Fetch the existing comparator to check if the user is the owner
  const existingComparator = await db.comparator.findFirst({
    where: { id: input.id, ownerId: userId },
  })

  if (!existingComparator) {
    throw new Error("You don't have permission to update this comparator")
  }

  const updatedComparator = await db.comparator.update({
    where: { id: input.id },
    data: {
      ...input,
    },
  })

  return updatedComparator
}
