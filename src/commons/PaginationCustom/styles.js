import Colors from '@/configs/Colors';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
  pagination: {
    '& .MuiPaginationItem-root': {
      '&.Mui-selected': {
        color: Colors.White,
        background: Colors.Primary,
        '&:hover': {
          background: Colors.Primary,
          opacity: 0.8,
        },
      },
    },
    '& .MuiPaginationItem-rounded': {
      borderRadius: 0,
    },
  },
}));

export default useStyles;
