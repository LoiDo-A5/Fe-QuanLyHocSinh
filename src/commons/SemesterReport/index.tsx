import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper
} from '@mui/material';
import { axiosGet } from '@/utils/apis/axios';
import API from '@/configs/API';
import useStyles from './style';
import { ToastTopHelper } from '@/utils/utils';

const SemesterReport: React.FC = () => {
  const classes = useStyles();
  const [semester, setSemester] = useState<number>(1);
  const [reportData, setReportData] = useState<any[]>([]);

  console.log('semester', semester)

  const handleFetchSemesterReport = async () => {
    if (!semester) {
      ToastTopHelper.error('Vui lòng chọn học kỳ');
      return;
    }

    const { success, data } = await axiosGet(API.SEMESTER_REPORT.LIST, {
      params: { semester },
    });

    if (success) {
      setReportData(data);
    }
  };

  return (
    <Container className={classes.wrapContainer}>
      <Typography variant="h4" gutterBottom>
        Báo Cáo Tổng Kết Học Kỳ
      </Typography>

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={4}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Chọn Học Kỳ</InputLabel>
            <Select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              label="Chọn Học Kỳ"
            >
              <MenuItem value={1}>Học kỳ 1</MenuItem>
              <MenuItem value={2}>Học kỳ 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <Button variant="contained" color="primary" fullWidth onClick={handleFetchSemesterReport}>
            Xem Báo Cáo
          </Button>
        </Grid>
      </Grid>

      {reportData.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
            Học kỳ: {semester}
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Lớp</TableCell>
                  <TableCell>Sĩ số</TableCell>
                  <TableCell>Số lượng đạt</TableCell>
                  <TableCell>Tỷ lệ (%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.class_name}</TableCell>
                    <TableCell>{row.total_students}</TableCell>
                    <TableCell>{row.passed_students}</TableCell>
                    <TableCell>{row.passed_ratio}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default SemesterReport;
