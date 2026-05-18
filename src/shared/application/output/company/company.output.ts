import { PlanOutput } from "../plan/plan.output";

export type CompanyOutput = {
  id: string;
  fantasyName: string;
  socialReazon: string;
  cnpj: string;
  email: string;
  phoneNumber: string;
  logotipo: string;
  plan: PlanOutput;
  active: boolean;
  createdBy: string;
  updatedBy: string;
  deletedBy?: string | null;
};
