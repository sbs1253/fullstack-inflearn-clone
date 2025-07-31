import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class TestService {
  constructor(private prisma: PrismaService) {}

  async createTest(data?: { id?: string }) {
    return this.prisma.test.create({
      data: {
        id: data?.id,
      },
    });
  }

  async findAllTests() {
    return this.prisma.test.findMany();
  }

  async findTestById(id: string) {
    return this.prisma.test.findUnique({
      where: { id },
    });
  }

  async deleteTest(id: string) {
    return this.prisma.test.delete({
      where: { id },
    });
  }
}