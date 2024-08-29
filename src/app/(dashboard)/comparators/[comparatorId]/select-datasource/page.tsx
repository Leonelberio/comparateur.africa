"use client"

import { useState } from "react"
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sheet } from "lucide-react"

export default function SelectDataSource({ params }: { params: { comparatorId: string } }) {
  return (
    <SessionProvider>
      <DataSourceContent comparatorId={params.comparatorId} />
    </SessionProvider>
  )
}

function DataSourceContent({ comparatorId }: { comparatorId: string }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [sheets, setSheets] = useState<{ id: string; name: string }[]>([])
  const [tabs, setTabs] = useState<string[]>([])
  const [columns, setColumns] = useState<string[]>([])
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]) // New state to store selected columns
  const [selectedSpreadsheet, setSelectedSpreadsheet] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState<string | null>(null)

  const handleSelectGoogleSheets = async () => {
    if (!session) {
      signIn("google")
      return
    }
    try {
      const response = await fetch("/api/google-sheets")
      if (!response.ok) {
        throw new Error("Failed to fetch Google Sheets data")
      }
      const data = await response.json()
      setSheets(data.sheets || [])
    } catch (error) {
      console.error("Error fetching Google Sheets data:", error)
      setSheets([]) // Clear the sheets state on error
    }
  }

  const handleSheetClick = async (spreadsheetId: string) => {
    try {
      const response = await fetch(`/api/google-sheets/${spreadsheetId}/tabs`)
      if (!response.ok) {
        throw new Error("Failed to fetch tabs")
      }
      const data = await response.json()
      setTabs(data.tabs || [])
      setSelectedSpreadsheet(spreadsheetId)
    } catch (error) {
      console.error("Error fetching tabs:", error)
      setTabs([])
    }
  }

  const handleTabClick = async (tabName: string) => {
    try {
      if (!selectedSpreadsheet) return

      const response = await fetch(
        `/api/google-sheets/${selectedSpreadsheet}/columns?tab=${tabName}`
      )
      if (!response.ok) {
        throw new Error("Failed to fetch columns")
      }
      const data = await response.json()

      // Filter out columns without any data
      const validColumns = data.columns.filter((column: string) => column && column.trim() !== "")
      setColumns(validColumns || [])
      setSelectedTab(tabName)
    } catch (error) {
      console.error("Error fetching columns:", error)
      setColumns([])
    }
  }

  const handleColumnToggle = (column: string) => {
    setSelectedColumns((prevSelected) =>
      prevSelected.includes(column)
        ? prevSelected.filter((c) => c !== column)
        : [...prevSelected, column]
    )
  }

  const handleNextClick = () => {
    // Save the selected columns to localStorage
    localStorage.setItem("selectedColumns", JSON.stringify(selectedColumns))
    router.push(`/comparators/${comparatorId}/views/compare`)
    router.refresh()
  }

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Choisir une source de données</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button onClick={handleSelectGoogleSheets}>
              {session ? "Rafraîchir les feuilles Google Sheets" : "Connectez-vous à Google Sheets"}
            </Button>
            {sheets.length > 0 && (
              <div className="grid gap-8">
                {sheets.map((sheet) => (
                  <div
                    key={sheet.id}
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => handleSheetClick(sheet.id)}
                  >
                    <Sheet />
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">{sheet.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {session && (
              <Button variant="destructive" onClick={() => signOut()}>
                Déconnecter
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal for Tabs */}
      <Dialog
        open={!!selectedSpreadsheet && !selectedTab}
        onOpenChange={() => setSelectedSpreadsheet(null)}
      >
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Choisissez une feuille</DialogTitle>
            <DialogDescription>Choisissez une feuille</DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-2">
            {tabs.map((tab, index) => (
              <label
                key={index}
                className="flex items-center space-x-3 cursor-pointer text-primary underline"
                onClick={() => handleTabClick(tab)}
              >
                <span>{tab}</span>
              </label>
            ))}
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setSelectedSpreadsheet(null)}>
              Annuler
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal for Columns */}
      <Dialog open={!!selectedTab} onOpenChange={() => setSelectedTab(null)}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sélectionner les champs</DialogTitle>
            <DialogDescription>Sélectionner les champs</DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-2">
            {columns.map((column, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`column-${index}`}
                  onCheckedChange={() => handleColumnToggle(column)}
                />
                <label
                  htmlFor={`column-${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {column}
                </label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setSelectedTab(null)}>
              Annuler
            </Button>
            <Button onClick={handleNextClick}>Suivant</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
