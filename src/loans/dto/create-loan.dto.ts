import { ApiProperty } from "@nestjs/swagger"
import { Article } from "src/article/entities/article.entity"
import { User } from "src/user/entities/user.entity"

/* eslint-disable prettier/prettier */
export class CreateLoanDto {
    status:boolean
    fee?:number
    deposit?:number
    checked_out:Date
    checked_in:Date

    @ApiProperty({ example: { articleIdArticle: 1 } })
    articleIdArticle:number

    @ApiProperty({ example: { userIdUsers: 1 } })
    userIdUsers:number
}
