import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {AuthService} from './auth.service';
import {User} from 'src/users/users.model';
import {Request} from 'express';
import {ModuleRef} from '@nestjs/core';

@Injectable()
export class LocalSignupStrategy extends PassportStrategy(Strategy, 'signup') {
  constructor(private authService: AuthService, private moduleRef: ModuleRef) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(req: Request): Promise<User> {
    return await this.authService.registerUser(req.body);
  }
}
