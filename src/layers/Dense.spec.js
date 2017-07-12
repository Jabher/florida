//@flow
import { Model } from "../";
import { Dense } from "./Dense";

test("it should act like normal dense layer", () => {
  const layer = new Dense(3);
  const model = new Model([1, 2])
    .pipe(layer);

  const subject = model.compile();

  // const subject = model.compile()
});