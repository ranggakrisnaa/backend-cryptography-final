import { StringField } from '../../decorators/field.deorator';

export class UpdateCaesarChiperDto {
  @StringField()
  decryptText!: string;
}
