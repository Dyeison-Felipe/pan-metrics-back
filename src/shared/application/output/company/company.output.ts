import { AddressOutput } from "../address/address.output";
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
  address: AddressOutput;
  active: boolean;
  createdBy: string;
  updatedBy: string;
  deletedBy?: string | null;
};
