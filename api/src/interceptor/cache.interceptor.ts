import { CallHandler, ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { CacheInterceptor, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Cache } from 'cache-manager';

@Injectable()
export class CustomCacheInterceptor extends CacheInterceptor {
  intercept: (context: ExecutionContext, next: CallHandler) => Promise<Observable<any>>;

  constructor(
    @Inject(CACHE_MANAGER) cacheManager: Cache,
    reflector: Reflector,
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
   * Modify this method when necessary to customize
   * the variables that are cached.
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
