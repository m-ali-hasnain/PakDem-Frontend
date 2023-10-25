import React, { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import theme from '../Theme/Theme';
import { useNavigate } from 'react-router-dom';
import LinearWithValueLabel from './Loader';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv';

export default function DataTable({ data, nav, isPayment }) {

  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10); 
  

  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const tableRef = useRef(null);

  const exportCsv = (exportData = data) => {
    const csvOptions = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      useBom: true,
      useKeysAsHeaders: true,
    };
    
    const csvExporter = new ExportToCsv(csvOptions);
    csvExporter.generateCsv(exportData);
  };
  

  const exportAllData = () => {
    exportCsv();
  };

  const exportPageRows = () => {
    const startRow = currentPage * currentPageSize;
    const endRow = startRow + currentPageSize;
  
    // Slice the rows array to get only the rows for the current page
    const currentPageRows = data.slice(startRow, endRow).filter(Boolean);
  
    console.log("currentPageRows:", currentPageRows);
  
    // Export the current page rows
    exportCsv(currentPageRows);
  };
  

  if (showLoading && (!data || data.length === 0)) {
    return (
      <Box
        sx={{
          width: '90%',
          mx: 'auto',
          pt: '5.4%',
          pb: '5.4%',
        }}
      >
        <Typography>Loading Data...</Typography>
        <LinearWithValueLabel />
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '2%' }}>
        <Typography sx={{ padding: '5%' }}>No Data Available</Typography>
      </Box>
    );
  }

  const keys = Object.keys(data[0]);

  const showViewPrintColumn = !isPayment;

  const formatHeader = (key) => {
    const words = key.split('_');
    const formattedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return formattedWords.join(' ');
  };

  const columns = [
    ...keys.slice(1).map((key) => ({
      field: key,
      headerName: formatHeader(key),
      suppressSizeToFit: true,
      flex: 1,
      headerClassName: 'super-app-theme--header',
    })),
    showViewPrintColumn && {
      field: 'View',
      headerName: 'Action',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ mb: 1 }}
              onClick={() => handleAction1(params.row.id)}
            >
              View
            </Button>
          </Box>
        );
      },
    },
  ].filter(Boolean);

  const rows = data.map((item, index) => {
    const rowData = {};
    keys.slice(1).forEach((key) => {
      rowData[key] = item[key];
    });
    return { id: item[keys[0]], ...rowData, Action1: '' };
  });

  const handleAction1 = (id) => {
    navigate(`/${nav}/${id}`);
  };

  const renderCustomCell = (params) => {
    return (
      <div style={{ padding: 8, lineHeight: '1.5rem' }}>
        <div>{params.value}</div>
      </div>
    );
  };

  return (
    <Box sx={{ width: '100%', padding: '2%' }}>
      <Box
        sx={{
          display:'flex',justifyContent:'flex-end',
          mr:'5%'
        
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FileDownloadIcon />}
          onClick={exportAllData}
          sx={{ marginBottom: '1rem' }}
        >
          Export To Excel
        </Button>
      </Box>




      <DataGrid
        sx={{
          backgroundColor: theme.palette.primary.background,
          border: '1.5px solid #009688',
          borderRadius: 5,
          boxShadow: 10,
          width: '96%',
          '& .super-app-theme--header': {
            
            color: 'black',
            fontFamily: 'sans-serif',
            fontWeight: 800,
            fontSize: 18,
          
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            
            whiteSpace: "normal",
            lineHeight: "normal"
          },
          "& .MuiDataGrid-columnHeader": {
            
            height: "unset !important"
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom:'1.5px #009688 solid',
            minHeight : '80px !important',
            maxHeight: "168px !important"
          },
            "& .MuiDataGrid-cellContent": {
              
              whiteSpace: "normal",
              lineHeight: "normal",
            
          }
        }}
        rows={rows}
        columns={columns}
        renderCell={renderCustomCell}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        onPageChange={(params) => {
          setCurrentPage(params.pagination.page);
        }}
        onPageSizeChange={(params) => {
          setCurrentPageSize(params.pagination.pageSize);
        }}
        pageSizeOptions={[10, 15, 20, 30]}
        rowHeight={100}
        headerHeight={100}
        apiRef={tableRef}
      />
    </Box>
  );
}
