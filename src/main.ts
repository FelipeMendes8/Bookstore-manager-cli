import { pool, initDatabase } from './database/connection';

async function getAutor(): Promise<void> {
  const poolConnection = await pool.connect();

  try {
    const result = await poolConnection.query('SELECT * FROM autor;');

    console.log('Qtd autores: ', result.rowCount);
    console.log(result.rows);
  } finally {
    poolConnection.release();
  }
}

async function main() {
  await initDatabase();
  await getAutor();
}

main().catch(console.error);
