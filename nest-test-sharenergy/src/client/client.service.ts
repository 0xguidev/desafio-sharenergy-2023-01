import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
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

  async create(dto: CreateClientDto) {
    return await this.prisma.client.create({ data: dto });
  }

  findAll() {
    return this.prisma.client.findMany();
  }

  findOne(id: string) {
    return this.verifyIdClient(id);
  }

  async update(id: string, dto: UpdateClientDto) {
    await this.verifyIdClient(id);

    return this.prisma.client.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    this.verifyIdClient(id);

    return this.prisma.client.delete({ where: { id } });
  }
}
