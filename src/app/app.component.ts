import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface PackData {
  ingredient: string;
  inventory_code: string;
  quantity: number;
  unit: string;
}

interface Customer {
  customer_id: number;
  pack_data: PackData[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  customers: Customer[] = [];
  isLoading = true;
  error: string | null = null;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCustomerData();
  }

  fetchCustomerData() {
    this.http.get<Customer[]>('https://6466e9a7ba7110b663ab51f2.mockapi.io/api/v1/pack1')
      .subscribe(
        (data) => {
          console.log(data);
          this.customers = data;
          this.isLoading = false;
        },
        (error) => {
          this.error = 'An error occurred while fetching data.';
          this.isLoading = false;
        }
      );
  }
}