import React from 'react';
import { Avatar, Box, Container, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PaginationCustom from '../PaginationCustom';
import moment from 'moment';
import useStyles from './styles';

interface TabClassListProps {
  selectedClass: string;
  setSelectedClass: React.Dispatch<React.SetStateAction<string>>;
  classesList: any[];
  listStudents: any[];
  totalPage: number;
  page: number;
  onPageChange: (page: number) => void;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  handleClassChange: (event: React.ChangeEvent<{ value: unknown }>, page: number) => void;
}

const TabClassList: React.FC<TabClassListProps> = ({
  selectedClass,
  classesList,
  listStudents,
  totalPage,
  page,
  handlePageChange,
  handleClassChange
}) => {
  const classes = useStyles();


  return (
    <div >
      <Box mb={2}>
        <div className={classes.titleRoom}>DANH SÁCH LỚP</div>
      </Box>

      <FormControl fullWidth sx={{ marginBottom: 4 }}>
        <InputLabel id="class-select-label">Chọn lớp</InputLabel>
        <Select
          labelId="class-select-label"
          id="class-select"
          value={selectedClass}
          onChange={handleClassChange}
          label="Chọn lớp"
        >
          {classesList.map((classItem) => (
            <MenuItem key={classItem.id} value={classItem.id}>
              {`${classItem.level_name}${classItem.class_name}`}  - Sĩ số: {classItem.number_of_students}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Giới tính</TableCell>
              <TableCell>Ngày sinh</TableCell>
              <TableCell>Địa chỉ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listStudents.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.full_name}</TableCell>
                <TableCell>{student.gender === 0 ? 'Nam' : 'Nữ'}</TableCell>
                <TableCell>{moment(student.birthday).format('DD/MM/YYYY')}</TableCell>
                <TableCell>{student.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

export default TabClassList;
