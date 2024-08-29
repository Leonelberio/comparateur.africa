//@ts-nocheck

import { Ctx } from "blitz"
import db from "db"
import { CreateComparatorSchema } from "../schemas"
import { z } from "zod"

export default async function createComparator(
  input: z.infer<typeof CreateComparatorSchema>,
  ctx: Ctx
) {
  // Ensure the user is authenticated
  ctx.session.$authorize()

  // Get the current user id
  const userId = ctx.session.userId

  // Create the comparator with the ownerId set to the current user's ID
  const comparator = await db.comparator.create({
    data: {
      ...input,
      ownerId: userId, // Automatically set the ownerId
    },
  })

  return comparator
}
