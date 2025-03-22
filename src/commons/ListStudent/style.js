import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  wrapContainer: {
    minHeight: "90vh",
    marginBottom: 20,
  },
  pagination: {
    "&.MuiPagination-root": {
      marginTop: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));

export default useStyles;
