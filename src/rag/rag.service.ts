import { Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';

interface DocumentRequest {
  filename: string;
  content: Buffer;
}

interface DocumentResponse {
  documentId: string;
  chunksCreated: number;
  status: string;
}

interface QueryRequest {
  query: string;
}

interface QueryResponse {
  answer: string;
  sources: string[];
}

interface RagServiceGrpc {
  uploadDocument(data: DocumentRequest): Observable<DocumentResponse>;
  getAnswer(data: QueryRequest): Observable<QueryResponse>;
}

@Injectable()
export class RagService implements OnModuleInit {
  private ragService: RagServiceGrpc;

  constructor(@Inject('RAG_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.ragService = this.client.getService<RagServiceGrpc>('RagService');
  }

  uploadDocument(item: any): Observable<DocumentResponse> {
    const text = this.ragService.uploadDocument(item);
    return text;
  }

  async getAnswer(query: string): Promise<QueryResponse> {
    return firstValueFrom(this.ragService.getAnswer({ query }));
  }
}
