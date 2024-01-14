import {
  type MRT_ColumnFiltersState,
  type MRT_SortingState,
} from 'material-react-table';
import { type NextApiRequest, type NextApiResponse } from 'next';

//This is all fake mock code. Don't be inspired by it.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (process.env.NODE_ENV === 'development') {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  const { start, size, filters, sorting, globalFilter, expandedRowIds } =
    req.query as Record<string, string>;

  let dbData = getData();

  //recursive filter out rows that don't have a manageId that matches an expandedRowId
  const removeSubordinatesFromCollapsedRows = (rows: DataRow[]) => {
    rows.forEach((row) => {
      if (!expandedRowIds.includes(row.id)) {
        delete row.subordinates;
      }
      if (row.subordinates?.length) {
        removeSubordinatesFromCollapsedRows(row.subordinates);
      }
    });
  };

  if (expandedRowIds !== 'all') {
    removeSubordinatesFromCollapsedRows(dbData);
  }

  const parsedSorting = JSON.parse(sorting) as MRT_SortingState;
  if (parsedSorting?.length) {
    const sort = parsedSorting[0];
    const { id, desc } = sort;

    //recursive sort rows and row's sub-rows
    const sortRowsAndSubRows = (rows) => {
      rows.sort((a, b) => {
        if (!a[id] || !b[id]) return 0;
        if (desc) {
          return a[id] < b[id] ? 1 : -1;
        }
        return a[id] > b[id] ? 1 : -1;
      });
      rows.forEach((row) => {
        if (row.subordinates?.length) {
          sortRowsAndSubRows(row.subordinates);
        }
      });
      return rows;
    };

    dbData = sortRowsAndSubRows(dbData);
  }

  const paginatedData =
    dbData.slice(parseInt(start), parseInt(start) + parseInt(size)) ?? [];

  let flatDBData: DataRow[] = [];
  const flattenRows = (rows) => {
    rows.forEach((row) => {
      flatDBData.push(row);
      if (row.subordinates?.length) {
        flattenRows(row.subordinates);
      }
    });
    return flatDBData;
  };

  flatDBData = flattenRows(paginatedData);

  flatDBData.forEach((row) => (delete row.subordinates ? row : null));

  res.status(200).json({
    data: flatDBData,
    meta: { totalRowCount: flatDBData.length },
  });
}

interface DataRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  state: string;
  managerId: string | null;
  subordinateIds: string[];
  subordinates?: DataRow[];
}

//data definitions...
const getData = (): DataRow[] => [
  {
    id: '5ymtrc',
    firstName: 'Henry',
    lastName: 'Lynch',
    email: 'Camden.Macejkovic@yahoo.com',
    state: 'California',
    managerId: null,
    subordinateIds: ['08m6rx'],
    subordinates: [
      {
        id: '08m6rx',
        firstName: 'Molly',
        lastName: 'Purdy',
        email: 'Hugh.Dach79@hotmail.com',
        state: 'Rhode Island',
        managerId: '5ymtrc',
        subordinateIds: ['9s41rp', 'ek5b97', 'xxtydd'],
        subordinates: [
          {
            id: '9s41rp',
            firstName: 'Kelvin',
            lastName: 'Langosh',
            email: 'Jerod14@hotmail.com',
            state: 'Ohio',
            managerId: '08m6rx',
            subordinateIds: [],
          },
          {
            id: 'ek5b97',
            firstName: 'Glenda',
            lastName: 'Douglas',
            email: 'Eric0@yahoo.com',
            state: 'Montana',
            managerId: '08m6rx',
            subordinateIds: [],
          },
          {
            id: 'xxtydd',
            firstName: 'Leone',
            lastName: 'Williamson',
            email: 'Ericka_Mueller52@yahoo.com',
            state: 'Colorado',
            managerId: '08m6rx',
            subordinateIds: [],
          },
        ],
      },
    ],
  },
  {
    id: 'wzxj9m',
    firstName: 'Mckenna',
    lastName: 'Friesen',
    email: 'Veda_Feeney@yahoo.com',
    state: 'New York',
    managerId: null,
    subordinateIds: ['21dwtz', 'o8oe4k'],
    subordinates: [
      {
        id: '21dwtz',
        firstName: 'Wyman',
        lastName: 'Jast',
        email: 'Melvin.Pacocha@yahoo.com',
        state: 'Montana',
        managerId: 'wzxj9m',
        subordinateIds: [],
      },
      {
        id: 'o8oe4k',
        firstName: 'Janick',
        lastName: 'Willms',
        email: 'Delfina12@gmail.com',
        state: 'Nebraska',
        managerId: 'wzxj9m',
        subordinateIds: [],
      },
    ],
  },
];
//end
