import { Platforms } from '../../contracts/enums/platforms.enum';

export class RedeemCodeDto {
  codeValue: string;
  platform: Platforms;
}