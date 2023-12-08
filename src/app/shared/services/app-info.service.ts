import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Learn Devexpress Angular';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
