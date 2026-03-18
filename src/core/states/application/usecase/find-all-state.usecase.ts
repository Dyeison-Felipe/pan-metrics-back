import { PROVIDERS } from '@/shared/application/constants/providers';
import { StateOutput } from '@/shared/application/output/state/state.output';
import { UseCase } from '@/shared/application/usecase/usecase';
import { Inject } from '@nestjs/common';
import { StateRepository } from '../../domain/repositories/state.repository';
import { NotFoundError } from '@/shared/application/errors/not-found-error';

type Input = {
  search: string;
};

type Output = StateOutput[];

export class FindAllStateUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.STATE_REPOSITORY)
    private readonly stateRepository: StateRepository,
  ) {}

  async execute({ search }: Input): Promise<Output> {
    const states = await this.stateRepository.search(search);

    if (states.length === 0) {
      throw new NotFoundError(`Nenhum estado encontrado`);
    }

    const output: Output = states.map((state) => {
      return {
        id: state.id,
        name: state.name,
        uf: state.uf,
      };
    });

    return output;
  }
}
