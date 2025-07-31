import { Controller, Get, Post, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async createTest(@Body() body: { id?: string }) {
    return this.testService.createTest(body);
  }

  @Get()
  async getAllTests() {
    return this.testService.findAllTests();
  }

  @Get(':id')
  async getTest(@Param('id') id: string) {
    const test = await this.testService.findTestById(id);
    if (!test) {
      throw new NotFoundException(`Test with id ${id} not found`);
    }
    return test;
  }

  @Delete(':id')
  async deleteTest(@Param('id') id: string) {
    try {
      return await this.testService.deleteTest(id);
    } catch (error) {
      throw new NotFoundException(`Test with id ${id} not found`);
    }
  }
}