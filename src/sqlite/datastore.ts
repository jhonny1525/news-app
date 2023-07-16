import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {Headlines} from '../types/headlines';

enablePromise(true);

const tableName = 'news_headlines';

export const getDBConnection = async () => {
  return openDatabase({name: tableName, location: 'default'});
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
    id INTEGER PRIMARY KEY,
    headline TEXT,
    icon TEXT,
    link TEXT,
    brief TEXT,
    pinned INTEGER DEFAULT 0,
    seen INTEGER DEFAULT 0
);;`;

  await db.executeSql(query);
};

export const saveItems = async (db: SQLiteDatabase, items: Headlines[]) => {
  console.log(
    'Data12',
    items
      .map(i => `(${i.id}, ${i.headline}, ${i.icon}, ${i.link}, ${i.brief})`)
      .join(',')
  );
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, headline, icon, link, brief) VALUES` +
    items
      .map(
        i =>
          `(${i.id}, '${i.headline}', '${i.icon}', '${i.link}', '${i.brief}')`
      )
      .join(',');

  return db.executeSql(insertQuery);
};
