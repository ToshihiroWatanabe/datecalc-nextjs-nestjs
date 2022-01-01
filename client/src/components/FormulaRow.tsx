import { Button, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { Formula } from 'types/formula';
import FormDialog from './FormDialog';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function FormulaRow(props: {
  formula: Formula;
  baseDate: Date | null;
  deleteFormula: Function;
}) {
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  let result = '';
  if (props.baseDate) {
    let calcDate = new Date(props.baseDate);
    calcDate.setFullYear(props.baseDate.getFullYear() + props.formula.addYear);
    calcDate.setMonth(props.baseDate.getMonth() + props.formula.addMonth);
    calcDate.setDate(props.baseDate.getDate() + props.formula.addDay);
    result = calcDate.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    });
  }
  return (
    <TableRow key={props.formula.id}>
      <TableCell>{props.formula.id}</TableCell>
      <TableCell>{props.formula.name}</TableCell>
      <TableCell style={{ textAlign: 'right' }}>
        {props.formula.addYear > 0
          ? '+' + props.formula.addYear
          : props.formula.addYear}
      </TableCell>
      <TableCell style={{ textAlign: 'right' }}>
        {props.formula.addMonth > 0
          ? '+' + props.formula.addMonth
          : props.formula.addMonth}
      </TableCell>
      <TableCell style={{ textAlign: 'right' }}>
        {props.formula.addDay > 0
          ? '+' + props.formula.addDay
          : props.formula.addDay}
      </TableCell>
      <TableCell style={{ textAlign: 'center' }}>{result}</TableCell>
      <TableCell>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            setFormDialogOpen(true);
          }}
        >
          <EditIcon />
          編集
        </Button>
        <Button
          // variant="outlined"
          size="small"
          color="warning"
          onClick={() => {
            props.deleteFormula({
              variables: { id: parseInt(props.formula.id) },
            });
          }}
        >
          <DeleteIcon />
          削除
        </Button>
      </TableCell>
      <FormDialog
        open={formDialogOpen}
        setOpen={setFormDialogOpen}
        formula={props.formula}
      />
    </TableRow>
  );
}
