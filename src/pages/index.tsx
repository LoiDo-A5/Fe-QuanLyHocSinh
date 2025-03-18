import React, { useEffect, useState } from 'react';
import useStyles from '../styles/list-room/useListRoomStyle';
import PrivateRoute from '@/commons/PrivateRoute';
import { Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { axiosGet } from '@/utils/apis/axios';
import API from '@/configs/API';
import PaginationCustom from '@/commons/PaginationCustom';
import usePagination from '@/hooks/usePagination';

const HomePage: React.FC = () => {
    const classes = useStyles();
    const [classesList, setClassesList] = useState<any[]>([]);
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [students, setStudents] = useState<any>([]);

    const { page, totalPage, onPageChange } = usePagination(students?.count || 0, students?.page_size || 10);

    const getClassList = async () => {
        const { success, data } = await axiosGet(API.CLASS.NAMES);

        if (success) {
            setClassesList(data);
        }
    };

    const getStudentsInClass = async () => {
        if (!selectedClass) return;

        const { success, data } = await axiosGet(`${API.CLASS.CLASS_LIST}`, {
            params: {
                class_id: selectedClass,
                page,
                page_size: 10
            }
        });

        if (success) {
            setStudents(data);
        }
    };


    const handleClassChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedClass(event.target.value as string);
        onPageChange(1);
    };

    const handlePageChange = (_, newPage: number) => {
        onPageChange(newPage);
    };

    const listStudents = students?.results?.students || [];

    useEffect(() => {
        getClassList();
    }, []);

    useEffect(() => {
        getStudentsInClass();
    }, [selectedClass, page]);

    return (
        <PrivateRoute>
            <Container className={classes.background}>
                <Box mt={4}>
                    <div className={classes.titleRoom}>QUẢN LÝ LỚP</div>
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
                                {classItem.class_name} - Sĩ số: {classItem.number_of_students}
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
                                    <TableCell>{student.birthday}</TableCell>
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
            </Container>
        </PrivateRoute>
    );
};


export default HomePage;
