export class FindAllPermission {
  readonly id: string;

  readonly resource: string;

  constructor(props: FindAllPermission) {
    this.id = props.id;
    this.resource = props.resource;
  }
}