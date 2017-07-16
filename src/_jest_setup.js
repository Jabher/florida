import "rxjs/Rx";
import { Observable } from "rxjs/Observable";

Observable.prototype.process = function process(input) {
  const output = this.first().toPromise();
  this.next(input);
  return output;
};