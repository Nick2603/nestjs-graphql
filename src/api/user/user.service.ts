import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserQueryRepository } from './user.query-repository';
import type { User } from '@prisma/client';
import type { GetUserArgs } from './dto/get-user.args';
import type { UpdateUserInput } from './dto/update-user.input';
import type { DeleteUserArgs } from './dto/delete-user.args';
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

  async getUser(args: GetUserArgs): Promise<User> {
    return await this.userQueryRepository.getUser(args);
  }

  async createUser(data: CreateUserInput): Promise<User> {
    return await this.userRepository.createUser(data);
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    if (!id) throw new BadRequestException('id должен быть указан');

    const { id: userId } = await this.getUser({ id });

    return await this.userRepository.updateUser(userId, data);
  }

  async deleteUser({ id }: DeleteUserArgs): Promise<User> {
    if (!id) throw new BadRequestException('id должен быть указан');

    const { id: userId } = await this.getUser({ id });

    return await this.userRepository.deleteUser({ id: userId });
  }
}
