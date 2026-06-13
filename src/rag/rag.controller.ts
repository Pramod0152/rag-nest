import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RagService } from './rag.service';
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('rag')
export class RagController {
  constructor(private readonly ragService: RagService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File): Observable<any> {
    return this.ragService.uploadDocument({
      filename: file.originalname,
      content: file.buffer,
    });
  }

  @Get('ask')
  async ask(@Query('q') query: string): Promise<any> {
    return this.ragService.getAnswer(query);
  }
}
