import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from './test.controller';
import { TestService } from './test.service';

describe('TestController', () => {
  let controller: TestController;
  let service: TestService;

  const mockTestService = {
    createTest: jest.fn(),
    findAllTests: jest.fn(),
    findTestById: jest.fn(),
    deleteTest: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
      providers: [
        {
          provide: TestService,
          useValue: mockTestService,
        },
      ],
    }).compile();

    controller = module.get<TestController>(TestController);
    service = module.get<TestService>(TestService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTest', () => {
    it('should create a test', async () => {
      const testData = { id: 'test-123' };
      const expectedResult = { id: 'test-123' };

      mockTestService.createTest.mockResolvedValue(expectedResult);

      const result = await controller.createTest(testData);

      expect(result).toEqual(expectedResult);
      expect(mockTestService.createTest).toHaveBeenCalledWith(testData);
    });
  });

  describe('getAllTests', () => {
    it('should return an array of tests', async () => {
      const expectedResult = [{ id: 'test-1' }, { id: 'test-2' }];

      mockTestService.findAllTests.mockResolvedValue(expectedResult);

      const result = await controller.getAllTests();

      expect(result).toEqual(expectedResult);
      expect(mockTestService.findAllTests).toHaveBeenCalled();
    });
  });

  describe('getTest', () => {
    it('should return a test by id', async () => {
      const testId = 'test-123';
      const expectedResult = { id: testId };

      mockTestService.findTestById.mockResolvedValue(expectedResult);

      const result = await controller.getTest(testId);

      expect(result).toEqual(expectedResult);
      expect(mockTestService.findTestById).toHaveBeenCalledWith(testId);
    });
  });

  describe('deleteTest', () => {
    it('should delete a test by id', async () => {
      const testId = 'test-123';
      const expectedResult = { id: testId };

      mockTestService.deleteTest.mockResolvedValue(expectedResult);

      const result = await controller.deleteTest(testId);

      expect(result).toEqual(expectedResult);
      expect(mockTestService.deleteTest).toHaveBeenCalledWith(testId);
    });
  });
});