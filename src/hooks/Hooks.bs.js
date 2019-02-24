'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

function let_(children, props) {
  return Curry._1(children, props);
}

var Hook = /* module */[/* let_ */let_];

function addState(x, _) {
  return x;
}

function useState(state, continuation) {
  return Curry._1(continuation, React.useState((function () {
                    return state;
                  })));
}

function addEffect(prim) {
  return prim;
}

function cps_of_hook(addTyping, eff, continuation) {
  return Curry._1(addTyping, Curry._1(continuation, eff));
}

function useEffect(functionWithEffects) {
  React.useEffect(functionWithEffects);
  var partial_arg = /* () */0;
  return (function (param) {
      return Curry._1(param, partial_arg);
    });
}

function useEffect0(functionWithEffects, continuation) {
  return Curry._1(continuation, (React.useEffect(functionWithEffects, ([])), /* () */0));
}

function useEffect1(functionWithEffects, dependencies, continuation) {
  return Curry._1(continuation, (React.useEffect(functionWithEffects, dependencies), /* () */0));
}

function functionComponent(Props) {
  var message = Props.message;
  return useState("Harry", (function (param) {
                var name = param[0];
                return useState("Potter", (function (param) {
                              var stringToRender = message + (" " + (name + (" " + param[0])));
                              return React.createElement(React.Fragment, undefined, stringToRender);
                            }));
              }));
}

function useNameInput(initialName, initialSurname, continuation) {
  return useState(initialName, (function (param) {
                var setName = param[1];
                var name = param[0];
                return useState(initialSurname, (function (param) {
                              return Curry._1(continuation, /* tuple */[
                                          name,
                                          setName,
                                          param[0],
                                          param[1]
                                        ]);
                            }));
              }));
}

function effectBeforeState(continuation) {
  return useEffect((function () {
                  console.log("About so use State");
                  return undefined;
                }))((function () {
                return useState("Harry", (function () {
                              return Curry._1(continuation, /* () */0);
                            }));
              }));
}

function effectAfterState(continuation) {
  return useState("Harry", (function () {
                return useEffect((function () {
                                console.log("Just Used State");
                                return undefined;
                              }))((function () {
                              return Curry._1(continuation, /* () */0);
                            }));
              }));
}

var Example = /* module */[
  /* functionComponent */functionComponent,
  /* useNameInput */useNameInput,
  /* effectBeforeState */effectBeforeState,
  /* effectAfterState */effectAfterState
];

exports.Hook = Hook;
exports.addState = addState;
exports.useState = useState;
exports.addEffect = addEffect;
exports.cps_of_hook = cps_of_hook;
exports.useEffect = useEffect;
exports.useEffect0 = useEffect0;
exports.useEffect1 = useEffect1;
exports.Example = Example;
/* react Not a pure module */
