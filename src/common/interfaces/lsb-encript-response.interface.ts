export interface IEncryptLsbResponse {
  contentType: string;
  imageBuffer: Buffer;
  metadata: {
    width?: number;
    height?: number;
    channels?: number;
    originalSize?: number;
    modifiedSize?: number;
    messageSize?: number;
    pixelsModified?: number;
    bitsEmbedded?: number;
  };
}
