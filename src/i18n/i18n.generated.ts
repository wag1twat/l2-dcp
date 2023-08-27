/* DO NOT EDIT, file generated by nestjs-i18n */

import { Path } from "nestjs-i18n";
export type I18nTranslations = {
    "client": {
        "OptionsPage": {
            "header": {
                "buttons": {
                    "options": string;
                    "auth": string;
                    "days": string;
                };
            };
            "tables": {
                "options": {
                    "id": string;
                    "name": string;
                    "cost_in_points": string;
                    "cost_in_adenas": string;
                    "toolbar": {
                        "buttons": {
                            "add": string;
                        };
                    };
                    "actions": {
                        "delete": string;
                        "edit": string;
                    };
                };
            };
            "shared": {
                "adenas": {
                    "postfixes": {
                        "billion": string;
                        "trillion": string;
                    };
                };
                "langs": {
                    "ru": string;
                    "en": string;
                };
            };
        };
        "DaysPage": {
            "header": {
                "buttons": {
                    "options": string;
                    "auth": string;
                    "days": string;
                };
            };
            "tables": {
                "days": {
                    "id": string;
                    "date": string;
                    "points": string;
                    "adenas": string;
                };
            };
            "shared": {
                "adenas": {
                    "postfixes": {
                        "billion": string;
                        "trillion": string;
                    };
                };
                "langs": {
                    "ru": string;
                    "en": string;
                };
            };
        };
    };
    "typeorm": {
        "EntityNotFoundError": string;
        "QueryFailedError": string;
    };
    "validation": {
        "NOT_EMPTY": string;
        "MIN": string;
        "MAX": string;
        "ARRAY_MIN": string;
        "ARRAY_MAX": string;
        "IS_EMAIL": string;
        "IS_BOOLEAN": string;
        "IS_STRING": string;
        "IS_ISO8601": string;
        "IS_DATE_AFTER": string;
        "IS_DATE_BEFORE": string;
        "IS_INT": string;
        "IS_ARRAY": string;
        "IS_UUID": string;
        "IS_ENUM": string;
    };
};
export type I18nPath = Path<I18nTranslations>;
