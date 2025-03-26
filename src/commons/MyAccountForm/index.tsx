import React, { ChangeEvent, FC } from 'react';
import { Box, Button, Grid } from '@mui/material';
import useStyles from './styles';
import clsx from 'clsx';
import FormInput from '../Form/FormInput';
import { axiosPatch } from '@/utils/apis/axios';
import API from '@/configs/API';
import { useDispatch } from 'react-redux';
import { updateAccount } from '@/redux/reducer/authSlice';
import { ToastTopHelper } from '@/utils/utils';

interface UserProfile {
  avatar: string;
  full_name?: string;
  email?: string;
  phone_number?: string;
  avatarUploadFile?: any
};

interface MyAccountFormProps {
  defaultUserData: UserProfile;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

interface InputItem {
  label: string;
  value?: string | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const MyAccountForm: FC<MyAccountFormProps> = ({ defaultUserData, userProfile, setUserProfile }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const disabled = JSON.stringify(defaultUserData) === JSON.stringify(userProfile);

  const inputItem: InputItem[] = [
    {
      label: 'Name',
      value: userProfile?.full_name,
      onChange: (e) =>
        setUserProfile((prevProfile) => ({ ...prevProfile, full_name: e.target.value })),
    },
    {
      label: 'Email',
      value: userProfile?.email,
      disabled: true,
    },
    {
      label: 'Phone number',
      value: userProfile?.phone_number,
      disabled: true,
    },
  ];

  const handleSubmitProfile = async () => {
    const formData = new FormData();
    if (userProfile?.avatarUploadFile) {
      formData.append(
        'avatar',
        userProfile?.avatarUploadFile
      );
    }
    formData.append('full_name', userProfile?.full_name || '');
    const { success, data } = await axiosPatch(API.AUTH.ACCOUNT_INFO, formData);

    if (success) {
      ToastTopHelper.success("Update successfully");
      dispatch(updateAccount(data));
    }
  };

  return (
    <Box className={classes.wrapBox}>
      <div >{'Account'}</div>

      <Box sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {inputItem.map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <FormInput
                label={item.label}
                value={item.value}
                onChange={item.onChange}
                wrapFormInputStyle={classes.wrapFormInput}
                textFieldStyle={clsx(classes.textField, {
                  [classes.textFieldDisabled]: item.disabled,
                })}
                disabled={item.disabled}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          className={classes.btn}
          onClick={handleSubmitProfile}
          disabled={disabled}
        >
          {'Save changes'}
        </Button>
      </Box>
    </Box>
  );
};

export default MyAccountForm;
