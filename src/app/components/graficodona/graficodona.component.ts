import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficodona',
  templateUrl: './graficodona.component.html',
  styles: []
})
export class GraficodonaComponent implements OnInit {
  // Doughnut
  @Input() doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales'
  ];
  @Input() doughnutChartData: number[] = [350, 450, 100];
  @Input() doughnutChartType: string = 'doughnut';
  @Input() leyenda: string = 'grafico';

  constructor() {}

  ngOnInit(): void {}
}
