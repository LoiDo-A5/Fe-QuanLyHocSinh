import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import Image from 'next/image';
import Logo from "../../images/logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducer/authSlice';
import { useRouter } from 'next/router';
import Routes from '../../utils/Route';
import useStyles from './styles';
import { RootState } from '@/utils/types';

const HeaderPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.account.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isClient, setIsClient] = useState(false);

  const open = Boolean(anchorEl);

  const handleLogOut = () => {
    setAnchorEl(null);
    dispatch(logout());
    router.push(Routes.Login);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMyAccount = () => {
    router.push(Routes.MyAccount);
  };

  const handleClickSinUp = () => {
    router.push(Routes.Signup);
  }

  const goHome = () => {
    router.push(Routes.Home);
  }

  const handleClickClassManage = () => {
    router.push(Routes.ClassManagement);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);



  return (
    <div className={classes.containerHeader}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Image
              onClick={goHome}
              src={Logo}
              alt=""
              className={classes.logoChatRoom}
              style={{ marginRight: '20px' }}
            />
          </Typography>



          <div>
            <Box>
              <Tooltip title={'Account setting'}>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                >
                  <Avatar
                    className={classes.avatarProfile}
                    src={isClient ? user?.avatar : undefined}
                  />
                </IconButton>
              </Tooltip>
            </Box>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              classes={{
                paper: classes.menuPaper,
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <div className={classes.wrapItemMenuProfile}>
                <div >
                  <Avatar
                    className={classes.avatarProfile}
                    src={isClient ? user?.avatar : undefined}
                  />
                  <div>
                    <div className={classes.textUserName}>{user?.name}</div>
                    <div className={classes.textEmail}>{user?.email}</div>
                  </div>
                </div>
              </div>

              <Divider />
              <MenuItem className={classes.menuItemHelp} onClick={handleClickMyAccount}>{'Tài khoản của tôi'}</MenuItem>
              <MenuItem
                onClick={handleClickSinUp}
                className={classes.menuItemHelp}
              >
                {'Tạo tài khoản cho học sinh'}
              </MenuItem>
              <MenuItem
                onClick={handleClickClassManage}
                className={classes.menuItemHelp}
              >
                {'Tạo khối lớp và lớp học'}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogOut}>{'Đăng xuất'}</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderPage;
