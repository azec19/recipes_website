'use client'

import { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { Ingredient } from "../lib/type"

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

type Props = {
  ingredients: Ingredient[];
};

export default function GridComponent (ingredient:Props) {
  const [rowData, setRowData] = useState<Ingredient[]>(ingredient.ingredients);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "Name", flex: 2, filter: true },
    { field: "Type", flex: 1 },
    { field: "Quantity", flex: 1 },
    { field: "Unit", flex: 1 }
  ]);

  

        return (
            <div style={{  width: "80vw", height: 500 }}>
                <AgGridReact rowData={rowData} columnDefs={columnDefs} />
            </div>
        )
}