import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { RagController } from './rag.controller';
import { RagService } from './rag.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RAG_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'rag',
          protoPath: join(__dirname, '../proto/rag.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [RagController],
  providers: [RagService],
})
export class RagModule {}
