import { PartialType } from '@nestjs/swagger';
import { CreateLsbDto } from './create-lsb.dto';

export class UpdateLsbDto extends PartialType(CreateLsbDto) {}
