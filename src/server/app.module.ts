import { DynamicModule, Module } from '@nestjs/common';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { NODE_ENV } from 'src/shared/constants/env';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OptionsModule } from './modules/options';

declare const module: any;

const next = Next({ dev: NODE_ENV !== 'production' });

@Module({})
export class AppModule {
  public static initialize(): DynamicModule {
    /* При инициализации модуля попробуем извлечь инстанс RenderModule
            из персистентных данных между перезагрузками модуля */
    const renderModule =
      module.hot?.data?.renderModule ?? RenderModule.forRootAsync(next);

    if (module.hot) {
      /* При завершении работы старого модуля
                будем кэшировать инстанс RenderModule */
      module.hot.dispose((data: any) => {
        data.renderModule = renderModule;
      });
    }

    return {
      module: AppModule,
      imports: [renderModule, OptionsModule],
      controllers: [AppController],
      providers: [AppService],
    };
  }
}
