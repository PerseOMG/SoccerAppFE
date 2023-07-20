import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class AppTitleService {
  constructor(private titleService: Title) {}

  setDocTitle(title: string) {
    this.titleService.setTitle(`Soccer App | ${title}`);
  }
}
