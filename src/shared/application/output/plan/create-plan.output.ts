export type CreatePlanOutput = {
  id: string,
  name: string,
  description: string,
  price: number,
  duration: string,
  createdAt: Date,
  updatedAt: Date
  deletedAt?: Date | null,
  createdBy: string,
  updatedBy: string,
  deletedBy?: string | null
}