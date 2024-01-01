import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<string[]>('role', context.getHandler());
    if (!role) {
      return true; // No role are specified, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming user object is attached by authentication middleware

    if (!user || !user.role) {
      return false; // No user or role found, deny access
    }

    return role.some((role) => user.role.includes(role));
  }
}
