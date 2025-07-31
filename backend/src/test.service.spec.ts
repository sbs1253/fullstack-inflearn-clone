import { Test, TestingModule } from '@nestjs/testing';
import { TestService } from './test.service';
import { PrismaService } from './prisma.service';

describe('TestService', () => {
  let service: TestService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    test: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TestService>(TestService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTest', () => {
    it('should create a test record', async () => {
      const testData = { id: 'test-id-123' };
      const expectedResult = { id: 'test-id-123' };
      
      mockPrismaService.test.create.mockResolvedValue(expectedResult);

      const result = await service.createTest(testData);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.test.create).toHaveBeenCalledWith({
        data: testData,
      });
    });

    it('should create a test record without id', async () => {
      const expectedResult = { id: 'generated-uuid' };
      
      mockPrismaService.test.create.mockResolvedValue(expectedResult);

      const result = await service.createTest();

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.test.create).toHaveBeenCalledWith({
        data: { id: undefined },
      });
    });
  });

  describe('findAllTests', () => {
    it('should return an array of tests', async () => {
      const expectedResult = [
        { id: 'test-1' },
        { id: 'test-2' },
      ];
      
      mockPrismaService.test.findMany.mockResolvedValue(expectedResult);

      const result = await service.findAllTests();

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.test.findMany).toHaveBeenCalled();
    });
  });

  describe('findTestById', () => {
    it('should return a test by id', async () => {
      const testId = 'test-123';
      const expectedResult = { id: testId };
      
      mockPrismaService.test.findUnique.mockResolvedValue(expectedResult);

      const result = await service.findTestById(testId);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.test.findUnique).toHaveBeenCalledWith({
        where: { id: testId },
      });
    });
  });

  describe('deleteTest', () => {
    it('should delete a test by id', async () => {
      const testId = 'test-123';
      const expectedResult = { id: testId };
      
      mockPrismaService.test.delete.mockResolvedValue(expectedResult);

      const result = await service.deleteTest(testId);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.test.delete).toHaveBeenCalledWith({
        where: { id: testId },
      });
    });
  });
});