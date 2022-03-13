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
      remoteData.map((rd) => ({
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
        accessor: 'id',
      },
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
