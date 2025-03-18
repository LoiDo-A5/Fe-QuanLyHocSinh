import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, TextField, Typography, FormControl, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Autocomplete, InputLabel, Select, MenuItem } from '@mui/material';
import { axiosGet, axiosPost } from '../utils/apis/axios';
import API from '../configs/API';
import { ToastTopHelper } from '@/utils/utils';
import { useRouter } from 'next/router';
import PrivateRoute from '@/commons/PrivateRoute';
import useStyles from "../styles/class-management/useClassManagementStyle";

const AddStudentClass: React.FC = () => {
    const classes = useStyles();
    const [classLevels, setClassLevels] = useState<any[]>([]);
    const [classNames, setClassNames] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);  // State to hold student data
    const [selectedStudent, setSelectedStudent] = useState<any>(null);  // Changed to object for autocomplete
    const [selectedClassName, setSelectedClassName] = useState<string>('');
    const router = useRouter();

    // Fetch ClassLevels, ClassNames, and Students
    useEffect(() => {
        const fetchClassLevels = async () => {
            const { success, data } = await axiosGet(API.CLASS.LEVELS);
            if (success) {
                setClassLevels(data);
            }
        };

        const fetchClassNames = async () => {
            const { success, data } = await axiosGet(API.CLASS.NAMES);
            if (success) {
                setClassNames(data);
            }
        };

        const fetchStudents = async () => {
            const { success, data } = await axiosGet(API.AUTH.LIST_USER);
            if (success) {
                setStudents(data.results);
            }
        };

        fetchClassLevels();
        fetchClassNames();
        fetchStudents();
    }, []);

    const handleAddStudentToClass = async () => {
        if (!selectedStudent || !selectedClassName) {
            ToastTopHelper.error('Cả học sinh và lớp học đều phải được chọn');
            return;
        }

        const { success, data } = await axiosPost(API.CLASS.ADD_STUDENT, {
            student_id: selectedStudent.id,  // Using the object (id) from Autocomplete
            class_id: selectedClassName,
        });

        if (success) {
            ToastTopHelper.success('Học sinh đã được thêm vào lớp');
            setSelectedStudent(null); // Reset the selected student
            setSelectedClassName('');
        } else {
            ToastTopHelper.error('Thêm học sinh vào lớp thất bại');
        }
    };

    return (
        <PrivateRoute>
            <div className={classes.wrapContainer}>
                <Container maxWidth="lg">
                    <Typography variant="h4" gutterBottom>
                        Thêm Học Sinh Vào Lớp
                    </Typography>
                    <Grid container spacing={4}>
                        {/* Chọn Học Sinh */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" mb={2}>Chọn Học Sinh</Typography>
                            <Autocomplete
                                value={selectedStudent}
                                onChange={(event, newValue) => setSelectedStudent(newValue)}
                                options={students}
                                getOptionLabel={(option) => option.full_name || ''}
                                renderInput={(params) => <TextField {...params} label="Học Sinh" variant="outlined" />}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                disableClearable
                                fullWidth
                            />
                        </Grid>

                        {/* Chọn Lớp Học */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Chọn Lớp</Typography>
                            <FormControl fullWidth variant="outlined" margin="normal">
                                <InputLabel>Chọn Lớp</InputLabel>
                                <Select
                                    value={selectedClassName}
                                    onChange={(e) => setSelectedClassName(e.target.value)}
                                    label="Chọn Lớp"
                                >
                                    {classNames.map((className) => {
                                        const levelName = className.level_name; // Lấy level_name từ dữ liệu
                                        const classNameLabel = `${levelName}${className.class_name}`; // Kết hợp level_name và class_name

                                        return (
                                            <MenuItem key={className.id} value={className.id}>
                                                {classNameLabel} {/* Hiển thị tên lớp cùng với level */}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Thêm Học Sinh Vào Lớp */}
                    <Grid container spacing={4} mt={4}>
                        <Grid item xs={12} md={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleAddStudentToClass}
                            >
                                Thêm Học Sinh Vào Lớp
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Danh sách Lớp Học */}
                    <Grid container spacing={4} mt={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Danh Sách Lớp</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Khối Lớp</TableCell>
                                            <TableCell>Lớp Học</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {classNames.map((className) => {
                                            const level = classLevels.find(level => level.id === className.level);
                                            return (
                                                <TableRow key={className.id}>
                                                    <TableCell>{level ? level.level_name : 'Không có khối'}</TableCell>
                                                    <TableCell>{className.class_name}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </PrivateRoute>

    );
};

export default AddStudentClass;
