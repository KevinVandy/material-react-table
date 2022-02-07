import MaterialReactTable from 'material-react-table';
import React, { useMemo } from 'react';

export const BasicExample = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName' as const,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName' as const,
      },
      {
        Header: 'Address',
        accessor: 'address' as const,
      },
      {
        Header: 'State',
        accessor: 'state' as const,
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber' as const,
      },
    ],
    [],
  );

  const data = useMemo(
    () => [
      {
        firstName: 'Dylan',
        lastName: 'Murray',
        address: '261 Erdman Ford',
        state: 'Kentucky',
        phoneNumber: '(283) 448-8406 x3430',
      },
      {
        firstName: 'Raquel',
        lastName: 'Kohler',
        address: '769 Dominic Grove',
        state: 'Ohio',
        phoneNumber: '237.441.8991 x5595',
      },
      {
        firstName: 'Ervin',
        lastName: 'Reinger',
        address: '566 Brakus Inlet',
        state: 'West Virginia',
        phoneNumber: '672-649-3434',
      },
      {
        firstName: 'Brittany',
        lastName: 'McCullough',
        address: '722 Emie Stream',
        state: 'Nebraska',
        phoneNumber: '1-832-387-9361 x40362',
      },
      {
        firstName: 'Branson',
        lastName: 'Frami',
        address: '32188 Larkin Turnpike',
        state: 'South Carolina',
        phoneNumber: '268.525.1996',
      },
      {
        firstName: 'Shyann',
        lastName: 'Romaguera',
        address: '634 Kattie Point',
        state: 'Maine',
        phoneNumber: '604.263.1188 x00902',
      },
      {
        firstName: 'Cassandra',
        lastName: 'Hamill',
        address: '432 Felicita Lights',
        state: 'Georgia',
        phoneNumber: '1-295-703-3458 x137',
      },
      {
        firstName: 'Kavon',
        lastName: 'Pagac',
        address: '80503 Cade Crest',
        state: 'Wisconsin',
        phoneNumber: '570.886.5349',
      },
      {
        firstName: 'Brenda',
        lastName: 'Schamberger',
        address: '026 Jarvis Estate',
        state: 'Wisconsin',
        phoneNumber: '339.483.9776 x863',
      },
      {
        firstName: 'Sim',
        lastName: 'Bradtke',
        address: '344 Clifton Plaza',
        state: 'Maryland',
        phoneNumber: '870.484.0200',
      },
      {
        firstName: 'Ubaldo',
        lastName: 'Lehner',
        address: '538 Reese Streets',
        state: 'Delaware',
        phoneNumber: '1-391-753-4207',
      },
      {
        firstName: 'Garret',
        lastName: 'Robel',
        address: '288 Emard Spring',
        state: 'Montana',
        phoneNumber: '(724) 485-3086 x983',
      },
      {
        firstName: 'Ethelyn',
        lastName: 'Altenwerth',
        address: '875 Morris Estate',
        state: 'Montana',
        phoneNumber: '778-857-5512 x6095',
      },
      {
        firstName: 'Breanna',
        lastName: 'Volkman',
        address: '636 Shana Avenue',
        state: 'South Carolina',
        phoneNumber: '926-379-1385 x31307',
      },
      {
        firstName: 'Alexandrine',
        lastName: 'Brown',
        address: '0021 Fadel Neck',
        state: 'Oregon',
        phoneNumber: '488-918-6548',
      },
      {
        firstName: 'Marques',
        lastName: 'Fay',
        address: '935 Werner Springs',
        state: 'Kentucky',
        phoneNumber: '1-696-435-2004 x6435',
      },
      {
        firstName: 'Tyrel',
        lastName: 'Lindgren',
        address: '96946 Anjali Village',
        state: 'Colorado',
        phoneNumber: '(789) 396-1709',
      },
      {
        firstName: 'Elisabeth',
        lastName: 'Zulauf',
        address: '08999 Donnelly Tunnel',
        state: 'Alaska',
        phoneNumber: '841.984.7089 x30724',
      },
      {
        firstName: 'Eddie',
        lastName: 'Weissnat',
        address: '8832 Dillon Brook',
        state: 'Massachusetts',
        phoneNumber: '1-497-202-4764 x250',
      },
      {
        firstName: 'Arne',
        lastName: 'Pacocha',
        address: '80401 Goodwin Mountains',
        state: 'Colorado',
        phoneNumber: '653-244-8471',
      },
      {
        firstName: 'Amara',
        lastName: 'Emard',
        address: '5592 Max Extensions',
        state: 'Maine',
        phoneNumber: '775-235-4101 x250',
      },
    ],
    [],
  );
  return <MaterialReactTable columns={columns} data={data} />;
};
