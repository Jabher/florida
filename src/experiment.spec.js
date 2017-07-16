import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/share";

test("recast", () => {
  const $s = new Subject();

  $s.subscribe(
    console.log.bind(null, "next"),
    console.log.bind(null, "error"),
    console.log.bind(null, "complete"),
  );

  const $s_ = $s.share();
  $s_.complete();
  $s_.complete();
});
