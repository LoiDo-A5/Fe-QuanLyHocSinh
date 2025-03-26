import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField } from '@mui/material';
import { axiosGet } from '@/utils/apis/axios';
import API from '@/configs/API';
import PaginationCustom from '@/commons/PaginationCustom';
import usePagination from '@/hooks/usePagination';
import useStyles from './style';

const ListStudent: React.FC = () => {
  const classes = useStyles();
  const [students, setStudents] = useState<any>({ results: [], count: 0, page_size: 10 });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { page, totalPage, onPageChange } = usePagination(students.count, students.page_size);

  const handleFetchStudents = async () => {
    const { success, data } = await axiosGet(API.AUTH.LIST_STUDENT, {
      params: {
        page,
        page_size: 10,
        search: searchQuery,  // Send the search query in the request
      }
    });

    if (success) {
      setStudents(data);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (_, newPage: number) => {
    onPageChange(newPage);
  };

  useEffect(() => {
    handleFetchStudents();
  }, [page, searchQuery]);  // Re-fetch when the page or search query changes

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Danh Sách Học Sinh
      </Typography>

      {/* Search Field */}
      <TextField
        label="Tìm kiếm theo Họ và Tên"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />

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
                <TableCell>{student?.student_score?.semester_1_avg ?? 'Chưa có điểm'}</TableCell>
                <TableCell>{student?.student_score?.semester_2_avg ?? 'Chưa có điểm'}</TableCell>
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
