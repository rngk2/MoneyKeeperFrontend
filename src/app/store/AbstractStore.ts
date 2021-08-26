import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {TypedAction} from '@ngrx/store/src/models';

export default abstract class AbstractStore {

  private readonly state$: Observable<any>;

  protected constructor(protected store: Store<any>, select: string) {
    this.state$ = store.select(select);
  }

  public getState(): Observable<number> {
    return this.state$;
  }

  protected updateState(action: () => TypedAction<any>): void {
    this.store.dispatch(action());
  }
}
