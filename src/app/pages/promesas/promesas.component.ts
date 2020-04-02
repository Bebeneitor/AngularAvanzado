import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {
  constructor() {
    this.contarTresSegundos()
      .then(result => {
        console.log('termino');
      })
      .catch(error => {
        console.log(error);
      });
  }

  ngOnInit(): void {}

  contarTresSegundos(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;

      const intervalo = setInterval(() => {
        contador = contador + 1;
        console.log(contador);

        if (contador === 3) {
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }
}
