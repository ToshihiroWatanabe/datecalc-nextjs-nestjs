import Head from 'next/head';
import { useQuery } from '@apollo/client';

import QUERY_FORMULAS from 'FormulasQuery.graphql';

import styles from 'styles/Home.module.css';
import { Formula } from 'types/formula';
import { Fragment, useState } from 'react';
import FormulaRow from 'components/FormulaRow';

export default function Home() {
  const { data, loading, error } = useQuery(QUERY_FORMULAS);

  const dateNow = new Date();

  const [baseYearForm, setBaseYearForm] = useState(
    String(dateNow.getFullYear()),
  );
  const [baseMonthForm, setBaseMonthForm] = useState(
    String(dateNow.getMonth() + 1),
  );
  const [baseDayForm, setBaseDayForm] = useState(String(dateNow.getDate()));

  const [baseDate, setBaseDate] = useState<Date>(dateNow);

  const onCalcButtonClick = () => {
    setBaseDate(
      new Date(
        parseInt(baseYearForm),
        parseInt(baseMonthForm) - 1,
        parseInt(baseDayForm),
      ),
    );
  };

  if (error) {
    return <p>通信エラーが発生しました</p>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>日付の加減算アプリ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>日付の加減算アプリ</h1>
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
      <h1>計算式</h1>
      {loading && <p>ロード中...</p>}
      {!loading && (
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
            {data.formulas.map((formula: Formula) => (
              <Fragment key={formula.id}>
                <FormulaRow formula={formula} baseDate={baseDate} />
              </Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
