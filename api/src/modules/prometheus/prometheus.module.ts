import { Module } from '@nestjs/common';
import { PrometheusService } from './prometheus.service';
import { PrometheusController } from './prometheus.controller';
import { PrometheusModule as NestjsPrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    NestjsPrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  controllers: [PrometheusController],
  providers: [PrometheusService],
})
export class PrometheusModule {}