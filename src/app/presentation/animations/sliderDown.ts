import { trigger, transition, style, animate } from '@angular/animations';

export const slideAnimation = trigger('slideAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(20px)', opacity: 0 }),
    animate('1s ease', style({ transform: 'translateY(0)', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)', opacity: 1 }),
    animate('1s ease', style({ transform: 'translateY(-20px)', opacity: 0 })),
  ]),
]);

export const sliderRigth = trigger('sliderRigth', [
  transition(':enter', [
    style({ transform: 'translateX(20px)', opacity: 0 }),
    animate('1s ease', style({ transform: 'traslateX(0)', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)', opacity: 1 }),
    animate('1s ease', style({ transform: 'traslateX(20px)', opacity: 0 })),
  ]),
]);
