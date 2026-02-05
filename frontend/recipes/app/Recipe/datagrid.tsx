'use client'

import { useRef, useMemo, useState, useCallback, } from 'react'
import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  AllCommunityModule,
  ModuleRegistry,
  GetRowIdParams,
  EditableCallbackParams,
  RowEditingStoppedEvent,
  GridOptions,
  RowSelectionOptions
} from 'ag-grid-community';
import { RecipeIngredient, Types_, Units_ } from "../lib/type"
import { listIngredients } from '../lib/Formstore';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);



const units = Object.values(Object.values(Units_))

const types = Object.values(Object.values(Types_))


const gridOptions: GridOptions = {
  pagination: true,
  paginationPageSize: 5,
  paginationPageSizeSelector: [5, 10, 20, 50],
}

const rowSelection: RowSelectionOptions = {
  mode: "multiRow",
  groupSelects: "descendants",
  headerCheckbox: false,
};

export default function GridComponent() {
  const { list, add, remove } = listIngredients();
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<RecipeIngredient[]>([]);
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
    {
      field: "quantity", flex: 1, editable: true, cellDataType: 'number',
    },
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

  const getRowId = useCallback(function (params: GetRowIdParams) {
    return params.data.ingredient.name ?? "new-row";
  }, []);

  const addNewRow = useCallback(() => {
    const { api } = gridRef.current || {};

    if (!api) {
      return;
    }

    api.setGridOption("pinnedBottomRowData", [
      { ingredient : {name: null, type: null}, quantity: null, unit: null },
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
        remove(dataItem.ingredient.name)
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
      add(data)


    },
    [rowData],
  );

  return (
    <div style={containerStyle}>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <div style={{ marginBottom: "5px", minHeight: "30px" }}>
            <button type="button" onClick={addNewRow}
              className='mr-7 text-[#07074D] pl-3 pr-3 p-1 border border-[#07074D] rounded-xl cursor-pointer hover:text-black hover:bg-gray-300'>Ajouter un nouvel ingrédient</button>
            <button type="button" onClick={removeSelected}
              className='text-[#07074D] pl-3 pr-3 p-1 border border-[#07074D] rounded-xl cursor-pointer hover:text-black hover:bg-gray-300'>Supprimer les ingrédients </button>
          </div>
        </div>
        <div style={{ flex: "1 1 305px" }}>
          <div style={gridStyle}>
            <AgGridReact
              ref={gridRef}
              gridOptions={gridOptions}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection={rowSelection}
              editType={"fullRow"}
              getRowId={getRowId}
              pinnedBottomRowData={pinnedBottomRowData}
              onRowEditingStopped={onRowEditingStopped}
            />
          </div>
        </div>
      </div>
    </div>
  );
}