import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionsFilters implements ExceptionFilter {
  constructor(@Inject(HttpAdapterHost) private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal server error';
    let message = 'An unexpected error occurred';
    let details: any = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody = exception.getResponse();

      if (typeof responseBody === 'object') {
        details = responseBody;
        error = responseBody['error'] || error;
        message = responseBody['message'] || message;
      } else {
        message = exception.message;
      }

      // Specific handling for HTTP status codes
      switch (status) {
        case HttpStatus.FORBIDDEN:
          message = 'Access to the requested resource is forbidden.';
          break;
        case HttpStatus.BAD_REQUEST:
          message = 'Invalid request.';
          break;
        case HttpStatus.SERVICE_UNAVAILABLE:
          message = 'Service is currently unavailable. Please try again later.';
          break;
        case HttpStatus.NOT_ACCEPTABLE:
          message = 'The requested resource is not acceptable.';
          break;
        case HttpStatus.EXPECTATION_FAILED:
          message = 'Expectation failed.';
          break;
        case HttpStatus.UNAUTHORIZED:
          message = 'Unauthorized access.';
          break;
        case HttpStatus.REQUEST_TIMEOUT:
          message = 'Request timeout. Please try again.';
          break;
        case HttpStatus.BAD_GATEWAY:
          message = 'Bad gateway.';
          break;
        case HttpStatus.GATEWAY_TIMEOUT:
          message = 'Gateway timeout.';
          break;
        case HttpStatus.NOT_FOUND:
          message = 'The requested resource was not found.';
          break;
        case HttpStatus.CONFLICT:
          message = 'Conflict occurred.';
          break;
        default:
          message = exception.message || 'Internal server error';
          break;
      }
    } else if (exception instanceof Error) {
      // Handling Node.js native errors
      message = exception.message;
      details = {
        name: exception.name,
        stack: exception.stack,
      };
    }

    // Log the exception
    console.error({
      message: 'Exception thrown:',
      exception,
      request: {
        method: request.method,
        url: request.url,
        headers: request.headers,
        body: request.body,
      },
    });

    const responseBody = {
      statusCode: status,
      error: error,
      message: message,
      details: details,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    httpAdapter.reply(response, responseBody, status);
  }
}

// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { Request, Response } from 'express';

// @Catch()
// export class GlobalExceptionsFilters implements ExceptionFilter {
//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();

//     let status = HttpStatus.INTERNAL_SERVER_ERROR;
//     let error = 'Internal server error';
//     let message = 'An unexpected error occurred';
//     let details: any = null;

//     if (exception instanceof HttpException) {
//       status = exception.getStatus();
//       const responseBody = exception.getResponse();

//       if (typeof responseBody === 'object') {
//         details = responseBody;
//         error = responseBody['error'] || error;
//         message = responseBody['message'] || message;
//       } else {
//         message = exception.message;
//       }

//       // Specific handling for HTTP status codes
//       switch (status) {
//         case HttpStatus.FORBIDDEN:
//           message = 'Access to the requested resource is forbidden.';
//           break;
//         case HttpStatus.BAD_REQUEST:
//           message = 'Invalid request.';
//           break;
//         case HttpStatus.SERVICE_UNAVAILABLE:
//           message = 'Service is currently unavailable. Please try again later.';
//           break;
//         case HttpStatus.NOT_ACCEPTABLE:
//           message = 'The requested resource is not acceptable.';
//           break;
//         case HttpStatus.EXPECTATION_FAILED:
//           message = 'Expectation failed.';
//           break;
//         case HttpStatus.UNAUTHORIZED:
//           message = 'Unauthorized access.';
//           break;
//         case HttpStatus.REQUEST_TIMEOUT:
//           message = 'Request timeout. Please try again.';
//           break;
//         case HttpStatus.BAD_GATEWAY:
//           message = 'Bad gateway.';
//           break;
//         case HttpStatus.GATEWAY_TIMEOUT:
//           message = 'Gateway timeout.';
//           break;
//         case HttpStatus.NOT_FOUND:
//           message = 'The requested resource was not found.';
//           break;
//         case HttpStatus.CONFLICT:
//           message = 'Conflict occurred.';
//           break;
//         default:
//           message = exception.message || 'Internal server error';
//           break;
//       }
//     } else if (exception instanceof Error) {
//       // Handling Node.js native errors
//       message = exception.message;
//       details = {
//         name: exception.name,
//         stack: exception.stack,
//       };
//     }

//     // Log the exception
//     console.error({
//       message: 'Exception thrown:',
//       exception,
//       request: {
//         method: request.method,
//         url: request.url,
//         headers: request.headers,
//         body: request.body,
//       },
//     });

//     response.status(status).json({
//       statusCode: status,
//       error: error,
//       message: message,
//       details: details,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//     });
//   }
// }