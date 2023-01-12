import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorConstraintUnique } from 'src/utils/src/util/handle-error-unique.util';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async verifyIdClient(id: string): Promise<Client> {
    const client: Client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException(`O id ${id} não é válido`);
    }
    return client;
  }

  async create(dto: CreateClientDto): Promise<Client> {
    return await this.prisma.client
      .create({ data: dto })
      .catch(handleErrorConstraintUnique);
  }

  findAll(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }

  findOne(id: string): Promise<Client> {
    return this.verifyIdClient(id);
  }

  async update(id: string, dto: UpdateClientDto): Promise<Client> {
    await this.verifyIdClient(id);

    return this.prisma.client
      .update({ where: { id }, data: dto })
      .catch(handleErrorConstraintUnique);
  }

  remove(id: string) {
    this.verifyIdClient(id);

    return this.prisma.client.delete({ where: { id } });
  }
}
