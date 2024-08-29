//@ts-nocheck

import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/authOptions"
import { google } from "googleapis"
import { getToken } from "next-auth/jwt"
import { getCachedSheetData } from "@/utils/sheetCache" // Import the caching utility

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sheetId = searchParams.get("sheetId")

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

    // If the access token is expired, refresh it
    if (oauth2Client.isTokenExpiring()) {
      const { credentials } = await oauth2Client.refreshAccessToken()
      oauth2Client.setCredentials(credentials)
    }

    if (!sheetId) {
      const drive = google.drive({ version: "v3", auth: oauth2Client })
      const response = await drive.files.list({
        q: "mimeType='application/vnd.google-apps.spreadsheet'",
        fields: "files(id, name)",
      })

      const files = response.data.files || []
      return NextResponse.json({ sheets: files })
    }

    // Get cached data or fetch it if needed
    const columns = await getCachedSheetData(sheetId, oauth2Client)

    return NextResponse.json({ columns })
  } catch (error) {
    console.error("Error fetching data from Google Drive:", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}
