'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Hooks$ReasonReactExample = require("./Hooks.bs.js");

function useToggle(initial, continuation) {
  return Hooks$ReasonReactExample.Hook[/* let_ */0]((function (param) {
                return Hooks$ReasonReactExample.useState(initial, param);
              }), (function (param) {
                var setValue = param[1];
                var toggle = function () {
                  return Curry._1(setValue, (function (prim) {
                                return !prim;
                              }));
                };
                return Curry._1(continuation, /* tuple */[
                            param[0],
                            toggle
                          ]);
              }));
}

function make(Props) {
  var message = Props.message;
  return Hooks$ReasonReactExample.Hook[/* let_ */0]((function (param) {
                return useToggle(false, param);
              }), (function (param) {
                var toggle = param[1];
                var disabled = param[0];
                return Hooks$ReasonReactExample.Hook[/* let_ */0]((function (param) {
                              return Hooks$ReasonReactExample.useState(0, param);
                            }), (function (param) {
                              var setCount = param[1];
                              var count = param[0];
                              return Hooks$ReasonReactExample.Hook[/* let_ */0](Hooks$ReasonReactExample.useEffect((function () {
                                                console.log("Initial log, and when state changes");
                                                return undefined;
                                              })), (function () {
                                            return Hooks$ReasonReactExample.Hook[/* let_ */0]((function (param) {
                                                          return Hooks$ReasonReactExample.useEffect0((function () {
                                                                        console.log("Only first render");
                                                                        return undefined;
                                                                      }), param);
                                                        }), (function () {
                                                          var partial_arg = /* array */[message];
                                                          return Hooks$ReasonReactExample.Hook[/* let_ */0]((function (param) {
                                                                        return Hooks$ReasonReactExample.useEffect1((function () {
                                                                                      console.log("Hey, I only change when my dependency changes");
                                                                                      return undefined;
                                                                                    }), partial_arg, param);
                                                                      }), (function () {
                                                                        var stringToRender = message + (" " + String(count));
                                                                        return React.createElement(React.Fragment, undefined, React.createElement("button", {
                                                                                        onClick: (function () {
                                                                                            return Curry._1(toggle, /* () */0);
                                                                                          })
                                                                                      }, disabled ? "enable" : "disable"), React.createElement("button", {
                                                                                        disabled: disabled,
                                                                                        onClick: (function () {
                                                                                            return Curry._1(setCount, (function (count) {
                                                                                                          return count + 1 | 0;
                                                                                                        }));
                                                                                          })
                                                                                      }, stringToRender));
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
}

var First = /* module */[/* make */make];

function make$1(Props) {
  var message = Props.message;
  return Hooks$ReasonReactExample.Hook[/* let_ */0]((function (param) {
                return useToggle(false, param);
              }), (function (param) {
                var toggle = param[1];
                var disabled = param[0];
                return Hooks$ReasonReactExample.Hook[/* let_ */0]((function (param) {
                              return Hooks$ReasonReactExample.useState(0, param);
                            }), (function (param) {
                              var setCount = param[1];
                              var count = param[0];
                              return Hooks$ReasonReactExample.Hook[/* let_ */0](Hooks$ReasonReactExample.useEffect((function () {
                                                console.log("Initial log, and when state changes");
                                                return undefined;
                                              })), (function () {
                                            return Hooks$ReasonReactExample.Hook[/* let_ */0]((function (param) {
                                                          return Hooks$ReasonReactExample.useEffect0((function () {
                                                                        console.log("Only first render");
                                                                        return undefined;
                                                                      }), param);
                                                        }), (function () {
                                                          var partial_arg = /* array */[message];
                                                          return Hooks$ReasonReactExample.Hook[/* let_ */0]((function (param) {
                                                                        return Hooks$ReasonReactExample.useEffect1((function () {
                                                                                      console.log("Hey, I only change when my dependency changes");
                                                                                      return undefined;
                                                                                    }), partial_arg, param);
                                                                      }), (function () {
                                                                        var stringToRender = message + (" " + String(count));
                                                                        return React.createElement(React.Fragment, undefined, React.createElement("button", {
                                                                                        onClick: (function () {
                                                                                            return Curry._1(toggle, /* () */0);
                                                                                          })
                                                                                      }, disabled ? "enable" : "disable"), React.createElement("button", {
                                                                                        disabled: disabled,
                                                                                        onClick: (function () {
                                                                                            return Curry._1(setCount, (function (count) {
                                                                                                          return count + 1 | 0;
                                                                                                        }));
                                                                                          })
                                                                                      }, stringToRender));
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
}

var Second = /* module */[/* make */make$1];

function make$2() {
  return Hooks$ReasonReactExample.Hook[/* let_ */0]((function (param) {
                return useToggle(true, param);
              }), (function (param) {
                var toggle = param[1];
                return React.createElement("div", undefined, React.createElement("button", {
                                onClick: (function () {
                                    return Curry._1(toggle, /* () */0);
                                  })
                              }, "toggle"), param[0] ? make({
                                  message: "First"
                                }) : make$1({
                                  message: "Second"
                                }));
              }));
}

exports.useToggle = useToggle;
exports.First = First;
exports.Second = Second;
exports.make = make$2;
/* react Not a pure module */
