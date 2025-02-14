"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataCombobox } from "./data-combobox"
import { CriteriaCombobox } from "./criteria-combobox"

interface DataComparatorProps {
  selectedColumns: string[] // Received from previous step
  title: string
  placeholder: string
}

export function DataComparator({
  selectedColumns, // selected columns passed as prop
  title,
  placeholder,
}: DataComparatorProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([])
  const [showComparison, setShowComparison] = useState(false)

  const handleCompare = () => {
    if (selectedOptions.length > 0) {
      setShowComparison(true)
    } else {
      alert("Please select at least one option to compare.")
    }
  }

  const handleCriteriaChange = (newCriteria: string[]) => {
    setSelectedCriteria(newCriteria)
  }

  const renderComparisonTable = () => {
    return (
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableCaption>A comparison between the selected options.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px] md:w-[200px] text-center">Criteria</TableHead>
              {selectedOptions.map((option, index) => (
                <TableHead key={index} className="w-[300px] md:w-[400px] text-center">
                  {option}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedCriteria.map((criterion, index) => (
              <TableRow key={index}>
                <TableCell>{criterion}</TableCell>
                {selectedOptions.map((option, optIndex) => (
                  <TableCell key={optIndex}>{/* Here you can show relevant data */}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={selectedOptions.length + 1} className="text-center">
                Comparison completed.
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-start md:items-center mb-4">
        {/* DataCombobox */}
        <div className="flex-1 w-full md:w-3/5">
          <DataCombobox
            options={selectedColumns} // Use selected columns here
            onSelect={setSelectedOptions}
            placeholder={placeholder}
          />
        </div>

        {/* CriteriaCombobox */}
        <div className="w-full md:w-1/5">
          <CriteriaCombobox
            criteria={selectedColumns}
            onCriteriaChange={handleCriteriaChange}
            placeholder="Criteria"
          />
        </div>

        {/* Compare button */}
        <div className="w-full md:w-1/5">
          <Button onClick={handleCompare} className="w-full">
            Compare
          </Button>
        </div>
      </div>
      {showComparison && renderComparisonTable()}
    </div>
  )
}
