import React, { useEffect, useState } from 'react';
import { Button, Container, TextField, Typography, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { axiosGet, axiosPut, axiosDelete } from '@/utils/apis/axios'; // You need to implement axiosDelete
import API from '@/configs/API';
import { ToastTopHelper } from '@/utils/utils';
import PrivateRoute from '@/commons/PrivateRoute';
import useStyles from "../styles/subject/useSubjectStyle";

interface ClassData {
    id: number;
    level: number;
    class_name: string;
    number_of_students: number;
    level_name: string;
}

const ClassSettingsPage: React.FC = () => {
    const classes = useStyles();
    const [classData, setClassData] = useState<ClassData[]>([]);
    const [updatedClassName, setUpdatedClassName] = useState<string>('');
    const [updatedStudentCount, setUpdatedStudentCount] = useState<number>(0);
    const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [levels, setLevels] = useState<{ id: number, level_name: string }[]>([]);

    const fetchClasses = async () => {
        setLoading(true);
        const { success, data } = await axiosGet(API.CLASS.NAMES);
        if (success) {
            setClassData(data);
        } else {
            ToastTopHelper.error('Không thể tải dữ liệu lớp học.');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchClasses();

        const fetchLevels = async () => {
            const { success, data } = await axiosGet(API.CLASS.LEVELS);
            if (success) {
                setLevels(data);
            } else {
                ToastTopHelper.error('Không thể tải dữ liệu cấp lớp.');
            }
        };
        fetchLevels();
    }, []);

    const handleClassSelect = (classInfo: ClassData) => {
        setSelectedClass(classInfo);
        setUpdatedClassName(classInfo.class_name);
        setUpdatedStudentCount(classInfo.number_of_students);
    };

    const handleSave = async () => {
        if (!selectedClass) return;

        setLoading(true);

        const { success, data } = await axiosPut(`${API.CLASS.NAMES}${selectedClass.id}/`, {
            class_name: updatedClassName,
            number_of_students: updatedStudentCount,
            level: selectedClass.level,
        });

        if (success) {
            fetchClasses();
            ToastTopHelper.success('Cập nhật lớp thành công!');
        } else {
            ToastTopHelper.error('Cập nhật lớp không thành công.');
        }

        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn chắc chắn muốn xóa lớp học này?")) {
            setLoading(true);
            const { success } = await axiosDelete(`${API.CLASS.NAMES}${id}/`);
            ToastTopHelper.success('Lớp học đã được xóa!');
            setClassData(classData.filter((item) => item.id !== id)); // Remove deleted class from UI
            fetchClasses();
            setLoading(false);
        }
    };

    return (
        <PrivateRoute>
            <Container className={classes.background}>
                <Typography variant="h4" gutterBottom style={{ marginBottom: 30, marginLeft: -25 }}>
                    Quản Lý Lớp Học
                </Typography>
                <Grid container spacing={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Chọn lớp học cần sửa đổi:</Typography>
                            <Grid container spacing={2}>
                                {classData.map(classInfo => (
                                    <Grid item xs={4} key={classInfo.id}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={() => handleClassSelect(classInfo)}
                                            disabled={loading}
                                        >
                                            {`${classInfo.level_name} ${classInfo.class_name}`}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDelete(classInfo.id)}
                                            disabled={loading}
                                            style={{ marginTop: 10 }}
                                        >
                                            Xóa
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>

                    {selectedClass && (
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Tên lớp"
                                    value={updatedClassName}
                                    onChange={(e) => setUpdatedClassName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Sĩ số"
                                    type="number"
                                    value={updatedStudentCount}
                                    onChange={(e) => setUpdatedStudentCount(Number(e.target.value))}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Cấp lớp</InputLabel>
                                    <Select
                                        value={selectedClass.level}
                                        onChange={(e) => setSelectedClass(prevState => ({ ...prevState, level: e.target.value }))}
                                    >
                                        {levels.map((level) => (
                                            <MenuItem key={level.id} value={level.id}>
                                                {level.level_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1">Cấp lớp: {selectedClass.level_name}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleSave}
                                    disabled={loading}
                                >
                                    {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Container>
        </PrivateRoute>
    );
};

export default ClassSettingsPage;
