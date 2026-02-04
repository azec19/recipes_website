'use client'

import { useEffect, useState, useCallback, } from 'react'
import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  AllCommunityModule,
  ModuleRegistry,
  CellValueChangedEvent,
  CellClickedEvent,
  GetRowIdParams,
  GridOptions
} from 'ag-grid-community';
import { StockIngredient, Types_, Units_ } from "../lib/type"

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

type Props = {
  ingredients: StockIngredient[];
};

const types = Object.values(Object.values(Types_))

const units = Object.values(Object.values(Units_))



async function onCellValueChanged(event: CellValueChangedEvent<StockIngredient>) {
  const updatedIngredient = event.data;
  await fetch(`/api/ingredient`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedIngredient),
  });
}

async function DeleteIngredient(event: CellClickedEvent<StockIngredient>) {
  const stockingredient = event.data;
  await fetch(`/api/ingredient/name/${stockingredient?.ingredient.name}`, {
    method: 'DELETE',
  });
}

const gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [5,10,20,50],
}

export default function GridComponent(ingredient: Props) {
  const [rowData, setRowData] = useState<StockIngredient[]>(ingredient.ingredients);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "ingredient.name", flex: 2, filter: true, editable: true },
    {
      field: "ingredient.type", flex: 1, editable: true,
      filter: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: types
      },
    },
    { field: "quantity", flex: 1, editable: true },
    {
      field: "unit", flex: 1, editable: true,
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
      },
      valueGetter: () => "Delete",
      cellStyle : {cursor: 'pointer', 'textAlign':'center'}
    }
  ]);

  const getRowId = useCallback(
    (params: GetRowIdParams) => String(params.data.id),
    [],
  );


  return (
    <div className='bg-white text-black w-[80vw] mx-[5%] p-[3%] rounded-[30]'>
      <AgGridReact 
        rowData={rowData}
        columnDefs={columnDefs}
        gridOptions={gridOptions}
        onCellValueChanged={onCellValueChanged}
        getRowId={getRowId}
        domLayout="autoHeight"
      />
    </div>
  )
}