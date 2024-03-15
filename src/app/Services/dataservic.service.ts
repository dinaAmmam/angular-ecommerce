import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, interval, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {
 destroy$: Subject<void> = new Subject<void>();

  dataObservable$: Observable<any> = interval(3000).pipe(
    takeUntil(interval(10000).pipe(takeUntil(this.destroy$)))
  );

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
