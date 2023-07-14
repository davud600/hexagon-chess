import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import style from "./Home.module.scss";
import Link from "next/link";

const GameOptions = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLocal = () => {
    setOpen(false);
  };

  const handleOnline = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        className={style.button}
      >
        play
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Gameplay"}</DialogTitle>
        <DialogActions>
          <Link href="/game" autoFocus onClick={handleLocal}>
            Local
          </Link>
          <Link href="/game" onClick={handleOnline} autoFocus>
            Online
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GameOptions;
