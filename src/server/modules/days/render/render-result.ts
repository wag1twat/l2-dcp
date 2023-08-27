import { I18nTranslations } from 'src/i18n/i18n.generated';
import { ClientOptionEntity } from '../../options/entities/option.entity';
import { ClientUserEntity } from '../../users/entities/user.entity';

export type DaysRenderResult = {
  options: ClientOptionEntity[];
  users: ClientUserEntity[];
  translations: I18nTranslations['client']['DaysPage'];
};
