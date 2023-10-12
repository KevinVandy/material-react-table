import { type MRT_ColumnDef } from 'material-react-table';

export type Person = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
};

export const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName', //access nested data with dot notation
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
];

export const data: Person[] = [
  {
    firstName: 'Mason',
    lastName: 'Anderson',
    email: 'manderson57@yopmail.com',
    city: 'Seattle',
  },
  {
    firstName: 'Nora',
    lastName: 'Bishop',
    email: 'nbishop26@mailinator.com',
    city: 'Portland',
  },
  {
    firstName: 'Liam',
    lastName: 'Patterson',
    email: 'lpatterson61@yopmail.com',
    city: 'Austin',
  },
  {
    firstName: 'Harper',
    lastName: 'Ross',
    email: 'hross38@mailinator.com',
    city: 'Chicago',
  },
  {
    firstName: 'Oliver',
    lastName: 'Baker',
    email: 'obaker72@yopmail.com',
    city: 'Miami',
  },
  {
    firstName: 'Charlotte',
    lastName: 'Phillips',
    email: 'cphillips33@mailinator.com',
    city: 'Los Angeles',
  },
  {
    firstName: 'Henry',
    lastName: 'Cooper',
    email: 'hcooper18@yopmail.com',
    city: 'Denver',
  },
  {
    firstName: 'Emma',
    lastName: 'Jenkins',
    email: 'ejenkins49@mailinator.com',
    city: 'Boston',
  },
  {
    firstName: 'Alexander',
    lastName: 'Gonzalez',
    email: 'agonzalez67@yopmail.com',
    city: 'Dallas',
  },
  {
    firstName: 'Ava',
    lastName: 'Ramirez',
    email: 'aramirez94@mailinator.com',
    city: 'Houston',
  },
  {
    firstName: 'William',
    lastName: 'Bailey',
    email: 'wbailey59@yopmail.com',
    city: 'Phoenix',
  },
  {
    firstName: 'Sophia',
    lastName: 'Cox',
    email: 'scox77@mailinator.com',
    city: 'Atlanta',
  },
  {
    firstName: 'James',
    lastName: 'Sanders',
    email: 'jsanders26@yopmail.com',
    city: 'Detroit',
  },
  {
    firstName: 'Mia',
    lastName: 'Long',
    email: 'mlong33@mailinator.com',
    city: 'Philadelphia',
  },
  {
    firstName: 'Benjamin',
    lastName: 'Bennett',
    email: 'bbennett92@yopmail.com',
    city: 'Washington, D.C.',
  },
  {
    firstName: 'Dylan',
    lastName: 'Murray',
    email: 'dmurray@yopmail.com',
    city: 'East Daphne',
  },
  {
    firstName: 'Raquel',
    lastName: 'Kohler',
    email: 'rkholer33@yopmail.com',
    city: 'Columbus',
  },
  {
    firstName: 'Ervin',
    lastName: 'Reinger',
    email: 'ereinger@mailinator.com',
    city: 'South Linda',
  },
  {
    firstName: 'Brittany',
    lastName: 'McCullough',
    email: 'bmccullough44@mailinator.com',
    city: 'Lincoln',
  },
  {
    firstName: 'Branson',
    lastName: 'Frami',
    email: 'bframi@yopmain.com',
    city: 'New York',
  },
  {
    firstName: 'Julia',
    lastName: 'Thomas',
    email: 'jthomas42@mailinator.com',
    city: 'San Francisco',
  },
];
