import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Ambil role yang dibutuhkan dari dekorator @Roles
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Jika endpoint tidak diberi dekorator @Roles, izinkan akses
    if (!requiredRoles) {
      return true;
    }

    // 2. Ambil objek request dan data user (hasil validasi JWT Guard sebelumnya)
    const { user } = context.switchToHttp().getRequest();

    // 3. Cek apakah role user ada di dalam daftar role yang diizinkan
    return requiredRoles.includes(user.role);
  }
}