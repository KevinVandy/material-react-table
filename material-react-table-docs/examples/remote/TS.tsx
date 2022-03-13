import React, { FC, useEffect, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';

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

const Example: FC = () => {
  const [remoteData, setRemoteData] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      );
      const json = await response.json();
      setRemoteData(json);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const parsedData = useMemo(
    () =>
      remoteData.map((rd: UserData) => ({
        id: rd.id,
        name: rd.name,
        username: rd.username,
        email: rd.email,
        address: rd.address.street,
      })) ?? [],
    [remoteData],
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id' as const,
      },
      {
        Header: 'Name',
        accessor: 'name' as const,
      },
      {
        Header: 'Username',
        accessor: 'username' as const,
      },
      {
        Header: 'Email',
        accessor: 'email' as const,
      },
      {
        Header: 'Address',
        accessor: 'address' as const,
      },
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={parsedData}
      isLoading={isLoading}
    />
  );
};

export default Example;
