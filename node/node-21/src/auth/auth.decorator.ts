import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

// Stub
export function Auth() {
  return applyDecorators(UseGuards(AuthGuard));
}
