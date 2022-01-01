import Head from 'next/head';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';

import styles from 'styles/Home.module.css';
import { Formula } from 'types/formula';
import { Fragment, useEffect, useState } from 'react';
import FormulaRow from 'components/FormulaRow';
import FormDialog from 'components/FormDialog';

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
    findFormulas();
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
    return <p>通信エラーが発生しました</p>;
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <title>年月日の加減算アプリ</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>年月日の加減算アプリ</h1>
        <h2>計算元の日付</h2>
        <div>
          <input
            type="text"
            size={4}
            maxLength={4}
            value={baseYearForm}
            onChange={(event) => {
              if (event.target.value.match(/^[0-9]{0,4}$/)) {
                setBaseYearForm(event.target.value);
              }
            }}
            style={{ textAlign: 'right' }}
          ></input>
          年
          <input
            type="text"
            size={2}
            maxLength={2}
            value={baseMonthForm}
            onChange={(event) => {
              if (event.target.value.match(/^([1-9]{1}|1[0-2]|)$/)) {
                setBaseMonthForm(event.target.value);
              }
            }}
            style={{ textAlign: 'right' }}
          ></input>
          月
          <input
            type="text"
            size={2}
            maxLength={2}
            value={baseDayForm}
            onChange={(event) => {
              if (event.target.value.match(/^([1-9]{1}|[1-2][0-9]|3[0-1]|)$/)) {
                setBaseDayForm(event.target.value);
              }
            }}
            style={{ textAlign: 'right' }}
          ></input>
          日
          <button
            onClick={onCalcButtonClick}
            disabled={
              !baseYearForm.match(/[1-9][0-9][0-9]/) ||
              !baseMonthForm ||
              !baseDayForm
            }
          >
            計算
          </button>
        </div>
        <h2>計算式</h2>
        {findFormulasLoading && <p>ロード中...</p>}
        {findFormulasData && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>名前</th>
                <th>年</th>
                <th>月</th>
                <th>日</th>
                <th>計算結果</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {findFormulasData.formulas.map((formula: Formula) => (
                <Fragment key={formula.id}>
                  <FormulaRow
                    formula={formula}
                    baseDate={baseDate}
                    deleteFormula={deleteFormula}
                  />
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
        <button
          onClick={() => {
            setCreateDialogOpen(true);
          }}
        >
          新しい計算式を作成
        </button>
        <FormDialog
          open={createDialogOpen}
          setOpen={setCreateDialogOpen}
          createFormula={createFormula}
        />
      </div>
    );
  }
}
