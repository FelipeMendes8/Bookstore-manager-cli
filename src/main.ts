import { initDatabase } from './database/connection';
import { menuLogin } from './menus/sistemaLogin';

async function main() {
  await initDatabase();

  console.log('========================================');
  console.log('   BookStore Manager CLI              ');
  console.log('========================================');
  console.log('');
  await menuLogin();
}

main().catch(console.error);
