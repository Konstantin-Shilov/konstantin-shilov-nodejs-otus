import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

// stub
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    return true;
  }
}
