import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/dto/register.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from 'src/dto/login.dto';
import { RefreshDto } from 'src/dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, role } = registerDto;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new UnauthorizedException('User already Exist!');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      role: role,
      password: hashPassword,
      refreshToken: uuidv4(),
    });

    await this.userRepository.save(user);

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid Credential!');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid Credential!');
    }

    const newRefreshToken = uuidv4();
    await this.userRepository.update(user.id, {
      refreshToken: newRefreshToken,
    });

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: newRefreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async refresh(refreshToken: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { refreshToken } });
    if (!user) {
      throw new UnauthorizedException('Invalid refresh Token');
    }

    const newRefreshToken = uuidv4();
    await this.userRepository.update(user.id, {
      refreshToken: newRefreshToken,
    });

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: newRefreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }
}
