import { Test, TestingModule } from '@nestjs/testing';
import { HashService } from '../hash.service';
import { HashModule } from '../hash.module';
import { PROVIDERS } from '../../../application/constants/providers';
import { EnvConfigService } from '../../env-config/env-config.service';

describe('HashService', () => {
  let sut: HashService;
  let envConfigService: EnvConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HashModule],
      providers: [
        {
          provide: PROVIDERS.HASH_SERVICE,
          useFactory: (configService: EnvConfigService) => {
            return new HashService(configService);
          },
          inject: [PROVIDERS.ENV_CONFIG_SERVICE],
        },
      ],
    }).compile();

    sut = module.get<HashService>(PROVIDERS.HASH_SERVICE);
    envConfigService = module.get<EnvConfigService>(
      PROVIDERS.ENV_CONFIG_SERVICE,
    );
  });

  it('should configService be defined', () => {
    expect(envConfigService).toBeDefined();
  })

  it('should hashService be defined', () => {
    expect(sut).toBeDefined();
  })

  it('should return hashed password', () => {
    // mockEnvConfigService.getSalts();

    return sut.hash('my_password').then((result) => {
      expect(result).not.toBe('my_password');
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  it('should compare_hash return true', () => {
    const password = 'my_password';

    return sut.hash(password).then((hash) => {
      const result = sut.compareHash(password, hash);

      expect(result).toBe(true);
    });
  });

  it('should compare_hash return false', () => {
    const password_correct = 'my_password';
    const password_incorrect = 'password';

    return sut.hash(password_correct).then((hash) => {
      const result = sut.compareHash(password_incorrect, hash);

      expect(result).toBe(false);
    });
  });
});
