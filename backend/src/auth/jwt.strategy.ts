import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SUPER_SECRET_KEY_SMART_SCHOOL', // Catatan: Nanti bisa dipindah ke .env untuk production
    });
  }

  async validate(payload: any) {
    // Data yang dikembalikan di sini akan disematkan ke objek `req.user` di NestJS
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}