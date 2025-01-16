import { StringField } from '../../decorators/field.deorator';

export class CreateCaesarChiperDto {
  @StringField()
  plainText!: string;
}
