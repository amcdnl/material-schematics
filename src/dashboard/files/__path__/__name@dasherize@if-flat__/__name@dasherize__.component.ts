import { Component, OnInit, <% if(!!viewEncapsulation) { %>, ViewEncapsulation<% }%><% if(changeDetection !== 'Default') { %>, ChangeDetectionStrategy<% }%> } from '@angular/core';

declare var google: any;

@Component({
  selector: '<%= selector %>',<% if(inlineTemplate) { %>
  template: `
    <div class="grid-container">
      <h1 class="mat-h1">Sales Dashboard</h1>
      <mat-grid-list cols="2" rowHeight="350px">
        <mat-grid-tile *ngFor="let card of cards">
          <mat-card>
            <mat-card-header>
              <mat-card-title>
                {{card.title}}
                <button mat-icon-button [matMenuTriggerFor]="menu">
                  <mat-icon aria-label="Menu icon">more_vert</mat-icon>
                </button>
                <mat-menu #menu="matMenu" xPosition="before">
                  <button mat-menu-item>Expand</button>
                  <button mat-menu-item>Remove</button>
                </mat-menu>
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="chart"></div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,<% } else { %>
  templateUrl: './<%= dasherize(name) %>.component.html',<% } if(inlineStyle) { %>
  styles: [
    `
      .grid-container {
        margin: 20px;
      }
      
      mat-card {
        position: absolute;
        top: 15px;
        left: 15px;
        right: 15px;
        bottom: 15px;
      }
      
      [mat-icon-button] {
        position: absolute;
        top: 5px;
        right: 10px;
      }
  `
  ]<% } else { %>
  styleUrls: ['./<%= dasherize(name) %>.component.<%= styleext %>']<% } %><% if(!!viewEncapsulation) { %>,
  encapsulation: ViewEncapsulation.<%= viewEncapsulation %><% } if (changeDetection !== 'Default') { %>,
  changeDetection: ChangeDetectionStrategy.<%= changeDetection %><% } %>
})
export class <%= classify(name) %>Component implements OnInit {
  cards: any[] = [
    {
      title: 'Sales Leaders'
    },
    {
      title: 'Sales Goal'
    },
    {
      title: 'Top Sales'
    },
    {
      title: 'Pending Sales'
    }
  ];

  ngOnInit() {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(() => {
      const data = google.visualization.arrayToDataTable([
        ['Customer', 'Sale Price'],
        ['Corp A', 10000],
        ['Corp B', 2000],
        ['Corp C', 5000],
        ['Corp D', 1000]
      ]);

      for (const elm of (<any>document.getElementsByClassName('chart'))) {
        const chart = new google.visualization.PieChart(elm);
        chart.draw(data, {});
      }
    });
  }
}
