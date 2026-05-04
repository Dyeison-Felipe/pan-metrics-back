
type PermissionProps = {
  id: string;
  action: string;
  subject: string;
};

export class PermissionEntity {
  id: string;
  action: string;
  subject: string;

  constructor(props: PermissionProps) {
    this.id = crypto.randomUUID()
    this.action = props.action;
    this.subject = props.subject
  }

  static create(props: PermissionProps): PermissionEntity {
    return new PermissionEntity({
      ...props,
    });
  }
}
