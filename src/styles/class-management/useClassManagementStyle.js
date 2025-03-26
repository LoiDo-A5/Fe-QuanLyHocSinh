import { makeStyles } from "@mui/styles";
import Colors from "../../configs/Colors";

const useStyles = makeStyles(() => ({
  wrapContainer: {
    paddingTop: 100,
    background: Colors.Grey1,
    minHeight: "90vh",
    marginBottom: 20,
  },
}));

export default useStyles;
