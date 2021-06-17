export default class EventObserver {
  observers: Array<any>

  constructor() {
    this.observers = [];
  }

  subscribe(fn: any): void {
    this.observers.push(fn);
  }

  unsubscribe(fn: any): void {
    this.observers = this.observers.filter(subscriber => subscriber !== fn);
  }

  broadcast(data: any): void {
    this.observers.forEach(subscriber => subscriber(data));
  }
}
