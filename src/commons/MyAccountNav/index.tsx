import React, { ChangeEvent, FC } from 'react';
import { Avatar, Box, MenuItem, MenuList } from '@mui/material';
import useStyles from './styles';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Colors from '@/configs/Colors';
import clsx from 'clsx';
import PersonIcon from '@mui/icons-material/Person';

interface MyAccountNavProps {
  user: { full_name: string };
  userProfile: { avatar?: string; avatarUploadFile?: File };
  setUserProfile: React.Dispatch<React.SetStateAction<any>>;
}

const MyAccountNav: FC<MyAccountNavProps> = ({ user, userProfile, setUserProfile }) => {
  const classes = useStyles();

  const navItem = [
    {
      icon: PersonIcon,
      text: 'My account',
      active: true,
    },
  ];

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const image = URL.createObjectURL(file);
    setUserProfile({
      ...userProfile,
      avatar: image,
      avatarUploadFile: file,
    });
  };

  return (
    <Box className={classes.wrapMyAccountNav}>
      <label
        htmlFor="upload-image"
        className={classes.wrapBoxUpload}
      >
        <Avatar
          src={userProfile?.avatar}
          className={classes.avatar}
        />

        <input
          id="upload-image"
          hidden
          accept=".png, .jpeg, .jpg"
          type="file"
          onChange={handleFileUpload}
        />

        <LocalSeeIcon className={classes.iconCamera} />
        <div className={classes.overPlay}></div>
      </label>

      <div
        className={classes.userName}
      >
        {user?.full_name}
      </div>

      <div className={classes.userRole}>
        <FiberManualRecordIcon
          sx={{ width: 6 }}
          className={classes.iconDot}
        />

        <div
          className={classes.pointer}
        >
          {'View profile'}
        </div>
      </div>

      <div className={classes.line} />

      <MenuList className={classes.wrapBoxNav}>
        {navItem.map((item, index) => {
          const NavIcon = item?.icon;

          return (
            <MenuItem
              className={clsx(classes.menuItem, {
                [classes.menuItemActive]: item?.active,
              })}
              key={index}
            >
              <NavIcon className={classes.navIcon} />
              <div className={classes.menuItemText}>{item?.text}</div>
            </MenuItem>
          );
        })}
      </MenuList>
    </Box>
  );
};

export default MyAccountNav;
