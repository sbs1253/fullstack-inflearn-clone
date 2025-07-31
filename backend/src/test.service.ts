import { Injectable } from '@nestjs/common';
import { PrismaService, TestModel } from './prisma.service';

@Injectable()
export class TestService {
  constructor(private prisma: PrismaService) {}

  async createTest(data?: { id?: string }): Promise<TestModel> {
    return this.prisma.test.create({
      data: {
        id: data?.id,
      },
    });
  }

  async findAllTests(): Promise<TestModel[]> {
    return this.prisma.test.findMany();
  }

  async findTestById(id: string): Promise<TestModel | null> {
    return this.prisma.test.findUnique({
      where: { id },
    });
  }

  async deleteTest(id: string): Promise<TestModel> {
    return this.prisma.test.delete({
      where: { id },
    });
  }
}