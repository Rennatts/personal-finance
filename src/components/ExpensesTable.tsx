import * as React from 'react';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import './ExpensesTable.css';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'item', headerName: 'Item', width: 160 },
  { field: 'tag', headerName: 'Tag', width: 160 },
  {
    field: 'value',
    headerName: 'price U$',
    type: 'number',
    width: 90,
  },
];

const rows = [
  { id: 1, item: 'Snow', tag: 'food', value: 35 },
  { id: 2, item: 'Lannister', tag: 'food', value: 42 },
  { id: 3, item: 'Lannister', tag: 'food', value: 45 },
  { id: 4, item: 'Stark', tag: 'clothing', value: 16 },
  { id: 5, item: 'Targaryen', tag: 'education', value: 100 },
  { id: 6, item: 'Melisandre', tag: 'food', value: 150 },
  { id: 7, item: 'Clifford', tag: 'clothing', value: 44 },
  { id: 8, item: 'Frances', tag: 'food', value: 36 },
  { id: 9, item: 'Roxie', tag: 'education', value: 65 },
];

export default function ExpensesTable() {
  return (
    <div className="expenses_table">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
