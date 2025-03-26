import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import useStyles from './styles';

const FooterPage: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className={classes.title}>
              Giới Thiệu
            </Typography>
            <Typography variant="body2">
              Một nền tảng quản lý học sinh hiện đại và dễ sử dụng, giúp
              giáo viên dễ dàng theo dõi và quản lý thông tin học sinh, điểm số, và các hoạt động học tập.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" className={classes.title}>
              Liên hệ với chúng tôi
            </Typography>
            <Typography variant="body2">
              Email: doloicodechill@gmail.com
            </Typography>
            <Typography variant="body2">
              Phone: 0901603859
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" className={classes.title}>
              Cập Nhật Tin Tức Cùng Chúng Tôi
            </Typography>
            <Typography variant="body2">
              Theo Dõi Chúng Tôi Để Cập Nhật Tin Tức Mới Nhất Về Phần Mềm Quản Lý Học Sinh
            </Typography>
            {/* Add social media icons or links here */}
          </Grid>
        </Grid>

        <div className={classes.bottomText}>
          <Typography variant="body2" color="textSecondary" align="center">
            &copy; 2025 Manage Student. All rights reserved.
          </Typography>
        </div>
      </Container>
    </footer>
  );
};

export default FooterPage;
