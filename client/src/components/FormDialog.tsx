import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Formula } from 'types/formula';
import { useState } from 'react';

export default function FormDialog(props: {
  open: boolean;
  setOpen: Function;
  formula?: Formula;
}) {
  const [formula] = useState(
    props.formula !== undefined
      ? props.formula
      : { addYear: 0, addMonth: 0, addDay: 0 },
  );
  const handleClose = () => {
    props.setOpen(false);
  };

  const onAcceptButtonClick = () => {
    handleClose();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>
          {props.formula ? '計算式を編集' : '計算式を作成'}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>説明文</DialogContentText> */}
          年
          <TextField
            autoFocus
            margin="dense"
            type="number"
            variant="standard"
            value={formula.addYear}
            style={{ width: '4rem' }}
          />
          月
          <TextField
            margin="dense"
            type="number"
            variant="standard"
            value={formula.addMonth}
            style={{ width: '3rem' }}
          />
          日
          <TextField
            margin="dense"
            type="number"
            variant="standard"
            value={formula.addDay}
            style={{ width: '3rem' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={onAcceptButtonClick} variant="contained">
            決定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
