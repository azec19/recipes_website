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
  GridOptions
} from 'ag-grid-community';
import { Ingredient, Types_, Units_ } from "../lib/type"
import IngredientForm from '../Ingredient/addForm';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);


const types = Object.values(Object.values(Types_))

const units = Object.values(Object.values(Units_))


const gridOptions: GridOptions = {
  pagination: true,
  paginationPageSize: 10,
  paginationPageSizeSelector: [5, 10, 20, 50],
}

export default function GridComponent() {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<Ingredient[]>([{ id: 5, Name: "Carotte", Type: Types_.legume, Quantity: 6, Unit: Units_.Kg }]);
  const [pinnedBottomRowData, setPinnedBottomRowData] = useState([]);
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
    return params.data.Name ?? "new-row";
  }, []);

  const addNewRow = useCallback(() => {
    const { api } = gridRef.current || {};

    if (!api) {
      return;
    }
    
    api.setGridOption("pinnedBottomRowData", [
      { Name: null, Type: null, Quantity: null, Unit: null },
    ]);
    setTimeout(() => {
      api.startEditingCell({
        rowIndex: 0,
        rowPinned: "bottom",
        colKey: "Name",
      });
    });
    
    console.log("test");
  }, []);

  const onRowEditingStopped = useCallback(
    (params: RowEditingStoppedEvent) => {
      const { data } = params;

      setPinnedBottomRowData([]);

      if (data.Name == null) {
        return;
      }
      data.id = 2
      rowData.push(data)
      console.log(rowData);
      setRowData(rowData);
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
            <button type="button" onClick={addNewRow}>Add New Row</button>
          </div>
        </div>
        <div style={{ flex: "1 1 500px" }}>
          <div style={gridStyle}>
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
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