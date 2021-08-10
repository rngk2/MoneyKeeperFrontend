import { Component, OnInit } from '@angular/core';
import Transaction from "../entities/transaction.entity";
import {HttpClient} from "@angular/common/http";
import UserService from "../services/user.service";
import categoriesState from "../state/categories.state";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-all-transactions-page',
  templateUrl: './all-transactions-page.component.html',
  styleUrls: ['./all-transactions-page.component.scss']
})
export class AllTransactionsPageComponent implements OnInit {

  transactions!: Transaction[]

  constructor(private http: HttpClient,
              private userService: UserService) { }

  ngOnInit(): void {
    categoriesState.getObservableState().subscribe(() => this.fetchSummary())
    categoriesState.updateState()
  }

  private fetchSummary(): void {
    this.http.get<Transaction[]>(environment.serverUrl + `/users/${this.userService.getCurrentUser().id}/summary`)
      .subscribe(transactions => this.transactions = this.sortByDate(transactions))
  }

  private sortByDate(transactions: Transaction[]): Transaction[] {
    return transactions.sort((a, b) => new Date(b.timestamp).getDate() - new Date(a.timestamp).getDate())
  }

}
