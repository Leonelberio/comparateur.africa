import { z } from "zod"

export const CreateComparatorSchema = z.object({
  // ownerId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  logo: z.string().optional(),
  color: z.string().optional(),
  toolType: z.string(),

  // template: __fieldName__: z.__zodType__(),
})
export const UpdateComparatorSchema = CreateComparatorSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteComparatorSchema = z.object({
  id: z.number(),
})
