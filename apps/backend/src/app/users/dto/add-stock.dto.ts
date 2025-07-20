import { IsNotEmpty } from "class-validator";

export class AddStockDTO {
    @IsNotEmpty()
    symbol: string;

    @IsNotEmpty()
    name: string
}