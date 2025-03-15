import React, { useEffect, useState } from 'react';
import useStyles from '../styles/list-room/useListRoomStyle';
import PrivateRoute from '@/commons/PrivateRoute';
import { Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { axiosGet } from '@/utils/apis/axios';
import API from '@/configs/API';


const HomePage: React.FC = () => {
    const classes = useStyles();
    const [users, setUsers] = useState<any>([]);

    console.log('users', users)


    const getListUser = async () => {
        const { success, data } = await axiosGet(API.AUTH.LIST_USER);
        if (success) {
            setUsers(data);
        }
    };


    const listUser = users?.results || []


    useEffect(() => {
        getListUser();
    }, []);


    return (
        <PrivateRoute>
            <Container className={classes.background}>
                <Box mt={4}>
                    <div className={classes.titleRoom}>QUẢN LÝ HỌC SINH</div>
                </Box>

                <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Họ và tên</TableCell>
                                <TableCell>Giới tính</TableCell>
                                <TableCell>Ngày sinh</TableCell>
                                <TableCell>Địa chỉ</TableCell>
                                <TableCell>Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listUser.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.full_name}</TableCell>
                                    <TableCell>
                                        {user.gender === 0 ? 'Nam' : 'Nữ'}
                                    </TableCell>
                                    <TableCell>{user.birthday}</TableCell>
                                    <TableCell>{user.address}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </PrivateRoute>
    );
};

export default HomePage;
