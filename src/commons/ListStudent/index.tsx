import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { axiosGet } from '@/utils/apis/axios';
import API from '@/configs/API';

const ListStudent: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);

  const handleFetchStudents = async () => {
    const { success, data } = await axiosGet(API.AUTH.LIST_STUDENT);
    console.log('1111111data', data)
    if (success) {
      setStudents(data);
    }
  };

  useEffect(() => {
    handleFetchStudents();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Danh Sách Học Sinh</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Họ và Tên</TableCell>
              <TableCell>Lớp</TableCell>
              <TableCell>Điểm Học Kỳ 1</TableCell>
              <TableCell>Điểm Học Kỳ 2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.full_name}</TableCell>
                <TableCell>{student.class_name}</TableCell>
                <TableCell>{student.semester_1_avg ?? 'Chưa có điểm'}</TableCell>
                <TableCell>{student.semester_2_avg ?? 'Chưa có điểm'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListStudent;
