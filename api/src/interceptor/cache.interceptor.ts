import {CallHandler, ExecutionContext, Injectable
} from '@nestjs/common';
import { CacheInterceptor, CACHE_KEY_METADATA, } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class CustomCacheInterceptor extends CacheInterceptor {
  intercept: (context: ExecutionContext, next: CallHandler) => Promise<Observable<any>>;
  reflector: any;
  constructor(
    cacheManager: any,
    reflector: any,
    private readonly configService: ConfigService,
  ) {
    super(cacheManager, reflector);
    const cacheEnabled = this.configService.get('CACHE_ENABLED');
    if (cacheEnabled && cacheEnabled === 'false') {
      this.intercept = async (
        context: ExecutionContext,
        next: CallHandler,
      ): Promise<Observable<any>> => next.handle();
    }
  }

  /**
   * Mofificar este metodo cuando sea necesario personalizar 
   * las variables que quedan en cache.
   * @param context
   * @returns 
   */
  trackBy(context: ExecutionContext): string | undefined {
      const request = context.switchToHttp().getRequest();
      const { httpAdapter } = this.httpAdapterHost;
  
      const isGetRequest = httpAdapter.getRequestMethod(request) === 'GET';
      const excludePaths = [
        // Routes to be excluded
      ];
      if (
        !isGetRequest ||
        (isGetRequest &&
          excludePaths.includes(httpAdapter.getRequestUrl(request)))
      ) {
        return undefined;
      }
      return httpAdapter.getRequestUrl(request);
  }
}
