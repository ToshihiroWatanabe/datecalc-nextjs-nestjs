import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Formula } from 'types/formula';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const UPDATE_FORMULA = gql`
  mutation UpdateFormula(
    $id: Float!
    $name: String!
    $addYear: Float!
    $addMonth: Float!
    $addDay: Float!
  ) {
    updateFormula(
      id: $id
      name: $name
      addYear: $addYear
      addMonth: $addMonth
      addDay: $addDay
    ) {
      id
      name
      addYear
      addMonth
      addDay
    }
  }
`;

export default function FormDialog(props: {
  open: boolean;
  setOpen: Function;
  formula?: Formula;
}) {
  const [formula, setFormula] = useState(
    props.formula !== undefined
      ? props.formula
      : { name: '', addYear: 0, addMonth: 0, addDay: 0 },
  );
  const [updateFormula, { data, loading, error }] = useMutation(UPDATE_FORMULA);

  const handleClose = () => {
    props.setOpen(false);
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
    }
    handleClose();
  };

  return (
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
          onChange={(event) => {
            setFormula({ ...formula, addYear: parseInt(event.target.value) });
          }}
          style={{ width: '4rem' }}
        />
        月
        <TextField
          margin="dense"
          type="number"
          variant="standard"
          value={formula.addMonth}
          onChange={(event) => {
            setFormula({ ...formula, addMonth: parseInt(event.target.value) });
          }}
          style={{ width: '3rem' }}
        />
        日
        <TextField
          margin="dense"
          type="number"
          variant="standard"
          value={formula.addDay}
          onChange={(event) => {
            setFormula({ ...formula, addDay: parseInt(event.target.value) });
          }}
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
  );
}
