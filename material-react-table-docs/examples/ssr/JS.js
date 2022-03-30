import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';

const ExamplePage = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        header: 'Name',
        id: 'name',
      },
      {
        header: 'Username',
        id: 'username',
      },
      {
        header: 'Email',
        id: 'email',
      },
      {
        header: 'Address',
        id: 'address',
      },
      {
        header: 'City',
        id: 'city',
      },
      {
        header: 'Zip Code',
        id: 'zipcode',
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
