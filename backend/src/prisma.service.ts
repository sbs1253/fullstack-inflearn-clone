import { Injectable, OnModuleInit } from '@nestjs/common';

// Mock Prisma Client for testing purposes when network is limited
interface TestModel {
  id: string;
}

interface MockPrismaClient {
  $connect(): Promise<void>;
  test: {
    create(params: { data: { id?: string } }): Promise<TestModel>;
    findMany(): Promise<TestModel[]>;
    findUnique(params: { where: { id: string } }): Promise<TestModel | null>;
    delete(params: { where: { id: string } }): Promise<TestModel>;
  };
}

@Injectable()
export class PrismaService implements OnModuleInit, MockPrismaClient {
  private testData: TestModel[] = [];

  async onModuleInit() {
    await this.$connect();
  }

  async $connect() {
    // Mock connection
    console.log('Mock Prisma client connected');
  }

  test = {
    create: async (params: { data: { id?: string } }): Promise<TestModel> => {
      const id = params.data.id || `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newTest = { id };
      this.testData.push(newTest);
      return newTest;
    },
    
    findMany: async (): Promise<TestModel[]> => {
      return [...this.testData];
    },
    
    findUnique: async (params: { where: { id: string } }): Promise<TestModel | null> => {
      return this.testData.find(test => test.id === params.where.id) || null;
    },
    
    delete: async (params: { where: { id: string } }): Promise<TestModel> => {
      const index = this.testData.findIndex(test => test.id === params.where.id);
      if (index === -1) {
        throw new Error(`Test with id ${params.where.id} not found`);
      }
      const deletedTest = this.testData[index];
      this.testData.splice(index, 1);
      return deletedTest;
    },
  };
}