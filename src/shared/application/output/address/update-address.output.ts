import { CityOutput } from "../city.output";

export type UpdateAddressOutput = {
  id: string;
  cep: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
  latitude?: number;
  longitude?: number;
  city: CityOutput;
}