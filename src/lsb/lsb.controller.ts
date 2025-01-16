import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CaesarChiperService } from '../caesar-chiper/caesar-chiper.service';
import { CreateLsbDto } from './dto/create-lsb.dto';
import { LsbService } from './lsb.service';
import { Public } from '../../src/decorators/public.decorator';
import { ApiPublic } from '../../src/decorators/http.decorator';

@Controller('lsb')
export class LsbController {
  constructor(
    private readonly lsbService: LsbService,
    private readonly caesarChiperService: CaesarChiperService,
  ) {}

  @Post('encrypt-lsb')
  @Public()
  @ApiPublic()
  @UseInterceptors(FileInterceptor('file'))
  public async encryptAndLSB(
    @UploadedFile() file: Express.Multer.File,
    @Body() reqBody: CreateLsbDto,
    @Query('caesar') caesar: boolean,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const fileImage = await this.lsbService.embedLSB(
        file,
        reqBody.plainText,
        caesar,
      );

      res
        .setHeader('Content-Type', fileImage.contentType)
        .send(fileImage.imageBuffer);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Error during LSB encryption',
        error: error.message,
      });
    }
  }

  @Post('decrypt-lsb')
  @Public()
  @ApiPublic()
  @UseInterceptors(FileInterceptor('file'))
  public async decrypt(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const extractedMessage = await this.lsbService.extractLSB(file);

      res.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Message successfully extracted',
        data: extractedMessage,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Error during LSB decryption',
        error: error.message,
      });
    }
  }

  @Post('get-info')
  @Public()
  @ApiPublic()
  @UseInterceptors(FileInterceptor('file'))
  public async getInfoFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const image = await this.lsbService.getInfoFile(file);

      res.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Image info retrieved successfully',
        data: image,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Error retrieving image info',
        error: error.message,
      });
    }
  }
}
