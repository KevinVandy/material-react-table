export type Person = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  country: string;
};

export const data: Person[] = [
  {
    id: '1',
    firstName: 'Dylan',
    middleName: 'Sprouse',
    lastName: 'Murray',
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
    country: 'United States',
  },
  {
    id: '2',
    firstName: 'Raquel',
    middleName: 'Hakeem',
    lastName: 'Kohler',
    address: '769 Dominic Grove',
    city: 'Vancouver',
    state: 'British Columbia',
    country: 'Canada',
  },
  {
    id: '3',
    firstName: 'Ervin',
    middleName: 'Kris',
    lastName: 'Reinger',
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
    country: 'United States',
  },
];
