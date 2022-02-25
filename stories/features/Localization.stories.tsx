import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';
import { createTheme, ThemeProvider } from '@mui/material';
import { esES } from '@mui/material/locale';

const meta: Meta = {
  title: 'Features/Localization Examples',
  parameters: {
    status: {
      type: 'stable',
    },
  },
};

export default meta;

const columns = [
  {
    Header: 'Primer nombre',
    accessor: 'firstName' as const,
  },
  {
    Header: 'Apellido',
    accessor: 'lastName' as const,
  },
  {
    Header: 'Dirección',
    accessor: 'address' as const,
  },
  {
    Header: 'Ciudad',
    accessor: 'city' as const,
  },
  {
    Header: 'Estado',
    accessor: 'state' as const,
  },
];

const data = [...Array(100)].map((_) => ({
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  state: faker.address.state(),
}));

export const CustomSpanishLocalizationExample: Story<
  MaterialReactTableProps
> = () => (
  <ThemeProvider theme={createTheme({}, esES)}>
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnGrouping
      enableRowEditing
      enableSelection
      localization={{
        actionsHeadColumnTitle: 'Acciones',
        columnActionMenuButtonTitle: 'Acciones de columna',
        columnActionMenuItemClearSort: 'Ordenar claro',
        columnActionMenuItemGroupBy: 'Agrupar por {column}',
        columnActionMenuItemHideColumn: 'Ocultar columna de {column}',
        columnActionMenuItemSortAsc: 'Ordenar por {column} ascendente',
        columnActionMenuItemSortDesc: 'Ordenar por {column} descendiendo',
        columnActionMenuItemUnGroupBy: 'Desagrupar por {column}',
        columnShowHideMenuHideAll: 'Ocultar todo',
        columnShowHideMenuShowAll: 'Mostrar todo',
        expandAllButtonTitle: 'Expandir todo',
        expandButtonTitle: 'Expandir',
        filterTextFieldClearButtonTitle: 'Filtro claro',
        filterTextFieldPlaceholder: 'Filtrar por {column}',
        rowActionButtonCancel: 'Cancelar',
        rowActionButtonSave: 'Salvar',
        rowActionMenuButtonTitle: 'Acciones de fila',
        rowActionMenuItemEdit: 'Editar',
        rowActionsColumnTitle: 'Acciones',
        searchTextFieldClearButtonTitle: 'Borrar búsqueda',
        searchTextFieldPlaceholder: 'Búsqueda',
        selectAllCheckboxTitle: 'Seleccionar todo',
        selectCheckboxTitle: 'Seleccionar fila',
        showHideColumnsButtonTitle: 'Mostrar/Ocultar columnas',
        toggleDensePaddingSwitchTitle: 'Alternar relleno denso',
        toggleFilterButtonTitle: 'Alternar filtros',
        toggleFullScreenButtonTitle: 'Alternar pantalla completa',
        toggleSearchButtonTitle: 'Alternar búsqueda',
        toolbarAlertSelectionMessage:
          '{selectedCount} de {rowCount} fila(s) seleccionadas',
        toolbarAlertGroupedByMessage: 'Agrupados por ',
        toolbarAlertGroupedThenByMessage: ', entonces por ',
      }}
    />
  </ThemeProvider>
);
