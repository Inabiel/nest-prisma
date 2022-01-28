import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [UsersModule, PrismaModule, PasswordModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
