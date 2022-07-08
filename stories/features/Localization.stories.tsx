import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps, MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';
import { createTheme, ThemeProvider } from '@mui/material';
import { esES } from '@mui/material/locale';

const meta: Meta = {
  title: 'Features/Localization Examples',
};

export default meta;

const columns: MRT_ColumnDef<typeof data[0]>[] = [
  {
    header: 'Primer nombre',
    accessorKey: 'firstName',
  },
  {
    header: 'Apellido',
    accessorKey: 'lastName',
  },
  {
    header: 'Dirección',
    accessorKey: 'address',
  },
  {
    header: 'Ciudad',
    accessorKey: 'city',
  },
  {
    header: 'Estado',
    accessorKey: 'state',
  },
];

const data = [...Array(100)].map(() => ({
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
      enableEditing
      enableRowSelection
      localization={{
        actions: 'Acciones',
        cancel: 'Cancelar',
        clearFilter: 'Filtro claro',
        clearSearch: 'Borrar búsqueda',
        clearSort: 'Ordenar claro',
        columnActions: 'Acciones de columna',
        edit: 'Editar',
        expand: 'Expandir',
        expandAll: 'Expandir todo',
        filterByColumn: 'Filtrar por {column}',
        groupByColumn: 'Agrupar por {column}',
        groupedBy: 'Agrupados por ',
        hideAll: 'Ocultar todo',
        hideColumn: 'Ocultar columna de {column}',
        rowActions: 'Acciones de fila',
        save: 'Salvar',
        search: 'Búsqueda',
        selectedCountOfRowCountRowsSelected:
          '{selectedCount} de {rowCount} fila(s) seleccionadas',
        showAll: 'Mostrar todo',
        showHideColumns: 'Mostrar/Ocultar columnas',
        showHideFilters: 'Alternar filtros',
        showHideSearch: 'Alternar búsqueda',
        sortByColumnAsc: 'Ordenar por {column} ascendente',
        sortByColumnDesc: 'Ordenar por {column} descendiendo',
        thenBy: ', entonces por ',
        toggleDensity: 'Alternar relleno denso',
        toggleFullScreen: 'Alternar pantalla completa',
        toggleSelectAll: 'Seleccionar todo',
        toggleSelectRow: 'Seleccionar fila',
        ungroupByColumn: 'Desagrupar por {column}',
      }}
    />
  </ThemeProvider>
);
