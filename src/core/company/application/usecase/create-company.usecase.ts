// import { PROVIDERS } from '@/shared/application/constants/providers';
// import { UseCase } from '@/shared/application/usecase/usecase';
// import { Inject } from '@nestjs/common';
// import { CompanyRepository } from '../../domain/repositories/company.repository';
// import { CreateAddressInput } from '@/shared/application/input/address/create-address.input';
// import { CreatePlanInput } from '@/shared/application/input/plan/create-plan.input';
// import { PlanRepository } from '@/core/plan/domain/repositories/plan.repository';
// import { AddressRepository } from '@/core/address/domain/repositories/address.repository';
// import { ConflictError } from '@/shared/application/errors/conflict-error';
// import { NotFoundError } from '@/shared/application/errors/not-found-error';

// type Input = {
//   fantasyName: string;
//   socialReazon: string;
//   cnpj: string;
//   email: string;
//   phoneNumber: string;
//   address: CreateAddressInput;
//   plan: string;
//   createdBy: string;
//   updatedBy: string;
// };

// type Output = {};

// export class CreateCompanyUseCase implements UseCase<Input, Output> {
//   constructor(
//     @Inject(PROVIDERS.COMPANY_REPOSITORY)
//     private readonly companyRepository: CompanyRepository,
//     @Inject(PROVIDERS.PLAN_REPOSITORY)
//     private readonly planRepository: PlanRepository,
//     @Inject(PROVIDERS.ADDRESS_REPOSITORY)
//     private readonly addressRepository: AddressRepository,
//   ) {}

//   async execute(input: Input): Promise<Output> {
//     const existCompany = await this.companyRepository.findByCnpj(input.cnpj);

//     if (existCompany) {
//       throw new ConflictError(`O ${input.cnpj} cnpj já está cadastrado`);
//     }

//     const plan = await this.planRepository.findById(input.plan);

//     if(!plan) {
//       throw new NotFoundError(`Plano não encontrado`);
//     }


//   }
// }
