import { TRT_Cell } from 'tailwindcss-react-table';

export interface CellInstanceAPI {
  cellInstanceAPI: keyof TRT_Cell;
  link?: string;
  linkText?: string;
  description?: string;
  type?: string;
}

export const cellInstanceAPIs: CellInstanceAPI[] = [
  {
    cellInstanceAPI: 'column',
    type: '',
    description: '',
    link: '',
    linkText: '',
  },
  {
    cellInstanceAPI: 'getContext',
    type: '',
    description: '',
    link: '',
    linkText: '',
  },
  {
    cellInstanceAPI: 'getIsAggregated',
    type: '',
    description: '',
    link: '',
    linkText: '',
  },
  {
    cellInstanceAPI: 'getIsGrouped',
    type: '',
    description: '',
    link: '',
    linkText: '',
  },
  {
    cellInstanceAPI: 'getIsPlaceholder',
    type: '',
    description: '',
    link: '',
    linkText: '',
  },
  {
    cellInstanceAPI: 'getValue',
    type: '',
    description: '',
    link: '',
    linkText: '',
  },
  { cellInstanceAPI: 'id', type: '', description: '', link: '', linkText: '' },
  {
    cellInstanceAPI: 'renderValue',
    type: '',
    description: '',
    link: '',
    linkText: '',
  },
  { cellInstanceAPI: 'row', type: '', description: '', link: '', linkText: '' },
];
