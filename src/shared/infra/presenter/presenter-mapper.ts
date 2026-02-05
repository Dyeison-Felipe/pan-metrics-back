export class PresenterMapper {
  static map<
    TOutput extends object,
    TPresenter extends new () => any
  >(
    output: TOutput,
    Presenter: TPresenter
  ): InstanceType<TPresenter> {
    const instance = new Presenter();

    for (const key of Object.keys(instance)) {
      if (key in output) {
        (instance as any)[key] = (output as any)[key];
      }
    }

    return instance;
  }
}
