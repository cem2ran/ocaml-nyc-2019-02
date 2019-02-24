let useToggle = (initial, continuation) => {
  open Hooks;
  let%Hook (value, setValue) = useState(initial);
  let toggle = () => setValue((!));
  (value, toggle) |> continuation;
};

module First = {
  open Hooks;
  [@react.component]
  let make = (~message, _) =>
    {
      let%Hook (disabled, toggle) = useToggle(false);
      let%Hook (count, setCount) = useState(0);
      let%Hook _ =
        useEffect(() => {
          Js.log("Initial log, and when state changes");
          None;
        });

      let%Hook _ =
        useEffect0(() => {
          Js.log("Only first render");
          None;
        });

      let%Hook _ =
        useEffect1(
          () => {
            Js.log("Hey, I only change when my dependency changes");
            None;
          },
          [|message|],
        );

      let stringToRender = message ++ " " ++ string_of_int(count);

      return(
        <>
          <button onClick={_ => toggle()}>
            {ReasonReact.string(disabled ? "enable" : "disable")}
          </button>
          <button disabled onClick={_ => setCount(count => count + 1)}>
            {ReasonReact.string(stringToRender)}
          </button>
        </>,
      );
    }
    |> Hooks.extract;
};

module Second = {
  open Hooks;
  [@react.component]
  let make = (~message, _) =>
    {
      /**
     * If the order, types or number of hooks changes this wont compile.
     */
      let%Hook (disabled, toggle) = useToggle(false);
      let%Hook (count, setCount) = useState(0);
      let%Hook _ =
        useEffect(() => {
          Js.log("Initial log, and when state changes");
          None;
        });

      let%Hook _ =
        useEffect0(() => {
          Js.log("Only first render");
          None;
        });

      let%Hook _ =
        useEffect1(
          () => {
            Js.log("Hey, I only change when my dependency changes");
            None;
          },
          [|message|],
        );

      let stringToRender = message ++ " " ++ string_of_int(count);

      return(
        <>
          <button onClick={_ => toggle()}>
            {ReasonReact.string(disabled ? "enable" : "disable")}
          </button>
          <button disabled onClick={_ => setCount(count => count + 1)}>
            {ReasonReact.string(stringToRender)}
          </button>
        </>,
      );
    }
    |> Hooks.extract;
};

[@react.component]
let make = () =>
  {
    open Hooks;
    let%Hook (default, toggle) = useToggle(true);

    <div>
      <button onClick={_ => toggle()}>
        {ReasonReact.string("toggle")}
      </button>
      {
        /**
         * FIXME: These two components end up sharing hooks.
         * Not sure if this is a feature or a bug.
         */
        let component =
          default ?
            First.make({"message": "First"}) :
            Second.make({"message": "Second"});

        /**
         * FIXME: These two loose their state when toggled
         **/
        /*
         let component =
          default ?
            React.createElement(
              First.make,
              First.makeProps(~key="first", ~message="First", ()),
            ) :
            React.createElement(
              Second.make,
              Second.makeProps(~key="second", ~message="Second", ()),
            );
         */
        component;
      }
    </div>
    |> return;
  }
  |> Hooks.extract;