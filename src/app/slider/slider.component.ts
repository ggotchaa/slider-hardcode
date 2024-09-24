import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Slide, SliderService } from 'src/services/slider.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() displayTime: number = 3000;
  @Input() slidesToShow: number = 1;

  slides: Slide[] = [];
  scheduledSlides: Slide[] = [];
  currentIndex: number = 0;
  slideInterval!: Subscription;

  constructor(private sliderService: SliderService, private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sliderService.getSlides().subscribe((data) => {
      this.slides = data;
      this.scheduleSlides();
  
      // Retrieve currentIndex from localStorage
      const savedIndex = localStorage.getItem('currentSlideIndex');
      this.currentIndex = savedIndex ? +savedIndex : 0;
  
      this.startSlideShow();
    });
  }


  scheduleSlides(): void {
    // создаем массив для отображения слайдов
    this.scheduledSlides = [];

    // находим максимальный приоритет
    const maxPriority = Math.max(...this.slides.map((s) => s.priority));

    // строим массив отображаемых слайдов
    for (let priority = maxPriority; priority >= 1; priority--) {
      const slidesWithPriority = this.slides.filter(
        (slide) => slide.priority === priority
      );

      // вставляем слайды с приоритетом в массив отображаемых слайдов
      slidesWithPriority.forEach((slide) => {
        const repeatCount = priority;
        for (let i = 0; i < repeatCount; i++) {
          this.scheduledSlides.push(slide);
        }
      });
    }
  }

  startSlideShow(): void {
    this.slideInterval = interval(this.displayTime).subscribe(() => {
      this.nextSlide();
    });
  }

  nextSlide(): void {
    this.currentIndex =
      (this.currentIndex + this.slidesToShow) % this.scheduledSlides.length;
  
    // обновляем урл
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { currentSlideIndex: this.currentIndex },
      queryParamsHandling: 'merge',
    });
  }
  ngOnDestroy(): void {
    this.slideInterval.unsubscribe();
  }
}
