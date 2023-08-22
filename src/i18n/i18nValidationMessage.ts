import { PathImpl2 } from '@nestjs/config';
import { i18nValidationMessage as _i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from './i18n.generated';

export const i18nValidationMessage = (
  key: PathImpl2<I18nTranslations>,
  args?: any,
) => _i18nValidationMessage<I18nTranslations>(key, args);
