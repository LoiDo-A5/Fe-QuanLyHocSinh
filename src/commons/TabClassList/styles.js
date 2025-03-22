import { makeStyles } from "@mui/styles";

import Colors from "../../configs/Colors";

const useStyles = makeStyles((theme) => ({
  background: {
    "&.MuiContainer-root": {
      height: "90vh",
      width: "100%",
    },
  },
  boxList: {
    width: "100%",
    backgroundColor: '#ffffff',
    border: `1px solid ${Colors.Grey4}`,
    paddingBottom: 25,
    maxHeight: "calc(90vh - 150px)",
    overflowY: "auto",
  },
  titleRoom: {
    fontSize: 32,
    fontWeight: "bold",
  },
  listItemStyle: {
    backgroundColor: "#e1f5fe",
    marginTop: 16,
    height: "70px",
    border: `1px solid ${Colors.Grey4}`,
    cursor: "pointer",
  },
  pagination: {
    '&.MuiPagination-root': {
      marginTop: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}));

export default useStyles;
