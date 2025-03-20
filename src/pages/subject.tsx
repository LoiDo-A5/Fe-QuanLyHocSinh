import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, TextField, Typography, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import { axiosGet, axiosPost } from '../utils/apis/axios';
import API from '../configs/API';
import { ToastTopHelper } from '@/utils/utils';
import PrivateRoute from '@/commons/PrivateRoute';
import useStyles from "../styles/subject/useSubjectStyle";

const SubjectPage: React.FC = () => {
    const classes = useStyles();
    const [subjects, setSubjects] = useState<any[]>([]);
    const [newSubjectName, setNewSubjectName] = useState<string>('');
    const [newSubjectCode, setNewSubjectCode] = useState<string>('');

    useEffect(() => {
        const fetchSubjects = async () => {
            const { success, data } = await axiosGet(API.SUBJECT.LIST);
            if (success) {
                setSubjects(data);
            }
        };
        fetchSubjects();
    }, []);

    const handleCreateSubject = async () => {
        if (!newSubjectName || !newSubjectCode) {
            ToastTopHelper.error('Tên môn học và mã môn học không được để trống');
            return;
        }

        const { success, data } = await axiosPost(API.SUBJECT.CREATE, {
            name: newSubjectName,
            code: newSubjectCode,
        });

        if (success) {
            setSubjects([...subjects, data]);
            setNewSubjectName('');
            setNewSubjectCode('');
            ToastTopHelper.success('Môn học đã được tạo');
        }
    };

    return (
        <PrivateRoute>
            <div className={classes.background}>
                <Container maxWidth="lg">
                    <Typography variant="h4" gutterBottom>
                        Quản lý Môn Học
                    </Typography>
                    <Grid container spacing={4}>
                        {/* Tạo Môn Học */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Tạo Môn Học Mới</Typography>
                            <TextField
                                label="Tên Môn Học"
                                fullWidth
                                variant="outlined"
                                value={newSubjectName}
                                onChange={(e) => setNewSubjectName(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                label="Mã Môn Học"
                                fullWidth
                                variant="outlined"
                                value={newSubjectCode}
                                onChange={(e) => setNewSubjectCode(e.target.value)}
                                margin="normal"
                            />
                            <Button variant="contained" color="primary" fullWidth onClick={handleCreateSubject}>
                                Tạo Môn Học
                            </Button>
                        </Grid>

                        {/* Danh Sách Môn Học */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" mb={2}>Danh Sách Môn Học</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Tên Môn Học</TableCell>
                                            <TableCell>Mã Môn Học</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {subjects.map((subject) => (
                                            <TableRow key={subject.id}>
                                                <TableCell>{subject.name}</TableCell>
                                                <TableCell>{subject.code}</TableCell>
                                            </TableRow>
                                        ))}
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

export default SubjectPage;
