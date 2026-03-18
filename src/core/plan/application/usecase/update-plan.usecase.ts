import { PROVIDERS } from '@/shared/application/constants/providers';
import { UpdatePlanOutput } from '@/shared/application/output/plan/update-plan.output';
import { Inject } from '@nestjs/common';
import { PlanRespository } from '../../domain/repositories/plan.repository';
import { UseCase } from '@/shared/application/usecase/usecase';
import { NotFoundError } from '@/shared/application/errors/not-found-error';
import { LoggedUserService } from '@/shared/application/logged-user/logged-user.service';
import { Transactional } from '@/shared/infra/database/typeorm/decorators/transactional.decorator';

type Input = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
};

type Output = UpdatePlanOutput;

export class UpdatePlanUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.PLAN_REPOSITORY)
    private readonly planRepository: PlanRespository,
    @Inject(PROVIDERS.LOGGED_USER_SERVICE)
    private readonly loggedUser: LoggedUserService,
  ) {}

  @Transactional()
  async execute(input: Input): Promise<Output> {
    const loggedUser = this.loggedUser.getLoggedUser();

    const plan = await this.planRepository.findById(input.id);

    if (!plan) {
      throw new NotFoundError('Plano não encontrado');
    }

    plan.update({
      name: input.name,
      description: input.description,
      price: input.price,
      duration: input.duration,
      auditable: {
        updatedBy: loggedUser.id,
      },
    });

    const savePlan = await this.planRepository.save(plan);

    const output: Output = {
      id: savePlan.id,
      name: savePlan.name,
      description: savePlan.description,
      duration: savePlan.duration,
      price: savePlan.price,
      createdAt: savePlan.auditable.createdAt,
      updatedAt: savePlan.auditable.updatedAt,
      deletedAt: savePlan.auditable.deletedAt,
      createdBy: savePlan.auditable.createdBy,
      updatedBy: savePlan.auditable.updatedBy,
      deletedBy: savePlan.auditable.deletedBy,
    };

    return output;
  }
}
