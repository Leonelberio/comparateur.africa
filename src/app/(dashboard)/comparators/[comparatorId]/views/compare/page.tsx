"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { DataComparator } from "../../../components/data-comparator"

const ComparatorView = () => {
  const { comparatorId } = useParams() // Use useParams to get the comparatorId from the URL

  const [selectedColumns, setSelectedColumns] = useState<string[]>([])

  useEffect(() => {
    if (comparatorId) {
      // Retrieve selected columns from localStorage or any other storage mechanism
      const selectedColumnsData = JSON.parse(localStorage.getItem("selectedColumns") || "[]")
      setSelectedColumns(selectedColumnsData)
    }
  }, [comparatorId])

  if (!comparatorId || selectedColumns.length === 0) {
    // Render loading or nothing until comparatorId and selectedColumns are available
    return <div>Loading...</div>
  }

  return (
    <div>
      <DataComparator
        selectedColumns={selectedColumns} // Pass the retrieved columns to the DataComparator
        title="Comparez les données"
        placeholder="Sélectionnez les champs"
      />
    </div>
  )
}

export default ComparatorView
