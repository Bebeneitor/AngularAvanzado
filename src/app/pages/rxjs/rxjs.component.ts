import { Component, OnInit, OnDestroy } from '@angular/core';

import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';
import { retry } from 'rxjs/operators/retry';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subscriber } from 'rxjs/Subscriber';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
  suscription: Subscription;

  constructor() {
    this.suscription = this.regresaObservable().subscribe(
      (numero) => {
        console.log(numero);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('bye bye madafaker');
      }
    );
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.suscription.unsubscribe();
    console.log('la pagina va a morir');
  }

  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador,
        };

        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error('esto chingo a su madre');
        // }
      }, 1000);
    }).pipe(
      map((resp) => resp.valor),
      filter((valor, index) => {
        if (valor % 2 === 1) {
          // Impar
          return true;
        } else {
          // Par
          return false;
        }
      })
    );
  }
}
