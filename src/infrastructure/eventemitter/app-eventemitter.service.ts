import { Injectable } from '@nestjs/common';
import {
  EventEmitter2,
  EventEmitterReadinessWatcher,
} from '@nestjs/event-emitter';

@Injectable()
export class AppEventemitterService {
  constructor(
    private eventEmitter: EventEmitter2,
    private eventEmitterReadinessWatcher: EventEmitterReadinessWatcher,
  ) {}

  async emitEvent<T>(key: string, event: T) {
    await this.eventEmitterReadinessWatcher.waitUntilReady();
    this.eventEmitter.emit(key, event);
  }
}
