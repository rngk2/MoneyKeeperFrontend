import {Subject} from "rxjs";

export default class ObservableState  {

  private state: Subject<void> = new Subject<void>()

  getObservableState() {
    return this.state.asObservable()
  }

  updateState(): void {
    this.state.next()
  }

}
