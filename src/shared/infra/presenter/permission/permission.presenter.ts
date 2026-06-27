export class PermissionPresenter {
  readonly id: string;
  readonly action: string;
  readonly subject: string;
  readonly description: string;

  constructor(props: PermissionPresenter) {
    this.id = props.id;
    this.action = props.action;
    this.subject = props.subject;
    this.description = props.description
  }
}
