import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Slide {
  id: number;
  image: string;
  url: string;
  priority: number;
}

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  constructor() {}

  // имитация получения слайдов
  getSlides(): Observable<Slide[]> {
    const slides: Slide[] = [
      {
        id: 1,
        image: 'https://picsum.photos/id/1011/800/400',
        url: 'https://picsum.photos/id/1011',
        priority: 1,
      },
      {
        id: 2,
        image: 'https://picsum.photos/id/1012/800/400',
        url: 'https://picsum.photos/id/1012',
        priority: 1,
      },
      {
        id: 3,
        image: 'https://picsum.photos/id/1013/800/400',
        url: 'https://picsum.photos/id/1013',
        priority: 2,
      },
      {
        id: 4,
        image: 'https://picsum.photos/id/1014/800/400',
        url: 'https://picsum.photos/id/1014',
        priority: 2,
      },
      {
        id: 5,
        image: 'https://picsum.photos/id/1015/800/400',
        url: 'https://picsum.photos/id/1015',
        priority: 3,
      },
      {
        id: 6,
        image: 'https://picsum.photos/id/1016/800/400',
        url: 'https://picsum.photos/id/1016',
        priority: 3,
      },
      {
        id: 7,
        image: 'https://picsum.photos/id/1017/800/400',
        url: 'https://picsum.photos/id/1017',
        priority: 4,
      },
      {
        id: 8,
        image: 'https://picsum.photos/id/1018/800/400',
        url: 'https://picsum.photos/id/1018',
        priority: 4,
      },
      {
        id: 9,
        image: 'https://picsum.photos/id/1019/800/400',
        url: 'https://picsum.photos/id/1019',
        priority: 5,
      },
      {
        id: 10,
        image: 'https://picsum.photos/id/1020/800/400',
        url: 'https://picsum.photos/id/1020',
        priority: 5,
      },
    ];

    return of(slides);
  }
}
