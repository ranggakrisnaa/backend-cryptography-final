import { StringField } from '../../decorators/field.deorator';

export class CreateLsbDto {
  @StringField()
  plainText!: string;
}
