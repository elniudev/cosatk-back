import { ExpressAdapter } from '@nestjs/platform-express';
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
    updateLoan: jest.fn((idLoans, dto)=>({
      idLoans,
      ...dto
    })),
    getOneLoan: jest.fn().mockImplementation(()=>{
      return[{idLoans:'1'}]
    }),
    getLoans: jest.fn().mockImplementation(()=>{
      return[{status:'true'}]
    }),
    deleteLoan: jest.fn().mockImplementation(()=>{
      return[{idLoans:'1'}]
    })
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
    expect(controller.createLoan).toBeTruthy()

   
  })
  it('should update a loans', ()=>{
    const dto = {
      idLoans:1,
    }
    expect(controller.updateLoan).toBeTruthy()
  })
  it('find a loans should retur "loans with idLoans"', ()=>{
    expect(mockLoansService.getOneLoan('')).toBeTruthy()
  })
  it('shoul return an array of loans', ()=>{
    expect(mockLoansService.getLoans()).toMatchObject([{status:'true'}])
  })
  it('detele (1) should return "delete whit loans"', ()=>{
    expect(mockLoansService.deleteLoan('1')).toMatchObject([{idLoans:'1'}])
  })
 
});




