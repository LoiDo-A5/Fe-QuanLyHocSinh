import React, { useState, FormEvent } from "react";
import { Button, Container, TextField, Link, Typography, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { axiosPost } from "../utils/apis/axios";
import API from "../configs/API";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Routes from "../utils/Route";
import { ToastTopHelper } from "@/utils/utils";
import useStyles from "../styles/sign-up/useSignUpStyle";
import PrivateRoute from "@/commons/PrivateRoute";

interface SignupFormProps { }

const SignupForm: React.FC<SignupFormProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const [fullName, setFullName] = useState<string>("");
  const [gender, setGender] = useState<any>('man');
  const [birthDate, setBirthDate] = useState<any>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthDateError, setBirthDateError] = useState<string>("");

  const validateForm = () => {
    if (!fullName || !email || !gender || !birthDate || !address) {
      ToastTopHelper.error("Tất cả các trường đều là bắt buộc");
      return false;
    }

    if (fullName.length > 60) {
      ToastTopHelper.error("Họ và tên không được vượt quá 60 ký tự");
      return false;
    }

    const fullNamePattern = /^[A-Z][a-z]+(\s[A-Z][a-z]?){0,}/;
    if (!fullNamePattern.test(fullName)) {
      ToastTopHelper.error("Họ và tên không được chứa số hoặc ký tự không hợp lệ");
      return false;
    }

    if (address.length > 60) {
      ToastTopHelper.error("Địa chỉ không được vượt quá 60 ký tự");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      ToastTopHelper.error("Địa chỉ email không hợp lệ");
      return false;
    }

    if (birthDateError) {
      ToastTopHelper.error(birthDateError);
      return false;
    }

    return true;
  };

  const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const birthDateValue = event.target.value;
    setBirthDate(birthDateValue);

    const today = new Date();
    const birthDateObj = new Date(birthDateValue);
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const month = today.getMonth() - birthDateObj.getMonth();

    if (age < 15 || age > 20 || (age === 15 && month < 0) || (age === 20 && month > 0)) {
      setBirthDateError("Tuổi phải từ 15 đến 20.");
    } else {
      setBirthDateError("");
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { success, data } = await axiosPost(API.AUTH.SIGNUP, {
      full_name: fullName,
      email,
      gender: gender === 'man' ? 0 : 1,
      birthday: birthDate,
      address,
    });

    if (success) {
      ToastTopHelper.success("Tạo tài khoản thành công!");
      router.push(Routes.Home);
    }
  };

  return (
    <PrivateRoute>
      <div className={classes.background}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography className={classes.title}>ĐĂNG KÝ</Typography>

          <TextField
            label="Họ và Tên"
            fullWidth
            variant="outlined"
            margin="normal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Giới tính</InputLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Giới tính"
            >
              <MenuItem value={'man'}>Nam giới</MenuItem>
              <MenuItem value={'female'}>Nữ giới</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Ngày sinh"
            fullWidth
            variant="outlined"
            margin="normal"
            type="date"
            value={birthDate}
            onChange={handleBirthDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            error={!!birthDateError} // Thêm error khi có lỗi
            helperText={birthDateError} // Hiển thị lỗi
          />
          <TextField
            label="Địa chỉ"
            fullWidth
            variant="outlined"
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submitButton}
          >
            Đăng ký
          </Button>
        </form>
      </div>
    </PrivateRoute>
  );
};

export default SignupForm;
