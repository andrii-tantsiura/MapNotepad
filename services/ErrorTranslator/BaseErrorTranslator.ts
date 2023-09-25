export class BaseErrorTranslator {
  private _mapper: Record<string, string>;

  constructor(mapper: Record<string, string>, keys: string[]) {
    this._mapper = mapper;

    this.validateMapper(keys);
  }

  private validateMapper = (enumValues: string[]) => {
    const missingKeys = enumValues
      .filter((key) => !(key in this._mapper))
      .join(", ");

    if (missingKeys.length > 0) {
      throw new Error(`Missing error code mappings: [${missingKeys}]`);
    }
  };

  public translate = (errorCode: string): string =>
    this._mapper[errorCode] || errorCode;
}
