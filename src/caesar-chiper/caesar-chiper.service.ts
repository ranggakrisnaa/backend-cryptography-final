import { Injectable } from '@nestjs/common';

@Injectable()
export class CaesarChiperService {
  private readonly shift = 7; // Perputaran Caesar Cipher

  /**
   * Mengenkripsi teks menggunakan algoritma Caesar Cipher.
   * @param text Teks yang akan dienkripsi.
   * @returns Teks yang sudah dienkripsi.
   */
  async caesarEncrypt(text: string): Promise<string> {
    return text
      .split('')
      .map((char) => {
        if (/[a-zA-Z]/.test(char)) {
          const base = char >= 'a' ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
          return String.fromCharCode(
            ((char.charCodeAt(0) - base + this.shift) % 26) + base,
          );
        }
        return char;
      })
      .join('');
  }

  /**
   * Mendekripsi teks menggunakan algoritma Caesar Cipher.
   * @param text Teks yang akan didekripsi.
   * @returns Teks asli sebelum dienkripsi.
   */
  async caesarDecrypt(text: string): Promise<string> {
    return text
      .split('')
      .map((char) => {
        if (/[a-zA-Z]/.test(char)) {
          const base = char >= 'a' ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
          return String.fromCharCode(
            ((char.charCodeAt(0) - base - this.shift + 26) % 26) + base,
          );
        }
        return char;
      })
      .join('');
  }
}
