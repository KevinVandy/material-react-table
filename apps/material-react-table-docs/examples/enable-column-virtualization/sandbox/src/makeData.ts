import { faker } from '@faker-js/faker';

export const fakeColumns = [...Array(500)].map((_, i) => {
  return {
    accessorKey: i.toString(),
    header: 'Column ' + i.toString(),
  };
});

export const fakeData = [...Array(10)].map(() => ({
  ...Object.fromEntries(
    fakeColumns.map((col) => [col.accessorKey, faker.person.firstName()]),
  ),
}));
