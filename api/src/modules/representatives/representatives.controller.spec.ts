import { Test, TestingModule } from '@nestjs/testing';
import { RepresentativesController } from './representatives.controller';
import { RepresentativesService } from './representatives.service';

describe('RepresentativesController', () => {
  let controller: RepresentativesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepresentativesController],
      providers: [RepresentativesService],
    }).compile();

    controller = module.get<RepresentativesController>(RepresentativesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
