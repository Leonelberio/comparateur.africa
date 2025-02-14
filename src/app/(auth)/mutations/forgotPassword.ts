import { generateToken, hash256 } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { forgotPasswordMailer } from "mailers/forgotPasswordMailer"
import { ForgotPassword } from "../validations"

const RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS = 4

export default resolver.pipe(resolver.zod(ForgotPassword), async ({ email }) => {
  const user = await db.user.findFirst({ where: { email: email.toLowerCase() } })

  if (user) {
    const token = generateToken()
    const hashedToken = hash256(token)
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS)

    await db.token.deleteMany({ where: { type: "RESET_PASSWORD", userId: user.id } })
    await db.token.create({
      data: {
        user: { connect: { id: user.id } },
        type: "RESET_PASSWORD",
        expiresAt,
        hashedToken,
        sentTo: user.email,
      },
    })
    await forgotPasswordMailer({ to: user.email, token }).send()
  } else {
    await new Promise((resolve) => setTimeout(resolve, 750))
  }

  return
})
