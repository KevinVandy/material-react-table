import React from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { data, Person } from './makeData';
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { esES } from '@mui/material/locale';

const columns = [
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

const Example = () => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={createTheme(theme, esES)}>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnOrdering
        enableEditing
        enablePinning
        enableRowActions
        enableRowSelection
        localization={{
          actions: 'Acciones',
          cancel: 'Cancelar',
          changeFilterMode: 'Cambia el modo de filtro',
          clearFilter: 'Filtro claro',
          clearSearch: 'Borrar búsqueda',
          clearSort: 'Ordenar claro',
          columnActions: 'Acciones de columna',
          edit: 'Editar',
          expand: 'Expandir',
          expandAll: 'Expandir todo',
          filterByColumn: 'Filtrar por {column}',
          filterMode: 'Modo de filtro: {filterType}',
          grab: 'Agarrar',
          groupByColumn: 'Agrupar por {column}',
          groupedBy: 'Agrupados por ',
          hideAll: 'Ocultar todo',
          hideColumn: 'Ocultar columna de {column}',
          rowActions: 'Acciones de fila',
          pinToLeft: 'Alfile a la izquierda',
          pinToRight: 'Alfile a la derecha',
          save: 'Salvar',
          search: 'Búsqueda',
          selectedCountOfRowCountRowsSelected:
            '{selectedCount} de {rowCount} fila(s) seleccionadas',
          showAll: 'Mostrar todo',
          showAllColumns: 'Mostrar todas las columnas',
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
          unpin: 'Quitar pasador',
          unsorted: 'Sin clasificar',
        }}
      />
    </ThemeProvider>
  );
};

export default Example;
