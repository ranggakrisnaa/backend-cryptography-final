import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CaesarChiperService } from './caesar-chiper.service';
import { Public } from '../../src/decorators/public.decorator';
import { ApiPublic } from '../../src/decorators/http.decorator';
import { UpdateCaesarChiperDto } from './dto/update-caesar-chiper.dto';
import { CreateCaesarChiperDto } from './dto/create-caesar-chiper.dto';

@Controller('caesar-chiper')
export class CaesarChiperController {
  constructor(private readonly caesarChiperService: CaesarChiperService) {}

  @Post('encrypt')
  @Public()
  @ApiPublic()
  public async encryptData(
    @Body() reqBody: CreateCaesarChiperDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const data = await this.caesarChiperService.caesarEncrypt(
        reqBody.plainText,
      );

      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Data encrypted successfully.',
        data,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error during encryption.',
        error: error.message,
      });
    }
  }

  @Post('decrypt')
  @Public()
  @ApiPublic()
  public async decryptData(
    @Body() reqBody: UpdateCaesarChiperDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const data = await this.caesarChiperService.caesarDecrypt(
        reqBody.decryptText,
      );

      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Data decrypted successfully.',
        data,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error during decryption.',
        error: error.message,
      });
    }
  }
}
