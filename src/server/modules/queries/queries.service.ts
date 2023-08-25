import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { isFunc } from 'src/shared/utils/guards';

export class QueriesError<T> extends Error {
  public readonly result: T;
  constructor(result: T) {
    super();
    this.result = result;
  }
}

@Injectable()
export class QueriesService {
  constructor(private readonly i18n: I18nService) {}

  public async validate<D extends new (x: T) => T, T extends object>(
    dto: D,
    queries: T,
    defaultQueries: T | (() => T),
  ): Promise<T> {
    let def: T;
    if (isFunc(defaultQueries)) {
      def = defaultQueries();
    } else {
      def = defaultQueries;
    }

    const errors = await this.i18n.validate(new dto(queries));

    const result = errors.reduce<T>((acc, current) => {
      return {
        ...acc,
        [current.property]: def[current.property as keyof T],
      };
    }, queries);

    if (errors.length) {
      throw new QueriesError(result);
    }

    return queries;
  }
}
