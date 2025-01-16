import { StringField } from '../../../src/decorators/field.deorator';

export class CreateLsbDto {
  @StringField()
  plainText!: string;
}
