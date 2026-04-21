import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { MailService } from './mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  //REGISTER (UPDATED WITH MAILER SAFETY)
 async register(dto: RegisterDto) {
  const existingUser = await this.userRepo.findOneBy({
    email: dto.email,
  });

  if (existingUser) {
    throw new HttpException(
      'Email already exists',
      HttpStatus.BAD_REQUEST,
    );
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  const user = this.userRepo.create({
    ...dto,
    password: hashedPassword,
  });

  const savedUser = await this.userRepo.save(user);

  //SEND EMAIL
  await this.mailService.sendWelcomeEmail(
    savedUser.email,
    savedUser.name,
  );

  return savedUser;
}

  //LOGIN
  async login(dto: LoginDto) {
    const user = await this.userRepo.findOneBy({
      email: dto.email,
    });

    if (!user) {
      throw new HttpException(
        'User not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const isMatch = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if (!isMatch) {
      throw new HttpException(
        'Invalid password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    //OPTIONAL: send login notification mail
    try {
      await this.mailService.sendWelcomeEmail(
        user.email,
        user.name,
      );
    } catch (error) {
      console.log('Login mail failed');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      // OPTIONAL: add role back if needed
      // role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  //DELETE ACCOUNT (UPDATED WITH MAIL)
  async deleteUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        'User not found',
        HttpStatus.NOT_FOUND,
      );
    }

    //send email BEFORE delete
    try {
      await this.mailService.sendWelcomeEmail(
        user.email,
        user.name,
      );
    } catch (error) {
      console.log('Delete mail failed');
    }

    await this.userRepo.delete(id);

    return {
      message: 'User deleted successfully',
    };
  }
}