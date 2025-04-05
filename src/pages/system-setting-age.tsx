import React, { useEffect, useState } from 'react';
import { Button, Container, TextField, Typography, Grid } from '@mui/material';
import { axiosGet, axiosPut } from '@/utils/apis/axios';
import API from '@/configs/API';
import { ToastTopHelper } from '@/utils/utils';
import PrivateRoute from '@/commons/PrivateRoute';
import useStyles from "../styles/subject/useSubjectStyle";

const SystemSettingPage: React.FC = () => {
  const classes = useStyles();
  const [minAge, setMinAge] = useState<number>(15);
  const [maxAge, setMaxAge] = useState<number>(20);

  const [minAgeError, setMinAgeError] = useState('');
  const [maxAgeError, setMaxAgeError] = useState('');

  useEffect(() => {
    const fetchSetting = async () => {
      const { success, data } = await axiosGet(API.SETTING.SYSTEM);
      if (success) {
        setMinAge(data.min_student_age);
        setMaxAge(data.max_student_age);
      }
    };
    fetchSetting();
  }, []);

  const validate = (): boolean => {
    let isValid = true;

    if (isNaN(minAge) || minAge < 1 || minAge > 100) {
      setMinAgeError('Tuổi tối thiểu phải từ 1 đến 100');
      isValid = false;
    } else {
      setMinAgeError('');
    }

    if (isNaN(maxAge) || maxAge < 1 || maxAge > 100) {
      setMaxAgeError('Tuổi tối đa phải từ 1 đến 100');
      isValid = false;
    } else {
      setMaxAgeError('');
    }

    if (minAge >= maxAge) {
      setMinAgeError('Tuổi tối thiểu phải nhỏ hơn tuổi tối đa');
      setMaxAgeError('Tuổi tối đa phải lớn hơn tuổi tối thiểu');
      isValid = false;
    }

    return isValid;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const { success } = await axiosPut(API.SETTING.SYSTEM, {
      min_student_age: minAge,
      max_student_age: maxAge
    });

    if (success) {
      ToastTopHelper.success('Cập nhật thành công!');
    }
  };

  return (
    <PrivateRoute>
      <Container className={classes.background}>
        <Typography variant="h5" gutterBottom>
          Cài Đặt Giới Hạn Tuổi Học Sinh
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tuổi tối thiểu"
              type="number"
              value={minAge}
              onChange={(e) => setMinAge(Number(e.target.value))}
              error={!!minAgeError}
              helperText={minAgeError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tuổi tối đa"
              type="number"
              value={maxAge}
              onChange={(e) => setMaxAge(Number(e.target.value))}
              error={!!maxAgeError}
              helperText={maxAgeError}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth onClick={handleSave}>
              Lưu thay đổi
            </Button>
          </Grid>
        </Grid>
      </Container>
    </PrivateRoute>
  );
};

export default SystemSettingPage;
