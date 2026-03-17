import { PROVIDERS } from '@/shared/application/constants/providers';
import { UseCase } from '@/shared/application/usecase/usecase';
import { Inject } from '@nestjs/common';
import { PlanRespository } from '../../domain/repositories/plan.repository';
import { Transactional } from '@/shared/infra/database/typeorm/decorators/transactional.decorator';
import { CreatePlanInput } from '@/shared/application/input/plan/create-plan.input';
import { CreatePlanOutput } from '@/shared/application/output/plan/create-plan.output';
import { ConflictError } from '@/shared/application/errors/conflict-error';
import { PlanEntity } from '../../domain/entity/plan.entity';
import { LoggedUserService } from '@/shared/application/logged-user/logged-user.service';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';

type Input = CreatePlanInput;

type Output = CreatePlanOutput;

export class CreatePlanUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.PLAN_REPOSITORY)
    private readonly planRepository: PlanRespository,
    @Inject(PROVIDERS.LOGGED_USER_SERVICE) private readonly loggedUser: LoggedUserService,
  ) {}
  
  @Transactional()
  async execute(input: Input): Promise<Output> {

    const loggedUser = this.loggedUser.getLoggedUser();

    const planExist = await this.planRepository.findByName(input.name);

    if(planExist) {
      throw new ConflictError(`Plano ${input.name} já existe`);
    }

    const planEntity = PlanEntity.create({
      ...input,
      auditable: {
        createdBy: loggedUser.id,
        updatedBy: loggedUser.id,
      }
    });

    const savePlan = await this.planRepository.save(planEntity);

    if(!savePlan){
      throw new BadRequestError('Erro ao salvar o plano');
    }

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
