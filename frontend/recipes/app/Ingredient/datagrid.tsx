'use client'

import { useRef, useMemo, useState, useCallback, } from 'react'
import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  AllCommunityModule,
  ModuleRegistry,
  CellValueChangedEvent,
  EditableCallbackParams,
  RowSelectionOptions,
  RowEditingStoppedEvent,
  GetRowIdParams,
  GridOptions
} from 'ag-grid-community';
import { StockIngredient, Types_, Units_ } from "../lib/type"

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

type Props = {
  ingredients: StockIngredient[];
  onSubmit: (Ingredient: StockIngredient) => Promise<void>;
};

const types = Object.values(Object.values(Types_))

const units = Object.values(Object.values(Units_))

const rowSelection: RowSelectionOptions = {
  mode: "multiRow",
  groupSelects: "descendants",
  headerCheckbox: false,
};


async function onRowValueChanged(event: CellValueChangedEvent<StockIngredient>) {
  const updatedIngredient = event.data;
  console.log(updatedIngredient);
  
  await fetch(`/api/stockIngredient`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedIngredient),
  });
}

async function DeleteIngredient(name: string) {
  await fetch(`/api/stockIngredient/name/${name}`, {
    method: 'DELETE',
  });
}

const gridOptions: GridOptions = {
  pagination: true,
  paginationPageSize: 10,
  paginationPageSizeSelector: [5, 10, 20, 50],
}



export default function GridComponent(Props: Props) {
  const [rowData, setRowData] = useState<StockIngredient[]>(Props.ingredients);
  const gridRef = useRef<AgGridReact>(null);
  const [pinnedBottomRowData, setPinnedBottomRowData] = useState([]);
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
    { field: "quantity", flex: 1, editable: true, cellDataType: 'number', },
    {
      field: "unit", flex: 1, editable: true,
      filter: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: units
      },
    },
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 250,
      editable: (params: EditableCallbackParams) => {
        return params.node.id === "new-row";
      },
    };
  }, []);

  // const getRowId = useCallback(
  //   (params: GetRowIdParams) => String(params.data.id),
  //   [],
  // );

  const getRowId = useCallback(function (params: GetRowIdParams) {
    return params.data.ingredient.name ?? "new-row";
  }, []);


  const addNewRow = useCallback(() => {
    const { api } = gridRef.current || {};

    if (!api) {
      return;
    }

    api.setGridOption("pinnedBottomRowData", [
      { ingredient: { name: null, type: null }, quantity: null, unit: null },
    ]);
    setTimeout(() => {
      api.startEditingCell({
        rowIndex: 0,
        rowPinned: "bottom",
        colKey: "ingredient.name",
      });
    });

  }, []);


  const removeSelected = useCallback(() => {
    const selectedRowNodes = gridRef.current!.api.getSelectedNodes();
    const selectedIds = selectedRowNodes.map(function (rowNode) {
      return rowNode.id;
    });
    const filteredData = rowData.filter(function (dataItem) {
      if (selectedIds.indexOf(dataItem.ingredient.name) >= 0)
        DeleteIngredient(dataItem.ingredient.name)
      return selectedIds.indexOf(dataItem.ingredient.name) < 0
    });
    setRowData(filteredData);

  }, [rowData]);

  const onRowEditingStopped = useCallback(
    (params: RowEditingStoppedEvent) => {
      const { data } = params;

      setPinnedBottomRowData([]);

      if (data.ingredient.name == null) {
        return;
      }
      if (data.quantity == null)
        data.quantity = 1;
      setRowData([data, ...rowData]);
      
      Props.onSubmit(data)
    },
    [rowData],
  );




  return (
    <div className='bg-white text-black w-[80vw] mx-[5%] p-[3%] rounded-[30]'>
      <div>
        <div style={{ marginBottom: "5px", minHeight: "30px" }}>
          <button type="button" onClick={addNewRow}
            className='mr-7 text-[#07074D] pl-3 pr-3 p-1 border border-[#07074D] rounded-xl cursor-pointer hover:text-black hover:bg-gray-300'>Ajouter un nouvel ingrédient</button>
          <button type="button" onClick={removeSelected}
            className='text-[#07074D] pl-3 pr-3 p-1 border border-[#07074D] rounded-xl cursor-pointer hover:text-black hover:bg-gray-300'>Supprimer les ingrédients </button>
        </div>
      </div>

      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        gridOptions={gridOptions}
        onRowValueChanged={onRowValueChanged}
        getRowId={getRowId}
        domLayout="autoHeight"
        defaultColDef={defaultColDef}
        rowSelection={rowSelection}
        editType={"fullRow"}
        pinnedBottomRowData={pinnedBottomRowData}
        onRowEditingStopped={onRowEditingStopped}


      />
    </div>
  )
}