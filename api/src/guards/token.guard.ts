import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    // const token = authHeader.split(' ')[1];

    try {

      //Por ahora solo se valida que exista un authorization header
      if (!request.headers.authorization) {
        return false;
      }
      return true;

      // const decoded = this.jwtService.verify(token, {
      //   secret: process.env.JWT_SECRET,
      //   ignoreExpiration: false,
      // });

      // if (!this.isAuthorized(decoded)) {
      //   throw new ForbiddenException('Insufficient permissions');
      // }

      // request.user = decoded;
      // return true;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      } else if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      } else {
        throw new UnauthorizedException('Could not authenticate token');
      }
    }
  }

  private isAuthorized(decoded: any): boolean {
    if (decoded.role && decoded.role === 'admin') {
      return true;
    }
    return false;
  }
}
// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';

// @Injectable()
// export class TokenGuard implements CanActivate {
//   constructor(private readonly jwtService: JwtService) {}

//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest<Request>();
//     const authHeader = request.headers.authorization;
//     // const jwt: string = process.env.JWT_SECRET;
//     // console.log('jwt:', jwt);
//     // console.log('Auth Header:', authHeader);
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw new UnauthorizedException('Invalid token');
//     }
//     const token = authHeader.split(' ')[1];
//     try {
//       //Por ahora solo se valida que exista un authorization header
//       if (!request.headers.authorization) {
//         return false;
//       }
//       return true;

//       // const decoded = this.jwtService.verify(token, jwt);
//       // console.log('Decoded Token:', decoded);
//       // request.user = decoded;  // Attach user data to request object
//       // return true;
//     } catch (err) {
//       console.error('JWT Verification Error:', err);
//       throw new UnauthorizedException('Invalid token');
//     }
//   }
// }
