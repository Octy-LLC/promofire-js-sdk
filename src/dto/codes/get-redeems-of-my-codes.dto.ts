export class GetRedeemsOfMyCodesDto {
  limit: number;
  offset: number;
  from: string;
  to: string;
  codeValue?: string;
  redeemerId?: string;
}