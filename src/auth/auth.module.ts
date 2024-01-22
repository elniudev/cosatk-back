import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy  } from "./strategies/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from './constants/jwt.constants';
import { UserModule } from '../user/user.module';
import { RolesGuard } from './guards/roles.guard';
import { User } from '../user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      //signOptions: { expiresIn: '1440h' },
    })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],

})
export class AuthModule {}
