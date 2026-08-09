import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'process';

import { initDatabase, pool } from './database/connection';
import { menuLogin } from './menus/sistema-login';

const terminal = createInterface({
  input: stdin,
  output: stdout,
});

async function main() {
  try {
    await initDatabase();

    console.log('========================================');
    console.log('       BookStore Manager CLI            ');
    console.log('========================================');

    await menuLogin(terminal);
  } catch (error) {
    console.error(error);
  } finally {
    terminal.close();
    await pool.end();
  }
}

main().catch(console.error);
