import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanDto } from './create-loan.dto';

export class UpdateLoanDto extends PartialType(CreateLoanDto) {

    status:boolean
    fee?:number
    deposit?:number
    checked_out?:Date
    checked_in?:Date
}
