import { StringField } from '../../../src/decorators/field.deorator';

export class CreateCaesarChiperDto {
  @StringField()
  plainText!: string;
}
