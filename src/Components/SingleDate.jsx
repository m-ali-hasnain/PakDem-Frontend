import React from 'react';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

export default function SingleDateSelector({ values, setFieldValue, handleBlur, errors, touched }) {


  return (
    <div>
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
                label="Choose Date"
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              {errors.starting && touched.starting ? (
                <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.starting}</p>
              ) : null}
            </Box>
          </Box>
          <br />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
