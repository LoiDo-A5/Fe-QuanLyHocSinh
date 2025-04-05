import React, { useEffect, useState } from 'react';
import { Button, Container, TextField, Typography, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { axiosGet, axiosPut } from '@/utils/apis/axios';
import API from '@/configs/API';
import { ToastTopHelper } from '@/utils/utils';
import PrivateRoute from '@/commons/PrivateRoute';
import useStyles from "../styles/subject/useSubjectStyle";

interface ClassData {
    id: number;
    level: number;
    class_name: string;
    number_of_students: number;
    level_name: string;  // Add level_name to the ClassData type
}

const ClassSettingsPage: React.FC = () => {
    const classes = useStyles();
    const [classData, setClassData] = useState<ClassData[]>([]);
    const [updatedClassName, setUpdatedClassName] = useState<string>('');
    const [updatedStudentCount, setUpdatedStudentCount] = useState<number>(0);
    const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Loading state for saving
    const [levels, setLevels] = useState<{ id: number, level_name: string }[]>([]); // Levels data

    const fetchClasses = async () => {
        setLoading(true); // Start loading
        const { success, data } = await axiosGet(API.CLASS.NAMES); // Fetching class names
        if (success) {
            setClassData(data);
        } else {
            ToastTopHelper.error('Không thể tải dữ liệu lớp học.');
        }
        setLoading(false); // Stop loading
    };

    useEffect(() => {
        fetchClasses();

        // Fetch level data (this could be a separate endpoint)
        const fetchLevels = async () => {
            const { success, data } = await axiosGet(API.CLASS.LEVELS); // Replace with the correct endpoint
            if (success) {
                setLevels(data);  // Set available levels
            } else {
                ToastTopHelper.error('Không thể tải dữ liệu cấp lớp.');
            }
        };
        fetchLevels();
    }, []);

    // Handle class selection to edit
    const handleClassSelect = (classInfo: ClassData) => {
        setSelectedClass(classInfo);
        setUpdatedClassName(classInfo.class_name);
        setUpdatedStudentCount(classInfo.number_of_students);
    };

    // Save the updated class information
    const handleSave = async () => {
        if (!selectedClass) return;

        setLoading(true); // Start loading

        // Include the `level` along with class_name and number_of_students
        const { success, data } = await axiosPut(`${API.CLASS.NAMES}${selectedClass.id}/`, {
            class_name: updatedClassName,
            number_of_students: updatedStudentCount,
            level: selectedClass.level, // Ensure that `level` is included
        });

        if (success) {
            fetchClasses()
            ToastTopHelper.success('Cập nhật lớp thành công!');
            // Update the classData state with the updated class information
            setClassData(classData.map(item =>
                item.id === selectedClass.id ? { ...item, class_name: updatedClassName, number_of_students: updatedStudentCount, level: selectedClass.level } : item
            ));
        } else {
            ToastTopHelper.error('Cập nhật lớp không thành công.');
        }

        setLoading(false); // Stop loading
    };

    return (
        <PrivateRoute>
            <Container className={classes.background}>
                <Typography variant="h5" gutterBottom style={{ marginBottom: 30, marginLeft: -20 }}>
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
                                            disabled={loading} // Disable buttons while loading
                                        >
                                            {`${classInfo.level_name} ${classInfo.class_name}`}
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
                                    disabled={loading} // Disable the save button while loading
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
