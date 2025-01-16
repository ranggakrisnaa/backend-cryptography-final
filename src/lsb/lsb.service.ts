import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { CaesarChiperService } from '../caesar-chiper/caesar-chiper.service';
import { IEncryptLsbResponse } from '../common/interfaces/lsb-encript-response.interface';
import { FileTypeEnum } from '../common/enums/file-type.enum';
import { MinSizeImageEnum } from '../common/enums/min-size-image.interface';
import { IDecryptLsbResponse } from '../common/interfaces/lsb-decrypt-response.interface';
import { IGetInfoFile } from '../common/interfaces/lsb-get-info-file.interface';
import { IConvertMarker } from '../common/interfaces/convert-marker.interface';

@Injectable()
export class LsbService {
  private messageStartMarker = 'ini';
  private messageEndMarker = 'rahasia';

  constructor(private readonly caesarChiperService: CaesarChiperService) {}

  public async embedLSB(
    fileImage: Express.Multer.File,
    data: string,
    caesar: boolean,
  ): Promise<IEncryptLsbResponse> {
    try {
      console.log(`Message to be embedded: ${data}`);

      if (
        ![FileTypeEnum.PNG, FileTypeEnum.BMP].includes(
          fileImage?.mimetype as FileTypeEnum,
        )
      ) {
        throw new Error('Format gambar tidak didukung, gunakan PNG atau BMP.');
      }

      // Enkripsi pesan
      const encryptedData =
        caesar && (await this.caesarChiperService.caesarEncrypt(data));
      console.log(`Encrypted Message: ${encryptedData}`);

      // Dapatkan value biner dari marker
      const marker = this.convertAllMessageMarker();

      // Konversi pesan ke binary dan tambahkan end marker
      const messageBinary =
        encryptedData
          .split('')
          .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
          .join('') + marker.endMessage;

      const fullBinaryData = marker.startMessage + messageBinary;

      // Baca gambar menggunakan sharp
      const image = sharp(fileImage.buffer);

      // Dapatkan raw pixel data
      const { data: rawPixels, info } = await image
        .raw()
        .toBuffer({ resolveWithObject: true });

      // Validasi ukuran pesan
      if (MinSizeImageEnum.MIN > info.size) {
        throw new Error(
          `Ukuran gambar terlalu kecil: ${(info.size / 1024).toFixed(2)} kb, min: ${(MinSizeImageEnum.MIN / 1024).toFixed(2)} kb`,
        );
      }

      const minResolution = 128;
      if (info.width < minResolution || info.height < minResolution) {
        throw new Error(
          `Gambar harus memiliki resolusi minimal ${minResolution}x${minResolution} piksel.`,
        );
      }

      // Validasi ukuran pesan
      const maxBits = (rawPixels.length / 4) * 3; // 3 channels (RGB) per pixel
      if (fullBinaryData.length > maxBits) {
        throw new Error('Ukuran pesan terlalu kecil');
      }

      // Modify pixel data
      let bitIndex = 0;
      for (
        let i = 0;
        i < rawPixels.length && bitIndex < fullBinaryData.length;
        i += 4
      ) {
        // Modify R, G, B channels
        for (let j = 0; j < 3 && bitIndex < fullBinaryData.length; j++) {
          rawPixels[i + j] =
            (rawPixels[i + j] & 0xfe) | parseInt(fullBinaryData[bitIndex++], 2);
        }
      }

      // Buat gambar baru dari modified pixels
      const newImageBuffer = await sharp(rawPixels, {
        raw: {
          width: info.width,
          height: info.height,
          channels: 4,
        },
      })
        .png()
        .toBuffer();

      return {
        contentType:
          fileImage?.mimetype == FileTypeEnum.BMP
            ? FileTypeEnum.BMP
            : FileTypeEnum.PNG,
        imageBuffer: newImageBuffer,
        metadata: {
          originalSize: fileImage.buffer.length,
          modifiedSize: newImageBuffer.length,
          messageSize: Math.ceil(messageBinary.length / 8),
          bitsEmbedded: bitIndex,
        },
      };
    } catch (error) {
      console.error(error);

      throw new Error(`Gagal memproses buffer gambar: ${error.message}`);
    }
  }

  public async extractLSB(
    fileImage: Express.Multer.File,
  ): Promise<IDecryptLsbResponse> {
    try {
      // Baca gambar menggunakan sharp
      const image = sharp(fileImage.buffer);

      // Dapatkan raw pixel data
      const { data: rawPixels } = await image
        .raw()
        .toBuffer({ resolveWithObject: true });

      // Extract LSB dari setiap channel warna (R,G,B)
      let binaryData = '';
      for (let i = 0; i < rawPixels.length; i += 4) {
        // Get LSB dari R, G, B channels
        for (let j = 0; j < 3; j++) {
          binaryData += (rawPixels[i + j] & 1).toString();
        }
      }

      // Dapatkan value biner dari marker
      const marker = this.convertAllMessageMarker();
      const markerIndex = binaryData.indexOf(marker.startMessage);
      if (markerIndex === -1) {
        throw new Error('Marker not found in image');
      }

      // Ambil data setelah marker
      let messageData = binaryData.slice(
        markerIndex + marker.startMessage.length,
      );

      // Temukan marker akhir
      const endMarkerIndex = messageData.indexOf(marker.endMessage);
      if (endMarkerIndex !== -1) {
        // Potong data hingga marker akhir ditemukan
        messageData = messageData.slice(0, endMarkerIndex);
      }

      // Konversi binary ke text
      let extractedMessage = '';
      for (let i = 0; i < messageData.length; i += 8) {
        const byte = messageData.slice(i, i + 8);
        if (byte.length < 8) {
          break; // Jika byte tidak lengkap, berhenti.
        }
        extractedMessage += String.fromCharCode(parseInt(byte, 2));
      }

      return {
        extractedMessage: extractedMessage,
      };
    } catch (error) {
      console.error(error);
      throw new Error(`Gagal memproses buffer gambar: ${error.message}`);
    }
  }

  public async getInfoFile(
    fileImage: Express.Multer.File,
  ): Promise<IGetInfoFile> {
    const image = sharp(fileImage.buffer);

    // Dapatkan raw pixel data
    const { info } = await image.raw().toBuffer({ resolveWithObject: true });
    console.log(fileImage);

    return {
      size: `${(info.size / (1024 * 1024)).toFixed(3)} MB`,
      resolution: `${info.width}px x ${info.height}px`,
      imageType: fileImage.mimetype,
      fileName: fileImage.originalname,
      lastModified: new Date().toString(),
    };
  }

  private stringToBinary(str: string): string {
    return str
      .split('')
      .map((char) => {
        // Mengubah setiap karakter menjadi kode ASCII dan mengubahnya ke dalam format biner dengan padding 8 digit
        return char.charCodeAt(0).toString(2).padStart(8, '0');
      })
      .join('');
  }

  private convertAllMessageMarker(): IConvertMarker {
    const startMarker = this.stringToBinary(this.messageStartMarker);
    const endMarker = this.stringToBinary(this.messageEndMarker);

    return {
      startMessage: startMarker,
      endMessage: endMarker,
    };
  }

  private getMessageSizeInBits(message: string): number {
    // Mengkonversi pesan ke dalam biner
    const binaryMessage = this.stringToBinary(message);
    // Menghitung panjang data biner
    return binaryMessage.length;
  }
}
