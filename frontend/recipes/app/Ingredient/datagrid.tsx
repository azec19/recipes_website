'use client'

import { useEffect, useState, useCallback, } from 'react'
import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  AllCommunityModule,
  ModuleRegistry,
  CellValueChangedEvent,
  CellClickedEvent,
  GetRowIdFunc,
  GetRowIdParams,
} from 'ag-grid-community';
import { Ingredient, Types_, Units_ } from "../lib/type"

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

type Props = {
  ingredients: Ingredient[];
};

const types = Object.values(Object.values(Types_))

const units = Object.values(Object.values(Units_))



async function onCellValueChanged(event: CellValueChangedEvent<Ingredient>) {
  const updatedIngredient = event.data;
  await fetch(`/api/ingredient`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedIngredient),
  });
}

async function DeleteIngredient(event: CellClickedEvent<Ingredient>) {
  const ingredient = event.data;
  await fetch(`/api/ingredient/name/${ingredient?.Name}`, {
    method: 'DELETE',
  });
}

export default function GridComponent(ingredient: Props) {
  const [rowData, setRowData] = useState<Ingredient[]>(ingredient.ingredients);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "Name", flex: 2, filter: true, editable: true },
    {
      field: "Type", flex: 1, editable: true,
      filter: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: types
      },
    },
    { field: "Quantity", flex: 1, editable: true },
    {
      field: "Unit", flex: 1, editable: true,
      filter: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: units
      },
    },
    {
      field: "Action",
      onCellClicked: (event: CellClickedEvent) => {
        DeleteIngredient(event)
        event.api?.applyTransaction({ remove: [event.data] });
      }
    }
  ]);

  const getRowId = useCallback(
    (params: GetRowIdParams) => String(params.data.id),
    [],
  );


  return (
    <div style={{ width: "80vw", height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onCellValueChanged={onCellValueChanged}
        getRowId={getRowId}
      />
    </div>
  )
}