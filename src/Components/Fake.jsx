import React from 'react';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export default function OtherFile({ values, setFieldValue, handleBlur, errors, touched }) {
  return (
    <div style={{marginTop:50}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']} sx={{ width: '100%', marginTop: 0 }}>
          <Box>
            <Box>
              <DatePicker
                name='starting'
                id="starting"
                value={values.starting}
                onChange={(value) => setFieldValue("starting", value, true)}
                onBlur={handleBlur}
                label="Starting Date"
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              {errors.starting && touched.starting ? (
                <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.starting}</p>
              ) : null}
            </Box>
          </Box>
          <br />
          <Box>
            <Box>
              <DatePicker
                name='ending'
                id='ending'
                value={values.ending}
                onChange={(value) => setFieldValue("ending", value, true)}
                onBlur={handleBlur}
                label="Ending Date"
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              {errors.ending && touched.ending ? (
                <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.ending}</p>
              ) : null}
            </Box>
          </Box>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
