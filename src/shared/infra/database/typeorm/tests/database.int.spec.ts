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
});
