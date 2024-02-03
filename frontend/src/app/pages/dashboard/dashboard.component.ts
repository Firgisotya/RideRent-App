import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { OrderService } from 'src/app/service/order/order.service';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  label_approved: any = []
  value_approved: any = []
  chart_approved: any

  label_vehicle: any = []
  value_vehicle: any = []
  chart_vehicle: any

  constructor(
    private _service: OrderService,
  ){}

  getReportApprovedOrders = () => {
    this._service.getReportApprovedOrders().subscribe(
      (data: any) => {
        for (let item of data.data) {
          this.label_approved.push(item.date)
          this.value_approved.push(item.total)
        }

        this.chart_approved = new Chart('chart_approved', {
          type: 'bar',
          data: {
            labels: this.label_approved,
            datasets: [
              {
                label: "Approved Orders",
                data: this.value_approved,
                borderColor: [
                  'green'
                ],
                backgroundColor: [
                  'green',
                ],
                borderRadius: 10,
                borderWidth: 1,
                datalabels: {
                  color: 'black',
                  anchor: 'end',
                  align: 'top'
                }
              },
            ],
          },
          plugins: [ChartDataLabels],
          options: {
            responsive: true,
            color: 'black',
            plugins: {
              legend: {
                display: true
              },
            },
            scales: {
              x: {
                ticks:{
                  color: 'black'
                },
                grid: {
                  display: false
                }
              },
              y: {
                ticks:{
                  color: 'black'
                },
                grid: {
                  display: false
                },
                display: true,
                position: 'left',
                title: {
                  color: 'black',
                  display: true,
                  text: "Amount",
                }
              },
            }
          },
        })
      }
    )
  }

  getReportVehicleOrders = () => {
    this._service.getReportVehicleOrders().subscribe(
      (data: any) => {
        for (let item of data.data) {
          this.label_vehicle.push(item.name)
          this.value_vehicle.push(item.total)
        }

        this.chart_vehicle = new Chart('chart_vehicle', {
          type: 'line',
          data: {
            labels: this.label_vehicle,
            datasets: [
              {
                label: "Vehicle Orders",
                data: this.value_vehicle,
                borderColor: [
                  'blue'
                ],
                backgroundColor: [
                  'blue',
                ],
                borderRadius: 10,
                borderWidth: 1,
                datalabels: {
                  color: 'black',
                  anchor: 'end',
                  align: 'top'
                }
              },
            ],
          },
          plugins: [ChartDataLabels],
          options: {
            responsive: true,
            color: 'black',
            plugins: {
              legend: {
                display: true
              },
            },
            scales: {
              x: {
                ticks:{
                  color: 'black'
                },
                grid: {
                  display: false
                }
              },
              y: {
                ticks:{
                  color: 'black'
                },
                grid: {
                  display: false
                },
                display: true,
                position: 'left',
                title: {
                  color: 'black',
                  display: true,
                  text: "Count",
                }
              },
            }
          },
        })
      }
    )
  }

  ngOnInit() {
    this.getReportApprovedOrders();
    this.getReportVehicleOrders();
  }
}
