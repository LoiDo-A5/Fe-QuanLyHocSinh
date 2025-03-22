import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { axiosGet } from '@/utils/apis/axios';
import API from '@/configs/API';
import PaginationCustom from '@/commons/PaginationCustom';
import usePagination from '@/hooks/usePagination';
import useStyles from './style';

const ListStudent: React.FC = () => {
  const classes = useStyles();
  const [students, setStudents] = useState<any[]>([]);
  const { page, totalPage, onPageChange } = usePagination(students?.count || 0, students?.page_size || 10);

  const handleFetchStudents = async () => {
    const { success, data } = await axiosGet(API.AUTH.LIST_STUDENT, {
      params: {
        page,
        page_size: 10,
      }
    });

    if (success) {
      setStudents(data);
    }
  };

  const handlePageChange = (_, newPage: number) => {
    onPageChange(newPage);
  };

  useEffect(() => {
    handleFetchStudents();
  }, [page]);  // Re-fetch when the page changes

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Danh Sách Học Sinh
      </Typography>

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
            {students.results?.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                <TableCell>{student.full_name}</TableCell>
                <TableCell>{student.class_name}</TableCell>
                <TableCell>{student.semester_1_avg ?? 'Chưa có điểm'}</TableCell>
                <TableCell>{student.semester_2_avg ?? 'Chưa có điểm'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Hiển thị phân trang */}
      {!!totalPage && (
        <PaginationCustom
          paginationStyle={classes.pagination}
          count={totalPage}
          page={page}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ListStudent;
