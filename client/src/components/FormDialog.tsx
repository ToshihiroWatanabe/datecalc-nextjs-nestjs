import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formula } from "types/formula";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import UPDATE_FORMULA from "gql/UpdateFormula.graphql";
import { Box, Typography } from "@mui/material";

const DEFAULT_FORMULA = { name: "", addYear: 0, addMonth: 0, addDay: 0 };

export default function FormDialog(props: {
  open: boolean;
  setOpen: Function;
  formula?: Formula;
  createFormula?: Function;
}) {
  const [formula, setFormula] = useState(
    props.formula !== undefined ? props.formula : DEFAULT_FORMULA,
  );
  const [
    updateFormula,
    {
      // data: updateFormulaData,
      // loading: updateFormulaLoading,
      // error: updateFormulaError,
    },
  ] = useMutation(UPDATE_FORMULA);

  const handleClose = () => {
    props.setOpen(false);
    if (props.createFormula !== undefined) {
      setFormula(DEFAULT_FORMULA);
    }
  };

  const onAcceptButtonClick = () => {
    if (props.formula?.id !== undefined) {
      updateFormula({
        variables: {
          id: parseInt(props.formula.id),
          name: formula.name,
          addYear: formula.addYear,
          addMonth: formula.addMonth,
          addDay: formula.addDay,
        },
      });
    } else if (props.createFormula !== undefined) {
      props.createFormula({
        variables: {
          name: formula.name,
          addYear: formula.addYear,
          addMonth: formula.addMonth,
          addDay: formula.addDay,
        },
      });
    }
    handleClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>
        {props.formula ? "計算式を編集" : "計算式を作成"}
      </DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            label="名前"
            margin="dense"
            type="text"
            variant="standard"
            value={formula.name}
            onChange={(event) => {
              setFormula({ ...formula, name: event.target.value });
            }}
          />
        </Box>
        {/* <DialogContentText>説明文</DialogContentText> */}
        <Box style={{ display: "flex", alignItems: "baseline" }}>
          <Typography>
            {formula.addYear > 0 ? "+" : formula.addYear === 0 ? "±" : ""}
          </Typography>
          <Box ml={formula.addYear < 0 ? "0.6rem" : 0} />
          <TextField
            label="年"
            margin="dense"
            type="number"
            variant="standard"
            value={formula.addYear}
            onChange={(event) => {
              setFormula({ ...formula, addYear: parseInt(event.target.value) });
            }}
            style={{ width: "3rem" }}
          />
          <Box ml={1} />
          <Typography>
            {formula.addMonth > 0 ? "+" : formula.addMonth === 0 ? "±" : ""}
          </Typography>
          <Box ml={formula.addMonth < 0 ? "0.6rem" : 0} />
          <TextField
            label="月"
            margin="dense"
            type="number"
            variant="standard"
            value={formula.addMonth}
            onChange={(event) => {
              setFormula({
                ...formula,
                addMonth: parseInt(event.target.value),
              });
            }}
            style={{ width: "3rem" }}
          />
          <Box ml={1} />
          <Typography>
            {formula.addDay > 0 ? "+" : formula.addDay === 0 ? "±" : ""}
          </Typography>
          <Box ml={formula.addDay < 0 ? "0.6rem" : 0} />
          <TextField
            label="日"
            margin="dense"
            type="number"
            variant="standard"
            value={formula.addDay}
            onChange={(event) => {
              setFormula({ ...formula, addDay: parseInt(event.target.value) });
            }}
            style={{ width: "3rem" }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button onClick={onAcceptButtonClick} variant="contained">
          決定
        </Button>
      </DialogActions>
    </Dialog>
  );
}
