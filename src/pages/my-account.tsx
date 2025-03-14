import React, { useEffect } from "react";
import { Container, Breadcrumbs, Box, Grid, Typography } from "@mui/material";
import Link from 'next/link';
import { useSelector } from "react-redux";
import Routes from '../utils/Route';
import MyAccountNav from "@/commons/MyAccountNav";
import useStyles from "../styles/my-account/useMyAccountStyle";
import PrivateRoute from "@/commons/PrivateRoute";
import MyAccountForm from "@/commons/MyAccountForm";
import { RootState } from "@/utils/types";

interface BreadCrumbItem {
    to: string;
    text: string;
    active?: boolean;
}

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


const MyAccount: React.FC<MyAccountFormProps> = () => {
    const classes = useStyles();
    const user = useSelector((state: RootState) => state.auth.account.user);

    const defaultUserData: UserProfile = {
        avatar: user?.avatar,
        full_name: user?.name || '',
        email: user?.email || '',
        phone_number: user?.phone_number || '',
    };

    const [userProfile, setUserProfile] = React.useState<UserProfile>(defaultUserData);
    const [isClient, setIsClient] = React.useState(false);

    const breadCrumbs: BreadCrumbItem[] = [
        {
            to: Routes.Home,
            text: 'Home',
        },
        {
            to: Routes.MyAccount,
            text: 'My Account',
            active: true,
        },
    ];

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <PrivateRoute>
            <div className={classes.wrapMyAccountPage}>
                <Container className={classes.customContainer}>
                    <Breadcrumbs>
                        {breadCrumbs.map((item, index) => (
                            <Link href={item.to} key={index}>
                                <Typography color={item.active ? 'textPrimary' : 'inherit'}>{item.text}</Typography>
                            </Link>
                        ))}
                    </Breadcrumbs>
                    <h1 className={classes.heading}>{'My Account'}</h1>

                    <Box sx={{ pt: 3 }}>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                xs={12}
                                lg={3}
                            >
                                {isClient && (
                                    <MyAccountNav
                                        user={user}
                                        userProfile={userProfile}
                                        setUserProfile={setUserProfile}
                                    />
                                )}
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                lg={9}
                            >
                                <MyAccountForm
                                    defaultUserData={defaultUserData}
                                    userProfile={userProfile}
                                    setUserProfile={setUserProfile}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </div>
        </PrivateRoute>
    );
};

export default MyAccount;
