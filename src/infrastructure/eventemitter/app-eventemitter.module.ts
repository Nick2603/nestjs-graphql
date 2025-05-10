import { Module } from '@nestjs/common';
import { AppEventemitterService } from './app-eventemitter.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [AppEventemitterService],
  exports: [AppEventemitterService],
})
export class AppEventemitterModule {}
