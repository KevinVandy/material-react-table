export type Person = {
  isActive: boolean;
  name: string;
  age: number;
  city: string;
  state: string;
};

export const data = [
  {
    isActive: true,
    name: 'Tanner Linsley',
    age: 42,
    city: 'San Francisco',
    state: 'California',
  },
  {
    isActive: true,
    name: 'Kevin Vandy',
    age: 51,
    city: 'Richmond',
    state: 'Virginia',
  },
  {
    isActive: false,
    name: 'John Doe',
    age: 27,
    city: 'Riverside',
    state: 'South Carolina',
  },
  {
    isActive: true,
    name: 'Jane Doe',
    age: 32,
    city: 'San Francisco',
    state: 'California',
  },
  {
    isActive: false,
    name: 'John Smith',
    age: 42,
    city: 'Los Angeles',
    state: 'California',
  },
  {
    isActive: true,
    name: 'Jane Smith',
    age: 51,
    city: 'Blacksburg',
    state: 'Virginia',
  },
  {
    isActive: false,
    name: 'Samuel Jackson',
    age: 27,
    city: 'New York',
    state: 'New York',
  },
];

export const citiesList = [
  'San Francisco',
  'Richmond',
  'Riverside',
  'Los Angeles',
  'Blacksburg',
  'New York',
];

export const usStateList = [
  'California',
  'Virginia',
  'South Carolina',
  'New York',
  'Texas',
];
