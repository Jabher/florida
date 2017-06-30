//@flow
import {Model} from "../";
import {Dense} from "./Dense";

test("it should act like normal dense layer", () => {
  new Model([1,2])
    .pipe(new Dense(3))
});