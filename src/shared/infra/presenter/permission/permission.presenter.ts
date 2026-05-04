export class PermissionPresenter {
  readonly id: string;

  readonly action: string;
  readonly subject: string;

  constructor(props: PermissionPresenter) {
    this.id = props.id;
    this.action = props.action;
    this.subject = props.subject;
  }
}
