import React, { useState } from 'react';
import { Formula } from 'types/formula';
import FormDialog from './FormDialog';

export default function FormulaRow(props: {
  formula: Formula;
  baseDate: Date | null;
}) {
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  let result = '';
  if (props.baseDate) {
    let calcDate = new Date(props.baseDate);
    calcDate.setFullYear(
      props.baseDate.getUTCFullYear() + props.formula.addYear,
    );
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
    <tr key={props.formula.id}>
      <td>{props.formula.id}</td>
      <td>{props.formula.name}</td>
      <td style={{ textAlign: 'right' }}>
        {props.formula.addYear > 0
          ? '+' + props.formula.addYear
          : props.formula.addYear}
      </td>
      <td style={{ textAlign: 'right' }}>
        {props.formula.addMonth > 0
          ? '+' + props.formula.addMonth
          : props.formula.addMonth}
      </td>
      <td style={{ textAlign: 'right' }}>
        {props.formula.addDay > 0
          ? '+' + props.formula.addDay
          : props.formula.addDay}
      </td>
      <td>{result}</td>
      <td>
        <button
          onClick={() => {
            setFormDialogOpen(true);
          }}
        >
          編集
        </button>
        <button>削除</button>
      </td>
      <FormDialog
        open={formDialogOpen}
        setOpen={setFormDialogOpen}
        formula={props.formula}
      />
    </tr>
  );
}
