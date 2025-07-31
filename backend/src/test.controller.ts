import { Controller, Get, Post, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { TestService } from './test.service';
import { TestModel } from './prisma.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async createTest(@Body() body: { id?: string }): Promise<TestModel> {
    return this.testService.createTest(body);
  }

  @Get()
  async getAllTests(): Promise<TestModel[]> {
    return this.testService.findAllTests();
  }

  @Get(':id')
  async getTest(@Param('id') id: string): Promise<TestModel> {
    const test = await this.testService.findTestById(id);
    if (!test) {
      throw new NotFoundException(`Test with id ${id} not found`);
    }
    return test;
  }

  @Delete(':id')
  async deleteTest(@Param('id') id: string): Promise<TestModel> {
    try {
      return await this.testService.deleteTest(id);
    } catch (error) {
      throw new NotFoundException(`Test with id ${id} not found`);
    }
  }
}