/**
 * Inspired by cristianoc/LinearHooksViaTypes:
 * https://gist.github.com/cristianoc/cef37bcfc0446da482da4723dc3319a8
 */
type hook('a);

module Hook = {
  let let_ = (children, props) => children(props);
  /*
   TODO: Add `and_` to declare multiple hooks more succintly:

   let%Hook (value, setValue) = State.use(0)
        and (enabled, toggle) = useToggle(false)
        and _ = Effect.use(() => Js.log("Hello world"))
    */
};
/* Could possibly be removed as suggested later. */
external return: ReasonReact.reactElement => hook(ReasonReact.reactElement) =
  "%identity";
external extract: hook('a) => ReasonReact.reactElement = "%identity";

type state('a);

let addState: (hook('t), ~state: 'state) => hook(('t, state('state))) =
  (x, ~state as _) => Obj.magic(x);

let useState = (state, continuation) =>
  continuation(React.useState(() => state)) |> addState(~state);

type effect;

let addEffect: hook('t) => hook(('t, effect)) = Obj.magic;

let cps_of_hook = (addTyping, eff, continuation) =>
  continuation(eff) |> addTyping;

let useEffect = (functionWithEffects, continuation) =>
  continuation(React.useEffect(functionWithEffects)) |> addEffect;

let useEffect = functionWithEffects =>
  React.useEffect(functionWithEffects) |> cps_of_hook(addEffect);

let useEffect0 = (functionWithEffects, continuation) =>
  continuation(React.useEffect0(functionWithEffects)) |> addEffect;

let useEffect1 = (functionWithEffects, dependencies, continuation) =>
  continuation(React.useEffect1(functionWithEffects, dependencies))
  |> addEffect;

/**
 * Notice the inferred types of the following functions. They encode
 * order and types of hook applications. So you can actually safely
 * use hooks conditionally as long as the branches of a conditional
 * returns a hook with the same order and type of hook applications.
 * */
module Example = {
  [@react.component]
  let functionComponent = (~message) => {
    let%Hook (name, _setName) = useState("Harry");
    let%Hook (surname, _setSurname) = useState("Potter");
    let stringToRender = message ++ " " ++ name ++ " " ++ surname;

    /* @react.component could probably auto wrap/return the last argument
     * and return unwrapped/extracted reactElement
     * */
    return(<> {stringToRender |> ReasonReact.string} </>);
  };

  let useNameInput = (~initialName, ~initialSurname, continuation) => {
    let%Hook (name, setName) = useState(initialName);
    let%Hook (surname, setSurname) = useState(initialSurname);
    (name, setName, surname, setSurname) |> continuation;
  };

  let effectBeforeState = continuation => {
    let%Hook _ =
      useEffect(() => {
        Js.log("About so use State");
        None;
      });
    let%Hook (_name, _setName) = useState("Harry");
    continuation();
  };

  let effectAfterState = continuation => {
    let%Hook (_name, _setName) = useState("Harry");
    let%Hook () =
      useEffect(() => {
        Js.log("Just Used State");
        None;
      });
    continuation();
  };
};