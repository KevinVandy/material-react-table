import { faker } from '@faker-js/faker';

export const fakeColumns = [...Array(500)].map((_, i) => {
  return {
    accessorKey: i.toString(),
    header: 'Column ' + i.toString(),
    size: Math.floor(Math.random() * 100) + 150,
  };
});

export const fakeData = [...Array(10)].map(() => ({
  ...Object.fromEntries(
    fakeColumns.map((col) => [col.accessorKey, faker.person.firstName()]),
  ),
}));
