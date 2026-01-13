type AuditableProps = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string | null;
};

type EntityProps = {
  id: string;
  auditable: AuditableProps;
};

type ConstructorEntityProps = {
  id?: string;
  auditable?: Partial<AuditableProps>;
};

export type BaseProps = Record<string, unknown>;

export abstract class BaseEntity<Props extends BaseProps> {
  readonly props: Props & EntityProps;

  constructor(props: Props & ConstructorEntityProps) {
    this.props = {
      ...props,
      id: crypto.randomUUID(),
      auditable: {
        createdAt: props.auditable?.createdAt ?? new Date(),
        updatedAt: props.auditable?.updatedAt ?? new Date(),
        deletedAt: props.auditable?.deletedAt ?? null,
        createdBy: props.auditable?.createdBy ?? 'system',
        updatedBy: props.auditable?.updatedBy ?? 'system',
        deletedBy: props.auditable?.deletedBy ?? null,
      },
    };
  }
}
