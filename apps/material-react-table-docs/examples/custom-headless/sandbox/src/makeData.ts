export type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

export const data: Person[] = [
  {
    name: {
      firstName: 'Christopher',
      lastName: 'Lee',
    },
    address: '555 Cedar Street',
    city: 'Seattle',
    state: 'Washington',
  },
  {
    name: {
      firstName: 'Rachel',
      lastName: 'Anderson',
    },
    address: '987 Walnut Court',
    city: 'New York',
    state: 'New York',
  },
  {
    name: {
      firstName: 'David',
      lastName: 'Garcia',
    },
    address: '654 Maple Avenue',
    city: 'Los Angeles',
    state: 'California',
  },
  {
    name: {
      firstName: 'Zachary',
      lastName: 'Davis',
    },
    address: '261 Battle Ford',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Robert',
      lastName: 'Smith',
    },
    address: '566 Brakus Inlet',
    city: 'Westerville',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Yan',
    },
    address: '7777 Kuhic Knoll',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'John',
      lastName: 'Upton',
    },
    address: '722 Emie Stream',
    city: 'Huntington',
    state: 'Washington',
  },
  {
    name: {
      firstName: 'Nathan',
      lastName: 'Harris',
    },
    address: '1 Kuhic Knoll',
    city: 'Ohiowa',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Emily',
      lastName: 'Smith',
    },
    address: '123 Main Street',
    city: 'Springfield',
    state: 'Illinois',
  },
  {
    name: {
      firstName: 'Jessica',
      lastName: 'Johnson',
    },
    address: '456 Elm Avenue',
    city: 'Portland',
    state: 'Oregon',
  },
  {
    name: {
      firstName: 'Michael',
      lastName: 'Davis',
    },
    address: '789 Oak Lane',
    city: 'Austin',
    state: 'Texas',
  },
  {
    name: {
      firstName: 'Sarah',
      lastName: 'Wilson',
    },
    address: '321 Pine Road',
    city: 'Denver',
    state: 'Colorado',
  },
];
