import { IsNumber, IsString, MinLength } from "class-validator";

export class CarDto {

    @MinLength(5, { message: 'This field must be than 5 character Nine Dev!' })
    productName?: string;

    @IsString()
    price?: string;

    @IsNumber()
    category_id?: number;
}