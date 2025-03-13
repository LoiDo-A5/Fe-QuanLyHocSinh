import React, { useEffect, useState } from 'react';
import useStyles from '../styles/list-room/useListRoomStyle';
import PrivateRoute from '@/commons/PrivateRoute';
import { axiosGet } from '@/utils/apis/axios';
import API from '@/configs/API';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Container, Box, ListItemSecondaryAction } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChatIcon from '@mui/icons-material/Chat';
import { useRouter } from 'next/router';

interface Room {
    id: number;
    name: string;
}

const HomePage: React.FC = () => {
    const classes = useStyles();
    const [rooms, setRooms] = useState<Room[]>([]);

    const router = useRouter();

    const goToRoom = (roomId: number) => {
        router.push(`/room/${roomId}`);
    };

    const getListRoom = async () => {
        const { success, data } = await axiosGet(API.ROOM.LIST_ROOM);
        if (success) {
            setRooms(data)
        }
    }


    useEffect(() => {
        getListRoom()
    }, []);

    return (
        <PrivateRoute>
            <Container className={classes.background}>

                <Box mt={4}>
                    <div className={classes.titleRoom}>
                        QUẢN LÝ HỌC SINH
                    </div>
                </Box>
            </Container>
        </PrivateRoute>
    );
};

export default HomePage;
