export class GetMyRedeemedCodesDto {
  limit: number;
  offset: number;
  from: string;
  to: string;
  codeValue?: string;
}