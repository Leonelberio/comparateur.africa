//@ts-nocheck

import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/authOptions"
import { google } from "googleapis"
import { getToken } from "next-auth/jwt"
import { getCachedSheetColumns } from "@/utils/sheetCache" // Import the caching utility for columns

export async function GET(req: NextRequest, { params }: { params: { spreadsheetId: string } }) {
  const tabName = req.nextUrl.searchParams.get("tab")

  if (!tabName) {
    return NextResponse.json({ error: "Tab name is required" }, { status: 400 })
  }

  try {
    const session = await getServerSession({ req, authOptions })
    const token = await getToken({ req })

    if (!session) {
      return NextResponse.json({ error: "No Session Active" }, { status: 401 })
    }

    const accessToken = token?.accessToken
    const refreshToken = token?.refreshToken

    if (!accessToken) {
      return NextResponse.json({ error: "No Access Token" }, { status: 401 })
    }

    const oauth2Client = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })

    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    })

    // Use cached data or fetch it if not cached
    const columns = await getCachedSheetColumns(params.spreadsheetId, tabName, oauth2Client)

    return NextResponse.json({ columns })
  } catch (error) {
    console.error("Error fetching columns from tab:", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}
