import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import { axiosGet, axiosPost } from '../utils/apis/axios';
import API from '../configs/API';
import { ToastTopHelper } from '@/utils/utils';
import PrivateRoute from '@/commons/PrivateRoute';
import useStyles from "../styles/class-management/useClassManagementStyle";

const SubjectScorePage: React.FC = () => {
  const classes = useStyles();
  const [classNames, setClassNames] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [semester, setSemester] = useState<number>(1); // Mặc định Học kỳ 1
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [scores, setScores] = useState<any[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const { success, data } = await axiosGet(API.CLASS.NAMES);
      if (success) setClassNames(data);
    };

    const fetchSubjects = async () => {
      const { success, data } = await axiosGet(API.SUBJECT.LIST);
      if (success) setSubjects(data);
    };

    fetchClasses();
    fetchSubjects();
  }, []);

  // Fetch scores when the class, subject, or semester changes
  const handleFetchScores = async () => {
    const { success, data } = await axiosGet(API.SUBJECT.LIST, {
      params: {
        class_name_id: selectedClass,
        subject_id: selectedSubject,
        semester,
      },
    });

    if (success) {
      setScores(data);
    }
  };

  // Handle submit button click
  const handleSubmit = async () => {
    const subjectScoreData = scores.map((score) => ({
      student: score.student.id,  // Add the student ID
      class_name: score.class_name.id,  // Add the class ID
      subject: selectedSubject,
      semester,
      midterm_score: score.midterm_score,
      final_score: score.final_score,
      final_exam_score: score.final_exam_score,
    }));

    const { success, data } = await axiosPost(API.SUBJECT.CREATE, subjectScoreData);

    if (success) {
      ToastTopHelper.success('Điểm đã được cập nhật');
      handleFetchScores(); // Cập nhật lại danh sách điểm
    }
  };

  return (
    <PrivateRoute>
      <div className={classes.wrapContainer}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Nhập Điểm Môn Học
          </Typography>
          <Grid container spacing={4}>
            {/* Chọn Khối Lớp */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Chọn Khối Lớp</InputLabel>
                <Select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  label="Chọn Khối Lớp"
                >
                  {classNames.map((className) => (
                    <MenuItem key={className.id} value={className.id}>
                      {className.class_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Chọn Môn Học */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Chọn Môn</InputLabel>
                <Select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  label="Chọn Môn"
                >
                  {subjects.map((subject) => (
                    <MenuItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Chọn Học Kỳ */}
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

            {/* Danh sách Điểm */}
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>Họ và Tên</TableCell>
                      <TableCell>Điểm 15’</TableCell>
                      <TableCell>Điểm 1 Tiết</TableCell>
                      <TableCell>Điểm Cuối HK</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scores.map((score, index) => (
                      <TableRow key={score.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{score.student.full_name}</TableCell>
                        <TableCell>
                          <TextField
                            value={score.midterm_score || ''}
                            onChange={(e) => {
                              const newScores = [...scores];
                              newScores[index].midterm_score = parseFloat(e.target.value) || '';
                              setScores(newScores);
                            }}
                            type="number"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={score.final_score || ''}
                            onChange={(e) => {
                              const newScores = [...scores];
                              newScores[index].final_score = parseFloat(e.target.value) || '';
                              setScores(newScores);
                            }}
                            type="number"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={score.final_exam_score || ''}
                            onChange={(e) => {
                              const newScores = [...scores];
                              newScores[index].final_exam_score = parseFloat(e.target.value) || '';
                              setScores(newScores);
                            }}
                            type="number"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                Cập nhật điểm
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    </PrivateRoute>
  );
};

export default SubjectScorePage;
