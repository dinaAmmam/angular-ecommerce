import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core'; // Import SimpleChanges, not SimpleChange
import { Colors } from '../Enum/colors';

@Directive({
  selector: '[appProducthighlight]',
  standalone: true
})

export class ProducthighlightDirective {
  @Input() searchText: string = '';

  @HostListener('mouseover') onMouseOver() {
    this.elementRef.nativeElement.style.boxShadow =
      'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px';
    this.elementRef.nativeElement.style.transition = '1s';
    this.elementRef.nativeElement.style.transform = 'translate(10px)';
  }
  @HostListener('mouseout') onMouseOut() {
    this.elementRef.nativeElement.style.boxShadow = 'none';
    this.elementRef.nativeElement.style.transform = 'scale(1)';
  }


  addBorder(
    color: string,
    borderType: string = 'solid',
    borderWidth: string = '2px'
  ) {
    this.elementRef.nativeElement.style.border = `${borderWidth} ${borderType} ${color}`;
  }
  @Input() set appHighlight(value: number) {
    if (value == 1) {
      this.addBorder(Colors.pink, 'dashed');
    } else if (value == 2) {
      this.addBorder(Colors.darkPink);
    } else if (value == 0) {
      this.addBorder(Colors.f2,'solid');
    } else {
      this.addBorder('light-gray');
    }
  }
  constructor(private elementRef: ElementRef) {
  }
}
