import { Module } from '@nestjs/common';
import { Gateway } from './attachment.gateway';

@Module({
  imports: [Gateway],
})
export class AttachmentModule {}
