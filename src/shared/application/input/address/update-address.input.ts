export type UpdateAddressInput = {
  id: string;
  cep: string;
  street: string;
  neighborhood: string;
  number: string;
  complement?: string;
  latitude?: number;
  longitude?: number;
  cityId: string;
}