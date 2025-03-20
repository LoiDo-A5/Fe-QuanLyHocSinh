import { makeStyles } from "@mui/styles";
import backgroundImage from "../../images/background.png";

const useStyles = makeStyles((theme) => ({
  background: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    marginTop: 100,
  },
}));

export default useStyles;
