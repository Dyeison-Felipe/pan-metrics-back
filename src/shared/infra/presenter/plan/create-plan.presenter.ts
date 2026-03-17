export class CreatePlanPresenter {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly duration: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt?: Date | null;
  readonly createdBy: string;
  readonly updatedBy: string;
  readonly deletedBy?: string | null;

  constructor(props: CreatePlanPresenter) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.duration = props.duration;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
    this.deletedBy = props.deletedBy;
  }
}