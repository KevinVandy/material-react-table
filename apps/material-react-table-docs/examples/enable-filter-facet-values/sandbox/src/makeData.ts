export type Person = {
  isActive: boolean;
  name: string;
  age: number;
  salary: number;
  city: string;
  state: string;
};

export const data = [
  {
    isActive: true,
    name: 'Tanner Linsley',
    age: 42,
    salary: 100_000,
    city: 'San Francisco',
    state: 'California',
  },
  {
    isActive: true,
    name: 'Kevin Vandy',
    age: 51,
    salary: 80_000,
    city: 'Richmond',
    state: 'Virginia',
  },
  {
    isActive: false,
    name: 'John Doe',
    age: 27,
    salary: 120_000,
    city: 'Riverside',
    state: 'South Carolina',
  },
  {
    isActive: true,
    name: 'Jane Doe',
    age: 32,
    salary: 150_000,
    city: 'San Francisco',
    state: 'California',
  },
  {
    isActive: false,
    name: 'John Smith',
    age: 42,
    salary: 75_000,
    city: 'Los Angeles',
    state: 'California',
  },
  {
    isActive: true,
    name: 'Jane Smith',
    age: 51,
    salary: 56_000,
    city: 'Blacksburg',
    state: 'Virginia',
  },
  {
    isActive: false,
    name: 'Samuel Jackson',
    age: 27,
    salary: 90_000,
    city: 'New York',
    state: 'New York',
  },
];
