import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {Headlines} from '../types/headlines';
import {fetchAndStoreHeadlines} from '../api/useHeadlines';

enablePromise(true);

const tableName = 'news_headlines';

export const getDBConnection = async () => {
  return openDatabase({name: tableName, location: 'default'});
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `DELETE FROM ${tableName} WHERE pinned = 0`;

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

export const fetchRandomItems = async (db: SQLiteDatabase, limit = 5) => {
  const query = `UPDATE news_headlines SET seen = 1 WHERE id IN ( SELECT id FROM news_headlines WHERE seen = 0 ORDER BY RANDOM() LIMIT ${limit})`;

  await createTable(db);
  const selectQuery = `SELECT *  FROM news_headlines WHERE seen = 1 ORDER BY id DESC`;

  await db.executeSql(query);
  const items: any[] = [];
  const results = await db.executeSql(selectQuery);
  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      items.push(result.rows.item(index));
    }
  });
  if (items.length === 0) {
    await fetchAndStoreHeadlines();
    return false;
  }

  return items;
};

export const saveItems = async (db: SQLiteDatabase, items: Headlines[]) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(headline, icon, link, brief) VALUES` +
    items
      .map(i => `('${i.headline}', '${i.icon}', '${i.link}', '${i.brief}')`)
      .join(',');

  return db.executeSql(insertQuery + ';');
};

export const pinItem = (db: SQLiteDatabase, id: any) => {
  const query = `UPDATE news_headlines SET pinned = 1 WHERE rowid = ${id};`;
  return db.executeSql(query);
};
