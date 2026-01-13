import { Test, TestingModule } from '@nestjs/testing';
// Ferramenta do Nest para criar um container de injeção de dependências
// exclusivo para testes unitários.

import { ConfigService } from '@nestjs/config';
// Importamos o ConfigService apenas para poder "enganar" o Nest
// e entregar uma versão falsa (mock) dele.

import { EnvConfigService } from '../env-config.service';
import { EnvConfigModule } from '../env-config.module';
import { PROVIDERS } from '../../../application/constants/providers';
// Classe real que estamos testando.

describe('EnvConfigService', () => {
  let sut: EnvConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule.forRoot()],
      providers: [
        {
          provide: PROVIDERS.ENV_CONFIG_SERVICE,
          useFactory: (configService: ConfigService) => {
            return new EnvConfigService(configService);
          },
          inject: [ConfigService],
        },
      ],
    }).compile();

    sut = module.get<EnvConfigService>(PROVIDERS.ENV_CONFIG_SERVICE);
  });

  it('should be defined', () => {
    // Teste básico:
    // garante que o Nest conseguiu instanciar o service
    expect(sut).toBeDefined();
  });

  it('should return PORT as number', () => {
    // Aqui executamos o método real
    const result = sut.getPort();

    // Validamos:
    // o valor retornado deve ser number, não string
    expect(result).toBe(4444);
  });

  it('should return SALTS as number', () => {
    const result = sut.getSalts();

    expect(result).toBe(10);
  });

  it('should return DB_PORT as number', () => {
    const result = sut.getDbPort();

    expect(result).toBe(5434);
  });

  it('should return DB_DATABASE as number', () => {
    const result = sut.getDbName();

    expect(result).toBe('barber_db_dev_test');
  });

  it('should return DB_USER as number', () => {
    const result = sut.getDbUser();

    expect(result).toBe('test');
  });

  it('should return DB_PASSWORD as number', () => {
    const result = sut.getDbPassword();

    expect(result).toBe('test');
  });

	it('should return NODE_ENV as number', () => {
    const result = sut.getNodeEnv();

    expect(result).toBe('test');
  });

	it('should return DB_HOST as string', () => {
		const result = sut.getDbHost();

		expect(result).toBe('localhost');
	})
});
