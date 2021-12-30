# クエリの例

全件取得

    query {
      formulas {
        id
        name
        addYear
        addMonth
        addDay
      }
    }

新規作成

    mutation {
      createFormula(name: "全部1減算", addYear: -1, addMonth:-1, addDay:-1) {
        id
        name
        addYear
        addMonth
        addDay
      }
    }

更新

    mutation {
          updateFormula(id: 2, name: "全部1減算!", addYear: -1, addMonth:-1, addDay:-1) {
            id
            name
            addYear
            addMonth
            addDay
          }
        }

削除

    mutation {
          deleteFormula(id: 2) {
            id
            name
            addYear
            addMonth
            addDay
          }
        }
