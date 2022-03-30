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
    header: 'Primer nombre',
    id: 'firstName',
  },
  {
    header: 'Apellido',
    id: 'lastName',
  },
  {
    header: 'Dirección',
    id: 'address',
  },
  {
    header: 'Ciudad',
    id: 'city',
  },
  {
    header: 'Estado',
    id: 'state',
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
      enableGrouping
      enableRowEditing
      enableSelection
      localization={{
        actions: 'Acciones',
        columnActions: 'Acciones de columna',
        clearSort: 'Ordenar claro',
        groupByColumn: 'Agrupar por {column}',
        hideColumn: 'Ocultar columna de {column}',
        sortByColumnAsc: 'Ordenar por {column} ascendente',
        sortByColumnDesc: 'Ordenar por {column} descendiendo',
        ungroupByColumn: 'Desagrupar por {column}',
        hideAll: 'Ocultar todo',
        showAll: 'Mostrar todo',
        expandAll: 'Expandir todo',
        expand: 'Expandir',
        clearFilter: 'Filtro claro',
        filterByColumn: 'Filtrar por {column}',
        cancel: 'Cancelar',
        save: 'Salvar',
        rowActions: 'Acciones de fila',
        edit: 'Editar',
        clearSearch: 'Borrar búsqueda',
        search: 'Búsqueda',
        toggleSelectAll: 'Seleccionar todo',
        toggleSelectRow: 'Seleccionar fila',
        showHideColumns: 'Mostrar/Ocultar columnas',
        toggleDensePadding: 'Alternar relleno denso',
        showHideFilters: 'Alternar filtros',
        toggleFullScreen: 'Alternar pantalla completa',
        showHideSearch: 'Alternar búsqueda',
        selectedCountOfRowCountRowsSelected:
          '{selectedCount} de {rowCount} fila(s) seleccionadas',
        groupedBy: 'Agrupados por ',
        thenBy: ', entonces por ',
      }}
    />
  </ThemeProvider>
);
