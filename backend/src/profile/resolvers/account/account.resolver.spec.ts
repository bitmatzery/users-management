import { Test, TestingModule } from '@nestjs/testing';
import { AccountResolver } from './account.resolver';

describe('AccountService', () => {
  let service: AccountResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountResolver],
    }).compile();

    service = module.get<AccountResolver>(AccountResolver);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
