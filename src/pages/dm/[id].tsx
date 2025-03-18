import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { List, ListItem, ListItemText, TextField, Button, Avatar } from '@mui/material';
import useStyles from '@/styles/room/useRoomStyle';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/types';
import useChat from '@/hooks/useChat';
import PrivateRoute from '@/commons/PrivateRoute';
import { axiosGet } from '@/utils/apis/axios';
import API from '@/configs/API';
import moment from 'moment';

const DirectMessage: React.FC = () => {
    const classes = useStyles();
    const router = useRouter();
    const { id } = router.query;
    const user = useSelector((state: RootState) => state.auth.account.user);
    const [roomId, setRoomId] = useState<string | undefined>();
    const [listMessages, setListMessages] = useState<any[]>([]);

    // Set roomId
    useEffect(() => {
        if (typeof id === 'string' && user?.id) {
            const friendId = parseInt(id);
            setRoomId(`${Math.min(user.id, friendId)}_${Math.max(user.id, friendId)}`);
        }
    }, [id, user]);

    // Call the API to get DirectMessages
    const getListMessages = async () => {
        if (!user?.id || !id) return;
        const { success, data } = await axiosGet(`${API.MESSAGE.LIST_DIRECT_MESSAGES}?sender_id=${user.id}&receiver_id=${id}`);
        if (success) {
            setListMessages(data);
        }
    };

    useEffect(() => {
        getListMessages();
    }, [roomId]);

    // Chat logic
    const { messages, sendMessage } = useChat("dm", roomId || "");
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const handleSendMessage = () => {
        if (roomId) {
            sendMessage(message, user?.id || "", id || "");
            setMessage("");
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, listMessages]);

    return (
        <PrivateRoute>
            <div className={classes.background}>
                <List className={classes.messageList}>
                    {listMessages.map((msg, index) => {
                        const isMe = user.id === msg.sender.id;
                        const formattedTimestamp = moment(msg.timestamp).format('HH:mm DD/MM/YYYY');
                        return (
                            <ListItem key={index} className={isMe ? classes.myMessage : classes.otherMessage}>
                                <div className={classes.itemAvatar}>
                                    <Avatar src={msg.sender.avatar} />
                                    <div className={classes.textName}>{isMe ? 'Me' : msg?.sender?.name}</div>
                                </div>
                                <ListItemText primary={msg.content} secondary={formattedTimestamp} />
                            </ListItem>
                        );
                    })}

                    {messages.map((msg, index) => {
                        const formattedTimestamp = moment().format('HH:mm DD/MM/YYYY');
                        const isMe = user.id === msg.user.id;
                        return (
                            <ListItem key={index} className={isMe ? classes.myMessage : classes.otherMessage}>
                                <div className={classes.itemAvatar}>
                                    <Avatar src={msg.user.avatar} />
                                    <div className={classes.textName}>{isMe ? 'Me' : msg?.user?.name}</div>
                                </div>
                                <ListItemText primary={msg.message} secondary={formattedTimestamp} />
                            </ListItem>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </List>
                <TextField
                    label="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <Button variant="contained" onClick={handleSendMessage}>Send</Button>
            </div>
        </PrivateRoute>
    );
};

export default DirectMessage;
