// app/api/auth/[...nextauth]/route.ts
//@ts-nocheck

import NextAuth from "next-auth"
import { authOptions } from "@/lib/authOptions" // Adjust the path accordingly

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
