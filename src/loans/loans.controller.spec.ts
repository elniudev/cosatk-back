import { Test, TestingModule } from '@nestjs/testing';
import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';

describe('LoansController', () => {
  let controller: LoansController;
  const mockLoansService = {
    createLoan: jest.fn(dto=>{
        return{
          id:Date.now(),
          ...dto
        };
    }),
};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoansController],
      providers: [LoansService],
    })
    .overrideProvider(LoansService)
    .useValue(mockLoansService)
    .compile();

    controller = module.get<LoansController>(LoansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a loan', ()=>{
    const dto = { status: '',
    id: 0,
    added_on: undefined,
    fee: '',
    checked_out: undefined,
    checked_in: undefined,
    idArticle: 0,
    idUser: 0,
    Article_idArticle:0}
    expect(controller.createLoan(dto)).toEqual({
      id:expect.any(Number),
      status: '',
    added_on: undefined,
    fee: '',
    checked_out: undefined,
    checked_in: undefined,
    idArticle: 0,
    idUser: 0,
    Article_idArticle:0
    })

    expect(mockLoansService.createLoan).toHaveBeenCalledWith(dto)
  })
  // it('should update a loans', ()=>{

  // })
 
});




