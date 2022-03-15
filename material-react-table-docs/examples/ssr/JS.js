import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';

const ExamplePage = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'City',
        accessor: 'city',
      },
      {
        Header: 'Zip Code',
        accessor: 'zipcode',
      },
    ],
    [],
  );

  return <MaterialReactTable columns={columns} data={data} />;
};

export async function getServerSideProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const json = await response.json();

  const data =
    json.map((userData) => ({
      name: userData.name,
      username: userData.username,
      email: userData.email,
      address: userData.address.street,
      city: userData.address.city,
      zipcode: userData.address.zipcode,
    })) ?? [];

  return { props: { data } };
}

export default ExamplePage;
