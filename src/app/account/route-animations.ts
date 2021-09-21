import {
  animate,
  animateChild,
  AnimationMetadata,
  group,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

const slideTo = (direction: 'right' | 'left'): AnimationMetadata[] => [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      [direction]: 0,
      width: '100%'
    })
  ]),
  query(':enter', [
    style({ [direction]: '-100%' })
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('540ms ease-out', style({ [direction]: '100%' }))
    ]),
    query(':enter', [
      animate('540ms ease-out', style({ [direction]: '0%' }))
    ])
  ]),
  query(':enter', animateChild()),
];

export const authFormsSlider =
  trigger('authRouteAnimations', [
    transition('isLeft <=> isRight', slideTo('left')),
  ]);
