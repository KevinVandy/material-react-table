import React, { createContext, FC, useContext } from 'react';
import { TableInstance, useTable } from 'react-table';
import { ReactTableMuiProps } from '.';

interface IUseReactTableMui {
  tableInstance: TableInstance<object>;
}

const ReactTableMuiContext = createContext<IUseReactTableMui>(
  {} as IUseReactTableMui,
);

interface Props extends ReactTableMuiProps {
  children: React.ReactNode;
}

export const ReactTableMuiProvider: FC<Props> = ({
  children,
  columns,
  data,
}) => {
  const tableInstance = useTable({ columns, data });

  return (
    <ReactTableMuiContext.Provider value={{ tableInstance }}>
      {children}
    </ReactTableMuiContext.Provider>
  );
};

export const useReactTableMui = (): IUseReactTableMui =>
  useContext(ReactTableMuiContext);
