import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserQueryRepository } from './user.query-repository';
import type { User } from 'prisma/generated/prisma';
import type { UpdateUserInput } from './dto/update-user.input';
import type { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(
    private readonly userQueryRepository: UserQueryRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userQueryRepository.getUsers();
  }

  async getUser(id: string): Promise<User> {
    return await this.userQueryRepository.getUser(id);
  }

  async createUser(data: CreateUserInput): Promise<User> {
    return await this.userRepository.createUserWithUserRole(data);
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    if (!id) throw new BadRequestException('id must be specified');

    const { id: userId } = await this.getUser(id);

    return await this.userRepository.updateUser(userId, data);
  }

  async deleteUser(id: string): Promise<User> {
    if (!id) throw new BadRequestException('id must be specified');

    const { id: userId } = await this.getUser(id);

    return await this.userRepository.deleteUserWithRoleCleanup(userId);
  }
}
