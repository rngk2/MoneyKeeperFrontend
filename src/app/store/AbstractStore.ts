import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {TypedAction} from '@ngrx/store/src/models';
import {skip} from "rxjs/operators";

export default abstract class AbstractStore {

  private readonly state$: Observable<any>;

  protected constructor(protected store: Store<any>, select: string) {
    this.state$ = store.select(select).pipe(skip(1));
  }

  public getState(): Observable<any> {
    return this.state$;
  }

  protected updateState(action: () => TypedAction<any>): void {
    this.store.dispatch(action());
  }
}
