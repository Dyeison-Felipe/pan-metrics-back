
type EntityProps = {
  id: string;
};

type ConstructorEntityProps = {
  id?: string;
};

export type BaseProps = Record<string, unknown>;

export abstract class BaseEntity<Props extends BaseProps> {
  readonly props: Props & EntityProps;

  constructor(props: Props & ConstructorEntityProps) {
    this.props = {
      ...props,
      id: props.id  ?? crypto.randomUUID(),
    };
  }

  get id() {
		return this.props.id;
	}

  toJSON(): Props & EntityProps {
		return {
			...this.props,
		};
	}

  static with<Props extends BaseProps, Ent extends BaseEntity<Props>>(
    this: new (props: Props & EntityProps) => Ent,
    props: Props & EntityProps,
  ): Ent {
    return new this(props);
  }
}
