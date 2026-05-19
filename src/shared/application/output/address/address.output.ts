import { CityOutput } from "../city/city.output";

export type AddressOutput = {
  id: string;
  cep?: string | null;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  city: CityOutput;
}