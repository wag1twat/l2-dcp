import { DynamicModule, Module } from '@nestjs/common';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { NODE_ENV } from 'src/shared/constants/env';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DaysModule } from './modules/days/days.module';
import { OptionsModule } from './modules/options';
import { UsersModule } from './modules/users/users.module';
import { DaysService } from './modules/days/days.service';
import { DatabaseModule } from './database/database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path/posix';
import { ConfigModule, ConfigService } from '@nestjs/config';

declare const module: any;

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow('FALLBACK_LANGUAGE'),
        loaderOptions: {
          path: join(__dirname, '/i18n/'),
          watch: true,
        },
        typesOutputPath: 'src/i18n/i18n.generated.ts',
      }),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
      inject: [ConfigService],
    }),
    DatabaseModule,
    EventEmitterModule.forRoot(),
    DaysModule,
    OptionsModule,
    UsersModule,
  ],
  providers: [DaysService],
})
export class AppModule {
  public static initialize(): DynamicModule {
    const renderModule =
      module.hot?.data?.renderModule ??
      RenderModule.forRootAsync(Next({ dev: NODE_ENV === 'development' }), {
        viewsDir: null,
      });

    if (module.hot) {
      module.hot.dispose((data: any) => {
        data.renderModule = renderModule;
      });
    }

    return {
      module: AppModule,
      imports: [renderModule],
      controllers: [AppController],
      providers: [AppService],
    };
  }
}
