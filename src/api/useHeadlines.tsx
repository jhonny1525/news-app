import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {Headlines} from '../types/headlines';
import {
  createTable,
  deleteTable,
  getDBConnection,
  saveItems,
} from '../sqlite/datastore';

// Helper function to generate a random icon name
function getRandomIcon() {
  const icons = ['icon1.png', 'icon2.png', 'icon3.png', 'icon4.png'];
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex];
}

// Helper function to generate a random brief description
function generateRandomBrief() {
  const briefs = [
    'This is a random news brief.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'In hac habitasse platea dictumst.',
    'Nullam fringilla ultrices neque, et malesuada ligula malesuada vitae.',
    'Duis vel justo urna.',
    'Pellentesque luctus ante in sapien finibus rhoncus.',
    'Nunc finibus elementum erat, id tempor massa tristique nec.',
    'Vestibulum interdum lobortis erat, ut vestibulum metus viverra ac.',
    'Cras id neque sit amet purus dapibus sollicitudin.',
    'Curabitur dictum iaculis odio, in suscipit ligula interdum nec.',
  ];
  const randomIndex = Math.floor(Math.random() * briefs.length);
  return briefs[randomIndex];
}

let dummyData: Headlines[] | PromiseLike<Headlines[]> = [];

const useHeadLines = () => {
  const {isLoading, isError, data, error, refetch, isRefetching} = useQuery({
    queryKey: ['gnews'],
    queryFn: async (): Promise<Headlines[]> => {
      const db = await getDBConnection();
      await deleteTable(db);
      await createTable(db);
      dummyData = [];
      for (let i = 1; i <= 20; i++) {
        const record = {
          id: i,
          headline: `News ${i}`,
          icon: getRandomIcon(),
          link: `https://example.com/news${i}`,
          brief: generateRandomBrief(),
          seen: false,
          pinned: false,
        };

        dummyData.push(record);
      }
      await saveItems(db, dummyData);
      return dummyData;
    },
  });
  return {isLoading, isError, data, error, refetch, isRefetching};
};

export default useHeadLines;
