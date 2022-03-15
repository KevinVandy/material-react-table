import React, { useMemo, useEffect, useState } from 'react';
import MaterialReactTable from 'material-react-table';

const Example = () => {
  const [remoteData, setRemoteData] = useState([]);
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
      remoteData.map((userData) => ({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        address: userData.address.street,
        city: userData.address.city,
        zipcode: userData.address.zipcode,
      })) ?? [],
    [remoteData],
  );

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

  return (
    <MaterialReactTable
      columns={columns}
      data={parsedData}
      isLoading={isLoading}
    />
  );
};

export default Example;
