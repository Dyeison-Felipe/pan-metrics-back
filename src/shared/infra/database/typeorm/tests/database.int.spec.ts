import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { DatabaseModule } from '../database.module';

describe('DatabaseModule integration', () => {
  let module: TestingModule;
  let dataSource: DataSource;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    dataSource = module.get(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
    await module.close();
  });

  it('should connect to test database', async () => {
    expect(dataSource.isInitialized).toBe(true);

    const result = await dataSource.query('SELECT 1');
    expect(result).toBeDefined();
  });

  it('should have created the test schema', async () => {
    const result = await dataSource.query(`
      SELECT schema_name
      FROM information_schema.schemata
      WHERE schema_name = 'test'
    `);

    expect(result.length).toBe(1);
  });

  it('should be using the test schema', async () => {
    const result = await dataSource.query('SHOW search_path');

    const searchPath = result[0].search_path as string;

    expect(searchPath.startsWith('test')).toBe(true);
  });
});
