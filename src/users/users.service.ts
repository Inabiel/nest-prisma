import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/generated/nestjs-dto/create-user.dto';
import { PasswordService } from 'src/password/password.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async createUser(CreateUserDto: CreateUserDto) {
    let role = await this.prisma.role.findFirst({
      select: { id: true },
      where: {
        name: 'admin',
      },
    });

    const hashedPassword = await this.passwordService.hashPassword(
      CreateUserDto.password,
    );

    try {
      const checkIfUserHasRegistered = await this.prisma.user.findUnique({
        where: {
          email: CreateUserDto.email,
        },
      });
      if (!checkIfUserHasRegistered) {
        return this.prisma.user.create({
          data: {
            email: CreateUserDto.email,
            name: CreateUserDto.name,
            password: hashedPassword,
            roleId: role.id,
          },
        });
      }
      throw new ConflictException('Email has been already registered');
    } catch (e) {
      return e.response;
    }
  }

  async loginUser(CreateUserDto: CreateUserDto) {
    try {
      let checkIfUserAvailable = await this.prisma.user.findUnique({
        where: {
          email: CreateUserDto.email,
        },
      });
      if (!checkIfUserAvailable) {
        throw new HttpException('User not found', 400);
      }
    } catch (e) {
      return e;
    }
  }
}
