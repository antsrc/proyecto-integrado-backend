import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class LogService {
  private readonly auditLogPath = path.join(__dirname, '../../../../logs/audit.log');
  private readonly errorLogPath = path.join(__dirname, '../../../../logs/error.log');

  async getAuditLogLines(n: number): Promise<string[]> {
    return this.getFirstLines(this.auditLogPath, n);
  }

  async getErrorLogLines(n: number): Promise<string[]> {
    const lines = await this.getFirstLines(this.errorLogPath, n);
    return lines.map(line => {
      try {
        const obj = JSON.parse(line);
        delete obj.stack;
        return JSON.stringify(obj);
      } catch {
        return line;
      }
    });
  }

  private async getFirstLines(filePath: string, n: number): Promise<string[]> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return content.split(/\r?\n/).filter(Boolean).slice(-n);
    } catch (err) {
      throw new InternalServerErrorException(`No se pudo leer el archivo: ${filePath}`);
    }
  }
}
