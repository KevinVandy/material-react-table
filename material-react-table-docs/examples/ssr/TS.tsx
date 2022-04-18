import React, { FC, useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnInterface } from 'material-react-table';

interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface Props {
  data: {
    name: string;
    username: string;
    email: string;
    address: string;
    city: string;
    zipcode: string;
  }[];
}

const ExamplePage: FC<Props> = ({ data }) => {
  const columns = useMemo(
    () =>
      [
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
      ] as MRT_ColumnInterface[],
    [],
  );

  return <MaterialReactTable columns={columns} data={data} />;
};

export async function getServerSideProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const json: UserData[] = await response.json();

  const data =
    json.map((userData: UserData) => ({
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
