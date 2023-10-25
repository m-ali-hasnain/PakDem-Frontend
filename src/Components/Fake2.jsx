import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
}

export default function FakeTable({ data}) {

  const formatHeader = (key) => {
    const words = key.split('_');
    const formattedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return formattedWords.join(' ');
  };

  
  const keys = Object.keys(data[0]);

  const columns = [
    ...keys.slice(1).map((key) => ({
      field: key,
      headerName: formatHeader(key),
      suppressSizeToFit: true,
      flex: 1,
      headerClassName: 'super-app-theme--header',
    }))
  ].filter(Boolean);

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={data} // Assuming your data is an array of rows
        columns={columns} // Pass your column configuration here
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
