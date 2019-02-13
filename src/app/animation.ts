import { trigger, transition, style, animate, query, animateChild, group } from '@angular/animations';
export const slideInAnimation = trigger('routeAnimations', [
  transition('1 <=> 2', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
      })
    ]),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild()),
    query(':leave', [
      animate('300ms ease-out', style({ left: '100%'}))
    ]),
    query(':enter', [
      animate('300ms ease-out', style({ left: '0%'}))
    ]),
    query(':enter', animateChild()),
  ])
]);
