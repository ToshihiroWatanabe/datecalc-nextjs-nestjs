import Head from 'next/head';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import styles from 'styles/Home.module.css';
import { Formula } from 'types/formula';
import { Fragment, useEffect, useState } from 'react';
import FormulaRow from 'components/FormulaRow';
import FormDialog from 'components/FormDialog';
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import AddIcon from '@mui/icons-material/Add';
import { YOUBI } from 'utils/constants';

const FIND_FORMULAS = gql`
  query {
    formulas {
      id
      name
      addYear
      addMonth
      addDay
    }
  }
`;

const CREATE_FORMULA = gql`
  mutation CreateFormula(
    $name: String!
    $addYear: Float!
    $addMonth: Float!
    $addDay: Float!
  ) {
    createFormula(
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

const DELETE_FORMULA = gql`
  mutation DeleteFormula($id: Float!) {
    deleteFormula(id: $id) {
      id
      name
      addYear
      addMonth
      addDay
    }
  }
`;

export default function Home() {
  const [
    findFormulas,
    {
      data: findFormulasData,
      loading: findFormulasLoading,
      error: findFormulasError,
    },
  ] = useLazyQuery(FIND_FORMULAS);

  const [
    createFormula,
    {
      data: createFormulaDate,
      // loading: createFormulaLoading,
      // error: createFormulaError,
    },
  ] = useMutation(CREATE_FORMULA);

  const [
    deleteFormula,
    {
      data: deleteFormulaData,
      // loading: deleteFormulaLoading,
      // error: deleteFormulaError,
    },
  ] = useMutation(DELETE_FORMULA);

  const dateNow = new Date();

  const [baseYearForm, setBaseYearForm] = useState(
    String(dateNow.getFullYear()),
  );
  const [baseMonthForm, setBaseMonthForm] = useState(
    String(dateNow.getMonth() + 1),
  );
  const [baseDayForm, setBaseDayForm] = useState(String(dateNow.getDate()));

  const [baseDate, setBaseDate] = useState<Date>(dateNow);

  useEffect(() => {
    setTimeout(() => {
      findFormulas();
    }, 1);
  }, [createFormulaDate, deleteFormulaData]);

  const onCalcButtonClick = () => {
    setBaseDate(
      new Date(
        parseInt(baseYearForm),
        parseInt(baseMonthForm) - 1,
        parseInt(baseDayForm),
      ),
    );
  };

  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  if (findFormulasError) {
    return <Typography variant="body1">通信エラーが発生しました</Typography>;
  } else {
    return (
      <Container className={styles.container}>
        <Head>
          <title>年月日の加減算アプリ</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Typography component="h1" variant="h4">
          年月日の加減算アプリ
        </Typography>
        <Box mt={3} />
        <Typography component="h2" variant="h5">
          計算元の日付
        </Typography>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            type="number"
            size="small"
            value={baseYearForm}
            onChange={(event) => {
              if (event.target.value.match(/^[0-9]{0,4}$/)) {
                setBaseYearForm(event.target.value);
              }
            }}
            style={{ textAlign: 'right', width: '5rem' }}
          />
          <Typography>年</Typography>
          <Box ml={1} />
          <TextField
            type="number"
            size="small"
            value={baseMonthForm}
            onChange={(event) => {
              if (event.target.value.match(/^([1-9]{1}|1[0-2]|)$/)) {
                setBaseMonthForm(event.target.value);
              }
            }}
            style={{ textAlign: 'right', width: '4rem' }}
          />
          <Typography>月</Typography>
          <Box ml={1} />
          <TextField
            type="number"
            size="small"
            value={baseDayForm}
            onChange={(event) => {
              if (event.target.value.match(/^([1-9]{1}|[1-2][0-9]|3[0-1]|)$/)) {
                setBaseDayForm(event.target.value);
              }
            }}
            style={{ textAlign: 'right', width: '4rem' }}
          />
          <Typography>日({YOUBI[baseDate.getDay()]})</Typography>
          <Box ml={2} />
          <Button
            variant="contained"
            onClick={onCalcButtonClick}
            disabled={
              !baseYearForm.match(/[1-9][0-9][0-9]/) ||
              !baseMonthForm ||
              !baseDayForm
            }
          >
            <CalculateOutlinedIcon />
            計算
          </Button>
        </Box>
        <Box mt={3} />
        <Typography component="h2" variant="h5">
          計算式
        </Typography>
        {findFormulasLoading && (
          <Typography component="p" variant="h5">
            ロード中...
          </Typography>
        )}
        {findFormulasData && (
          <Table style={{ maxWidth: '720px' }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>名前</TableCell>
                <TableCell>年</TableCell>
                <TableCell>月</TableCell>
                <TableCell>日</TableCell>
                <TableCell>計算結果</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {findFormulasData.formulas.map((formula: Formula) => (
                <Fragment key={formula.id}>
                  <FormulaRow
                    formula={formula}
                    baseDate={baseDate}
                    deleteFormula={deleteFormula}
                  />
                </Fragment>
              ))}
            </TableBody>
          </Table>
        )}
        <Box mt={3} />
        <Button
          variant="outlined"
          onClick={() => {
            setCreateDialogOpen(true);
          }}
        >
          <AddIcon />
          新しい計算式を作成
        </Button>
        <FormDialog
          open={createDialogOpen}
          setOpen={setCreateDialogOpen}
          createFormula={createFormula}
        />
      </Container>
    );
  }
}
