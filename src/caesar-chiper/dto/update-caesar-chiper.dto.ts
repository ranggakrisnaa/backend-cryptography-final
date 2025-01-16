import { StringField } from '../../../src/decorators/field.deorator';

export class UpdateCaesarChiperDto {
  @StringField()
  decryptText!: string;
}
