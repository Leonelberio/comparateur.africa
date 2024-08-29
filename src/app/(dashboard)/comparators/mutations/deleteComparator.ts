import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteComparatorSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteComparatorSchema),
  resolver.authorize(),
  async ({ id }, ctx) => {
    // Ensure the user is authenticated
    const userId = ctx.session.userId

    // Find the comparator and ensure it belongs to the current user
    const comparator = await db.comparator.findFirst({
      where: { id, ownerId: userId },
    })

    if (!comparator) {
      throw new Error("You don't have permission to delete this comparator")
    }

    // Delete the comparator
    await db.comparator.delete({ where: { id } })

    return comparator
  }
)
