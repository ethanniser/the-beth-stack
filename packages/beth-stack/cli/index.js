#!/usr/bin/env bun
// @bun

// node_modules/elysia/dist/bun/index.js
var rY = Object.create;
var {
  defineProperty: K6,
  getPrototypeOf: aY,
  getOwnPropertyNames: eY,
} = Object;
var $X = Object.prototype.hasOwnProperty;
var Y1 = ($, W, Y) => {
  Y = $ != null ? rY(aY($)) : {};
  const X =
    W || !$ || !$.__esModule
      ? K6(Y, "default", { value: $, enumerable: true })
      : Y;
  for (let Z of eY($))
    if (!$X.call(X, Z)) K6(X, Z, { get: () => $[Z], enumerable: true });
  return X;
};
var H0 = ($, W) => () => (W || $((W = { exports: {} }).exports, W), W.exports);
var j6 = H0((S7, t$) => {
  var l1 = function () {},
    XX = function ($, W, Y) {
      (this.fn = $), (this.context = W), (this.once = Y || false);
    },
    L6 = function ($, W, Y, X, Z) {
      if (typeof Y !== "function")
        throw new TypeError("The listener must be a function");
      var Q = new XX(Y, X || $, Z),
        J = x0 ? x0 + W : W;
      if (!$._events[J]) ($._events[J] = Q), $._eventsCount++;
      else if (!$._events[J].fn) $._events[J].push(Q);
      else $._events[J] = [$._events[J], Q];
      return $;
    },
    B$ = function ($, W) {
      if (--$._eventsCount === 0) $._events = new l1();
      else delete $._events[W];
    },
    b0 = function () {
      (this._events = new l1()), (this._eventsCount = 0);
    },
    YX = Object.prototype.hasOwnProperty,
    x0 = "~";
  if (Object.create) {
    if (((l1.prototype = Object.create(null)), !new l1().__proto__)) x0 = false;
  }
  b0.prototype.eventNames = function $() {
    var W = [],
      Y,
      X;
    if (this._eventsCount === 0) return W;
    for (X in (Y = this._events))
      if (YX.call(Y, X)) W.push(x0 ? X.slice(1) : X);
    if (Object.getOwnPropertySymbols)
      return W.concat(Object.getOwnPropertySymbols(Y));
    return W;
  };
  b0.prototype.listeners = function $(W) {
    var Y = x0 ? x0 + W : W,
      X = this._events[Y];
    if (!X) return [];
    if (X.fn) return [X.fn];
    for (var Z = 0, Q = X.length, J = new Array(Q); Z < Q; Z++) J[Z] = X[Z].fn;
    return J;
  };
  b0.prototype.listenerCount = function $(W) {
    var Y = x0 ? x0 + W : W,
      X = this._events[Y];
    if (!X) return 0;
    if (X.fn) return 1;
    return X.length;
  };
  b0.prototype.emit = function $(W, Y, X, Z, Q, J) {
    var q = x0 ? x0 + W : W;
    if (!this._events[q]) return false;
    var F = this._events[q],
      D = arguments.length,
      B,
      K;
    if (F.fn) {
      if (F.once) this.removeListener(W, F.fn, undefined, true);
      switch (D) {
        case 1:
          return F.fn.call(F.context), true;
        case 2:
          return F.fn.call(F.context, Y), true;
        case 3:
          return F.fn.call(F.context, Y, X), true;
        case 4:
          return F.fn.call(F.context, Y, X, Z), true;
        case 5:
          return F.fn.call(F.context, Y, X, Z, Q), true;
        case 6:
          return F.fn.call(F.context, Y, X, Z, Q, J), true;
      }
      for (K = 1, B = new Array(D - 1); K < D; K++) B[K - 1] = arguments[K];
      F.fn.apply(F.context, B);
    } else {
      var I = F.length,
        w;
      for (K = 0; K < I; K++) {
        if (F[K].once) this.removeListener(W, F[K].fn, undefined, true);
        switch (D) {
          case 1:
            F[K].fn.call(F[K].context);
            break;
          case 2:
            F[K].fn.call(F[K].context, Y);
            break;
          case 3:
            F[K].fn.call(F[K].context, Y, X);
            break;
          case 4:
            F[K].fn.call(F[K].context, Y, X, Z);
            break;
          default:
            if (!B)
              for (w = 1, B = new Array(D - 1); w < D; w++)
                B[w - 1] = arguments[w];
            F[K].fn.apply(F[K].context, B);
        }
      }
    }
    return true;
  };
  b0.prototype.on = function $(W, Y, X) {
    return L6(this, W, Y, X, false);
  };
  b0.prototype.once = function $(W, Y, X) {
    return L6(this, W, Y, X, true);
  };
  b0.prototype.removeListener = function $(W, Y, X, Z) {
    var Q = x0 ? x0 + W : W;
    if (!this._events[Q]) return this;
    if (!Y) return B$(this, Q), this;
    var J = this._events[Q];
    if (J.fn) {
      if (J.fn === Y && (!Z || J.once) && (!X || J.context === X)) B$(this, Q);
    } else {
      for (var q = 0, F = [], D = J.length; q < D; q++)
        if (J[q].fn !== Y || (Z && !J[q].once) || (X && J[q].context !== X))
          F.push(J[q]);
      if (F.length) this._events[Q] = F.length === 1 ? F[0] : F;
      else B$(this, Q);
    }
    return this;
  };
  b0.prototype.removeAllListeners = function $(W) {
    var Y;
    if (W) {
      if (((Y = x0 ? x0 + W : W), this._events[Y])) B$(this, Y);
    } else (this._events = new l1()), (this._eventsCount = 0);
    return this;
  };
  b0.prototype.off = b0.prototype.removeListener;
  b0.prototype.addListener = b0.prototype.on;
  b0.prefixed = x0;
  b0.EventEmitter = b0;
  if (typeof t$ !== "undefined") t$.exports = b0;
});
var k0 = H0((k6) => {
  var ZX = function ($) {
      return A$($) && Symbol.asyncIterator in $;
    },
    QX = function ($) {
      return A$($) && Symbol.iterator in $;
    },
    JX = function ($) {
      return ArrayBuffer.isView($);
    },
    zX = function ($) {
      return $ instanceof Promise;
    },
    HX = function ($) {
      return $ instanceof Uint8Array;
    },
    qX = function ($) {
      return $ instanceof Date && Number.isFinite($.getTime());
    },
    MX = function ($, W) {
      return W in $;
    },
    NX = function ($) {
      return A$($) && V6($.constructor) && $.constructor.name === "Object";
    },
    A$ = function ($) {
      return $ !== null && typeof $ === "object";
    },
    UX = function ($) {
      return Array.isArray($) && !ArrayBuffer.isView($);
    },
    R6 = function ($) {
      return $ === undefined;
    },
    G6 = function ($) {
      return $ === null;
    },
    b6 = function ($) {
      return typeof $ === "boolean";
    },
    s$ = function ($) {
      return typeof $ === "number";
    },
    FX = function ($) {
      return s$($) && Number.isInteger($);
    },
    _6 = function ($) {
      return typeof $ === "bigint";
    },
    E6 = function ($) {
      return typeof $ === "string";
    },
    V6 = function ($) {
      return typeof $ === "function";
    },
    x6 = function ($) {
      return typeof $ === "symbol";
    },
    BX = function ($) {
      return _6($) || b6($) || G6($) || s$($) || E6($) || x6($) || R6($);
    };
  Object.defineProperty(k6, "__esModule", { value: true });
  k6.IsValueType =
    k6.IsSymbol =
    k6.IsFunction =
    k6.IsString =
    k6.IsBigInt =
    k6.IsInteger =
    k6.IsNumber =
    k6.IsBoolean =
    k6.IsNull =
    k6.IsUndefined =
    k6.IsArray =
    k6.IsObject =
    k6.IsPlainObject =
    k6.HasPropertyKey =
    k6.IsDate =
    k6.IsUint8Array =
    k6.IsPromise =
    k6.IsTypedArray =
    k6.IsIterator =
    k6.IsAsyncIterator =
      undefined;
  k6.IsAsyncIterator = ZX;
  k6.IsIterator = QX;
  k6.IsTypedArray = JX;
  k6.IsPromise = zX;
  k6.IsUint8Array = HX;
  k6.IsDate = qX;
  k6.HasPropertyKey = MX;
  k6.IsPlainObject = NX;
  k6.IsObject = A$;
  k6.IsArray = UX;
  k6.IsUndefined = R6;
  k6.IsNull = G6;
  k6.IsBoolean = b6;
  k6.IsNumber = s$;
  k6.IsInteger = FX;
  k6.IsBigInt = _6;
  k6.IsString = E6;
  k6.IsFunction = V6;
  k6.IsSymbol = x6;
  k6.IsValueType = BX;
});
var f0 = H0((y6) => {
  Object.defineProperty(y6, "__esModule", { value: true });
  y6.Type =
    y6.JsonType =
    y6.JavaScriptTypeBuilder =
    y6.JsonTypeBuilder =
    y6.TypeBuilder =
    y6.TypeBuilderError =
    y6.TransformEncodeBuilder =
    y6.TransformDecodeBuilder =
    y6.TemplateLiteralDslParser =
    y6.TemplateLiteralGenerator =
    y6.TemplateLiteralGeneratorError =
    y6.TemplateLiteralFinite =
    y6.TemplateLiteralFiniteError =
    y6.TemplateLiteralParser =
    y6.TemplateLiteralParserError =
    y6.TemplateLiteralResolver =
    y6.TemplateLiteralPattern =
    y6.TemplateLiteralPatternError =
    y6.UnionResolver =
    y6.KeyArrayResolver =
    y6.KeyArrayResolverError =
    y6.KeyResolver =
    y6.ObjectMap =
    y6.Intrinsic =
    y6.IndexedAccessor =
    y6.TypeClone =
    y6.TypeExtends =
    y6.TypeExtendsResult =
    y6.TypeExtendsError =
    y6.ExtendsUndefined =
    y6.TypeGuard =
    y6.TypeGuardUnknownTypeError =
    y6.ValueGuard =
    y6.FormatRegistry =
    y6.TypeBoxError =
    y6.TypeRegistry =
    y6.PatternStringExact =
    y6.PatternNumberExact =
    y6.PatternBooleanExact =
    y6.PatternString =
    y6.PatternNumber =
    y6.PatternBoolean =
    y6.Kind =
    y6.Hint =
    y6.Optional =
    y6.Readonly =
    y6.Transform =
      undefined;
  y6.Transform = Symbol.for("TypeBox.Transform");
  y6.Readonly = Symbol.for("TypeBox.Readonly");
  y6.Optional = Symbol.for("TypeBox.Optional");
  y6.Hint = Symbol.for("TypeBox.Hint");
  y6.Kind = Symbol.for("TypeBox.Kind");
  y6.PatternBoolean = "(true|false)";
  y6.PatternNumber = "(0|[1-9][0-9]*)";
  y6.PatternString = "(.*)";
  y6.PatternBooleanExact = `^${y6.PatternBoolean}$`;
  y6.PatternNumberExact = `^${y6.PatternNumber}$`;
  y6.PatternStringExact = `^${y6.PatternString}$`;
  var r$;
  (function ($) {
    const W = new Map();
    function Y() {
      return new Map(W);
    }
    $.Entries = Y;
    function X() {
      return W.clear();
    }
    $.Clear = X;
    function Z(F) {
      return W.delete(F);
    }
    $.Delete = Z;
    function Q(F) {
      return W.has(F);
    }
    $.Has = Q;
    function J(F, D) {
      W.set(F, D);
    }
    $.Set = J;
    function q(F) {
      return W.get(F);
    }
    $.Get = q;
  })(r$ || (y6.TypeRegistry = r$ = {}));

  class s0 extends Error {
    constructor($) {
      super($);
    }
  }
  y6.TypeBoxError = s0;
  var f6;
  (function ($) {
    const W = new Map();
    function Y() {
      return new Map(W);
    }
    $.Entries = Y;
    function X() {
      return W.clear();
    }
    $.Clear = X;
    function Z(F) {
      return W.delete(F);
    }
    $.Delete = Z;
    function Q(F) {
      return W.has(F);
    }
    $.Has = Q;
    function J(F, D) {
      W.set(F, D);
    }
    $.Set = J;
    function q(F) {
      return W.get(F);
    }
    $.Get = q;
  })(f6 || (y6.FormatRegistry = f6 = {}));
  var V;
  (function ($) {
    function W(D) {
      return Array.isArray(D);
    }
    $.IsArray = W;
    function Y(D) {
      return typeof D === "bigint";
    }
    $.IsBigInt = Y;
    function X(D) {
      return typeof D === "boolean";
    }
    $.IsBoolean = X;
    function Z(D) {
      return D === null;
    }
    $.IsNull = Z;
    function Q(D) {
      return typeof D === "number";
    }
    $.IsNumber = Q;
    function J(D) {
      return typeof D === "object" && D !== null;
    }
    $.IsObject = J;
    function q(D) {
      return typeof D === "string";
    }
    $.IsString = q;
    function F(D) {
      return D === undefined;
    }
    $.IsUndefined = F;
  })(V || (y6.ValueGuard = V = {}));

  class d6 extends s0 {}
  y6.TypeGuardUnknownTypeError = d6;
  var A;
  (function ($) {
    function W(M) {
      try {
        return new RegExp(M), true;
      } catch {
        return false;
      }
    }
    function Y(M) {
      if (!V.IsString(M)) return false;
      for (let a = 0; a < M.length; a++) {
        const O0 = M.charCodeAt(a);
        if ((O0 >= 7 && O0 <= 13) || O0 === 27 || O0 === 127) return false;
      }
      return true;
    }
    function X(M) {
      return J(M) || Q0(M);
    }
    function Z(M) {
      return V.IsUndefined(M) || V.IsBigInt(M);
    }
    function Q(M) {
      return V.IsUndefined(M) || V.IsNumber(M);
    }
    function J(M) {
      return V.IsUndefined(M) || V.IsBoolean(M);
    }
    function q(M) {
      return V.IsUndefined(M) || V.IsString(M);
    }
    function F(M) {
      return V.IsUndefined(M) || (V.IsString(M) && Y(M) && W(M));
    }
    function D(M) {
      return V.IsUndefined(M) || (V.IsString(M) && Y(M));
    }
    function B(M) {
      return V.IsUndefined(M) || Q0(M);
    }
    function K(M) {
      return b(M, "Any") && q(M.$id);
    }
    $.TAny = K;
    function I(M) {
      return (
        b(M, "Array") &&
        M.type === "array" &&
        q(M.$id) &&
        Q0(M.items) &&
        Q(M.minItems) &&
        Q(M.maxItems) &&
        J(M.uniqueItems) &&
        B(M.contains) &&
        Q(M.minContains) &&
        Q(M.maxContains)
      );
    }
    $.TArray = I;
    function w(M) {
      return (
        b(M, "AsyncIterator") &&
        M.type === "AsyncIterator" &&
        q(M.$id) &&
        Q0(M.items)
      );
    }
    $.TAsyncIterator = w;
    function U(M) {
      return (
        b(M, "BigInt") &&
        M.type === "bigint" &&
        q(M.$id) &&
        Z(M.exclusiveMaximum) &&
        Z(M.exclusiveMinimum) &&
        Z(M.maximum) &&
        Z(M.minimum) &&
        Z(M.multipleOf)
      );
    }
    $.TBigInt = U;
    function P(M) {
      return b(M, "Boolean") && M.type === "boolean" && q(M.$id);
    }
    $.TBoolean = P;
    function N(M) {
      return (
        b(M, "Constructor") &&
        M.type === "Constructor" &&
        q(M.$id) &&
        V.IsArray(M.parameters) &&
        M.parameters.every((a) => Q0(a)) &&
        Q0(M.returns)
      );
    }
    $.TConstructor = N;
    function O(M) {
      return (
        b(M, "Date") &&
        M.type === "Date" &&
        q(M.$id) &&
        Q(M.exclusiveMaximumTimestamp) &&
        Q(M.exclusiveMinimumTimestamp) &&
        Q(M.maximumTimestamp) &&
        Q(M.minimumTimestamp) &&
        Q(M.multipleOfTimestamp)
      );
    }
    $.TDate = O;
    function S(M) {
      return (
        b(M, "Function") &&
        M.type === "Function" &&
        q(M.$id) &&
        V.IsArray(M.parameters) &&
        M.parameters.every((a) => Q0(a)) &&
        Q0(M.returns)
      );
    }
    $.TFunction = S;
    function R(M) {
      return (
        b(M, "Integer") &&
        M.type === "integer" &&
        q(M.$id) &&
        Q(M.exclusiveMaximum) &&
        Q(M.exclusiveMinimum) &&
        Q(M.maximum) &&
        Q(M.minimum) &&
        Q(M.multipleOf)
      );
    }
    $.TInteger = R;
    function _(M) {
      return (
        b(M, "Intersect") &&
        (V.IsString(M.type) && M.type !== "object" ? false : true) &&
        V.IsArray(M.allOf) &&
        M.allOf.every((a) => Q0(a) && !W1(a)) &&
        q(M.type) &&
        (J(M.unevaluatedProperties) || B(M.unevaluatedProperties)) &&
        q(M.$id)
      );
    }
    $.TIntersect = _;
    function G(M) {
      return (
        b(M, "Iterator") && M.type === "Iterator" && q(M.$id) && Q0(M.items)
      );
    }
    $.TIterator = G;
    function b(M, a) {
      return l(M) && M[y6.Kind] === a;
    }
    $.TKindOf = b;
    function l(M) {
      return V.IsObject(M) && y6.Kind in M && V.IsString(M[y6.Kind]);
    }
    $.TKind = l;
    function g(M) {
      return M0(M) && V.IsString(M.const);
    }
    $.TLiteralString = g;
    function t(M) {
      return M0(M) && V.IsNumber(M.const);
    }
    $.TLiteralNumber = t;
    function N0(M) {
      return M0(M) && V.IsBoolean(M.const);
    }
    $.TLiteralBoolean = N0;
    function M0(M) {
      return (
        b(M, "Literal") &&
        q(M.$id) &&
        (V.IsBoolean(M.const) || V.IsNumber(M.const) || V.IsString(M.const))
      );
    }
    $.TLiteral = M0;
    function n(M) {
      return (
        b(M, "Never") &&
        V.IsObject(M.not) &&
        Object.getOwnPropertyNames(M.not).length === 0
      );
    }
    $.TNever = n;
    function Y0(M) {
      return b(M, "Not") && Q0(M.not);
    }
    $.TNot = Y0;
    function V0(M) {
      return b(M, "Null") && M.type === "null" && q(M.$id);
    }
    $.TNull = V0;
    function c(M) {
      return (
        b(M, "Number") &&
        M.type === "number" &&
        q(M.$id) &&
        Q(M.exclusiveMaximum) &&
        Q(M.exclusiveMinimum) &&
        Q(M.maximum) &&
        Q(M.minimum) &&
        Q(M.multipleOf)
      );
    }
    $.TNumber = c;
    function T(M) {
      return (
        b(M, "Object") &&
        M.type === "object" &&
        q(M.$id) &&
        V.IsObject(M.properties) &&
        X(M.additionalProperties) &&
        Q(M.minProperties) &&
        Q(M.maxProperties) &&
        Object.entries(M.properties).every(([a, O0]) => Y(a) && Q0(O0))
      );
    }
    $.TObject = T;
    function i(M) {
      return b(M, "Promise") && M.type === "Promise" && q(M.$id) && Q0(M.item);
    }
    $.TPromise = i;
    function x(M) {
      return (
        b(M, "Record") &&
        M.type === "object" &&
        q(M.$id) &&
        X(M.additionalProperties) &&
        V.IsObject(M.patternProperties) &&
        ((a) => {
          const O0 = Object.getOwnPropertyNames(a.patternProperties);
          return (
            O0.length === 1 &&
            W(O0[0]) &&
            V.IsObject(a.patternProperties) &&
            Q0(a.patternProperties[O0[0]])
          );
        })(M)
      );
    }
    $.TRecord = x;
    function s(M) {
      return V.IsObject(M) && y6.Hint in M && M[y6.Hint] === "Recursive";
    }
    $.TRecursive = s;
    function K0(M) {
      return b(M, "Ref") && q(M.$id) && V.IsString(M.$ref);
    }
    $.TRef = K0;
    function F0(M) {
      return (
        b(M, "String") &&
        M.type === "string" &&
        q(M.$id) &&
        Q(M.minLength) &&
        Q(M.maxLength) &&
        F(M.pattern) &&
        D(M.format)
      );
    }
    $.TString = F0;
    function v0(M) {
      return b(M, "Symbol") && M.type === "symbol" && q(M.$id);
    }
    $.TSymbol = v0;
    function U0(M) {
      return (
        b(M, "TemplateLiteral") &&
        M.type === "string" &&
        V.IsString(M.pattern) &&
        M.pattern[0] === "^" &&
        M.pattern[M.pattern.length - 1] === "$"
      );
    }
    $.TTemplateLiteral = U0;
    function $1(M) {
      return b(M, "This") && q(M.$id) && V.IsString(M.$ref);
    }
    $.TThis = $1;
    function W1(M) {
      return V.IsObject(M) && y6.Transform in M;
    }
    $.TTransform = W1;
    function q0(M) {
      return (
        b(M, "Tuple") &&
        M.type === "array" &&
        q(M.$id) &&
        V.IsNumber(M.minItems) &&
        V.IsNumber(M.maxItems) &&
        M.minItems === M.maxItems &&
        ((V.IsUndefined(M.items) &&
          V.IsUndefined(M.additionalItems) &&
          M.minItems === 0) ||
          (V.IsArray(M.items) && M.items.every((a) => Q0(a))))
      );
    }
    $.TTuple = q0;
    function G1(M) {
      return b(M, "Undefined") && M.type === "undefined" && q(M.$id);
    }
    $.TUndefined = G1;
    function L(M) {
      return E(M) && M.anyOf.every((a) => g(a) || t(a));
    }
    $.TUnionLiteral = L;
    function E(M) {
      return (
        b(M, "Union") &&
        q(M.$id) &&
        V.IsObject(M) &&
        V.IsArray(M.anyOf) &&
        M.anyOf.every((a) => Q0(a))
      );
    }
    $.TUnion = E;
    function j(M) {
      return (
        b(M, "Uint8Array") &&
        M.type === "Uint8Array" &&
        q(M.$id) &&
        Q(M.minByteLength) &&
        Q(M.maxByteLength)
      );
    }
    $.TUint8Array = j;
    function m(M) {
      return b(M, "Unknown") && q(M.$id);
    }
    $.TUnknown = m;
    function d(M) {
      return b(M, "Unsafe");
    }
    $.TUnsafe = d;
    function y(M) {
      return b(M, "Void") && M.type === "void" && q(M.$id);
    }
    $.TVoid = y;
    function Z0(M) {
      return V.IsObject(M) && M[y6.Readonly] === "Readonly";
    }
    $.TReadonly = Z0;
    function P0(M) {
      return V.IsObject(M) && M[y6.Optional] === "Optional";
    }
    $.TOptional = P0;
    function Q0(M) {
      return (
        V.IsObject(M) &&
        (K(M) ||
          I(M) ||
          P(M) ||
          U(M) ||
          w(M) ||
          N(M) ||
          O(M) ||
          S(M) ||
          R(M) ||
          _(M) ||
          G(M) ||
          M0(M) ||
          n(M) ||
          Y0(M) ||
          V0(M) ||
          c(M) ||
          T(M) ||
          i(M) ||
          x(M) ||
          K0(M) ||
          F0(M) ||
          v0(M) ||
          U0(M) ||
          $1(M) ||
          q0(M) ||
          G1(M) ||
          E(M) ||
          j(M) ||
          m(M) ||
          d(M) ||
          y(M) ||
          (l(M) && r$.Has(M[y6.Kind])))
      );
    }
    $.TSchema = Q0;
  })(A || (y6.TypeGuard = A = {}));
  var T6;
  (function ($) {
    function W(Y) {
      return Y[y6.Kind] === "Intersect"
        ? Y.allOf.every((X) => W(X))
        : Y[y6.Kind] === "Union"
        ? Y.anyOf.some((X) => W(X))
        : Y[y6.Kind] === "Undefined"
        ? true
        : Y[y6.Kind] === "Not"
        ? !W(Y.not)
        : false;
    }
    $.Check = W;
  })(T6 || (y6.ExtendsUndefined = T6 = {}));

  class W8 extends s0 {}
  y6.TypeExtendsError = W8;
  var C;
  (function ($) {
    ($[($.Union = 0)] = "Union"),
      ($[($.True = 1)] = "True"),
      ($[($.False = 2)] = "False");
  })(C || (y6.TypeExtendsResult = C = {}));
  var D1;
  (function ($) {
    function W(z) {
      return z === C.False ? z : C.True;
    }
    function Y(z) {
      throw new W8(z);
    }
    function X(z) {
      return (
        A.TNever(z) ||
        A.TIntersect(z) ||
        A.TUnion(z) ||
        A.TUnknown(z) ||
        A.TAny(z)
      );
    }
    function Z(z, H) {
      return A.TNever(H)
        ? b(z, H)
        : A.TIntersect(H)
        ? S(z, H)
        : A.TUnion(H)
        ? c$(z, H)
        : A.TUnknown(H)
        ? D6(z, H)
        : A.TAny(H)
        ? Q(z, H)
        : Y("StructuralRight");
    }
    function Q(z, H) {
      return C.True;
    }
    function J(z, H) {
      return A.TIntersect(H)
        ? S(z, H)
        : A.TUnion(H) && H.anyOf.some((X0) => A.TAny(X0) || A.TUnknown(X0))
        ? C.True
        : A.TUnion(H)
        ? C.Union
        : A.TUnknown(H)
        ? C.True
        : A.TAny(H)
        ? C.True
        : C.Union;
    }
    function q(z, H) {
      return A.TUnknown(z)
        ? C.False
        : A.TAny(z)
        ? C.Union
        : A.TNever(z)
        ? C.True
        : C.False;
    }
    function F(z, H) {
      return A.TObject(H) && U0(H)
        ? C.True
        : X(H)
        ? Z(z, H)
        : !A.TArray(H)
        ? C.False
        : W(z0(z.items, H.items));
    }
    function D(z, H) {
      return X(H)
        ? Z(z, H)
        : !A.TAsyncIterator(H)
        ? C.False
        : W(z0(z.items, H.items));
    }
    function B(z, H) {
      return X(H)
        ? Z(z, H)
        : A.TObject(H)
        ? q0(z, H)
        : A.TRecord(H)
        ? m(z, H)
        : A.TBigInt(H)
        ? C.True
        : C.False;
    }
    function K(z, H) {
      return A.TLiteral(z) && V.IsBoolean(z.const)
        ? C.True
        : A.TBoolean(z)
        ? C.True
        : C.False;
    }
    function I(z, H) {
      return X(H)
        ? Z(z, H)
        : A.TObject(H)
        ? q0(z, H)
        : A.TRecord(H)
        ? m(z, H)
        : A.TBoolean(H)
        ? C.True
        : C.False;
    }
    function w(z, H) {
      return X(H)
        ? Z(z, H)
        : A.TObject(H)
        ? q0(z, H)
        : !A.TConstructor(H)
        ? C.False
        : z.parameters.length > H.parameters.length
        ? C.False
        : !z.parameters.every(
            (X0, u0) => W(z0(H.parameters[u0], X0)) === C.True
          )
        ? C.False
        : W(z0(z.returns, H.returns));
    }
    function U(z, H) {
      return X(H)
        ? Z(z, H)
        : A.TObject(H)
        ? q0(z, H)
        : A.TRecord(H)
        ? m(z, H)
        : A.TDate(H)
        ? C.True
        : C.False;
    }
    function P(z, H) {
      return X(H)
        ? Z(z, H)
        : A.TObject(H)
        ? q0(z, H)
        : !A.TFunction(H)
        ? C.False
        : z.parameters.length > H.parameters.length
        ? C.False
        : !z.parameters.every(
            (X0, u0) => W(z0(H.parameters[u0], X0)) === C.True
          )
        ? C.False
        : W(z0(z.returns, H.returns));
    }
    function N(z, H) {
      return A.TLiteral(z) && V.IsNumber(z.const)
        ? C.True
        : A.TNumber(z) || A.TInteger(z)
        ? C.True
        : C.False;
    }
    function O(z, H) {
      return A.TInteger(H) || A.TNumber(H)
        ? C.True
        : X(H)
        ? Z(z, H)
        : A.TObject(H)
        ? q0(z, H)
        : A.TRecord(H)
        ? m(z, H)
        : C.False;
    }
    function S(z, H) {
      return H.allOf.every((X0) => z0(z, X0) === C.True) ? C.True : C.False;
    }
    function R(z, H) {
      return z.allOf.some((X0) => z0(X0, H) === C.True) ? C.True : C.False;
    }
    function _(z, H) {
      return X(H)
        ? Z(z, H)
        : !A.TIterator(H)
        ? C.False
        : W(z0(z.items, H.items));
    }
    function G(z, H) {
      return A.TLiteral(H) && H.const === z.const
        ? C.True
        : X(H)
        ? Z(z, H)
        : A.TObject(H)
        ? q0(z, H)
        : A.TRecord(H)
        ? m(z, H)
        : A.TString(H)
        ? y(z, H)
        : A.TNumber(H)
        ? M0(z, H)
        : A.TInteger(H)
        ? N(z, H)
        : A.TBoolean(H)
        ? K(z, H)
        : C.False;
    }
    function b(z, H) {
      return C.False;
    }
    function l(z, H) {
      return C.True;
    }
    function g(z) {
      let [H, X0] = [z, 0];
      while (true) {
        if (!A.TNot(H)) break;
        (H = H.not), (X0 += 1);
      }
      return X0 % 2 === 0 ? H : y6.Type.Unknown();
    }
    function t(z, H) {
      return A.TNot(z)
        ? z0(g(z), H)
        : A.TNot(H)
        ? z0(z, g(H))
        : Y("Invalid fallthrough for Not");
    }
    function N0(z, H) {
      return X(H)
        ? Z(z, H)
        : A.TObject(H)
        ? q0(z, H)
        : A.TRecord(H)
        ? m(z, H)
        : A.TNull(H)
        ? C.True
        : C.False;
    }
    function M0(z, H) {
      return A.TLiteralNumber(z)
        ? C.True
        : A.TNumber(z) || A.TInteger(z)
        ? C.True
        : C.False;
    }
    function n(z, H) {
      return X(H)
        ? Z(z, H)
        : A.TObject(H)
        ? q0(z, H)
        : A.TRecord(H)
        ? m(z, H)
        : A.TInteger(H) || A.TNumber(H)
        ? C.True
        : C.False;
    }
    function Y0(z, H) {
      return Object.getOwnPropertyNames(z.properties).length === H;
    }
    function V0(z) {
      return U0(z);
    }
    function c(z) {
      return (
        Y0(z, 0) ||
        (Y0(z, 1) &&
          "description" in z.properties &&
          A.TUnion(z.properties.description) &&
          z.properties.description.anyOf.length === 2 &&
          ((A.TString(z.properties.description.anyOf[0]) &&
            A.TUndefined(z.properties.description.anyOf[1])) ||
            (A.TString(z.properties.description.anyOf[1]) &&
              A.TUndefined(z.properties.description.anyOf[0]))))
      );
    }
    function T(z) {
      return Y0(z, 0);
    }
    function i(z) {
      return Y0(z, 0);
    }
    function x(z) {
      return Y0(z, 0);
    }
    function s(z) {
      return Y0(z, 0);
    }
    function K0(z) {
      return U0(z);
    }
    function F0(z) {
      const H = y6.Type.Number();
      return (
        Y0(z, 0) ||
        (Y0(z, 1) &&
          "length" in z.properties &&
          W(z0(z.properties.length, H)) === C.True)
      );
    }
    function v0(z) {
      return Y0(z, 0);
    }
    function U0(z) {
      const H = y6.Type.Number();
      return (
        Y0(z, 0) ||
        (Y0(z, 1) &&
          "length" in z.properties &&
          W(z0(z.properties.length, H)) === C.True)
      );
    }
    function $1(z) {
      const H = y6.Type.Function([y6.Type.Any()], y6.Type.Any());
      return (
        Y0(z, 0) ||
        (Y0(z, 1) &&
          "then" in z.properties &&
          W(z0(z.properties.then, H)) === C.True)
      );
    }
    function W1(z, H) {
      return z0(z, H) === C.False
        ? C.False
        : A.TOptional(z) && !A.TOptional(H)
        ? C.False
        : C.True;
    }
    function q0(z, H) {
      return A.TUnknown(z)
        ? C.False
        : A.TAny(z)
        ? C.Union
        : A.TNever(z) ||
          (A.TLiteralString(z) && V0(H)) ||
          (A.TLiteralNumber(z) && T(H)) ||
          (A.TLiteralBoolean(z) && i(H)) ||
          (A.TSymbol(z) && c(H)) ||
          (A.TBigInt(z) && x(H)) ||
          (A.TString(z) && V0(H)) ||
          (A.TSymbol(z) && c(H)) ||
          (A.TNumber(z) && T(H)) ||
          (A.TInteger(z) && T(H)) ||
          (A.TBoolean(z) && i(H)) ||
          (A.TUint8Array(z) && K0(H)) ||
          (A.TDate(z) && s(H)) ||
          (A.TConstructor(z) && v0(H)) ||
          (A.TFunction(z) && F0(H))
        ? C.True
        : A.TRecord(z) && A.TString(E(z))
        ? (() => {
            return H[y6.Hint] === "Record" ? C.True : C.False;
          })()
        : A.TRecord(z) && A.TNumber(E(z))
        ? (() => {
            return Y0(H, 0) ? C.True : C.False;
          })()
        : C.False;
    }
    function G1(z, H) {
      return X(H)
        ? Z(z, H)
        : A.TRecord(H)
        ? m(z, H)
        : !A.TObject(H)
        ? C.False
        : (() => {
            for (let X0 of Object.getOwnPropertyNames(H.properties)) {
              if (!(X0 in z.properties)) return C.False;
              if (W1(z.properties[X0], H.properties[X0]) === C.False)
                return C.False;
            }
            return C.True;
          })();
    }
    function L(z, H) {
      return X(H)
        ? Z(z, H)
        : A.TObject(H) && $1(H)
        ? C.True
        : !A.TPromise(H)
        ? C.False
        : W(z0(z.item, H.item));
    }
    function E(z) {
      return y6.PatternNumberExact in z.patternProperties
        ? y6.Type.Number()
        : y6.PatternStringExact in z.patternProperties
        ? y6.Type.String()
        : Y("Unknown record key pattern");
    }
    function j(z) {
      return y6.PatternNumberExact in z.patternProperties
        ? z.patternProperties[y6.PatternNumberExact]
        : y6.PatternStringExact in z.patternProperties
        ? z.patternProperties[y6.PatternStringExact]
        : Y("Unable to get record value schema");
    }
    function m(z, H) {
      const [X0, u0] = [E(H), j(H)];
      return A.TLiteralString(z) && A.TNumber(X0) && W(z0(z, u0)) === C.True
        ? C.True
        : A.TUint8Array(z) && A.TNumber(X0)
        ? z0(z, u0)
        : A.TString(z) && A.TNumber(X0)
        ? z0(z, u0)
        : A.TArray(z) && A.TNumber(X0)
        ? z0(z, u0)
        : A.TObject(z)
        ? (() => {
            for (let sY of Object.getOwnPropertyNames(z.properties))
              if (W1(u0, z.properties[sY]) === C.False) return C.False;
            return C.True;
          })()
        : C.False;
    }
    function d(z, H) {
      return X(H)
        ? Z(z, H)
        : A.TObject(H)
        ? q0(z, H)
        : !A.TRecord(H)
        ? C.False
        : z0(j(z), j(H));
    }
    function y(z, H) {
      return A.TLiteral(z) && V.IsString(z.const)
        ? C.True
        : A.TString(z)
        ? C.True
        : C.False;
    }
    function Z0(z, H) {
      return X(H)
        ? Z(z, H)
        : A.TObject(H)
        ? q0(z, H)
        : A.TRecord(H)
        ? m(z, H)
        : A.TString(H)
        ? C.True
        : C.False;
    }
    function P0(z, H) {
      return X(H)
        ? Z(z, H)
        : A.TObject(H)
        ? q0(z, H)
        : A.TRecord(H)
        ? m(z, H)
        : A.TSymbol(H)
        ? C.True
        : C.False;
    }
    function Q0(z, H) {
      return A.TTemplateLiteral(z)
        ? z0(X1.Resolve(z), H)
        : A.TTemplateLiteral(H)
        ? z0(z, X1.Resolve(H))
        : Y("Invalid fallthrough for TemplateLiteral");
    }
    function M(z, H) {
      return (
        A.TArray(H) &&
        z.items !== undefined &&
        z.items.every((X0) => z0(X0, H.items) === C.True)
      );
    }
    function a(z, H) {
      return A.TNever(z)
        ? C.True
        : A.TUnknown(z)
        ? C.False
        : A.TAny(z)
        ? C.Union
        : C.False;
    }
    function O0(z, H) {
      return X(H)
        ? Z(z, H)
        : A.TObject(H) && U0(H)
        ? C.True
        : A.TArray(H) && M(z, H)
        ? C.True
        : !A.TTuple(H)
        ? C.False
        : (V.IsUndefined(z.items) && !V.IsUndefined(H.items)) ||
          (!V.IsUndefined(z.items) && V.IsUndefined(H.items))
        ? C.False
        : V.IsUndefined(z.items) && !V.IsUndefined(H.items)
        ? C.True
        : z.items.every((X0, u0) => z0(X0, H.items[u0]) === C.True)
        ? C.True
        : C.False;
    }
    function o$(z, H) {
      return X(H)
        ? Z(z, H)
        : A.TObject(H)
        ? q0(z, H)
        : A.TRecord(H)
        ? m(z, H)
        : A.TUint8Array(H)
        ? C.True
        : C.False;
    }
    function h$(z, H) {
      return X(H)
        ? Z(z, H)
        : A.TObject(H)
        ? q0(z, H)
        : A.TRecord(H)
        ? m(z, H)
        : A.TVoid(H)
        ? cY(z, H)
        : A.TUndefined(H)
        ? C.True
        : C.False;
    }
    function c$(z, H) {
      return H.anyOf.some((X0) => z0(z, X0) === C.True) ? C.True : C.False;
    }
    function oY(z, H) {
      return z.anyOf.every((X0) => z0(X0, H) === C.True) ? C.True : C.False;
    }
    function D6(z, H) {
      return C.True;
    }
    function hY(z, H) {
      return A.TNever(H)
        ? b(z, H)
        : A.TIntersect(H)
        ? S(z, H)
        : A.TUnion(H)
        ? c$(z, H)
        : A.TAny(H)
        ? Q(z, H)
        : A.TString(H)
        ? y(z, H)
        : A.TNumber(H)
        ? M0(z, H)
        : A.TInteger(H)
        ? N(z, H)
        : A.TBoolean(H)
        ? K(z, H)
        : A.TArray(H)
        ? q(z, H)
        : A.TTuple(H)
        ? a(z, H)
        : A.TObject(H)
        ? q0(z, H)
        : A.TUnknown(H)
        ? C.True
        : C.False;
    }
    function cY(z, H) {
      return A.TUndefined(z) ? C.True : A.TUndefined(z) ? C.True : C.False;
    }
    function lY(z, H) {
      return A.TIntersect(H)
        ? S(z, H)
        : A.TUnion(H)
        ? c$(z, H)
        : A.TUnknown(H)
        ? D6(z, H)
        : A.TAny(H)
        ? Q(z, H)
        : A.TObject(H)
        ? q0(z, H)
        : A.TVoid(H)
        ? C.True
        : C.False;
    }
    function z0(z, H) {
      return A.TTemplateLiteral(z) || A.TTemplateLiteral(H)
        ? Q0(z, H)
        : A.TNot(z) || A.TNot(H)
        ? t(z, H)
        : A.TAny(z)
        ? J(z, H)
        : A.TArray(z)
        ? F(z, H)
        : A.TBigInt(z)
        ? B(z, H)
        : A.TBoolean(z)
        ? I(z, H)
        : A.TAsyncIterator(z)
        ? D(z, H)
        : A.TConstructor(z)
        ? w(z, H)
        : A.TDate(z)
        ? U(z, H)
        : A.TFunction(z)
        ? P(z, H)
        : A.TInteger(z)
        ? O(z, H)
        : A.TIntersect(z)
        ? R(z, H)
        : A.TIterator(z)
        ? _(z, H)
        : A.TLiteral(z)
        ? G(z, H)
        : A.TNever(z)
        ? l(z, H)
        : A.TNull(z)
        ? N0(z, H)
        : A.TNumber(z)
        ? n(z, H)
        : A.TObject(z)
        ? G1(z, H)
        : A.TRecord(z)
        ? d(z, H)
        : A.TString(z)
        ? Z0(z, H)
        : A.TSymbol(z)
        ? P0(z, H)
        : A.TTuple(z)
        ? O0(z, H)
        : A.TPromise(z)
        ? L(z, H)
        : A.TUint8Array(z)
        ? o$(z, H)
        : A.TUndefined(z)
        ? h$(z, H)
        : A.TUnion(z)
        ? oY(z, H)
        : A.TUnknown(z)
        ? hY(z, H)
        : A.TVoid(z)
        ? lY(z, H)
        : Y(`Unknown left type operand '${z[y6.Kind]}'`);
    }
    function tY(z, H) {
      return z0(z, H);
    }
    $.Extends = tY;
  })(D1 || (y6.TypeExtends = D1 = {}));
  var u;
  (function ($) {
    function W(J) {
      const q = Object.getOwnPropertyNames(J).reduce(
          (D, B) => ({ ...D, [B]: X(J[B]) }),
          {}
        ),
        F = Object.getOwnPropertySymbols(J).reduce(
          (D, B) => ({ ...D, [B]: X(J[B]) }),
          {}
        );
      return { ...q, ...F };
    }
    function Y(J) {
      return J.map((q) => X(q));
    }
    function X(J) {
      return V.IsArray(J) ? Y(J) : V.IsObject(J) ? W(J) : J;
    }
    function Z(J) {
      return J.map((q) => Q(q));
    }
    $.Rest = Z;
    function Q(J, q = {}) {
      return { ...X(J), ...q };
    }
    $.Type = Q;
  })(u || (y6.TypeClone = u = {}));
  var a$;
  (function ($) {
    function W(w) {
      return w.map((U) => {
        const { [y6.Optional]: P, ...N } = u.Type(U);
        return N;
      });
    }
    function Y(w) {
      return w.every((U) => A.TOptional(U));
    }
    function X(w) {
      return w.some((U) => A.TOptional(U));
    }
    function Z(w) {
      return Y(w.allOf) ? y6.Type.Optional(y6.Type.Intersect(W(w.allOf))) : w;
    }
    function Q(w) {
      return X(w.anyOf) ? y6.Type.Optional(y6.Type.Union(W(w.anyOf))) : w;
    }
    function J(w) {
      return w[y6.Kind] === "Intersect"
        ? Z(w)
        : w[y6.Kind] === "Union"
        ? Q(w)
        : w;
    }
    function q(w, U) {
      const P = w.allOf.reduce((N, O) => {
        const S = K(O, U);
        return S[y6.Kind] === "Never" ? N : [...N, S];
      }, []);
      return J(y6.Type.Intersect(P));
    }
    function F(w, U) {
      const P = w.anyOf.map((N) => K(N, U));
      return J(y6.Type.Union(P));
    }
    function D(w, U) {
      const P = w.properties[U];
      return V.IsUndefined(P) ? y6.Type.Never() : y6.Type.Union([P]);
    }
    function B(w, U) {
      const P = w.items;
      if (V.IsUndefined(P)) return y6.Type.Never();
      const N = P[U];
      if (V.IsUndefined(N)) return y6.Type.Never();
      return N;
    }
    function K(w, U) {
      return w[y6.Kind] === "Intersect"
        ? q(w, U)
        : w[y6.Kind] === "Union"
        ? F(w, U)
        : w[y6.Kind] === "Object"
        ? D(w, U)
        : w[y6.Kind] === "Tuple"
        ? B(w, U)
        : y6.Type.Never();
    }
    function I(w, U, P = {}) {
      const N = U.map((O) => K(w, O.toString()));
      return J(y6.Type.Union(N, P));
    }
    $.Resolve = I;
  })(a$ || (y6.IndexedAccessor = a$ = {}));
  var E1;
  (function ($) {
    function W(B) {
      const [K, I] = [B.slice(0, 1), B.slice(1)];
      return `${K.toLowerCase()}${I}`;
    }
    function Y(B) {
      const [K, I] = [B.slice(0, 1), B.slice(1)];
      return `${K.toUpperCase()}${I}`;
    }
    function X(B) {
      return B.toUpperCase();
    }
    function Z(B) {
      return B.toLowerCase();
    }
    function Q(B, K) {
      const I = g1.ParseExact(B.pattern);
      if (!f1.Check(I)) return { ...B, pattern: J(B.pattern, K) };
      const P = [...T1.Generate(I)].map((S) => y6.Type.Literal(S)),
        N = q(P, K),
        O = y6.Type.Union(N);
      return y6.Type.TemplateLiteral([O]);
    }
    function J(B, K) {
      return typeof B === "string"
        ? K === "Uncapitalize"
          ? W(B)
          : K === "Capitalize"
          ? Y(B)
          : K === "Uppercase"
          ? X(B)
          : K === "Lowercase"
          ? Z(B)
          : B
        : B.toString();
    }
    function q(B, K) {
      if (B.length === 0) return [];
      const [I, ...w] = B;
      return [D(I, K), ...q(w, K)];
    }
    function F(B, K) {
      return A.TTemplateLiteral(B)
        ? Q(B, K)
        : A.TUnion(B)
        ? y6.Type.Union(q(B.anyOf, K))
        : A.TLiteral(B)
        ? y6.Type.Literal(J(B.const, K))
        : B;
    }
    function D(B, K) {
      return F(B, K);
    }
    $.Map = D;
  })(E1 || (y6.Intrinsic = E1 = {}));
  var V1;
  (function ($) {
    function W(J, q) {
      return y6.Type.Intersect(
        J.allOf.map((F) => Z(F, q)),
        { ...J }
      );
    }
    function Y(J, q) {
      return y6.Type.Union(
        J.anyOf.map((F) => Z(F, q)),
        { ...J }
      );
    }
    function X(J, q) {
      return q(J);
    }
    function Z(J, q) {
      return J[y6.Kind] === "Intersect"
        ? W(J, q)
        : J[y6.Kind] === "Union"
        ? Y(J, q)
        : J[y6.Kind] === "Object"
        ? X(J, q)
        : J;
    }
    function Q(J, q, F) {
      return { ...Z(u.Type(J), q), ...F };
    }
    $.Map = Q;
  })(V1 || (y6.ObjectMap = V1 = {}));
  var w$;
  (function ($) {
    function W(D) {
      return D[0] === "^" && D[D.length - 1] === "$"
        ? D.slice(1, D.length - 1)
        : D;
    }
    function Y(D, B) {
      return D.allOf.reduce((K, I) => [...K, ...J(I, B)], []);
    }
    function X(D, B) {
      const K = D.anyOf.map((I) => J(I, B));
      return [
        ...K.reduce(
          (I, w) =>
            w.map((U) => (K.every((P) => P.includes(U)) ? I.add(U) : I))[0],
          new Set()
        ),
      ];
    }
    function Z(D, B) {
      return Object.getOwnPropertyNames(D.properties);
    }
    function Q(D, B) {
      return B.includePatterns
        ? Object.getOwnPropertyNames(D.patternProperties)
        : [];
    }
    function J(D, B) {
      return A.TIntersect(D)
        ? Y(D, B)
        : A.TUnion(D)
        ? X(D, B)
        : A.TObject(D)
        ? Z(D, B)
        : A.TRecord(D)
        ? Q(D, B)
        : [];
    }
    function q(D, B) {
      return [...new Set(J(D, B))];
    }
    $.ResolveKeys = q;
    function F(D) {
      return `^(${q(D, { includePatterns: true })
        .map((I) => `(${W(I)})`)
        .join("|")})$`;
    }
    $.ResolvePattern = F;
  })(w$ || (y6.KeyResolver = w$ = {}));

  class Y8 extends s0 {}
  y6.KeyArrayResolverError = Y8;
  var t1;
  (function ($) {
    function W(Y) {
      return Array.isArray(Y)
        ? Y
        : A.TUnionLiteral(Y)
        ? Y.anyOf.map((X) => X.const.toString())
        : A.TLiteral(Y)
        ? [Y.const]
        : A.TTemplateLiteral(Y)
        ? (() => {
            const X = g1.ParseExact(Y.pattern);
            if (!f1.Check(X))
              throw new Y8(
                "Cannot resolve keys from infinite template expression"
              );
            return [...T1.Generate(X)];
          })()
        : [];
    }
    $.Resolve = W;
  })(t1 || (y6.KeyArrayResolver = t1 = {}));
  var e$;
  (function ($) {
    function* W(X) {
      for (let Z of X.anyOf)
        if (Z[y6.Kind] === "Union") yield* W(Z);
        else yield Z;
    }
    function Y(X) {
      return y6.Type.Union([...W(X)], { ...X });
    }
    $.Resolve = Y;
  })(e$ || (y6.UnionResolver = e$ = {}));

  class X8 extends s0 {}
  y6.TemplateLiteralPatternError = X8;
  var D$;
  (function ($) {
    function W(Q) {
      throw new X8(Q);
    }
    function Y(Q) {
      return Q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function X(Q, J) {
      return A.TTemplateLiteral(Q)
        ? Q.pattern.slice(1, Q.pattern.length - 1)
        : A.TUnion(Q)
        ? `(${Q.anyOf.map((q) => X(q, J)).join("|")})`
        : A.TNumber(Q)
        ? `${J}${y6.PatternNumber}`
        : A.TInteger(Q)
        ? `${J}${y6.PatternNumber}`
        : A.TBigInt(Q)
        ? `${J}${y6.PatternNumber}`
        : A.TString(Q)
        ? `${J}${y6.PatternString}`
        : A.TLiteral(Q)
        ? `${J}${Y(Q.const.toString())}`
        : A.TBoolean(Q)
        ? `${J}${y6.PatternBoolean}`
        : W(`Unexpected Kind '${Q[y6.Kind]}'`);
    }
    function Z(Q) {
      return `^${Q.map((J) => X(J, "")).join("")}\$`;
    }
    $.Create = Z;
  })(D$ || (y6.TemplateLiteralPattern = D$ = {}));
  var X1;
  (function ($) {
    function W(Y) {
      const X = g1.ParseExact(Y.pattern);
      if (!f1.Check(X)) return y6.Type.String();
      const Z = [...T1.Generate(X)].map((Q) => y6.Type.Literal(Q));
      return y6.Type.Union(Z);
    }
    $.Resolve = W;
  })(X1 || (y6.TemplateLiteralResolver = X1 = {}));

  class K$ extends s0 {}
  y6.TemplateLiteralParserError = K$;
  var g1;
  (function ($) {
    function W(w, U, P) {
      return w[U] === P && w.charCodeAt(U - 1) !== 92;
    }
    function Y(w, U) {
      return W(w, U, "(");
    }
    function X(w, U) {
      return W(w, U, ")");
    }
    function Z(w, U) {
      return W(w, U, "|");
    }
    function Q(w) {
      if (!(Y(w, 0) && X(w, w.length - 1))) return false;
      let U = 0;
      for (let P = 0; P < w.length; P++) {
        if (Y(w, P)) U += 1;
        if (X(w, P)) U -= 1;
        if (U === 0 && P !== w.length - 1) return false;
      }
      return true;
    }
    function J(w) {
      return w.slice(1, w.length - 1);
    }
    function q(w) {
      let U = 0;
      for (let P = 0; P < w.length; P++) {
        if (Y(w, P)) U += 1;
        if (X(w, P)) U -= 1;
        if (Z(w, P) && U === 0) return true;
      }
      return false;
    }
    function F(w) {
      for (let U = 0; U < w.length; U++) if (Y(w, U)) return true;
      return false;
    }
    function D(w) {
      let [U, P] = [0, 0];
      const N = [];
      for (let S = 0; S < w.length; S++) {
        if (Y(w, S)) U += 1;
        if (X(w, S)) U -= 1;
        if (Z(w, S) && U === 0) {
          const R = w.slice(P, S);
          if (R.length > 0) N.push(K(R));
          P = S + 1;
        }
      }
      const O = w.slice(P);
      if (O.length > 0) N.push(K(O));
      if (N.length === 0) return { type: "const", const: "" };
      if (N.length === 1) return N[0];
      return { type: "or", expr: N };
    }
    function B(w) {
      function U(O, S) {
        if (!Y(O, S))
          throw new K$(
            "TemplateLiteralParser: Index must point to open parens"
          );
        let R = 0;
        for (let _ = S; _ < O.length; _++) {
          if (Y(O, _)) R += 1;
          if (X(O, _)) R -= 1;
          if (R === 0) return [S, _];
        }
        throw new K$(
          "TemplateLiteralParser: Unclosed group parens in expression"
        );
      }
      function P(O, S) {
        for (let R = S; R < O.length; R++) if (Y(O, R)) return [S, R];
        return [S, O.length];
      }
      const N = [];
      for (let O = 0; O < w.length; O++)
        if (Y(w, O)) {
          const [S, R] = U(w, O),
            _ = w.slice(S, R + 1);
          N.push(K(_)), (O = R);
        } else {
          const [S, R] = P(w, O),
            _ = w.slice(S, R);
          if (_.length > 0) N.push(K(_));
          O = R - 1;
        }
      return N.length === 0
        ? { type: "const", const: "" }
        : N.length === 1
        ? N[0]
        : { type: "and", expr: N };
    }
    function K(w) {
      return Q(w)
        ? K(J(w))
        : q(w)
        ? D(w)
        : F(w)
        ? B(w)
        : { type: "const", const: w };
    }
    $.Parse = K;
    function I(w) {
      return K(w.slice(1, w.length - 1));
    }
    $.ParseExact = I;
  })(g1 || (y6.TemplateLiteralParser = g1 = {}));

  class Z8 extends s0 {}
  y6.TemplateLiteralFiniteError = Z8;
  var f1;
  (function ($) {
    function W(J) {
      throw new Z8(J);
    }
    function Y(J) {
      return (
        J.type === "or" &&
        J.expr.length === 2 &&
        J.expr[0].type === "const" &&
        J.expr[0].const === "0" &&
        J.expr[1].type === "const" &&
        J.expr[1].const === "[1-9][0-9]*"
      );
    }
    function X(J) {
      return (
        J.type === "or" &&
        J.expr.length === 2 &&
        J.expr[0].type === "const" &&
        J.expr[0].const === "true" &&
        J.expr[1].type === "const" &&
        J.expr[1].const === "false"
      );
    }
    function Z(J) {
      return J.type === "const" && J.const === ".*";
    }
    function Q(J) {
      return X(J)
        ? true
        : Y(J) || Z(J)
        ? false
        : J.type === "and"
        ? J.expr.every((q) => Q(q))
        : J.type === "or"
        ? J.expr.every((q) => Q(q))
        : J.type === "const"
        ? true
        : W("Unknown expression type");
    }
    $.Check = Q;
  })(f1 || (y6.TemplateLiteralFinite = f1 = {}));

  class Q8 extends s0 {}
  y6.TemplateLiteralGeneratorError = Q8;
  var T1;
  (function ($) {
    function* W(J) {
      if (J.length === 1) return yield* J[0];
      for (let q of J[0]) for (let F of W(J.slice(1))) yield `${q}${F}`;
    }
    function* Y(J) {
      return yield* W(J.expr.map((q) => [...Q(q)]));
    }
    function* X(J) {
      for (let q of J.expr) yield* Q(q);
    }
    function* Z(J) {
      return yield J.const;
    }
    function* Q(J) {
      return J.type === "and"
        ? yield* Y(J)
        : J.type === "or"
        ? yield* X(J)
        : J.type === "const"
        ? yield* Z(J)
        : (() => {
            throw new Q8("Unknown expression");
          })();
    }
    $.Generate = Q;
  })(T1 || (y6.TemplateLiteralGenerator = T1 = {}));
  var $8;
  (function ($) {
    function* W(Q) {
      const J = Q.trim().replace(/"|'/g, "");
      return J === "boolean"
        ? yield y6.Type.Boolean()
        : J === "number"
        ? yield y6.Type.Number()
        : J === "bigint"
        ? yield y6.Type.BigInt()
        : J === "string"
        ? yield y6.Type.String()
        : yield (() => {
            const q = J.split("|").map((F) => y6.Type.Literal(F.trim()));
            return q.length === 0
              ? y6.Type.Never()
              : q.length === 1
              ? q[0]
              : y6.Type.Union(q);
          })();
    }
    function* Y(Q) {
      if (Q[1] !== "{") {
        const J = y6.Type.Literal("$"),
          q = X(Q.slice(1));
        return yield* [J, ...q];
      }
      for (let J = 2; J < Q.length; J++)
        if (Q[J] === "}") {
          const q = W(Q.slice(2, J)),
            F = X(Q.slice(J + 1));
          return yield* [...q, ...F];
        }
      yield y6.Type.Literal(Q);
    }
    function* X(Q) {
      for (let J = 0; J < Q.length; J++)
        if (Q[J] === "$") {
          const q = y6.Type.Literal(Q.slice(0, J)),
            F = Y(Q.slice(J));
          return yield* [q, ...F];
        }
      yield y6.Type.Literal(Q);
    }
    function Z(Q) {
      return [...X(Q)];
    }
    $.Parse = Z;
  })($8 || (y6.TemplateLiteralDslParser = $8 = {}));

  class J8 {
    constructor($) {
      this.schema = $;
    }
    Decode($) {
      return new z8(this.schema, $);
    }
  }
  y6.TransformDecodeBuilder = J8;

  class z8 {
    constructor($, W) {
      (this.schema = $), (this.decode = W);
    }
    Encode($) {
      const W = u.Type(this.schema);
      return A.TTransform(W)
        ? (() => {
            const Z = {
              Encode: (Q) => W[y6.Transform].Encode($(Q)),
              Decode: (Q) => this.decode(W[y6.Transform].Decode(Q)),
            };
            return { ...W, [y6.Transform]: Z };
          })()
        : (() => {
            const Y = { Decode: this.decode, Encode: $ };
            return { ...W, [y6.Transform]: Y };
          })();
    }
  }
  y6.TransformEncodeBuilder = z8;
  var gX = 0;

  class H8 extends s0 {}
  y6.TypeBuilderError = H8;

  class q8 {
    Create($) {
      return $;
    }
    Throw($) {
      throw new H8($);
    }
    Discard($, W) {
      const { [W]: Y, ...X } = $;
      return X;
    }
    Strict($) {
      return JSON.parse(JSON.stringify($));
    }
  }
  y6.TypeBuilder = q8;

  class P$ extends q8 {
    ReadonlyOptional($) {
      return this.Readonly(this.Optional($));
    }
    Readonly($) {
      return { ...u.Type($), [y6.Readonly]: "Readonly" };
    }
    Optional($) {
      return { ...u.Type($), [y6.Optional]: "Optional" };
    }
    Any($ = {}) {
      return this.Create({ ...$, [y6.Kind]: "Any" });
    }
    Array($, W = {}) {
      return this.Create({
        ...W,
        [y6.Kind]: "Array",
        type: "array",
        items: u.Type($),
      });
    }
    Boolean($ = {}) {
      return this.Create({ ...$, [y6.Kind]: "Boolean", type: "boolean" });
    }
    Capitalize($, W = {}) {
      return { ...E1.Map(u.Type($), "Capitalize"), ...W };
    }
    Composite($, W) {
      const Y = y6.Type.Intersect($, {}),
        Z = w$
          .ResolveKeys(Y, { includePatterns: false })
          .reduce((Q, J) => ({ ...Q, [J]: y6.Type.Index(Y, [J]) }), {});
      return y6.Type.Object(Z, W);
    }
    Enum($, W = {}) {
      const X = Object.getOwnPropertyNames($)
        .filter((Z) => isNaN(Z))
        .map((Z) => $[Z])
        .map((Z) =>
          V.IsString(Z)
            ? { [y6.Kind]: "Literal", type: "string", const: Z }
            : { [y6.Kind]: "Literal", type: "number", const: Z }
        );
      return this.Create({ ...W, [y6.Kind]: "Union", anyOf: X });
    }
    Extends($, W, Y, X, Z = {}) {
      switch (D1.Extends($, W)) {
        case C.Union:
          return this.Union([u.Type(Y, Z), u.Type(X, Z)]);
        case C.True:
          return u.Type(Y, Z);
        case C.False:
          return u.Type(X, Z);
      }
    }
    Exclude($, W, Y = {}) {
      return A.TTemplateLiteral($)
        ? this.Exclude(X1.Resolve($), W, Y)
        : A.TTemplateLiteral(W)
        ? this.Exclude($, X1.Resolve(W), Y)
        : A.TUnion($)
        ? (() => {
            const X = $.anyOf.filter((Z) => D1.Extends(Z, W) === C.False);
            return X.length === 1 ? u.Type(X[0], Y) : this.Union(X, Y);
          })()
        : D1.Extends($, W) !== C.False
        ? this.Never(Y)
        : u.Type($, Y);
    }
    Extract($, W, Y = {}) {
      return A.TTemplateLiteral($)
        ? this.Extract(X1.Resolve($), W, Y)
        : A.TTemplateLiteral(W)
        ? this.Extract($, X1.Resolve(W), Y)
        : A.TUnion($)
        ? (() => {
            const X = $.anyOf.filter((Z) => D1.Extends(Z, W) !== C.False);
            return X.length === 1 ? u.Type(X[0], Y) : this.Union(X, Y);
          })()
        : D1.Extends($, W) !== C.False
        ? u.Type($, Y)
        : this.Never(Y);
    }
    Index($, W, Y = {}) {
      return A.TArray($) && A.TNumber(W)
        ? (() => {
            return u.Type($.items, Y);
          })()
        : A.TTuple($) && A.TNumber(W)
        ? (() => {
            const Z = (V.IsUndefined($.items) ? [] : $.items).map((Q) =>
              u.Type(Q)
            );
            return this.Union(Z, Y);
          })()
        : (() => {
            const X = t1.Resolve(W),
              Z = u.Type($);
            return a$.Resolve(Z, X, Y);
          })();
    }
    Integer($ = {}) {
      return this.Create({ ...$, [y6.Kind]: "Integer", type: "integer" });
    }
    Intersect($, W = {}) {
      if ($.length === 0) return y6.Type.Never();
      if ($.length === 1) return u.Type($[0], W);
      if ($.some((Q) => A.TTransform(Q)))
        this.Throw("Cannot intersect transform types");
      const Y = $.every((Q) => A.TObject(Q)),
        X = u.Rest($),
        Z = A.TSchema(W.unevaluatedProperties)
          ? { unevaluatedProperties: u.Type(W.unevaluatedProperties) }
          : {};
      return W.unevaluatedProperties === false ||
        A.TSchema(W.unevaluatedProperties) ||
        Y
        ? this.Create({
            ...W,
            ...Z,
            [y6.Kind]: "Intersect",
            type: "object",
            allOf: X,
          })
        : this.Create({ ...W, ...Z, [y6.Kind]: "Intersect", allOf: X });
    }
    KeyOf($, W = {}) {
      return A.TRecord($)
        ? (() => {
            const Y = Object.getOwnPropertyNames($.patternProperties)[0];
            return Y === y6.PatternNumberExact
              ? this.Number(W)
              : Y === y6.PatternStringExact
              ? this.String(W)
              : this.Throw(
                  "Unable to resolve key type from Record key pattern"
                );
          })()
        : A.TTuple($)
        ? (() => {
            const X = (V.IsUndefined($.items) ? [] : $.items).map((Z, Q) =>
              y6.Type.Literal(Q.toString())
            );
            return this.Union(X, W);
          })()
        : A.TArray($)
        ? (() => {
            return this.Number(W);
          })()
        : (() => {
            const Y = w$.ResolveKeys($, { includePatterns: false });
            if (Y.length === 0) return this.Never(W);
            const X = Y.map((Z) => this.Literal(Z));
            return this.Union(X, W);
          })();
    }
    Literal($, W = {}) {
      return this.Create({
        ...W,
        [y6.Kind]: "Literal",
        const: $,
        type: typeof $,
      });
    }
    Lowercase($, W = {}) {
      return { ...E1.Map(u.Type($), "Lowercase"), ...W };
    }
    Never($ = {}) {
      return this.Create({ ...$, [y6.Kind]: "Never", not: {} });
    }
    Not($, W) {
      return this.Create({ ...W, [y6.Kind]: "Not", not: u.Type($) });
    }
    Null($ = {}) {
      return this.Create({ ...$, [y6.Kind]: "Null", type: "null" });
    }
    Number($ = {}) {
      return this.Create({ ...$, [y6.Kind]: "Number", type: "number" });
    }
    Object($, W = {}) {
      const Y = Object.getOwnPropertyNames($),
        X = Y.filter((q) => A.TOptional($[q])),
        Z = Y.filter((q) => !X.includes(q)),
        Q = A.TSchema(W.additionalProperties)
          ? { additionalProperties: u.Type(W.additionalProperties) }
          : {},
        J = Y.reduce((q, F) => ({ ...q, [F]: u.Type($[F]) }), {});
      return Z.length > 0
        ? this.Create({
            ...W,
            ...Q,
            [y6.Kind]: "Object",
            type: "object",
            properties: J,
            required: Z,
          })
        : this.Create({
            ...W,
            ...Q,
            [y6.Kind]: "Object",
            type: "object",
            properties: J,
          });
    }
    Omit($, W, Y = {}) {
      const X = t1.Resolve(W);
      return V1.Map(
        this.Discard(u.Type($), y6.Transform),
        (Z) => {
          if (V.IsArray(Z.required)) {
            if (
              ((Z.required = Z.required.filter((Q) => !X.includes(Q))),
              Z.required.length === 0)
            )
              delete Z.required;
          }
          for (let Q of Object.getOwnPropertyNames(Z.properties))
            if (X.includes(Q)) delete Z.properties[Q];
          return this.Create(Z);
        },
        Y
      );
    }
    Partial($, W = {}) {
      return V1.Map(
        this.Discard(u.Type($), y6.Transform),
        (Y) => {
          const X = Object.getOwnPropertyNames(Y.properties).reduce((Z, Q) => {
            return { ...Z, [Q]: this.Optional(Y.properties[Q]) };
          }, {});
          return this.Object(X, this.Discard(Y, "required"));
        },
        W
      );
    }
    Pick($, W, Y = {}) {
      const X = t1.Resolve(W);
      return V1.Map(
        this.Discard(u.Type($), y6.Transform),
        (Z) => {
          if (V.IsArray(Z.required)) {
            if (
              ((Z.required = Z.required.filter((Q) => X.includes(Q))),
              Z.required.length === 0)
            )
              delete Z.required;
          }
          for (let Q of Object.getOwnPropertyNames(Z.properties))
            if (!X.includes(Q)) delete Z.properties[Q];
          return this.Create(Z);
        },
        Y
      );
    }
    Record($, W, Y = {}) {
      return A.TTemplateLiteral($)
        ? (() => {
            const X = g1.ParseExact($.pattern);
            return f1.Check(X)
              ? this.Object(
                  [...T1.Generate(X)].reduce(
                    (Z, Q) => ({ ...Z, [Q]: u.Type(W) }),
                    {}
                  ),
                  Y
                )
              : this.Create({
                  ...Y,
                  [y6.Kind]: "Record",
                  type: "object",
                  patternProperties: { [$.pattern]: u.Type(W) },
                });
          })()
        : A.TUnion($)
        ? (() => {
            const X = e$.Resolve($);
            if (A.TUnionLiteral(X)) {
              const Z = X.anyOf.reduce(
                (Q, J) => ({ ...Q, [J.const]: u.Type(W) }),
                {}
              );
              return this.Object(Z, { ...Y, [y6.Hint]: "Record" });
            } else
              this.Throw("Record key of type union contains non-literal types");
          })()
        : A.TLiteral($)
        ? (() => {
            return V.IsString($.const) || V.IsNumber($.const)
              ? this.Object({ [$.const]: u.Type(W) }, Y)
              : this.Throw(
                  "Record key of type literal is not of type string or number"
                );
          })()
        : A.TInteger($) || A.TNumber($)
        ? (() => {
            return this.Create({
              ...Y,
              [y6.Kind]: "Record",
              type: "object",
              patternProperties: { [y6.PatternNumberExact]: u.Type(W) },
            });
          })()
        : A.TString($)
        ? (() => {
            const X = V.IsUndefined($.pattern)
              ? y6.PatternStringExact
              : $.pattern;
            return this.Create({
              ...Y,
              [y6.Kind]: "Record",
              type: "object",
              patternProperties: { [X]: u.Type(W) },
            });
          })()
        : this.Never();
    }
    Recursive($, W = {}) {
      if (V.IsUndefined(W.$id)) W.$id = `T${gX++}`;
      const Y = $({ [y6.Kind]: "This", $ref: `${W.$id}` });
      return (
        (Y.$id = W.$id), this.Create({ ...W, [y6.Hint]: "Recursive", ...Y })
      );
    }
    Ref($, W = {}) {
      if (V.IsString($))
        return this.Create({ ...W, [y6.Kind]: "Ref", $ref: $ });
      if (V.IsUndefined($.$id))
        this.Throw("Reference target type must specify an $id");
      return this.Create({ ...W, [y6.Kind]: "Ref", $ref: $.$id });
    }
    Required($, W = {}) {
      return V1.Map(
        this.Discard(u.Type($), y6.Transform),
        (Y) => {
          const X = Object.getOwnPropertyNames(Y.properties).reduce((Z, Q) => {
            return { ...Z, [Q]: this.Discard(Y.properties[Q], y6.Optional) };
          }, {});
          return this.Object(X, Y);
        },
        W
      );
    }
    Rest($) {
      return A.TTuple($) && !V.IsUndefined($.items)
        ? u.Rest($.items)
        : A.TIntersect($)
        ? u.Rest($.allOf)
        : A.TUnion($)
        ? u.Rest($.anyOf)
        : [];
    }
    String($ = {}) {
      return this.Create({ ...$, [y6.Kind]: "String", type: "string" });
    }
    TemplateLiteral($, W = {}) {
      const Y = V.IsString($) ? D$.Create($8.Parse($)) : D$.Create($);
      return this.Create({
        ...W,
        [y6.Kind]: "TemplateLiteral",
        type: "string",
        pattern: Y,
      });
    }
    Transform($) {
      return new J8($);
    }
    Tuple($, W = {}) {
      const [Y, X, Z] = [false, $.length, $.length],
        Q = u.Rest($),
        J =
          $.length > 0
            ? {
                ...W,
                [y6.Kind]: "Tuple",
                type: "array",
                items: Q,
                additionalItems: Y,
                minItems: X,
                maxItems: Z,
              }
            : {
                ...W,
                [y6.Kind]: "Tuple",
                type: "array",
                minItems: X,
                maxItems: Z,
              };
      return this.Create(J);
    }
    Uncapitalize($, W = {}) {
      return { ...E1.Map(u.Type($), "Uncapitalize"), ...W };
    }
    Union($, W = {}) {
      return A.TTemplateLiteral($)
        ? X1.Resolve($)
        : (() => {
            const Y = $;
            if (Y.length === 0) return this.Never(W);
            if (Y.length === 1) return this.Create(u.Type(Y[0], W));
            const X = u.Rest(Y);
            return this.Create({ ...W, [y6.Kind]: "Union", anyOf: X });
          })();
    }
    Unknown($ = {}) {
      return this.Create({ ...$, [y6.Kind]: "Unknown" });
    }
    Unsafe($ = {}) {
      return this.Create({ ...$, [y6.Kind]: $[y6.Kind] || "Unsafe" });
    }
    Uppercase($, W = {}) {
      return { ...E1.Map(u.Type($), "Uppercase"), ...W };
    }
  }
  y6.JsonTypeBuilder = P$;

  class M8 extends P$ {
    AsyncIterator($, W = {}) {
      return this.Create({
        ...W,
        [y6.Kind]: "AsyncIterator",
        type: "AsyncIterator",
        items: u.Type($),
      });
    }
    Awaited($, W = {}) {
      const Y = (X) =>
        X.length > 0
          ? (() => {
              const [Z, ...Q] = X;
              return [this.Awaited(Z), ...Y(Q)];
            })()
          : X;
      return A.TIntersect($)
        ? y6.Type.Intersect(Y($.allOf))
        : A.TUnion($)
        ? y6.Type.Union(Y($.anyOf))
        : A.TPromise($)
        ? this.Awaited($.item)
        : u.Type($, W);
    }
    BigInt($ = {}) {
      return this.Create({ ...$, [y6.Kind]: "BigInt", type: "bigint" });
    }
    ConstructorParameters($, W = {}) {
      return this.Tuple([...$.parameters], { ...W });
    }
    Constructor($, W, Y) {
      const [X, Z] = [u.Rest($), u.Type(W)];
      return this.Create({
        ...Y,
        [y6.Kind]: "Constructor",
        type: "Constructor",
        parameters: X,
        returns: Z,
      });
    }
    Date($ = {}) {
      return this.Create({ ...$, [y6.Kind]: "Date", type: "Date" });
    }
    Function($, W, Y) {
      const [X, Z] = [u.Rest($), u.Type(W)];
      return this.Create({
        ...Y,
        [y6.Kind]: "Function",
        type: "Function",
        parameters: X,
        returns: Z,
      });
    }
    InstanceType($, W = {}) {
      return u.Type($.returns, W);
    }
    Iterator($, W = {}) {
      return this.Create({
        ...W,
        [y6.Kind]: "Iterator",
        type: "Iterator",
        items: u.Type($),
      });
    }
    Parameters($, W = {}) {
      return this.Tuple($.parameters, { ...W });
    }
    Promise($, W = {}) {
      return this.Create({
        ...W,
        [y6.Kind]: "Promise",
        type: "Promise",
        item: u.Type($),
      });
    }
    RegExp($, W = {}) {
      const Y = V.IsString($) ? $ : $.source;
      return this.Create({
        ...W,
        [y6.Kind]: "String",
        type: "string",
        pattern: Y,
      });
    }
    RegEx($, W = {}) {
      return this.RegExp($, W);
    }
    ReturnType($, W = {}) {
      return u.Type($.returns, W);
    }
    Symbol($) {
      return this.Create({ ...$, [y6.Kind]: "Symbol", type: "symbol" });
    }
    Undefined($ = {}) {
      return this.Create({ ...$, [y6.Kind]: "Undefined", type: "undefined" });
    }
    Uint8Array($ = {}) {
      return this.Create({ ...$, [y6.Kind]: "Uint8Array", type: "Uint8Array" });
    }
    Void($ = {}) {
      return this.Create({ ...$, [y6.Kind]: "Void", type: "void" });
    }
  }
  y6.JavaScriptTypeBuilder = M8;
  y6.JsonType = new P$();
  y6.Type = new M8();
});
var D8 = H0((m6) => {
  var B8 = function ($, W) {
    switch (W) {
      case p.ValueErrorType.ArrayContains:
        return "Expected array to contain at least one matching value";
      case p.ValueErrorType.ArrayMaxContains:
        return `Expected array to contain no more than ${$.maxContains} matching values`;
      case p.ValueErrorType.ArrayMinContains:
        return `Expected array to contain at least ${$.minContains} matching values`;
      case p.ValueErrorType.ArrayMaxItems:
        return `Expected array length to be less or equal to ${$.maxItems}`;
      case p.ValueErrorType.ArrayMinItems:
        return `Expected array length to be greater or equal to ${$.minItems}`;
      case p.ValueErrorType.ArrayUniqueItems:
        return "Expected array elements to be unique";
      case p.ValueErrorType.Array:
        return "Expected array";
      case p.ValueErrorType.AsyncIterator:
        return "Expected AsyncIterator";
      case p.ValueErrorType.BigIntExclusiveMaximum:
        return `Expected bigint to be less than ${$.exclusiveMaximum}`;
      case p.ValueErrorType.BigIntExclusiveMinimum:
        return `Expected bigint to be greater than ${$.exclusiveMinimum}`;
      case p.ValueErrorType.BigIntMaximum:
        return `Expected bigint to be less or equal to ${$.maximum}`;
      case p.ValueErrorType.BigIntMinimum:
        return `Expected bigint to be greater or equal to ${$.minimum}`;
      case p.ValueErrorType.BigIntMultipleOf:
        return `Expected bigint to be a multiple of ${$.multipleOf}`;
      case p.ValueErrorType.BigInt:
        return "Expected bigint";
      case p.ValueErrorType.Boolean:
        return "Expected boolean";
      case p.ValueErrorType.DateExclusiveMinimumTimestamp:
        return `Expected Date timestamp to be greater than ${$.exclusiveMinimumTimestamp}`;
      case p.ValueErrorType.DateExclusiveMaximumTimestamp:
        return `Expected Date timestamp to be less than ${$.exclusiveMaximumTimestamp}`;
      case p.ValueErrorType.DateMinimumTimestamp:
        return `Expected Date timestamp to be greater or equal to ${$.minimumTimestamp}`;
      case p.ValueErrorType.DateMaximumTimestamp:
        return `Expected Date timestamp to be less or equal to ${$.maximumTimestamp}`;
      case p.ValueErrorType.DateMultipleOfTimestamp:
        return `Expected Date timestamp to be a multiple of ${$.multipleOfTimestamp}`;
      case p.ValueErrorType.Date:
        return "Expected Date";
      case p.ValueErrorType.Function:
        return "Expected function";
      case p.ValueErrorType.IntegerExclusiveMaximum:
        return `Expected integer to be less than ${$.exclusiveMaximum}`;
      case p.ValueErrorType.IntegerExclusiveMinimum:
        return `Expected integer to be greater than ${$.exclusiveMinimum}`;
      case p.ValueErrorType.IntegerMaximum:
        return `Expected integer to be less or equal to ${$.maximum}`;
      case p.ValueErrorType.IntegerMinimum:
        return `Expected integer to be greater or equal to ${$.minimum}`;
      case p.ValueErrorType.IntegerMultipleOf:
        return `Expected integer to be a multiple of ${$.multipleOf}`;
      case p.ValueErrorType.Integer:
        return "Expected integer";
      case p.ValueErrorType.IntersectUnevaluatedProperties:
        return "Unexpected property";
      case p.ValueErrorType.Intersect:
        return "Expected all values to match";
      case p.ValueErrorType.Iterator:
        return "Expected Iterator";
      case p.ValueErrorType.Literal:
        return `Expected ${
          typeof $.const === "string" ? `'${$.const}'` : $.const
        }`;
      case p.ValueErrorType.Never:
        return "Never";
      case p.ValueErrorType.Not:
        return "Value should not match";
      case p.ValueErrorType.Null:
        return "Expected null";
      case p.ValueErrorType.NumberExclusiveMaximum:
        return `Expected number to be less than ${$.exclusiveMaximum}`;
      case p.ValueErrorType.NumberExclusiveMinimum:
        return `Expected number to be greater than ${$.exclusiveMinimum}`;
      case p.ValueErrorType.NumberMaximum:
        return `Expected number to be less or equal to ${$.maximum}`;
      case p.ValueErrorType.NumberMinimum:
        return `Expected number to be greater or equal to ${$.minimum}`;
      case p.ValueErrorType.NumberMultipleOf:
        return `Expected number to be a multiple of ${$.multipleOf}`;
      case p.ValueErrorType.Number:
        return "Expected number";
      case p.ValueErrorType.Object:
        return "Expected object";
      case p.ValueErrorType.ObjectAdditionalProperties:
        return "Unexpected property";
      case p.ValueErrorType.ObjectMaxProperties:
        return `Expected object to have no more than ${$.maxProperties} properties`;
      case p.ValueErrorType.ObjectMinProperties:
        return `Expected object to have at least ${$.minProperties} properties`;
      case p.ValueErrorType.ObjectRequiredProperty:
        return "Required property";
      case p.ValueErrorType.Promise:
        return "Expected Promise";
      case p.ValueErrorType.StringFormatUnknown:
        return `Unknown format '${$.format}'`;
      case p.ValueErrorType.StringFormat:
        return `Expected string to match '${$.format}' format`;
      case p.ValueErrorType.StringMaxLength:
        return `Expected string length less or equal to ${$.maxLength}`;
      case p.ValueErrorType.StringMinLength:
        return `Expected string length greater or equal to ${$.minLength}`;
      case p.ValueErrorType.StringPattern:
        return `Expected string to match '${$.pattern}'`;
      case p.ValueErrorType.String:
        return "Expected string";
      case p.ValueErrorType.Symbol:
        return "Expected symbol";
      case p.ValueErrorType.TupleLength:
        return `Expected tuple to have ${$.maxItems || 0} elements`;
      case p.ValueErrorType.Tuple:
        return "Expected tuple";
      case p.ValueErrorType.Uint8ArrayMaxByteLength:
        return `Expected byte length less or equal to ${$.maxByteLength}`;
      case p.ValueErrorType.Uint8ArrayMinByteLength:
        return `Expected byte length greater or equal to ${$.minByteLength}`;
      case p.ValueErrorType.Uint8Array:
        return "Expected Uint8Array";
      case p.ValueErrorType.Undefined:
        return "Expected undefined";
      case p.ValueErrorType.Union:
        return "Expected union value";
      case p.ValueErrorType.Void:
        return "Expected void";
      case p.ValueErrorType.Kind:
        return `Expected kind '${$[Z1.Kind]}'`;
      default:
        return "Unknown error type";
    }
  };
  Object.defineProperty(m6, "__esModule", { value: true });
  m6.DefaultErrorFunction =
    m6.TypeSystemPolicy =
    m6.TypeSystemErrorFunction =
    m6.TypeSystem =
    m6.TypeSystemDuplicateFormat =
    m6.TypeSystemDuplicateTypeKind =
      undefined;
  var S$ = k0(),
    p = a1(),
    Z1 = f0();

  class A8 extends Z1.TypeBoxError {
    constructor($) {
      super(`Duplicate type kind '${$}' detected`);
    }
  }
  m6.TypeSystemDuplicateTypeKind = A8;

  class w8 extends Z1.TypeBoxError {
    constructor($) {
      super(`Duplicate string format '${$}' detected`);
    }
  }
  m6.TypeSystemDuplicateFormat = w8;
  var v6;
  (function ($) {
    function W(X, Z) {
      if (Z1.TypeRegistry.Has(X)) throw new A8(X);
      return (
        Z1.TypeRegistry.Set(X, Z),
        (Q = {}) => Z1.Type.Unsafe({ ...Q, [Z1.Kind]: X })
      );
    }
    $.Type = W;
    function Y(X, Z) {
      if (Z1.FormatRegistry.Has(X)) throw new w8(X);
      return Z1.FormatRegistry.Set(X, Z), X;
    }
    $.Format = Y;
  })(v6 || (m6.TypeSystem = v6 = {}));
  var p6;
  (function ($) {
    let W = B8;
    function Y() {
      W = B8;
    }
    $.Reset = Y;
    function X(Q) {
      W = Q;
    }
    $.Set = X;
    function Z() {
      return W;
    }
    $.Get = Z;
  })(p6 || (m6.TypeSystemErrorFunction = p6 = {}));
  var i6;
  (function ($) {
    ($.ExactOptionalPropertyTypes = false),
      ($.AllowArrayObject = false),
      ($.AllowNaN = false),
      ($.AllowNullVoid = false);
    function W(J, q) {
      return $.ExactOptionalPropertyTypes ? q in J : J[q] !== undefined;
    }
    $.IsExactOptionalProperty = W;
    function Y(J) {
      const q = (0, S$.IsObject)(J);
      return $.AllowArrayObject ? q : q && !(0, S$.IsArray)(J);
    }
    $.IsObjectLike = Y;
    function X(J) {
      return Y(J) && !(J instanceof Date) && !(J instanceof Uint8Array);
    }
    $.IsRecordLike = X;
    function Z(J) {
      const q = (0, S$.IsNumber)(J);
      return $.AllowNaN ? q : q && Number.isFinite(J);
    }
    $.IsNumberLike = Z;
    function Q(J) {
      const q = (0, S$.IsUndefined)(J);
      return $.AllowNullVoid ? q || J === null : q;
    }
    $.IsVoidLike = Q;
  })(i6 || (m6.TypeSystemPolicy = i6 = {}));
  m6.DefaultErrorFunction = B8;
});
var F1 = H0((n6) => {
  var OZ = function ($, W) {
    const Y = W.findIndex((X) => X.$id === $.$ref);
    if (Y === -1) throw new K8($);
    return W[Y];
  };
  Object.defineProperty(n6, "__esModule", { value: true });
  n6.Deref = n6.TypeDereferenceError = undefined;
  var jZ = f0();

  class K8 extends jZ.TypeBoxError {
    constructor($) {
      super(`Unable to dereference schema with $id '${$.$id}'`);
      this.schema = $;
    }
  }
  n6.TypeDereferenceError = K8;
  n6.Deref = OZ;
});
var e1 = H0((t6) => {
  var bZ = function ($) {
      _0(T0.Array);
      for (let W of $) v1(W);
    },
    _Z = function ($) {
      _0(T0.Boolean), _0($ ? 1 : 0);
    },
    EZ = function ($) {
      _0(T0.BigInt), c6.setBigInt64(0, $);
      for (let W of l6) _0(W);
    },
    VZ = function ($) {
      _0(T0.Date), v1($.getTime());
    },
    xZ = function ($) {
      _0(T0.Null);
    },
    kZ = function ($) {
      _0(T0.Number), c6.setFloat64(0, $);
      for (let W of l6) _0(W);
    },
    gZ = function ($) {
      _0(T0.Object);
      for (let W of globalThis.Object.keys($).sort()) v1(W), v1($[W]);
    },
    fZ = function ($) {
      _0(T0.String);
      for (let W = 0; W < $.length; W++) _0($.charCodeAt(W));
    },
    TZ = function ($) {
      _0(T0.Symbol), v1($.description);
    },
    dZ = function ($) {
      _0(T0.Uint8Array);
      for (let W = 0; W < $.length; W++) _0($[W]);
    },
    yZ = function ($) {
      return _0(T0.Undefined);
    },
    v1 = function ($) {
      if ((0, n0.IsArray)($)) return bZ($);
      if ((0, n0.IsBoolean)($)) return _Z($);
      if ((0, n0.IsBigInt)($)) return EZ($);
      if ((0, n0.IsDate)($)) return VZ($);
      if ((0, n0.IsNull)($)) return xZ($);
      if ((0, n0.IsNumber)($)) return kZ($);
      if ((0, n0.IsPlainObject)($)) return gZ($);
      if ((0, n0.IsString)($)) return fZ($);
      if ((0, n0.IsSymbol)($)) return TZ($);
      if ((0, n0.IsUint8Array)($)) return dZ($);
      if ((0, n0.IsUndefined)($)) return yZ($);
      throw new P8($);
    },
    _0 = function ($) {
      (y1 = y1 ^ GZ[$]), (y1 = (y1 * IZ) % RZ);
    },
    vZ = function ($) {
      return (y1 = BigInt("14695981039346656037")), v1($), y1;
    };
  Object.defineProperty(t6, "__esModule", { value: true });
  t6.Hash = t6.ByteMarker = t6.ValueHashError = undefined;
  var n0 = k0();

  class P8 extends Error {
    constructor($) {
      super("Unable to hash value");
      this.value = $;
    }
  }
  t6.ValueHashError = P8;
  var T0;
  (function ($) {
    ($[($.Undefined = 0)] = "Undefined"),
      ($[($.Null = 1)] = "Null"),
      ($[($.Boolean = 2)] = "Boolean"),
      ($[($.Number = 3)] = "Number"),
      ($[($.String = 4)] = "String"),
      ($[($.Object = 5)] = "Object"),
      ($[($.Array = 6)] = "Array"),
      ($[($.Date = 7)] = "Date"),
      ($[($.Uint8Array = 8)] = "Uint8Array"),
      ($[($.Symbol = 9)] = "Symbol"),
      ($[($.BigInt = 10)] = "BigInt");
  })(T0 || (t6.ByteMarker = T0 = {}));
  var y1 = BigInt("14695981039346656037"),
    [IZ, RZ] = [BigInt("1099511628211"), BigInt("2") ** BigInt("64")],
    GZ = Array.from({ length: 256 }).map(($, W) => BigInt(W)),
    h6 = new Float64Array(1),
    c6 = new DataView(h6.buffer),
    l6 = new Uint8Array(h6.buffer);
  t6.Hash = vZ;
});
var a1 = H0((a6) => {
  var e = function ($) {
      return $ !== undefined;
    },
    f = function ($, W, Y, X) {
      return {
        type: $,
        schema: W,
        path: Y,
        value: X,
        message: p1.TypeSystemErrorFunction.Get()(W, $),
      };
    };
  function* uZ($, W, Y, X) {}
  function* nZ($, W, Y, X) {
    if (!(0, w0.IsArray)(X)) return yield f(k.Array, $, Y, X);
    if (e($.minItems) && !(X.length >= $.minItems))
      yield f(k.ArrayMinItems, $, Y, X);
    if (e($.maxItems) && !(X.length <= $.maxItems))
      yield f(k.ArrayMaxItems, $, Y, X);
    for (let J = 0; J < X.length; J++) yield* C0($.items, W, `${Y}/${J}`, X[J]);
    if (
      $.uniqueItems === true &&
      !(function () {
        const J = new Set();
        for (let q of X) {
          const F = (0, mZ.Hash)(q);
          if (J.has(F)) return false;
          else J.add(F);
        }
        return true;
      })()
    )
      yield f(k.ArrayUniqueItems, $, Y, X);
    if (!(e($.contains) || e($.minContains) || e($.maxContains))) return;
    const Z = e($.contains) ? $.contains : p0.Type.Never(),
      Q = X.reduce(
        (J, q, F) => (C0(Z, W, `${Y}${F}`, q).next().done === true ? J + 1 : J),
        0
      );
    if (Q === 0) yield f(k.ArrayContains, $, Y, X);
    if ((0, w0.IsNumber)($.minContains) && Q < $.minContains)
      yield f(k.ArrayMinContains, $, Y, X);
    if ((0, w0.IsNumber)($.maxContains) && Q > $.maxContains)
      yield f(k.ArrayMaxContains, $, Y, X);
  }
  function* oZ($, W, Y, X) {
    if (!(0, w0.IsAsyncIterator)(X)) yield f(k.AsyncIterator, $, Y, X);
  }
  function* hZ($, W, Y, X) {
    if (!(0, w0.IsBigInt)(X)) return yield f(k.BigInt, $, Y, X);
    if (e($.exclusiveMaximum) && !(X < $.exclusiveMaximum))
      yield f(k.BigIntExclusiveMaximum, $, Y, X);
    if (e($.exclusiveMinimum) && !(X > $.exclusiveMinimum))
      yield f(k.BigIntExclusiveMinimum, $, Y, X);
    if (e($.maximum) && !(X <= $.maximum)) yield f(k.BigIntMaximum, $, Y, X);
    if (e($.minimum) && !(X >= $.minimum)) yield f(k.BigIntMinimum, $, Y, X);
    if (e($.multipleOf) && X % $.multipleOf !== BigInt(0))
      yield f(k.BigIntMultipleOf, $, Y, X);
  }
  function* cZ($, W, Y, X) {
    if (!(0, w0.IsBoolean)(X)) yield f(k.Boolean, $, Y, X);
  }
  function* lZ($, W, Y, X) {
    yield* C0($.returns, W, Y, X.prototype);
  }
  function* tZ($, W, Y, X) {
    if (!(0, w0.IsDate)(X)) return yield f(k.Date, $, Y, X);
    if (
      e($.exclusiveMaximumTimestamp) &&
      !(X.getTime() < $.exclusiveMaximumTimestamp)
    )
      yield f(k.DateExclusiveMaximumTimestamp, $, Y, X);
    if (
      e($.exclusiveMinimumTimestamp) &&
      !(X.getTime() > $.exclusiveMinimumTimestamp)
    )
      yield f(k.DateExclusiveMinimumTimestamp, $, Y, X);
    if (e($.maximumTimestamp) && !(X.getTime() <= $.maximumTimestamp))
      yield f(k.DateMaximumTimestamp, $, Y, X);
    if (e($.minimumTimestamp) && !(X.getTime() >= $.minimumTimestamp))
      yield f(k.DateMinimumTimestamp, $, Y, X);
    if (e($.multipleOfTimestamp) && X.getTime() % $.multipleOfTimestamp !== 0)
      yield f(k.DateMultipleOfTimestamp, $, Y, X);
  }
  function* sZ($, W, Y, X) {
    if (!(0, w0.IsFunction)(X)) yield f(k.Function, $, Y, X);
  }
  function* rZ($, W, Y, X) {
    if (!(0, w0.IsInteger)(X)) return yield f(k.Integer, $, Y, X);
    if (e($.exclusiveMaximum) && !(X < $.exclusiveMaximum))
      yield f(k.IntegerExclusiveMaximum, $, Y, X);
    if (e($.exclusiveMinimum) && !(X > $.exclusiveMinimum))
      yield f(k.IntegerExclusiveMinimum, $, Y, X);
    if (e($.maximum) && !(X <= $.maximum)) yield f(k.IntegerMaximum, $, Y, X);
    if (e($.minimum) && !(X >= $.minimum)) yield f(k.IntegerMinimum, $, Y, X);
    if (e($.multipleOf) && X % $.multipleOf !== 0)
      yield f(k.IntegerMultipleOf, $, Y, X);
  }
  function* aZ($, W, Y, X) {
    for (let Z of $.allOf) {
      const Q = C0(Z, W, Y, X).next();
      if (!Q.done) yield f(k.Intersect, $, Y, X), yield Q.value;
    }
    if ($.unevaluatedProperties === false) {
      const Z = new RegExp(p0.KeyResolver.ResolvePattern($));
      for (let Q of Object.getOwnPropertyNames(X))
        if (!Z.test(Q))
          yield f(k.IntersectUnevaluatedProperties, $, `${Y}/${Q}`, X);
    }
    if (typeof $.unevaluatedProperties === "object") {
      const Z = new RegExp(p0.KeyResolver.ResolvePattern($));
      for (let Q of Object.getOwnPropertyNames(X))
        if (!Z.test(Q)) {
          const J = C0($.unevaluatedProperties, W, `${Y}/${Q}`, X[Q]).next();
          if (!J.done) yield J.value;
        }
    }
  }
  function* eZ($, W, Y, X) {
    if (!(0, w0.IsIterator)(X)) yield f(k.Iterator, $, Y, X);
  }
  function* $Q($, W, Y, X) {
    if (X !== $.const) yield f(k.Literal, $, Y, X);
  }
  function* WQ($, W, Y, X) {
    yield f(k.Never, $, Y, X);
  }
  function* YQ($, W, Y, X) {
    if (C0($.not, W, Y, X).next().done === true) yield f(k.Not, $, Y, X);
  }
  function* XQ($, W, Y, X) {
    if (!(0, w0.IsNull)(X)) yield f(k.Null, $, Y, X);
  }
  function* ZQ($, W, Y, X) {
    if (!p1.TypeSystemPolicy.IsNumberLike(X)) return yield f(k.Number, $, Y, X);
    if (e($.exclusiveMaximum) && !(X < $.exclusiveMaximum))
      yield f(k.NumberExclusiveMaximum, $, Y, X);
    if (e($.exclusiveMinimum) && !(X > $.exclusiveMinimum))
      yield f(k.NumberExclusiveMinimum, $, Y, X);
    if (e($.maximum) && !(X <= $.maximum)) yield f(k.NumberMaximum, $, Y, X);
    if (e($.minimum) && !(X >= $.minimum)) yield f(k.NumberMinimum, $, Y, X);
    if (e($.multipleOf) && X % $.multipleOf !== 0)
      yield f(k.NumberMultipleOf, $, Y, X);
  }
  function* QQ($, W, Y, X) {
    if (!p1.TypeSystemPolicy.IsObjectLike(X)) return yield f(k.Object, $, Y, X);
    if (
      e($.minProperties) &&
      !(Object.getOwnPropertyNames(X).length >= $.minProperties)
    )
      yield f(k.ObjectMinProperties, $, Y, X);
    if (
      e($.maxProperties) &&
      !(Object.getOwnPropertyNames(X).length <= $.maxProperties)
    )
      yield f(k.ObjectMaxProperties, $, Y, X);
    const Z = Array.isArray($.required) ? $.required : [],
      Q = Object.getOwnPropertyNames($.properties),
      J = Object.getOwnPropertyNames(X);
    for (let q of Z) {
      if (J.includes(q)) continue;
      yield f(
        k.ObjectRequiredProperty,
        $.properties[q],
        `${Y}/${q}`,
        undefined
      );
    }
    if ($.additionalProperties === false) {
      for (let q of J)
        if (!Q.includes(q))
          yield f(k.ObjectAdditionalProperties, $, `${Y}/${q}`, X[q]);
    }
    if (typeof $.additionalProperties === "object")
      for (let q of J) {
        if (Q.includes(q)) continue;
        yield* C0($.additionalProperties, W, `${Y}/${q}`, X[q]);
      }
    for (let q of Q) {
      const F = $.properties[q];
      if ($.required && $.required.includes(q)) {
        if (
          (yield* C0(F, W, `${Y}/${q}`, X[q]),
          p0.ExtendsUndefined.Check($) && !(q in X))
        )
          yield f(k.ObjectRequiredProperty, F, `${Y}/${q}`, undefined);
      } else if (p1.TypeSystemPolicy.IsExactOptionalProperty(X, q))
        yield* C0(F, W, `${Y}/${q}`, X[q]);
    }
  }
  function* JQ($, W, Y, X) {
    if (!(0, w0.IsPromise)(X)) yield f(k.Promise, $, Y, X);
  }
  function* zQ($, W, Y, X) {
    if (!p1.TypeSystemPolicy.IsRecordLike(X)) return yield f(k.Object, $, Y, X);
    if (
      e($.minProperties) &&
      !(Object.getOwnPropertyNames(X).length >= $.minProperties)
    )
      yield f(k.ObjectMinProperties, $, Y, X);
    if (
      e($.maxProperties) &&
      !(Object.getOwnPropertyNames(X).length <= $.maxProperties)
    )
      yield f(k.ObjectMaxProperties, $, Y, X);
    const [Z, Q] = Object.entries($.patternProperties)[0],
      J = new RegExp(Z);
    for (let [q, F] of Object.entries(X))
      if (J.test(q)) yield* C0(Q, W, `${Y}/${q}`, F);
    if (typeof $.additionalProperties === "object") {
      for (let [q, F] of Object.entries(X))
        if (!J.test(q)) yield* C0($.additionalProperties, W, `${Y}/${q}`, F);
    }
    if ($.additionalProperties === false)
      for (let [q, F] of Object.entries(X)) {
        if (J.test(q)) continue;
        return yield f(k.ObjectAdditionalProperties, $, `${Y}/${q}`, F);
      }
  }
  function* HQ($, W, Y, X) {
    yield* C0((0, r6.Deref)($, W), W, Y, X);
  }
  function* qQ($, W, Y, X) {
    if (!(0, w0.IsString)(X)) return yield f(k.String, $, Y, X);
    if (e($.minLength) && !(X.length >= $.minLength))
      yield f(k.StringMinLength, $, Y, X);
    if (e($.maxLength) && !(X.length <= $.maxLength))
      yield f(k.StringMaxLength, $, Y, X);
    if ((0, w0.IsString)($.pattern)) {
      if (!new RegExp($.pattern).test(X)) yield f(k.StringPattern, $, Y, X);
    }
    if ((0, w0.IsString)($.format)) {
      if (!p0.FormatRegistry.Has($.format))
        yield f(k.StringFormatUnknown, $, Y, X);
      else if (!p0.FormatRegistry.Get($.format)(X))
        yield f(k.StringFormat, $, Y, X);
    }
  }
  function* MQ($, W, Y, X) {
    if (!(0, w0.IsSymbol)(X)) yield f(k.Symbol, $, Y, X);
  }
  function* NQ($, W, Y, X) {
    if (!(0, w0.IsString)(X)) return yield f(k.String, $, Y, X);
    if (!new RegExp($.pattern).test(X)) yield f(k.StringPattern, $, Y, X);
  }
  function* UQ($, W, Y, X) {
    yield* C0((0, r6.Deref)($, W), W, Y, X);
  }
  function* FQ($, W, Y, X) {
    if (!(0, w0.IsArray)(X)) return yield f(k.Tuple, $, Y, X);
    if ($.items === undefined && X.length !== 0)
      return yield f(k.TupleLength, $, Y, X);
    if (X.length !== $.maxItems) return yield f(k.TupleLength, $, Y, X);
    if (!$.items) return;
    for (let Z = 0; Z < $.items.length; Z++)
      yield* C0($.items[Z], W, `${Y}/${Z}`, X[Z]);
  }
  function* BQ($, W, Y, X) {
    if (!(0, w0.IsUndefined)(X)) yield f(k.Undefined, $, Y, X);
  }
  function* AQ($, W, Y, X) {
    let Z = 0;
    for (let Q of $.anyOf) {
      const J = [...C0(Q, W, Y, X)];
      if (J.length === 0) return;
      Z += J.length;
    }
    if (Z > 0) yield f(k.Union, $, Y, X);
  }
  function* wQ($, W, Y, X) {
    if (!(0, w0.IsUint8Array)(X)) return yield f(k.Uint8Array, $, Y, X);
    if (e($.maxByteLength) && !(X.length <= $.maxByteLength))
      yield f(k.Uint8ArrayMaxByteLength, $, Y, X);
    if (e($.minByteLength) && !(X.length >= $.minByteLength))
      yield f(k.Uint8ArrayMinByteLength, $, Y, X);
  }
  function* DQ($, W, Y, X) {}
  function* KQ($, W, Y, X) {
    if (!p1.TypeSystemPolicy.IsVoidLike(X)) yield f(k.Void, $, Y, X);
  }
  function* PQ($, W, Y, X) {
    if (!p0.TypeRegistry.Get($[p0.Kind])($, X)) yield f(k.Kind, $, Y, X);
  }
  function* C0($, W, Y, X) {
    const Z = e($.$id) ? [...W, $] : W,
      Q = $;
    switch (Q[p0.Kind]) {
      case "Any":
        return yield* uZ(Q, Z, Y, X);
      case "Array":
        return yield* nZ(Q, Z, Y, X);
      case "AsyncIterator":
        return yield* oZ(Q, Z, Y, X);
      case "BigInt":
        return yield* hZ(Q, Z, Y, X);
      case "Boolean":
        return yield* cZ(Q, Z, Y, X);
      case "Constructor":
        return yield* lZ(Q, Z, Y, X);
      case "Date":
        return yield* tZ(Q, Z, Y, X);
      case "Function":
        return yield* sZ(Q, Z, Y, X);
      case "Integer":
        return yield* rZ(Q, Z, Y, X);
      case "Intersect":
        return yield* aZ(Q, Z, Y, X);
      case "Iterator":
        return yield* eZ(Q, Z, Y, X);
      case "Literal":
        return yield* $Q(Q, Z, Y, X);
      case "Never":
        return yield* WQ(Q, Z, Y, X);
      case "Not":
        return yield* YQ(Q, Z, Y, X);
      case "Null":
        return yield* XQ(Q, Z, Y, X);
      case "Number":
        return yield* ZQ(Q, Z, Y, X);
      case "Object":
        return yield* QQ(Q, Z, Y, X);
      case "Promise":
        return yield* JQ(Q, Z, Y, X);
      case "Record":
        return yield* zQ(Q, Z, Y, X);
      case "Ref":
        return yield* HQ(Q, Z, Y, X);
      case "String":
        return yield* qQ(Q, Z, Y, X);
      case "Symbol":
        return yield* MQ(Q, Z, Y, X);
      case "TemplateLiteral":
        return yield* NQ(Q, Z, Y, X);
      case "This":
        return yield* UQ(Q, Z, Y, X);
      case "Tuple":
        return yield* FQ(Q, Z, Y, X);
      case "Undefined":
        return yield* BQ(Q, Z, Y, X);
      case "Union":
        return yield* AQ(Q, Z, Y, X);
      case "Uint8Array":
        return yield* wQ(Q, Z, Y, X);
      case "Unknown":
        return yield* DQ(Q, Z, Y, X);
      case "Void":
        return yield* KQ(Q, Z, Y, X);
      default:
        if (!p0.TypeRegistry.Has(Q[p0.Kind])) throw new S8($);
        return yield* PQ(Q, Z, Y, X);
    }
  }
  var SQ = function (...$) {
    const W =
      $.length === 3 ? C0($[0], $[1], "", $[2]) : C0($[0], [], "", $[1]);
    return new L8(W);
  };
  Object.defineProperty(a6, "__esModule", { value: true });
  a6.Errors =
    a6.ValueErrorIterator =
    a6.ValueErrorsUnknownTypeError =
    a6.ValueErrorType =
      undefined;
  var w0 = k0(),
    p1 = D8(),
    r6 = F1(),
    mZ = e1(),
    p0 = f0(),
    k;
  (function ($) {
    ($[($.ArrayContains = 0)] = "ArrayContains"),
      ($[($.ArrayMaxContains = 1)] = "ArrayMaxContains"),
      ($[($.ArrayMaxItems = 2)] = "ArrayMaxItems"),
      ($[($.ArrayMinContains = 3)] = "ArrayMinContains"),
      ($[($.ArrayMinItems = 4)] = "ArrayMinItems"),
      ($[($.ArrayUniqueItems = 5)] = "ArrayUniqueItems"),
      ($[($.Array = 6)] = "Array"),
      ($[($.AsyncIterator = 7)] = "AsyncIterator"),
      ($[($.BigIntExclusiveMaximum = 8)] = "BigIntExclusiveMaximum"),
      ($[($.BigIntExclusiveMinimum = 9)] = "BigIntExclusiveMinimum"),
      ($[($.BigIntMaximum = 10)] = "BigIntMaximum"),
      ($[($.BigIntMinimum = 11)] = "BigIntMinimum"),
      ($[($.BigIntMultipleOf = 12)] = "BigIntMultipleOf"),
      ($[($.BigInt = 13)] = "BigInt"),
      ($[($.Boolean = 14)] = "Boolean"),
      ($[($.DateExclusiveMaximumTimestamp = 15)] =
        "DateExclusiveMaximumTimestamp"),
      ($[($.DateExclusiveMinimumTimestamp = 16)] =
        "DateExclusiveMinimumTimestamp"),
      ($[($.DateMaximumTimestamp = 17)] = "DateMaximumTimestamp"),
      ($[($.DateMinimumTimestamp = 18)] = "DateMinimumTimestamp"),
      ($[($.DateMultipleOfTimestamp = 19)] = "DateMultipleOfTimestamp"),
      ($[($.Date = 20)] = "Date"),
      ($[($.Function = 21)] = "Function"),
      ($[($.IntegerExclusiveMaximum = 22)] = "IntegerExclusiveMaximum"),
      ($[($.IntegerExclusiveMinimum = 23)] = "IntegerExclusiveMinimum"),
      ($[($.IntegerMaximum = 24)] = "IntegerMaximum"),
      ($[($.IntegerMinimum = 25)] = "IntegerMinimum"),
      ($[($.IntegerMultipleOf = 26)] = "IntegerMultipleOf"),
      ($[($.Integer = 27)] = "Integer"),
      ($[($.IntersectUnevaluatedProperties = 28)] =
        "IntersectUnevaluatedProperties"),
      ($[($.Intersect = 29)] = "Intersect"),
      ($[($.Iterator = 30)] = "Iterator"),
      ($[($.Kind = 31)] = "Kind"),
      ($[($.Literal = 32)] = "Literal"),
      ($[($.Never = 33)] = "Never"),
      ($[($.Not = 34)] = "Not"),
      ($[($.Null = 35)] = "Null"),
      ($[($.NumberExclusiveMaximum = 36)] = "NumberExclusiveMaximum"),
      ($[($.NumberExclusiveMinimum = 37)] = "NumberExclusiveMinimum"),
      ($[($.NumberMaximum = 38)] = "NumberMaximum"),
      ($[($.NumberMinimum = 39)] = "NumberMinimum"),
      ($[($.NumberMultipleOf = 40)] = "NumberMultipleOf"),
      ($[($.Number = 41)] = "Number"),
      ($[($.ObjectAdditionalProperties = 42)] = "ObjectAdditionalProperties"),
      ($[($.ObjectMaxProperties = 43)] = "ObjectMaxProperties"),
      ($[($.ObjectMinProperties = 44)] = "ObjectMinProperties"),
      ($[($.ObjectRequiredProperty = 45)] = "ObjectRequiredProperty"),
      ($[($.Object = 46)] = "Object"),
      ($[($.Promise = 47)] = "Promise"),
      ($[($.StringFormatUnknown = 48)] = "StringFormatUnknown"),
      ($[($.StringFormat = 49)] = "StringFormat"),
      ($[($.StringMaxLength = 50)] = "StringMaxLength"),
      ($[($.StringMinLength = 51)] = "StringMinLength"),
      ($[($.StringPattern = 52)] = "StringPattern"),
      ($[($.String = 53)] = "String"),
      ($[($.Symbol = 54)] = "Symbol"),
      ($[($.TupleLength = 55)] = "TupleLength"),
      ($[($.Tuple = 56)] = "Tuple"),
      ($[($.Uint8ArrayMaxByteLength = 57)] = "Uint8ArrayMaxByteLength"),
      ($[($.Uint8ArrayMinByteLength = 58)] = "Uint8ArrayMinByteLength"),
      ($[($.Uint8Array = 59)] = "Uint8Array"),
      ($[($.Undefined = 60)] = "Undefined"),
      ($[($.Union = 61)] = "Union"),
      ($[($.Void = 62)] = "Void");
  })(k || (a6.ValueErrorType = k = {}));

  class S8 extends p0.TypeBoxError {
    constructor($) {
      super("Unknown type");
      this.schema = $;
    }
  }
  a6.ValueErrorsUnknownTypeError = S8;

  class L8 {
    constructor($) {
      this.iterator = $;
    }
    [Symbol.iterator]() {
      return this.iterator;
    }
    First() {
      const $ = this.iterator.next();
      return $.done ? undefined : $.value;
    }
  }
  a6.ValueErrorIterator = L8;
  a6.Errors = SQ;
});
var L$ = H0((K1) => {
  var CQ =
      (K1 && K1.__createBinding) ||
      (Object.create
        ? function ($, W, Y, X) {
            if (X === undefined) X = Y;
            var Z = Object.getOwnPropertyDescriptor(W, Y);
            if (
              !Z ||
              ("get" in Z ? !W.__esModule : Z.writable || Z.configurable)
            )
              Z = {
                enumerable: true,
                get: function () {
                  return W[Y];
                },
              };
            Object.defineProperty($, X, Z);
          }
        : function ($, W, Y, X) {
            if (X === undefined) X = Y;
            $[X] = W[Y];
          }),
    IQ =
      (K1 && K1.__exportStar) ||
      function ($, W) {
        for (var Y in $)
          if (Y !== "default" && !Object.prototype.hasOwnProperty.call(W, Y))
            CQ(W, $, Y);
      };
  Object.defineProperty(K1, "__esModule", { value: true });
  IQ(a1(), K1);
});
var j$ = H0((WW) => {
  Object.defineProperty(WW, "__esModule", { value: true });
  WW.ValuePointer =
    WW.ValuePointerRootDeleteError =
    WW.ValuePointerRootSetError =
      undefined;

  class j8 extends Error {
    constructor($, W, Y) {
      super("Cannot set root value");
      (this.value = $), (this.path = W), (this.update = Y);
    }
  }
  WW.ValuePointerRootSetError = j8;

  class O8 extends Error {
    constructor($, W) {
      super("Cannot delete root value");
      (this.value = $), (this.path = W);
    }
  }
  WW.ValuePointerRootDeleteError = O8;
  var $W;
  (function ($) {
    function W(q) {
      return q.indexOf("~") === -1
        ? q
        : q.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    function* Y(q) {
      if (q === "") return;
      let [F, D] = [0, 0];
      for (let B = 0; B < q.length; B++)
        if (q.charAt(B) === "/")
          if (B === 0) F = B + 1;
          else (D = B), yield W(q.slice(F, D)), (F = B + 1);
        else D = B;
      yield W(q.slice(F));
    }
    $.Format = Y;
    function X(q, F, D) {
      if (F === "") throw new j8(q, F, D);
      let [B, K, I] = [null, q, ""];
      for (let w of Y(F)) {
        if (K[w] === undefined) K[w] = {};
        (B = K), (K = K[w]), (I = w);
      }
      B[I] = D;
    }
    $.Set = X;
    function Z(q, F) {
      if (F === "") throw new O8(q, F);
      let [D, B, K] = [null, q, ""];
      for (let I of Y(F)) {
        if (B[I] === undefined || B[I] === null) return;
        (D = B), (B = B[I]), (K = I);
      }
      if (Array.isArray(D)) {
        const I = parseInt(K);
        D.splice(I, 1);
      } else delete D[K];
    }
    $.Delete = Z;
    function Q(q, F) {
      if (F === "") return true;
      let [D, B, K] = [null, q, ""];
      for (let I of Y(F)) {
        if (B[I] === undefined) return false;
        (D = B), (B = B[I]), (K = I);
      }
      return Object.getOwnPropertyNames(D).includes(K);
    }
    $.Has = Q;
    function J(q, F) {
      if (F === "") return q;
      let D = q;
      for (let B of Y(F)) {
        if (D[B] === undefined) return;
        D = D[B];
      }
      return D;
    }
    $.Get = J;
  })($W || (WW.ValuePointer = $W = {}));
});
var i1 = H0((XW) => {
  var bQ = function ($) {
      return [
        ...Object.getOwnPropertyNames($),
        ...Object.getOwnPropertySymbols($),
      ].reduce((Y, X) => ({ ...Y, [X]: C8($[X]) }), {});
    },
    _Q = function ($) {
      return $.map((W) => C8(W));
    },
    EQ = function ($) {
      return $.slice();
    },
    VQ = function ($) {
      return new Date($.toISOString());
    },
    xQ = function ($) {
      return $;
    },
    C8 = function ($) {
      if ((0, $$.IsArray)($)) return _Q($);
      if ((0, $$.IsDate)($)) return VQ($);
      if ((0, $$.IsPlainObject)($)) return bQ($);
      if ((0, $$.IsTypedArray)($)) return EQ($);
      if ((0, $$.IsValueType)($)) return xQ($);
      throw new Error("ValueClone: Unable to clone value");
    };
  Object.defineProperty(XW, "__esModule", { value: true });
  XW.Clone = undefined;
  var $$ = k0();
  XW.Clone = C8;
});
var b8 = H0((zW) => {
  var W$ = function ($, W) {
      return { type: "update", path: $, value: W };
    },
    QW = function ($, W) {
      return { type: "insert", path: $, value: W };
    },
    JW = function ($) {
      return { type: "delete", path: $ };
    };
  function* kQ($, W, Y) {
    if (!(0, E0.IsPlainObject)(Y)) return yield W$($, Y);
    const X = [...Object.keys(W), ...Object.getOwnPropertySymbols(W)],
      Z = [...Object.keys(Y), ...Object.getOwnPropertySymbols(Y)];
    for (let Q of X) {
      if ((0, E0.IsSymbol)(Q)) throw new m1(Q);
      if ((0, E0.IsUndefined)(Y[Q]) && Z.includes(Q))
        yield W$(`${$}/${String(Q)}`, undefined);
    }
    for (let Q of Z) {
      if ((0, E0.IsUndefined)(W[Q]) || (0, E0.IsUndefined)(Y[Q])) continue;
      if ((0, E0.IsSymbol)(Q)) throw new m1(Q);
      yield* O$(`${$}/${String(Q)}`, W[Q], Y[Q]);
    }
    for (let Q of Z) {
      if ((0, E0.IsSymbol)(Q)) throw new m1(Q);
      if ((0, E0.IsUndefined)(W[Q])) yield QW(`${$}/${String(Q)}`, Y[Q]);
    }
    for (let Q of X.reverse()) {
      if ((0, E0.IsSymbol)(Q)) throw new m1(Q);
      if ((0, E0.IsUndefined)(Y[Q]) && !Z.includes(Q))
        yield JW(`${$}/${String(Q)}`);
    }
  }
  function* gQ($, W, Y) {
    if (!(0, E0.IsArray)(Y)) return yield W$($, Y);
    for (let X = 0; X < Math.min(W.length, Y.length); X++)
      yield* O$(`${$}/${X}`, W[X], Y[X]);
    for (let X = 0; X < Y.length; X++) {
      if (X < W.length) continue;
      yield QW(`${$}/${X}`, Y[X]);
    }
    for (let X = W.length - 1; X >= 0; X--) {
      if (X < Y.length) continue;
      yield JW(`${$}/${X}`);
    }
  }
  function* fQ($, W, Y) {
    if (
      !(0, E0.IsTypedArray)(Y) ||
      W.length !== Y.length ||
      Object.getPrototypeOf(W).constructor.name !==
        Object.getPrototypeOf(Y).constructor.name
    )
      return yield W$($, Y);
    for (let X = 0; X < Math.min(W.length, Y.length); X++)
      yield* O$(`${$}/${X}`, W[X], Y[X]);
  }
  function* TQ($, W, Y) {
    if (W === Y) return;
    yield W$($, Y);
  }
  function* O$($, W, Y) {
    if ((0, E0.IsPlainObject)(W)) return yield* kQ($, W, Y);
    if ((0, E0.IsArray)(W)) return yield* gQ($, W, Y);
    if ((0, E0.IsTypedArray)(W)) return yield* fQ($, W, Y);
    if ((0, E0.IsValueType)(W)) return yield* TQ($, W, Y);
    throw new G8(W);
  }
  var dQ = function ($, W) {
      return [...O$("", $, W)];
    },
    yQ = function ($) {
      return $.length > 0 && $[0].path === "" && $[0].type === "update";
    },
    vQ = function ($) {
      return $.length === 0;
    },
    pQ = function ($, W) {
      if (yQ(W)) return (0, R8.Clone)(W[0].value);
      if (vQ(W)) return (0, R8.Clone)($);
      const Y = (0, R8.Clone)($);
      for (let X of W)
        switch (X.type) {
          case "insert": {
            I8.ValuePointer.Set(Y, X.path, X.value);
            break;
          }
          case "update": {
            I8.ValuePointer.Set(Y, X.path, X.value);
            break;
          }
          case "delete": {
            I8.ValuePointer.Delete(Y, X.path);
            break;
          }
        }
      return Y;
    };
  Object.defineProperty(zW, "__esModule", { value: true });
  zW.Patch =
    zW.Diff =
    zW.ValueDeltaUnableToDiffUnknownValue =
    zW.ValueDeltaObjectWithSymbolKeyError =
    zW.Edit =
    zW.Delete =
    zW.Update =
    zW.Insert =
      undefined;
  var E0 = k0(),
    i0 = f0(),
    I8 = j$(),
    R8 = i1();
  zW.Insert = i0.Type.Object({
    type: i0.Type.Literal("insert"),
    path: i0.Type.String(),
    value: i0.Type.Unknown(),
  });
  zW.Update = i0.Type.Object({
    type: i0.Type.Literal("update"),
    path: i0.Type.String(),
    value: i0.Type.Unknown(),
  });
  zW.Delete = i0.Type.Object({
    type: i0.Type.Literal("delete"),
    path: i0.Type.String(),
  });
  zW.Edit = i0.Type.Union([zW.Insert, zW.Update, zW.Delete]);

  class m1 extends Error {
    constructor($) {
      super("Cannot diff objects with symbol keys");
      this.key = $;
    }
  }
  zW.ValueDeltaObjectWithSymbolKeyError = m1;

  class G8 extends Error {
    constructor($) {
      super("Unable to create diff edits for unknown value");
      this.value = $;
    }
  }
  zW.ValueDeltaUnableToDiffUnknownValue = G8;
  zW.Diff = dQ;
  zW.Patch = pQ;
});
var AW = H0((FW) => {
  var oQ = function ($, W, Y, X) {
      if (!(0, d0.IsPlainObject)(Y))
        C$.ValuePointer.Set($, W, (0, _8.Clone)(X));
      else {
        const Z = Object.keys(Y),
          Q = Object.keys(X);
        for (let J of Z) if (!Q.includes(J)) delete Y[J];
        for (let J of Q) if (!Z.includes(J)) Y[J] = null;
        for (let J of Q) x8($, `${W}/${J}`, Y[J], X[J]);
      }
    },
    hQ = function ($, W, Y, X) {
      if (!(0, d0.IsArray)(Y)) C$.ValuePointer.Set($, W, (0, _8.Clone)(X));
      else {
        for (let Z = 0; Z < X.length; Z++) x8($, `${W}/${Z}`, Y[Z], X[Z]);
        Y.splice(X.length);
      }
    },
    cQ = function ($, W, Y, X) {
      if ((0, d0.IsTypedArray)(Y) && Y.length === X.length)
        for (let Z = 0; Z < Y.length; Z++) Y[Z] = X[Z];
      else C$.ValuePointer.Set($, W, (0, _8.Clone)(X));
    },
    lQ = function ($, W, Y, X) {
      if (Y === X) return;
      C$.ValuePointer.Set($, W, X);
    },
    x8 = function ($, W, Y, X) {
      if ((0, d0.IsArray)(X)) return hQ($, W, Y, X);
      if ((0, d0.IsTypedArray)(X)) return cQ($, W, Y, X);
      if ((0, d0.IsPlainObject)(X)) return oQ($, W, Y, X);
      if ((0, d0.IsValueType)(X)) return lQ($, W, Y, X);
    },
    UW = function ($) {
      return (0, d0.IsTypedArray)($) || (0, d0.IsValueType)($);
    },
    tQ = function ($, W) {
      return (
        ((0, d0.IsPlainObject)($) && (0, d0.IsArray)(W)) ||
        ((0, d0.IsArray)($) && (0, d0.IsPlainObject)(W))
      );
    },
    sQ = function ($, W) {
      if (UW($) || UW(W)) throw new V8();
      if (tQ($, W)) throw new E8();
      x8($, "", $, W);
    };
  Object.defineProperty(FW, "__esModule", { value: true });
  FW.Mutate =
    FW.ValueMutateInvalidRootMutationError =
    FW.ValueMutateTypeMismatchError =
      undefined;
  var d0 = k0(),
    C$ = j$(),
    _8 = i1();

  class E8 extends Error {
    constructor() {
      super("Cannot assign due type mismatch of assignable values");
    }
  }
  FW.ValueMutateTypeMismatchError = E8;

  class V8 extends Error {
    constructor() {
      super("Only object and array types can be mutated at the root level");
    }
  }
  FW.ValueMutateInvalidRootMutationError = V8;
  FW.Mutate = sQ;
});
var KW = H0((wW) => {
  var eQ = function ($, W) {
      if (!(0, Q1.IsPlainObject)(W)) return false;
      const Y = [...Object.keys($), ...Object.getOwnPropertySymbols($)],
        X = [...Object.keys(W), ...Object.getOwnPropertySymbols(W)];
      if (Y.length !== X.length) return false;
      return Y.every((Z) => I$($[Z], W[Z]));
    },
    $4 = function ($, W) {
      return (0, Q1.IsDate)(W) && $.getTime() === W.getTime();
    },
    W4 = function ($, W) {
      if (!(0, Q1.IsArray)(W) || $.length !== W.length) return false;
      return $.every((Y, X) => I$(Y, W[X]));
    },
    Y4 = function ($, W) {
      if (
        !(0, Q1.IsTypedArray)(W) ||
        $.length !== W.length ||
        Object.getPrototypeOf($).constructor.name !==
          Object.getPrototypeOf(W).constructor.name
      )
        return false;
      return $.every((Y, X) => I$(Y, W[X]));
    },
    X4 = function ($, W) {
      return $ === W;
    },
    I$ = function ($, W) {
      if ((0, Q1.IsPlainObject)($)) return eQ($, W);
      if ((0, Q1.IsDate)($)) return $4($, W);
      if ((0, Q1.IsTypedArray)($)) return Y4($, W);
      if ((0, Q1.IsArray)($)) return W4($, W);
      if ((0, Q1.IsValueType)($)) return X4($, W);
      throw new Error("ValueEquals: Unable to compare value");
    };
  Object.defineProperty(wW, "__esModule", { value: true });
  wW.Equal = undefined;
  var Q1 = k0();
  wW.Equal = I$;
});
var R$ = H0((J1) => {
  var Z4 =
      (J1 && J1.__createBinding) ||
      (Object.create
        ? function ($, W, Y, X) {
            if (X === undefined) X = Y;
            var Z = Object.getOwnPropertyDescriptor(W, Y);
            if (
              !Z ||
              ("get" in Z ? !W.__esModule : Z.writable || Z.configurable)
            )
              Z = {
                enumerable: true,
                get: function () {
                  return W[Y];
                },
              };
            Object.defineProperty($, X, Z);
          }
        : function ($, W, Y, X) {
            if (X === undefined) X = Y;
            $[X] = W[Y];
          }),
    Q4 =
      (J1 && J1.__exportStar) ||
      function ($, W) {
        for (var Y in $)
          if (Y !== "default" && !Object.prototype.hasOwnProperty.call(W, Y))
            Z4(W, $, Y);
      };
  Object.defineProperty(J1, "__esModule", { value: true });
  J1.ValueErrorType = undefined;
  var J4 = a1();
  Object.defineProperty(J1, "ValueErrorType", {
    enumerable: true,
    get: function () {
      return J4.ValueErrorType;
    },
  });
  Q4(D8(), J1);
});
var X$ = H0((SW) => {
  var H4 = function ($) {
      return $[I0.Kind] === "Any" || $[I0.Kind] === "Unknown";
    },
    $0 = function ($) {
      return $ !== undefined;
    },
    q4 = function ($, W, Y) {
      return true;
    },
    M4 = function ($, W, Y) {
      if (!(0, D0.IsArray)(Y)) return false;
      if ($0($.minItems) && !(Y.length >= $.minItems)) return false;
      if ($0($.maxItems) && !(Y.length <= $.maxItems)) return false;
      if (!Y.every((Q) => R0($.items, W, Q))) return false;
      if (
        $.uniqueItems === true &&
        !(function () {
          const Q = new Set();
          for (let J of Y) {
            const q = (0, z4.Hash)(J);
            if (Q.has(q)) return false;
            else Q.add(q);
          }
          return true;
        })()
      )
        return false;
      if (
        !(
          $0($.contains) ||
          (0, D0.IsNumber)($.minContains) ||
          (0, D0.IsNumber)($.maxContains)
        )
      )
        return true;
      const X = $0($.contains) ? $.contains : I0.Type.Never(),
        Z = Y.reduce((Q, J) => (R0(X, W, J) ? Q + 1 : Q), 0);
      if (Z === 0) return false;
      if ((0, D0.IsNumber)($.minContains) && Z < $.minContains) return false;
      if ((0, D0.IsNumber)($.maxContains) && Z > $.maxContains) return false;
      return true;
    },
    N4 = function ($, W, Y) {
      return (0, D0.IsAsyncIterator)(Y);
    },
    U4 = function ($, W, Y) {
      if (!(0, D0.IsBigInt)(Y)) return false;
      if ($0($.exclusiveMaximum) && !(Y < $.exclusiveMaximum)) return false;
      if ($0($.exclusiveMinimum) && !(Y > $.exclusiveMinimum)) return false;
      if ($0($.maximum) && !(Y <= $.maximum)) return false;
      if ($0($.minimum) && !(Y >= $.minimum)) return false;
      if ($0($.multipleOf) && Y % $.multipleOf !== BigInt(0)) return false;
      return true;
    },
    F4 = function ($, W, Y) {
      return (0, D0.IsBoolean)(Y);
    },
    B4 = function ($, W, Y) {
      return R0($.returns, W, Y.prototype);
    },
    A4 = function ($, W, Y) {
      if (!(0, D0.IsDate)(Y)) return false;
      if (
        $0($.exclusiveMaximumTimestamp) &&
        !(Y.getTime() < $.exclusiveMaximumTimestamp)
      )
        return false;
      if (
        $0($.exclusiveMinimumTimestamp) &&
        !(Y.getTime() > $.exclusiveMinimumTimestamp)
      )
        return false;
      if ($0($.maximumTimestamp) && !(Y.getTime() <= $.maximumTimestamp))
        return false;
      if ($0($.minimumTimestamp) && !(Y.getTime() >= $.minimumTimestamp))
        return false;
      if (
        $0($.multipleOfTimestamp) &&
        Y.getTime() % $.multipleOfTimestamp !== 0
      )
        return false;
      return true;
    },
    w4 = function ($, W, Y) {
      return (0, D0.IsFunction)(Y);
    },
    D4 = function ($, W, Y) {
      if (!(0, D0.IsInteger)(Y)) return false;
      if ($0($.exclusiveMaximum) && !(Y < $.exclusiveMaximum)) return false;
      if ($0($.exclusiveMinimum) && !(Y > $.exclusiveMinimum)) return false;
      if ($0($.maximum) && !(Y <= $.maximum)) return false;
      if ($0($.minimum) && !(Y >= $.minimum)) return false;
      if ($0($.multipleOf) && Y % $.multipleOf !== 0) return false;
      return true;
    },
    K4 = function ($, W, Y) {
      const X = $.allOf.every((Z) => R0(Z, W, Y));
      if ($.unevaluatedProperties === false) {
        const Z = new RegExp(I0.KeyResolver.ResolvePattern($)),
          Q = Object.getOwnPropertyNames(Y).every((J) => Z.test(J));
        return X && Q;
      } else if (I0.TypeGuard.TSchema($.unevaluatedProperties)) {
        const Z = new RegExp(I0.KeyResolver.ResolvePattern($)),
          Q = Object.getOwnPropertyNames(Y).every(
            (J) => Z.test(J) || R0($.unevaluatedProperties, W, Y[J])
          );
        return X && Q;
      } else return X;
    },
    P4 = function ($, W, Y) {
      return (0, D0.IsIterator)(Y);
    },
    S4 = function ($, W, Y) {
      return Y === $.const;
    },
    L4 = function ($, W, Y) {
      return false;
    },
    j4 = function ($, W, Y) {
      return !R0($.not, W, Y);
    },
    O4 = function ($, W, Y) {
      return (0, D0.IsNull)(Y);
    },
    C4 = function ($, W, Y) {
      if (!Y$.TypeSystemPolicy.IsNumberLike(Y)) return false;
      if ($0($.exclusiveMaximum) && !(Y < $.exclusiveMaximum)) return false;
      if ($0($.exclusiveMinimum) && !(Y > $.exclusiveMinimum)) return false;
      if ($0($.minimum) && !(Y >= $.minimum)) return false;
      if ($0($.maximum) && !(Y <= $.maximum)) return false;
      if ($0($.multipleOf) && Y % $.multipleOf !== 0) return false;
      return true;
    },
    I4 = function ($, W, Y) {
      if (!Y$.TypeSystemPolicy.IsObjectLike(Y)) return false;
      if (
        $0($.minProperties) &&
        !(Object.getOwnPropertyNames(Y).length >= $.minProperties)
      )
        return false;
      if (
        $0($.maxProperties) &&
        !(Object.getOwnPropertyNames(Y).length <= $.maxProperties)
      )
        return false;
      const X = Object.getOwnPropertyNames($.properties);
      for (let Z of X) {
        const Q = $.properties[Z];
        if ($.required && $.required.includes(Z)) {
          if (!R0(Q, W, Y[Z])) return false;
          if ((I0.ExtendsUndefined.Check(Q) || H4(Q)) && !(Z in Y))
            return false;
        } else if (
          Y$.TypeSystemPolicy.IsExactOptionalProperty(Y, Z) &&
          !R0(Q, W, Y[Z])
        )
          return false;
      }
      if ($.additionalProperties === false) {
        const Z = Object.getOwnPropertyNames(Y);
        if (
          $.required &&
          $.required.length === X.length &&
          Z.length === X.length
        )
          return true;
        else return Z.every((Q) => X.includes(Q));
      } else if (typeof $.additionalProperties === "object")
        return Object.getOwnPropertyNames(Y).every(
          (Q) => X.includes(Q) || R0($.additionalProperties, W, Y[Q])
        );
      else return true;
    },
    R4 = function ($, W, Y) {
      return (0, D0.IsPromise)(Y);
    },
    G4 = function ($, W, Y) {
      if (!Y$.TypeSystemPolicy.IsRecordLike(Y)) return false;
      if (
        $0($.minProperties) &&
        !(Object.getOwnPropertyNames(Y).length >= $.minProperties)
      )
        return false;
      if (
        $0($.maxProperties) &&
        !(Object.getOwnPropertyNames(Y).length <= $.maxProperties)
      )
        return false;
      const [X, Z] = Object.entries($.patternProperties)[0],
        Q = new RegExp(X),
        J = Object.entries(Y).every(([D, B]) => {
          return Q.test(D) ? R0(Z, W, B) : true;
        }),
        q =
          typeof $.additionalProperties === "object"
            ? Object.entries(Y).every(([D, B]) => {
                return !Q.test(D) ? R0($.additionalProperties, W, B) : true;
              })
            : true,
        F =
          $.additionalProperties === false
            ? Object.getOwnPropertyNames(Y).every((D) => {
                return Q.test(D);
              })
            : true;
      return J && q && F;
    },
    b4 = function ($, W, Y) {
      return R0((0, PW.Deref)($, W), W, Y);
    },
    _4 = function ($, W, Y) {
      if (!(0, D0.IsString)(Y)) return false;
      if ($0($.minLength)) {
        if (!(Y.length >= $.minLength)) return false;
      }
      if ($0($.maxLength)) {
        if (!(Y.length <= $.maxLength)) return false;
      }
      if ($0($.pattern)) {
        if (!new RegExp($.pattern).test(Y)) return false;
      }
      if ($0($.format)) {
        if (!I0.FormatRegistry.Has($.format)) return false;
        return I0.FormatRegistry.Get($.format)(Y);
      }
      return true;
    },
    E4 = function ($, W, Y) {
      return (0, D0.IsSymbol)(Y);
    },
    V4 = function ($, W, Y) {
      return (0, D0.IsString)(Y) && new RegExp($.pattern).test(Y);
    },
    x4 = function ($, W, Y) {
      return R0((0, PW.Deref)($, W), W, Y);
    },
    k4 = function ($, W, Y) {
      if (!(0, D0.IsArray)(Y)) return false;
      if ($.items === undefined && Y.length !== 0) return false;
      if (Y.length !== $.maxItems) return false;
      if (!$.items) return true;
      for (let X = 0; X < $.items.length; X++)
        if (!R0($.items[X], W, Y[X])) return false;
      return true;
    },
    g4 = function ($, W, Y) {
      return (0, D0.IsUndefined)(Y);
    },
    f4 = function ($, W, Y) {
      return $.anyOf.some((X) => R0(X, W, Y));
    },
    T4 = function ($, W, Y) {
      if (!(0, D0.IsUint8Array)(Y)) return false;
      if ($0($.maxByteLength) && !(Y.length <= $.maxByteLength)) return false;
      if ($0($.minByteLength) && !(Y.length >= $.minByteLength)) return false;
      return true;
    },
    d4 = function ($, W, Y) {
      return true;
    },
    y4 = function ($, W, Y) {
      return Y$.TypeSystemPolicy.IsVoidLike(Y);
    },
    v4 = function ($, W, Y) {
      if (!I0.TypeRegistry.Has($[I0.Kind])) return false;
      return I0.TypeRegistry.Get($[I0.Kind])($, Y);
    },
    R0 = function ($, W, Y) {
      const X = $0($.$id) ? [...W, $] : W,
        Z = $;
      switch (Z[I0.Kind]) {
        case "Any":
          return q4(Z, X, Y);
        case "Array":
          return M4(Z, X, Y);
        case "AsyncIterator":
          return N4(Z, X, Y);
        case "BigInt":
          return U4(Z, X, Y);
        case "Boolean":
          return F4(Z, X, Y);
        case "Constructor":
          return B4(Z, X, Y);
        case "Date":
          return A4(Z, X, Y);
        case "Function":
          return w4(Z, X, Y);
        case "Integer":
          return D4(Z, X, Y);
        case "Intersect":
          return K4(Z, X, Y);
        case "Iterator":
          return P4(Z, X, Y);
        case "Literal":
          return S4(Z, X, Y);
        case "Never":
          return L4(Z, X, Y);
        case "Not":
          return j4(Z, X, Y);
        case "Null":
          return O4(Z, X, Y);
        case "Number":
          return C4(Z, X, Y);
        case "Object":
          return I4(Z, X, Y);
        case "Promise":
          return R4(Z, X, Y);
        case "Record":
          return G4(Z, X, Y);
        case "Ref":
          return b4(Z, X, Y);
        case "String":
          return _4(Z, X, Y);
        case "Symbol":
          return E4(Z, X, Y);
        case "TemplateLiteral":
          return V4(Z, X, Y);
        case "This":
          return x4(Z, X, Y);
        case "Tuple":
          return k4(Z, X, Y);
        case "Undefined":
          return g4(Z, X, Y);
        case "Union":
          return f4(Z, X, Y);
        case "Uint8Array":
          return T4(Z, X, Y);
        case "Unknown":
          return d4(Z, X, Y);
        case "Void":
          return y4(Z, X, Y);
        default:
          if (!I0.TypeRegistry.Has(Z[I0.Kind])) throw new k8(Z);
          return v4(Z, X, Y);
      }
    },
    p4 = function (...$) {
      return $.length === 3 ? R0($[0], $[1], $[2]) : R0($[0], [], $[1]);
    };
  Object.defineProperty(SW, "__esModule", { value: true });
  SW.Check = SW.ValueCheckUnknownTypeError = undefined;
  var D0 = k0(),
    Y$ = R$(),
    PW = F1(),
    z4 = e1(),
    I0 = f0();

  class k8 extends I0.TypeBoxError {
    constructor($) {
      super("Unknown type");
      this.schema = $;
    }
  }
  SW.ValueCheckUnknownTypeError = k8;
  SW.Check = p4;
});
var p8 = H0((IW) => {
  var u4 = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else return {};
    },
    n4 = function ($, W) {
      if ($.uniqueItems === true && !(0, W0.HasPropertyKey)($, "default"))
        throw new Error(
          "ValueCreate.Array: Array with the uniqueItems constraint requires a default value"
        );
      else if ("contains" in $ && !(0, W0.HasPropertyKey)($, "default"))
        throw new Error(
          "ValueCreate.Array: Array with the contains constraint requires a default value"
        );
      else if ("default" in $) return $.default;
      else if ($.minItems !== undefined)
        return Array.from({ length: $.minItems }).map((Y) => {
          return y0($.items, W);
        });
      else return [];
    },
    o4 = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else return (async function* () {})();
    },
    h4 = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else return BigInt(0);
    },
    c4 = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else return false;
    },
    l4 = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else {
        const Y = y0($.returns, W);
        if (typeof Y === "object" && !Array.isArray(Y))
          return class {
            constructor() {
              for (let [X, Z] of Object.entries(Y)) {
                const Q = this;
                Q[X] = Z;
              }
            }
          };
        else return class {};
      }
    },
    t4 = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else if ($.minimumTimestamp !== undefined)
        return new Date($.minimumTimestamp);
      else return new Date(0);
    },
    s4 = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else return () => y0($.returns, W);
    },
    r4 = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else if ($.minimum !== undefined) return $.minimum;
      else return 0;
    },
    a4 = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else {
        const Y = $.allOf.reduce((X, Z) => {
          const Q = y0(Z, W);
          return typeof Q === "object" ? { ...X, ...Q } : Q;
        }, {});
        if (!(0, m4.Check)($, W, Y)) throw new d8($);
        return Y;
      }
    },
    e4 = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else return (function* () {})();
    },
    $J = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else return $.const;
    },
    WJ = function ($, W) {
      throw new f8($);
    },
    YJ = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else throw new T8($);
    },
    XJ = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else return null;
    },
    ZJ = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else if ($.minimum !== undefined) return $.minimum;
      else return 0;
    },
    QJ = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else {
        const Y = new Set($.required);
        return (
          $.default ||
          Object.entries($.properties).reduce((X, [Z, Q]) => {
            return Y.has(Z) ? { ...X, [Z]: y0(Q, W) } : { ...X };
          }, {})
        );
      }
    },
    JJ = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else return Promise.resolve(y0($.item, W));
    },
    zJ = function ($, W) {
      const [Y, X] = Object.entries($.patternProperties)[0];
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else if (!(Y === g0.PatternStringExact || Y === g0.PatternNumberExact))
        return Y.slice(1, Y.length - 1)
          .split("|")
          .reduce((Q, J) => {
            return { ...Q, [J]: y0(X, W) };
          }, {});
      else return {};
    },
    HJ = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else return y0((0, OW.Deref)($, W), W);
    },
    qJ = function ($, W) {
      if ($.pattern !== undefined)
        if (!(0, W0.HasPropertyKey)($, "default"))
          throw new Error(
            "ValueCreate.String: String types with patterns must specify a default value"
          );
        else return $.default;
      else if ($.format !== undefined)
        if (!(0, W0.HasPropertyKey)($, "default"))
          throw new Error(
            "ValueCreate.String: String types with formats must specify a default value"
          );
        else return $.default;
      else if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else if ($.minLength !== undefined)
        return Array.from({ length: $.minLength })
          .map(() => ".")
          .join("");
      else return "";
    },
    MJ = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else if ("value" in $) return Symbol.for($.value);
      else return Symbol();
    },
    NJ = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      const Y = g0.TemplateLiteralParser.ParseExact($.pattern);
      if (!g0.TemplateLiteralFinite.Check(Y)) throw new y8($);
      return g0.TemplateLiteralGenerator.Generate(Y).next().value;
    },
    UJ = function ($, W) {
      if (CW++ > jW) throw new v8($, jW);
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else return y0((0, OW.Deref)($, W), W);
    },
    FJ = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      if ($.items === undefined) return [];
      else
        return Array.from({ length: $.minItems }).map((Y, X) =>
          y0($.items[X], W)
        );
    },
    BJ = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else return;
    },
    AJ = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else if ($.anyOf.length === 0)
        throw new Error(
          "ValueCreate.Union: Cannot create Union with zero variants"
        );
      else return y0($.anyOf[0], W);
    },
    wJ = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else if ($.minByteLength !== undefined)
        return new Uint8Array($.minByteLength);
      else return new Uint8Array(0);
    },
    DJ = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else return {};
    },
    KJ = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else return;
    },
    PJ = function ($, W) {
      if ((0, W0.HasPropertyKey)($, "default")) return $.default;
      else throw new Error("User defined types must specify a default value");
    },
    y0 = function ($, W) {
      const Y = (0, W0.IsString)($.$id) ? [...W, $] : W,
        X = $;
      switch (X[g0.Kind]) {
        case "Any":
          return u4(X, Y);
        case "Array":
          return n4(X, Y);
        case "AsyncIterator":
          return o4(X, Y);
        case "BigInt":
          return h4(X, Y);
        case "Boolean":
          return c4(X, Y);
        case "Constructor":
          return l4(X, Y);
        case "Date":
          return t4(X, Y);
        case "Function":
          return s4(X, Y);
        case "Integer":
          return r4(X, Y);
        case "Intersect":
          return a4(X, Y);
        case "Iterator":
          return e4(X, Y);
        case "Literal":
          return $J(X, Y);
        case "Never":
          return WJ(X, Y);
        case "Not":
          return YJ(X, Y);
        case "Null":
          return XJ(X, Y);
        case "Number":
          return ZJ(X, Y);
        case "Object":
          return QJ(X, Y);
        case "Promise":
          return JJ(X, Y);
        case "Record":
          return zJ(X, Y);
        case "Ref":
          return HJ(X, Y);
        case "String":
          return qJ(X, Y);
        case "Symbol":
          return MJ(X, Y);
        case "TemplateLiteral":
          return NJ(X, Y);
        case "This":
          return UJ(X, Y);
        case "Tuple":
          return FJ(X, Y);
        case "Undefined":
          return BJ(X, Y);
        case "Union":
          return AJ(X, Y);
        case "Uint8Array":
          return wJ(X, Y);
        case "Unknown":
          return DJ(X, Y);
        case "Void":
          return KJ(X, Y);
        default:
          if (!g0.TypeRegistry.Has(X[g0.Kind])) throw new g8(X);
          return PJ(X, Y);
      }
    },
    SJ = function (...$) {
      return (CW = 0), $.length === 2 ? y0($[0], $[1]) : y0($[0], []);
    };
  Object.defineProperty(IW, "__esModule", { value: true });
  IW.Create =
    IW.ValueCreateRecursiveInstantiationError =
    IW.ValueCreateTempateLiteralTypeError =
    IW.ValueCreateIntersectTypeError =
    IW.ValueCreateNotTypeError =
    IW.ValueCreateNeverTypeError =
    IW.ValueCreateUnknownTypeError =
      undefined;
  var W0 = k0(),
    m4 = X$(),
    OW = F1(),
    g0 = f0();

  class g8 extends g0.TypeBoxError {
    constructor($) {
      super("Unknown type");
      this.schema = $;
    }
  }
  IW.ValueCreateUnknownTypeError = g8;

  class f8 extends g0.TypeBoxError {
    constructor($) {
      super("Never types cannot be created");
      this.schema = $;
    }
  }
  IW.ValueCreateNeverTypeError = f8;

  class T8 extends g0.TypeBoxError {
    constructor($) {
      super("Not types must have a default value");
      this.schema = $;
    }
  }
  IW.ValueCreateNotTypeError = T8;

  class d8 extends g0.TypeBoxError {
    constructor($) {
      super(
        "Intersect produced invalid value. Consider using a default value."
      );
      this.schema = $;
    }
  }
  IW.ValueCreateIntersectTypeError = d8;

  class y8 extends g0.TypeBoxError {
    constructor($) {
      super(
        "Can only create template literal values from patterns that produce finite sequences. Consider using a default value."
      );
      this.schema = $;
    }
  }
  IW.ValueCreateTempateLiteralTypeError = y8;

  class v8 extends g0.TypeBoxError {
    constructor($, W) {
      super(
        "Value cannot be created as recursive type may produce value of infinite size. Consider using a default."
      );
      (this.schema = $), (this.recursiveMaxDepth = W);
    }
  }
  IW.ValueCreateRecursiveInstantiationError = v8;
  var jW = 512,
    CW = 0;
  IW.Create = SJ;
});
var kW = H0((VW) => {
  var _W = function ($, W, Y) {
      return (0, m0.Check)($, W, Y) ? (0, u1.Clone)(Y) : (0, H1.Create)($, W);
    },
    m8 = function ($, W, Y) {
      return (0, m0.Check)($, W, Y) ? Y : (0, H1.Create)($, W);
    },
    GJ = function ($, W, Y) {
      if ((0, m0.Check)($, W, Y)) return (0, u1.Clone)(Y);
      const X = (0, B1.IsArray)(Y) ? (0, u1.Clone)(Y) : (0, H1.Create)($, W),
        Z =
          (0, B1.IsNumber)($.minItems) && X.length < $.minItems
            ? [
                ...X,
                ...Array.from({ length: $.minItems - X.length }, () => null),
              ]
            : X,
        J = (
          (0, B1.IsNumber)($.maxItems) && Z.length > $.maxItems
            ? Z.slice(0, $.maxItems)
            : Z
        ).map((F) => r0($.items, W, F));
      if ($.uniqueItems !== true) return J;
      const q = [...new Set(J)];
      if (!(0, m0.Check)($, W, q)) throw new u8($, q);
      return q;
    },
    bJ = function ($, W, Y) {
      if ((0, m0.Check)($, W, Y)) return (0, H1.Create)($, W);
      const X = new Set($.returns.required || []),
        Z = function () {};
      for (let [Q, J] of Object.entries($.returns.properties)) {
        if (!X.has(Q) && Y.prototype[Q] === undefined) continue;
        Z.prototype[Q] = r0(J, W, Y.prototype[Q]);
      }
      return Z;
    },
    _J = function ($, W, Y) {
      const X = (0, H1.Create)($, W),
        Z =
          (0, B1.IsPlainObject)(X) && (0, B1.IsPlainObject)(Y)
            ? { ...X, ...Y }
            : Y;
      return (0, m0.Check)($, W, Z) ? Z : (0, H1.Create)($, W);
    },
    EJ = function ($, W, Y) {
      throw new n8($);
    },
    VJ = function ($, W, Y) {
      if ((0, m0.Check)($, W, Y)) return Y;
      if (Y === null || typeof Y !== "object") return (0, H1.Create)($, W);
      const X = new Set($.required || []),
        Z = {};
      for (let [Q, J] of Object.entries($.properties)) {
        if (!X.has(Q) && Y[Q] === undefined) continue;
        Z[Q] = r0(J, W, Y[Q]);
      }
      if (typeof $.additionalProperties === "object") {
        const Q = Object.getOwnPropertyNames($.properties);
        for (let J of Object.getOwnPropertyNames(Y)) {
          if (Q.includes(J)) continue;
          Z[J] = r0($.additionalProperties, W, Y[J]);
        }
      }
      return Z;
    },
    xJ = function ($, W, Y) {
      if ((0, m0.Check)($, W, Y)) return (0, u1.Clone)(Y);
      if (
        Y === null ||
        typeof Y !== "object" ||
        Array.isArray(Y) ||
        Y instanceof Date
      )
        return (0, H1.Create)($, W);
      const X = Object.getOwnPropertyNames($.patternProperties)[0],
        Z = $.patternProperties[X],
        Q = {};
      for (let [J, q] of Object.entries(Y)) Q[J] = r0(Z, W, q);
      return Q;
    },
    kJ = function ($, W, Y) {
      return r0((0, GW.Deref)($, W), W, Y);
    },
    gJ = function ($, W, Y) {
      return r0((0, GW.Deref)($, W), W, Y);
    },
    fJ = function ($, W, Y) {
      if ((0, m0.Check)($, W, Y)) return (0, u1.Clone)(Y);
      if (!(0, B1.IsArray)(Y)) return (0, H1.Create)($, W);
      if ($.items === undefined) return [];
      return $.items.map((X, Z) => r0(X, W, Y[Z]));
    },
    TJ = function ($, W, Y) {
      return (0, m0.Check)($, W, Y) ? (0, u1.Clone)(Y) : i8.Create($, W, Y);
    },
    r0 = function ($, W, Y) {
      const X = (0, B1.IsString)($.$id) ? [...W, $] : W,
        Z = $;
      switch ($[z1.Kind]) {
        case "Array":
          return GJ(Z, X, Y);
        case "Constructor":
          return bJ(Z, X, Y);
        case "Intersect":
          return _J(Z, X, Y);
        case "Never":
          return EJ(Z, X, Y);
        case "Object":
          return VJ(Z, X, Y);
        case "Record":
          return xJ(Z, X, Y);
        case "Ref":
          return kJ(Z, X, Y);
        case "This":
          return gJ(Z, X, Y);
        case "Tuple":
          return fJ(Z, X, Y);
        case "Union":
          return TJ(Z, X, Y);
        case "Date":
        case "Symbol":
        case "Uint8Array":
          return _W($, W, Y);
        case "Any":
        case "AsyncIterator":
        case "BigInt":
        case "Boolean":
        case "Function":
        case "Integer":
        case "Iterator":
        case "Literal":
        case "Not":
        case "Null":
        case "Number":
        case "Promise":
        case "String":
        case "TemplateLiteral":
        case "Undefined":
        case "Unknown":
        case "Void":
          return m8(Z, X, Y);
        default:
          if (!z1.TypeRegistry.Has(Z[z1.Kind])) throw new o8(Z);
          return m8(Z, X, Y);
      }
    },
    EW = function (...$) {
      return $.length === 3 ? r0($[0], $[1], $[2]) : r0($[0], [], $[1]);
    };
  Object.defineProperty(VW, "__esModule", { value: true });
  VW.Cast =
    VW.Default =
    VW.DefaultClone =
    VW.ValueCastUnknownTypeError =
    VW.ValueCastRecursiveTypeError =
    VW.ValueCastNeverTypeError =
    VW.ValueCastArrayUniqueItemsTypeError =
      undefined;
  var B1 = k0(),
    H1 = p8(),
    m0 = X$(),
    u1 = i1(),
    GW = F1(),
    z1 = f0();

  class u8 extends z1.TypeBoxError {
    constructor($, W) {
      super("Array cast produced invalid data due to uniqueItems constraint");
      (this.schema = $), (this.value = W);
    }
  }
  VW.ValueCastArrayUniqueItemsTypeError = u8;

  class n8 extends z1.TypeBoxError {
    constructor($) {
      super("Never types cannot be cast");
      this.schema = $;
    }
  }
  VW.ValueCastNeverTypeError = n8;

  class bW extends z1.TypeBoxError {
    constructor($) {
      super("Cannot cast recursive schemas");
      this.schema = $;
    }
  }
  VW.ValueCastRecursiveTypeError = bW;

  class o8 extends z1.TypeBoxError {
    constructor($) {
      super("Unknown type");
      this.schema = $;
    }
  }
  VW.ValueCastUnknownTypeError = o8;
  var i8;
  (function ($) {
    function W(Z, Q, J) {
      if (
        Z[z1.Kind] === "Object" &&
        typeof J === "object" &&
        !(0, B1.IsNull)(J)
      ) {
        const q = Z,
          F = Object.getOwnPropertyNames(J),
          D = Object.entries(q.properties),
          [B, K] = [1 / D.length, D.length];
        return D.reduce((I, [w, U]) => {
          const P = U[z1.Kind] === "Literal" && U.const === J[w] ? K : 0,
            N = (0, m0.Check)(U, Q, J[w]) ? B : 0,
            O = F.includes(w) ? B : 0;
          return I + (P + N + O);
        }, 0);
      } else return (0, m0.Check)(Z, Q, J) ? 1 : 0;
    }
    function Y(Z, Q, J) {
      let [q, F] = [Z.anyOf[0], 0];
      for (let D of Z.anyOf) {
        const B = W(D, Q, J);
        if (B > F) (q = D), (F = B);
      }
      return q;
    }
    function X(Z, Q, J) {
      if ("default" in Z) return Z.default;
      else {
        const q = Y(Z, Q, J);
        return EW(q, Q, J);
      }
    }
    $.Create = X;
  })(i8 || (i8 = {}));
  VW.DefaultClone = _W;
  VW.Default = m8;
  VW.Cast = EW;
});
var pW = H0((yW) => {
  var b$ = function ($) {
      return (0, J0.IsString)($) && !isNaN($) && !isNaN(parseFloat($));
    },
    oJ = function ($) {
      return (0, J0.IsBigInt)($) || (0, J0.IsBoolean)($) || (0, J0.IsNumber)($);
    },
    Z$ = function ($) {
      return (
        $ === true ||
        ((0, J0.IsNumber)($) && $ === 1) ||
        ((0, J0.IsBigInt)($) && $ === BigInt("1")) ||
        ((0, J0.IsString)($) && ($.toLowerCase() === "true" || $ === "1"))
      );
    },
    Q$ = function ($) {
      return (
        $ === false ||
        ((0, J0.IsNumber)($) && ($ === 0 || Object.is($, -0))) ||
        ((0, J0.IsBigInt)($) && $ === BigInt("0")) ||
        ((0, J0.IsString)($) &&
          ($.toLowerCase() === "false" || $ === "0" || $ === "-0"))
      );
    },
    hJ = function ($) {
      return (
        (0, J0.IsString)($) &&
        /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(
          $
        )
      );
    },
    cJ = function ($) {
      return (
        (0, J0.IsString)($) &&
        /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test($)
      );
    },
    lJ = function ($) {
      return (
        (0, J0.IsString)($) &&
        /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(
          $
        )
      );
    },
    tJ = function ($) {
      return (
        (0, J0.IsString)($) &&
        /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(
          $
        )
      );
    },
    sJ = function ($) {
      return (0, J0.IsString)($) && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test($);
    },
    rJ = function ($, W) {
      const Y = TW($);
      return Y === W ? Y : $;
    },
    aJ = function ($, W) {
      const Y = dW($);
      return Y === W ? Y : $;
    },
    eJ = function ($, W) {
      const Y = fW($);
      return Y === W ? Y : $;
    },
    $9 = function ($, W) {
      if (typeof $.const === "string") return rJ(W, $.const);
      else if (typeof $.const === "number") return aJ(W, $.const);
      else if (typeof $.const === "boolean") return eJ(W, $.const);
      else return (0, uJ.Clone)(W);
    },
    fW = function ($) {
      return Z$($) ? true : Q$($) ? false : $;
    },
    W9 = function ($) {
      return b$($)
        ? BigInt(parseInt($))
        : (0, J0.IsNumber)($)
        ? BigInt($ | 0)
        : Q$($)
        ? BigInt(0)
        : Z$($)
        ? BigInt(1)
        : $;
    },
    TW = function ($) {
      return oJ($)
        ? $.toString()
        : (0, J0.IsSymbol)($) && $.description !== undefined
        ? $.description.toString()
        : $;
    },
    dW = function ($) {
      return b$($) ? parseFloat($) : Z$($) ? 1 : Q$($) ? 0 : $;
    },
    Y9 = function ($) {
      return b$($)
        ? parseInt($)
        : (0, J0.IsNumber)($)
        ? $ | 0
        : Z$($)
        ? 1
        : Q$($)
        ? 0
        : $;
    },
    X9 = function ($) {
      return (0, J0.IsString)($) && $.toLowerCase() === "null" ? null : $;
    },
    Z9 = function ($) {
      return (0, J0.IsString)($) && $ === "undefined" ? undefined : $;
    },
    Q9 = function ($) {
      return (0, J0.IsDate)($)
        ? $
        : (0, J0.IsNumber)($)
        ? new Date($)
        : Z$($)
        ? new Date(1)
        : Q$($)
        ? new Date(0)
        : b$($)
        ? new Date(parseInt($))
        : cJ($)
        ? new Date(`1970-01-01T${$}.000Z`)
        : hJ($)
        ? new Date(`1970-01-01T${$}`)
        : tJ($)
        ? new Date(`${$}.000Z`)
        : lJ($)
        ? new Date($)
        : sJ($)
        ? new Date(`${$}T00:00:00.000Z`)
        : $;
    },
    h8 = function ($) {
      return $;
    },
    J9 = function ($, W, Y) {
      if ((0, J0.IsArray)(Y)) return Y.map((X) => q1($.items, W, X));
      return Y;
    },
    z9 = function ($, W, Y) {
      return W9(Y);
    },
    H9 = function ($, W, Y) {
      return fW(Y);
    },
    q9 = function ($, W, Y) {
      return Q9(Y);
    },
    M9 = function ($, W, Y) {
      return Y9(Y);
    },
    N9 = function ($, W, Y) {
      return $9($, Y);
    },
    U9 = function ($, W, Y) {
      return X9(Y);
    },
    F9 = function ($, W, Y) {
      return dW(Y);
    },
    B9 = function ($, W, Y) {
      if ((0, J0.IsObject)(Y))
        return Object.getOwnPropertyNames($.properties).reduce((X, Z) => {
          return Y[Z] !== undefined
            ? { ...X, [Z]: q1($.properties[Z], W, Y[Z]) }
            : { ...X };
        }, Y);
      return Y;
    },
    A9 = function ($, W, Y) {
      const X = Object.getOwnPropertyNames($.patternProperties)[0],
        Z = $.patternProperties[X],
        Q = {};
      for (let [J, q] of Object.entries(Y)) Q[J] = q1(Z, W, q);
      return Q;
    },
    w9 = function ($, W, Y) {
      return q1((0, gW.Deref)($, W), W, Y);
    },
    D9 = function ($, W, Y) {
      return TW(Y);
    },
    K9 = function ($, W, Y) {
      return (0, J0.IsString)(Y) || (0, J0.IsNumber)(Y) ? Symbol(Y) : Y;
    },
    P9 = function ($, W, Y) {
      return q1((0, gW.Deref)($, W), W, Y);
    },
    S9 = function ($, W, Y) {
      if ((0, J0.IsArray)(Y) && !(0, J0.IsUndefined)($.items))
        return Y.map((X, Z) => {
          return Z < $.items.length ? q1($.items[Z], W, X) : X;
        });
      return Y;
    },
    L9 = function ($, W, Y) {
      return Z9(Y);
    },
    j9 = function ($, W, Y) {
      for (let X of $.anyOf) {
        const Z = q1(X, W, Y);
        if ((0, nJ.Check)(X, W, Z)) return Z;
      }
      return Y;
    },
    q1 = function ($, W, Y) {
      const X = (0, J0.IsString)($.$id) ? [...W, $] : W,
        Z = $;
      switch ($[G$.Kind]) {
        case "Array":
          return J9(Z, X, Y);
        case "BigInt":
          return z9(Z, X, Y);
        case "Boolean":
          return H9(Z, X, Y);
        case "Date":
          return q9(Z, X, Y);
        case "Integer":
          return M9(Z, X, Y);
        case "Literal":
          return N9(Z, X, Y);
        case "Null":
          return U9(Z, X, Y);
        case "Number":
          return F9(Z, X, Y);
        case "Object":
          return B9(Z, X, Y);
        case "Record":
          return A9(Z, X, Y);
        case "Ref":
          return w9(Z, X, Y);
        case "String":
          return D9(Z, X, Y);
        case "Symbol":
          return K9(Z, X, Y);
        case "This":
          return P9(Z, X, Y);
        case "Tuple":
          return S9(Z, X, Y);
        case "Undefined":
          return L9(Z, X, Y);
        case "Union":
          return j9(Z, X, Y);
        case "Any":
        case "AsyncIterator":
        case "Constructor":
        case "Function":
        case "Intersect":
        case "Iterator":
        case "Never":
        case "Promise":
        case "TemplateLiteral":
        case "Uint8Array":
        case "Unknown":
        case "Void":
          return h8(Y);
        default:
          if (!G$.TypeRegistry.Has(Z[G$.Kind])) throw new c8(Z);
          return h8(Y);
      }
    },
    O9 = function (...$) {
      return $.length === 3 ? q1($[0], $[1], $[2]) : q1($[0], [], $[1]);
    };
  Object.defineProperty(yW, "__esModule", { value: true });
  yW.Convert = yW.Default = yW.ValueConvertUnknownTypeError = undefined;
  var J0 = k0(),
    uJ = i1(),
    nJ = X$(),
    gW = F1(),
    G$ = f0();

  class c8 extends G$.TypeBoxError {
    constructor($) {
      super("Unknown type");
      this.schema = $;
    }
  }
  yW.ValueConvertUnknownTypeError = c8;
  yW.Default = h8;
  yW.Convert = O9;
});
var s8 = H0((hW) => {
  Object.defineProperty(hW, "__esModule", { value: true });
  hW.EncodeTransform =
    hW.DecodeTransform =
    hW.HasTransform =
    hW.TransformEncodeError =
    hW.TransformDecodeError =
    hW.TransformEncodeCheckError =
    hW.TransformDecodeCheckError =
    hW.TransformUnknownTypeError =
      undefined;
  var o0 = k0(),
    n1 = F1(),
    h = f0();

  class J$ extends h.TypeBoxError {
    constructor($) {
      super("Unknown type");
      this.schema = $;
    }
  }
  hW.TransformUnknownTypeError = J$;

  class nW extends h.TypeBoxError {
    constructor($, W, Y) {
      super("Unable to decode due to invalid value");
      (this.schema = $), (this.value = W), (this.error = Y);
    }
  }
  hW.TransformDecodeCheckError = nW;

  class oW extends h.TypeBoxError {
    constructor($, W, Y) {
      super("Unable to encode due to invalid value");
      (this.schema = $), (this.value = W), (this.error = Y);
    }
  }
  hW.TransformEncodeCheckError = oW;

  class l8 extends h.TypeBoxError {
    constructor($, W, Y) {
      super(`${Y instanceof Error ? Y.message : "Unknown error"}`);
      (this.schema = $), (this.value = W);
    }
  }
  hW.TransformDecodeError = l8;

  class t8 extends h.TypeBoxError {
    constructor($, W, Y) {
      super(`${Y instanceof Error ? Y.message : "Unknown error"}`);
      (this.schema = $), (this.value = W);
    }
  }
  hW.TransformEncodeError = t8;
  var iW;
  (function ($) {
    function W(S, R) {
      return h.TypeGuard.TTransform(S) || P(S.items, R);
    }
    function Y(S, R) {
      return h.TypeGuard.TTransform(S) || P(S.items, R);
    }
    function X(S, R) {
      return (
        h.TypeGuard.TTransform(S) ||
        P(S.returns, R) ||
        S.parameters.some((_) => P(_, R))
      );
    }
    function Z(S, R) {
      return (
        h.TypeGuard.TTransform(S) ||
        P(S.returns, R) ||
        S.parameters.some((_) => P(_, R))
      );
    }
    function Q(S, R) {
      return (
        h.TypeGuard.TTransform(S) ||
        h.TypeGuard.TTransform(S.unevaluatedProperties) ||
        S.allOf.some((_) => P(_, R))
      );
    }
    function J(S, R) {
      return h.TypeGuard.TTransform(S) || P(S.items, R);
    }
    function q(S, R) {
      return h.TypeGuard.TTransform(S) || P(S.not, R);
    }
    function F(S, R) {
      return (
        h.TypeGuard.TTransform(S) ||
        Object.values(S.properties).some((_) => P(_, R)) ||
        (h.TypeGuard.TSchema(S.additionalProperties) &&
          P(S.additionalProperties, R))
      );
    }
    function D(S, R) {
      return h.TypeGuard.TTransform(S) || P(S.item, R);
    }
    function B(S, R) {
      const _ = Object.getOwnPropertyNames(S.patternProperties)[0],
        G = S.patternProperties[_];
      return (
        h.TypeGuard.TTransform(S) ||
        P(G, R) ||
        (h.TypeGuard.TSchema(S.additionalProperties) &&
          h.TypeGuard.TTransform(S.additionalProperties))
      );
    }
    function K(S, R) {
      if (h.TypeGuard.TTransform(S)) return true;
      return P((0, n1.Deref)(S, R), R);
    }
    function I(S, R) {
      if (h.TypeGuard.TTransform(S)) return true;
      return P((0, n1.Deref)(S, R), R);
    }
    function w(S, R) {
      return (
        h.TypeGuard.TTransform(S) ||
        (h.TypeGuard.TSchema(S.items) && S.items.some((_) => P(_, R)))
      );
    }
    function U(S, R) {
      return h.TypeGuard.TTransform(S) || S.anyOf.some((_) => P(_, R));
    }
    function P(S, R) {
      const _ = (0, o0.IsString)(S.$id) ? [...R, S] : R,
        G = S;
      if (S.$id && N.has(S.$id)) return false;
      if (S.$id) N.add(S.$id);
      switch (S[h.Kind]) {
        case "Array":
          return W(G, _);
        case "AsyncIterator":
          return Y(G, _);
        case "Constructor":
          return X(G, _);
        case "Function":
          return Z(G, _);
        case "Intersect":
          return Q(G, _);
        case "Iterator":
          return J(G, _);
        case "Not":
          return q(G, _);
        case "Object":
          return F(G, _);
        case "Promise":
          return D(G, _);
        case "Record":
          return B(G, _);
        case "Ref":
          return K(G, _);
        case "This":
          return I(G, _);
        case "Tuple":
          return w(G, _);
        case "Union":
          return U(G, _);
        case "Any":
        case "BigInt":
        case "Boolean":
        case "Date":
        case "Integer":
        case "Literal":
        case "Never":
        case "Null":
        case "Number":
        case "String":
        case "Symbol":
        case "TemplateLiteral":
        case "Undefined":
        case "Uint8Array":
        case "Unknown":
        case "Void":
          return h.TypeGuard.TTransform(S);
        default:
          if (!h.TypeRegistry.Has(G[h.Kind])) throw new J$(G);
          return h.TypeGuard.TTransform(S);
      }
    }
    const N = new Set();
    function O(S, R) {
      return N.clear(), P(S, R);
    }
    $.Has = O;
  })(iW || (hW.HasTransform = iW = {}));
  var mW;
  (function ($) {
    function W(U, P) {
      try {
        return h.TypeGuard.TTransform(U) ? U[h.Transform].Decode(P) : P;
      } catch (N) {
        throw new l8(U, P, N);
      }
    }
    function Y(U, P, N) {
      const O = N.map((S) => K(U.items, P, S));
      return W(U, O);
    }
    function X(U, P, N) {
      if (!(0, o0.IsPlainObject)(N) || (0, o0.IsValueType)(N)) return W(U, N);
      const O = h.KeyResolver.ResolveKeys(U, { includePatterns: false }),
        S = Object.entries(N).reduce((_, [G, b]) => {
          return !O.includes(G)
            ? { ..._, [G]: b }
            : { ..._, [G]: W(h.IndexedAccessor.Resolve(U, [G]), b) };
        }, {});
      if (!h.TypeGuard.TTransform(U.unevaluatedProperties)) return W(U, S);
      const R = Object.entries(S).reduce((_, [G, b]) => {
        return O.includes(G)
          ? { ..._, [G]: b }
          : { ..._, [G]: W(U.unevaluatedProperties, b) };
      }, {});
      return W(U, R);
    }
    function Z(U, P, N) {
      const O = K(U.not, P, N);
      return W(U, O);
    }
    function Q(U, P, N) {
      if (!(0, o0.IsPlainObject)(N)) return W(U, N);
      const O = Object.entries(N).reduce((_, [G, b]) => {
        return !(G in U.properties)
          ? { ..._, [G]: b }
          : { ..._, [G]: K(U.properties[G], P, b) };
      }, {});
      if (!h.TypeGuard.TSchema(U.additionalProperties)) return W(U, O);
      const S = U.additionalProperties,
        R = Object.entries(O).reduce((_, [G, b]) => {
          return G in U.properties
            ? { ..._, [G]: b }
            : { ..._, [G]: K(S, P, b) };
        }, {});
      return W(U, R);
    }
    function J(U, P, N) {
      if (!(0, o0.IsPlainObject)(N)) return W(U, N);
      const O = Object.getOwnPropertyNames(U.patternProperties)[0],
        S = U.patternProperties[O],
        R = new RegExp(O),
        _ = Object.entries(N).reduce((l, [g, t]) => {
          return !R.test(g) ? { ...l, [g]: t } : { ...l, [g]: K(S, P, t) };
        }, {});
      if (!h.TypeGuard.TSchema(U.additionalProperties)) return W(U, _);
      const G = U.additionalProperties,
        b = Object.entries(_).reduce((l, [g, t]) => {
          return R.test(g) ? { ...l, [g]: t } : { ...l, [g]: K(G, P, t) };
        }, {});
      return W(U, b);
    }
    function q(U, P, N) {
      const O = (0, n1.Deref)(U, P),
        S = K(O, P, N);
      return W(U, S);
    }
    function F(U, P, N) {
      const O = (0, n1.Deref)(U, P),
        S = K(O, P, N);
      return W(U, S);
    }
    function D(U, P, N) {
      const O = (0, o0.IsArray)(U.items)
        ? U.items.map((S, R) => K(S, P, N[R]))
        : [];
      return W(U, O);
    }
    function B(U, P, N) {
      const O = W(U, N);
      for (let S of U.anyOf) {
        if (!I(S, P, O)) continue;
        return K(S, P, O);
      }
      return O;
    }
    function K(U, P, N) {
      const O = typeof U.$id === "string" ? [...P, U] : P,
        S = U;
      switch (U[h.Kind]) {
        case "Array":
          return Y(S, O, N);
        case "Intersect":
          return X(S, O, N);
        case "Not":
          return Z(S, O, N);
        case "Object":
          return Q(S, O, N);
        case "Record":
          return J(S, O, N);
        case "Ref":
          return q(S, O, N);
        case "Symbol":
          return W(S, N);
        case "This":
          return F(S, O, N);
        case "Tuple":
          return D(S, O, N);
        case "Union":
          return B(S, O, N);
        case "Any":
        case "AsyncIterator":
        case "BigInt":
        case "Boolean":
        case "Constructor":
        case "Date":
        case "Function":
        case "Integer":
        case "Iterator":
        case "Literal":
        case "Never":
        case "Null":
        case "Number":
        case "Promise":
        case "String":
        case "TemplateLiteral":
        case "Undefined":
        case "Uint8Array":
        case "Unknown":
        case "Void":
          return W(S, N);
        default:
          if (!h.TypeRegistry.Has(S[h.Kind])) throw new J$(S);
          return W(S, N);
      }
    }
    let I = () => false;
    function w(U, P, N, O) {
      return (I = O), K(U, P, N);
    }
    $.Decode = w;
  })(mW || (hW.DecodeTransform = mW = {}));
  var uW;
  (function ($) {
    function W(U, P) {
      try {
        return h.TypeGuard.TTransform(U) ? U[h.Transform].Encode(P) : P;
      } catch (N) {
        throw new t8(U, P, N);
      }
    }
    function Y(U, P, N) {
      return W(U, N).map((S) => K(U.items, P, S));
    }
    function X(U, P, N) {
      const O = W(U, N);
      if (!(0, o0.IsPlainObject)(N) || (0, o0.IsValueType)(N)) return O;
      const S = h.KeyResolver.ResolveKeys(U, { includePatterns: false }),
        R = Object.entries(O).reduce((_, [G, b]) => {
          return !S.includes(G)
            ? { ..._, [G]: b }
            : { ..._, [G]: W(h.IndexedAccessor.Resolve(U, [G]), b) };
        }, {});
      if (!h.TypeGuard.TTransform(U.unevaluatedProperties)) return W(U, R);
      return Object.entries(R).reduce((_, [G, b]) => {
        return S.includes(G)
          ? { ..._, [G]: b }
          : { ..._, [G]: W(U.unevaluatedProperties, b) };
      }, {});
    }
    function Z(U, P, N) {
      const O = W(U, N);
      return W(U.not, O);
    }
    function Q(U, P, N) {
      const O = W(U, N);
      if (!(0, o0.IsPlainObject)(N)) return O;
      const S = Object.entries(O).reduce((_, [G, b]) => {
        return !(G in U.properties)
          ? { ..._, [G]: b }
          : { ..._, [G]: K(U.properties[G], P, b) };
      }, {});
      if (!h.TypeGuard.TSchema(U.additionalProperties)) return S;
      const R = U.additionalProperties;
      return Object.entries(S).reduce((_, [G, b]) => {
        return G in U.properties ? { ..._, [G]: b } : { ..._, [G]: K(R, P, b) };
      }, {});
    }
    function J(U, P, N) {
      const O = W(U, N);
      if (!(0, o0.IsPlainObject)(N)) return O;
      const S = Object.getOwnPropertyNames(U.patternProperties)[0],
        R = U.patternProperties[S],
        _ = new RegExp(S),
        G = Object.entries(O).reduce((l, [g, t]) => {
          return !_.test(g) ? { ...l, [g]: t } : { ...l, [g]: K(R, P, t) };
        }, {});
      if (!h.TypeGuard.TSchema(U.additionalProperties)) return W(U, G);
      const b = U.additionalProperties;
      return Object.entries(G).reduce((l, [g, t]) => {
        return _.test(g) ? { ...l, [g]: t } : { ...l, [g]: K(b, P, t) };
      }, {});
    }
    function q(U, P, N) {
      const O = (0, n1.Deref)(U, P),
        S = K(O, P, N);
      return W(U, S);
    }
    function F(U, P, N) {
      const O = (0, n1.Deref)(U, P),
        S = K(O, P, N);
      return W(U, S);
    }
    function D(U, P, N) {
      const O = W(U, N);
      return (0, o0.IsArray)(U.items)
        ? U.items.map((S, R) => K(S, P, O[R]))
        : [];
    }
    function B(U, P, N) {
      for (let O of U.anyOf) {
        if (!I(O, P, N)) continue;
        const S = K(O, P, N);
        return W(U, S);
      }
      return W(U, N);
    }
    function K(U, P, N) {
      const O = typeof U.$id === "string" ? [...P, U] : P,
        S = U;
      switch (U[h.Kind]) {
        case "Array":
          return Y(S, O, N);
        case "Intersect":
          return X(S, O, N);
        case "Not":
          return Z(S, O, N);
        case "Object":
          return Q(S, O, N);
        case "Record":
          return J(S, O, N);
        case "Ref":
          return q(S, O, N);
        case "This":
          return F(S, O, N);
        case "Tuple":
          return D(S, O, N);
        case "Union":
          return B(S, O, N);
        case "Any":
        case "AsyncIterator":
        case "BigInt":
        case "Boolean":
        case "Constructor":
        case "Date":
        case "Function":
        case "Integer":
        case "Iterator":
        case "Literal":
        case "Never":
        case "Null":
        case "Number":
        case "Promise":
        case "String":
        case "Symbol":
        case "TemplateLiteral":
        case "Undefined":
        case "Uint8Array":
        case "Unknown":
        case "Void":
          return W(S, N);
        default:
          if (!h.TypeRegistry.Has(S[h.Kind])) throw new J$(S);
          return W(S, N);
      }
    }
    let I = () => false;
    function w(U, P, N, O) {
      return (I = O), K(U, P, N);
    }
    $.Encode = w;
  })(uW || (hW.EncodeTransform = uW = {}));
});
var YY = H0(($Y) => {
  Object.defineProperty($Y, "__esModule", { value: true });
  $Y.Value = undefined;
  var lW = L$(),
    k9 = AW(),
    g9 = e1(),
    f9 = KW(),
    tW = kW(),
    T9 = i1(),
    sW = pW(),
    rW = p8(),
    _$ = X$(),
    aW = b8(),
    E$ = s8(),
    eW;
  (function ($) {
    function W(...U) {
      return tW.Cast.apply(tW, U);
    }
    $.Cast = W;
    function Y(...U) {
      return rW.Create.apply(rW, U);
    }
    $.Create = Y;
    function X(...U) {
      return _$.Check.apply(_$, U);
    }
    $.Check = X;
    function Z(...U) {
      return sW.Convert.apply(sW, U);
    }
    $.Convert = Z;
    function Q(U) {
      return T9.Clone(U);
    }
    $.Clone = Q;
    function J(...U) {
      const [P, N, O] = U.length === 3 ? [U[0], U[1], U[2]] : [U[0], [], U[1]];
      if (!X(P, N, O))
        throw new E$.TransformDecodeCheckError(P, O, F(P, N, O).First());
      return E$.DecodeTransform.Decode(P, N, O, _$.Check);
    }
    $.Decode = J;
    function q(...U) {
      const [P, N, O] = U.length === 3 ? [U[0], U[1], U[2]] : [U[0], [], U[1]],
        S = E$.EncodeTransform.Encode(P, N, O, _$.Check);
      if (!X(P, N, S))
        throw new E$.TransformEncodeCheckError(P, O, F(P, N, O).First());
      return S;
    }
    $.Encode = q;
    function F(...U) {
      return lW.Errors.apply(lW, U);
    }
    $.Errors = F;
    function D(U, P) {
      return f9.Equal(U, P);
    }
    $.Equal = D;
    function B(U, P) {
      return aW.Diff(U, P);
    }
    $.Diff = B;
    function K(U) {
      return g9.Hash(U);
    }
    $.Hash = K;
    function I(U, P) {
      return aW.Patch(U, P);
    }
    $.Patch = I;
    function w(U, P) {
      k9.Mutate(U, P);
    }
    $.Mutate = w;
  })(eW || ($Y.Value = eW = {}));
});
var r8 = H0((a0) => {
  Object.defineProperty(a0, "__esModule", { value: true });
  a0.Value =
    a0.ValuePointer =
    a0.Delete =
    a0.Update =
    a0.Insert =
    a0.Edit =
    a0.ValueErrorIterator =
    a0.ValueErrorType =
      undefined;
  var XY = L$();
  Object.defineProperty(a0, "ValueErrorType", {
    enumerable: true,
    get: function () {
      return XY.ValueErrorType;
    },
  });
  Object.defineProperty(a0, "ValueErrorIterator", {
    enumerable: true,
    get: function () {
      return XY.ValueErrorIterator;
    },
  });
  var V$ = b8();
  Object.defineProperty(a0, "Edit", {
    enumerable: true,
    get: function () {
      return V$.Edit;
    },
  });
  Object.defineProperty(a0, "Insert", {
    enumerable: true,
    get: function () {
      return V$.Insert;
    },
  });
  Object.defineProperty(a0, "Update", {
    enumerable: true,
    get: function () {
      return V$.Update;
    },
  });
  Object.defineProperty(a0, "Delete", {
    enumerable: true,
    get: function () {
      return V$.Delete;
    },
  });
  var d9 = j$();
  Object.defineProperty(a0, "ValuePointer", {
    enumerable: true,
    get: function () {
      return d9.ValuePointer;
    },
  });
  var y9 = YY();
  Object.defineProperty(a0, "Value", {
    enumerable: true,
    get: function () {
      return y9.Value;
    },
  });
});
var qY = H0((Wz, HY) => {
  var i9 = function ($) {
      var W = $.indexOf("%");
      if (W === -1) return $;
      var Y = $.length,
        X = "",
        Z = 0,
        Q = 0,
        J = W,
        q = JY;
      while (W > -1 && W < Y) {
        var F = zY($[W + 1], 4),
          D = zY($[W + 2], 0),
          B = F | D,
          K = $6[B];
        if (
          ((q = $6[256 + q + K]), (Q = (Q << 6) | (B & $6[364 + K])), q === JY)
        )
          (X += $.slice(Z, J)),
            (X +=
              Q <= 65535
                ? String.fromCharCode(Q)
                : String.fromCharCode(55232 + (Q >> 10), 56320 + (Q & 1023))),
            (Q = 0),
            (Z = W + 3),
            (W = J = $.indexOf("%", Z));
        else if (q === p9) return null;
        else {
          if (((W += 3), W < Y && $.charCodeAt(W) === 37)) continue;
          return null;
        }
      }
      return X + $.slice(Z);
    },
    zY = function ($, W) {
      var Y = m9[$];
      return Y === undefined ? 255 : Y << W;
    },
    JY = 12,
    p9 = 0,
    $6 = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
      3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5,
      5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6,
      7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 10, 9, 9, 9, 11, 4, 4, 4, 4,
      4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0,
      24, 36, 48, 60, 72, 84, 96, 0, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      127, 63, 63, 63, 0, 31, 15, 15, 15, 7, 7, 7,
    ],
    m9 = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      a: 10,
      A: 10,
      b: 11,
      B: 11,
      c: 12,
      C: 12,
      d: 13,
      D: 13,
      e: 14,
      E: 14,
      f: 15,
      F: 15,
    };
  HY.exports = i9;
});
var BY = H0((Yz, FY) => {
  var u9 = function ($) {
      const W = new UY();
      if (typeof $ !== "string") return W;
      let Y = $.length,
        X = "",
        Z = "",
        Q = -1,
        J = -1,
        q = false,
        F = false,
        D = false,
        B = false,
        K = false,
        I = 0;
      for (let w = 0; w < Y + 1; w++)
        if (((I = w !== Y ? $.charCodeAt(w) : 38), I === 38)) {
          if (((K = J > Q), !K)) J = w;
          if (((X = $.slice(Q + 1, J)), K || X.length > 0)) {
            if (D) X = X.replace(NY, " ");
            if (q) X = MY(X) || X;
            if (K) {
              if (((Z = $.slice(J + 1, w)), B)) Z = Z.replace(NY, " ");
              if (F) Z = MY(Z) || Z;
            }
            const U = W[X];
            if (U === undefined) W[X] = Z;
            else if (U.pop) U.push(Z);
            else W[X] = [U, Z];
          }
          (Z = ""),
            (Q = w),
            (J = w),
            (q = false),
            (F = false),
            (D = false),
            (B = false);
        } else if (I === 61)
          if (J <= Q) J = w;
          else F = true;
        else if (I === 43)
          if (J > Q) B = true;
          else D = true;
        else if (I === 37)
          if (J > Q) F = true;
          else q = true;
      return W;
    },
    MY = qY(),
    NY = /\+/g,
    UY = function () {};
  UY.prototype = Object.create(null);
  FY.exports = u9;
});
var wY = H0((Xz, AY) => {
  var o9 = function ($) {
      const W = $.length;
      if (W === 0) return "";
      let Y = "",
        X = 0,
        Z = 0;
      $: for (; Z < W; Z++) {
        let Q = $.charCodeAt(Z);
        while (Q < 128) {
          if (n9[Q] !== 1) {
            if (X < Z) Y += $.slice(X, Z);
            (X = Z + 1), (Y += e0[Q]);
          }
          if (++Z === W) break $;
          Q = $.charCodeAt(Z);
        }
        if (X < Z) Y += $.slice(X, Z);
        if (Q < 2048) {
          (X = Z + 1), (Y += e0[192 | (Q >> 6)] + e0[128 | (Q & 63)]);
          continue;
        }
        if (Q < 55296 || Q >= 57344) {
          (X = Z + 1),
            (Y +=
              e0[224 | (Q >> 12)] +
              e0[128 | ((Q >> 6) & 63)] +
              e0[128 | (Q & 63)]);
          continue;
        }
        if ((++Z, Z >= W)) throw new Error("URI malformed");
        const J = $.charCodeAt(Z) & 1023;
        (X = Z + 1),
          (Q = 65536 + (((Q & 1023) << 10) | J)),
          (Y +=
            e0[240 | (Q >> 18)] +
            e0[128 | ((Q >> 12) & 63)] +
            e0[128 | ((Q >> 6) & 63)] +
            e0[128 | (Q & 63)]);
      }
      if (X === 0) return $;
      if (X < W) return Y + $.slice(X);
      return Y;
    },
    e0 = Array.from(
      { length: 256 },
      ($, W) => "%" + ((W < 16 ? "0" : "") + W.toString(16)).toUpperCase()
    ),
    n9 = new Int8Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
      0, 1, 0,
    ]);
  AY.exports = { encodeString: o9 };
});
var PY = H0((Zz, KY) => {
  var DY = function ($) {
      const W = typeof $;
      if (W === "string") return W6($);
      else if (W === "bigint") return $.toString();
      else if (W === "boolean") return $ ? "true" : "false";
      else if (W === "number" && Number.isFinite($))
        return $ < 1000000000000000000000 ? "" + $ : W6("" + $);
      return "";
    },
    h9 = function ($) {
      let W = "";
      if ($ === null || typeof $ !== "object") return W;
      const Y = "&",
        X = Object.keys($),
        Z = X.length;
      let Q = 0;
      for (let J = 0; J < Z; J++) {
        const q = X[J],
          F = $[q],
          D = W6(q) + "=";
        if (J) W += Y;
        if (Array.isArray(F)) {
          Q = F.length;
          for (let B = 0; B < Q; B++) {
            if (B) W += Y;
            (W += D), (W += DY(F[B]));
          }
        } else (W += D), (W += DY(F));
      }
      return W;
    },
    { encodeString: W6 } = wY();
  KY.exports = h9;
});
var Y6 = H0((Qz, H$) => {
  var SY = BY(),
    LY = PY(),
    jY = { parse: SY, stringify: LY };
  H$.exports = jY;
  H$.exports.default = jY;
  H$.exports.parse = SY;
  H$.exports.stringify = LY;
});
var GY = H0((IY) => {
  Object.defineProperty(IY, "__esModule", { value: true });
  IY.TypeCompiler =
    IY.Policy =
    IY.TypeCompilerTypeGuardError =
    IY.TypeCompilerUnknownTypeError =
    IY.TypeCheck =
      undefined;
  var q$ = s8(),
    r = k0(),
    $7 = a1(),
    M$ = R$(),
    W7 = F1(),
    Y7 = e1(),
    B0 = f0();

  class Q6 {
    constructor($, W, Y, X) {
      (this.schema = $),
        (this.references = W),
        (this.checkFunc = Y),
        (this.code = X),
        (this.hasTransform = q$.HasTransform.Has($, W));
    }
    Code() {
      return this.code;
    }
    Errors($) {
      return (0, $7.Errors)(this.schema, this.references, $);
    }
    Check($) {
      return this.checkFunc($);
    }
    Decode($) {
      if (!this.checkFunc($))
        throw new q$.TransformDecodeCheckError(
          this.schema,
          $,
          this.Errors($).First()
        );
      return this.hasTransform
        ? q$.DecodeTransform.Decode(
            this.schema,
            this.references,
            $,
            (W, Y, X) => this.Check(X)
          )
        : $;
    }
    Encode($) {
      const W = this.hasTransform
        ? q$.EncodeTransform.Encode(
            this.schema,
            this.references,
            $,
            (Y, X, Z) => this.Check(Z)
          )
        : $;
      if (!this.checkFunc(W))
        throw new q$.TransformEncodeCheckError(
          this.schema,
          $,
          this.Errors($).First()
        );
      return W;
    }
  }
  IY.TypeCheck = Q6;
  var M1;
  (function ($) {
    function W(Q) {
      return Q === 36;
    }
    $.DollarSign = W;
    function Y(Q) {
      return Q === 95;
    }
    $.IsUnderscore = Y;
    function X(Q) {
      return (Q >= 65 && Q <= 90) || (Q >= 97 && Q <= 122);
    }
    $.IsAlpha = X;
    function Z(Q) {
      return Q >= 48 && Q <= 57;
    }
    $.IsNumeric = Z;
  })(M1 || (M1 = {}));
  var y$;
  (function ($) {
    function W(Q) {
      if (Q.length === 0) return false;
      return M1.IsNumeric(Q.charCodeAt(0));
    }
    function Y(Q) {
      if (W(Q)) return false;
      for (let J = 0; J < Q.length; J++) {
        const q = Q.charCodeAt(J);
        if (
          !(
            M1.IsAlpha(q) ||
            M1.IsNumeric(q) ||
            M1.DollarSign(q) ||
            M1.IsUnderscore(q)
          )
        )
          return false;
      }
      return true;
    }
    function X(Q) {
      return Q.replace(/'/g, "\\'");
    }
    function Z(Q, J) {
      return Y(J) ? `${Q}.${J}` : `${Q}['${X(J)}']`;
    }
    $.Encode = Z;
  })(y$ || (y$ = {}));
  var X6;
  (function ($) {
    function W(Y) {
      const X = [];
      for (let Z = 0; Z < Y.length; Z++) {
        const Q = Y.charCodeAt(Z);
        if (M1.IsNumeric(Q) || M1.IsAlpha(Q)) X.push(Y.charAt(Z));
        else X.push(`_${Q}_`);
      }
      return X.join("").replace(/__/g, "_");
    }
    $.Encode = W;
  })(X6 || (X6 = {}));
  var Z6;
  (function ($) {
    function W(Y) {
      return Y.replace(/'/g, "\\'");
    }
    $.Escape = W;
  })(Z6 || (Z6 = {}));

  class J6 extends B0.TypeBoxError {
    constructor($) {
      super("Unknown type");
      this.schema = $;
    }
  }
  IY.TypeCompilerUnknownTypeError = J6;

  class v$ extends B0.TypeBoxError {
    constructor($) {
      super("Preflight validation check failed to guard for the given schema");
      this.schema = $;
    }
  }
  IY.TypeCompilerTypeGuardError = v$;
  var S1;
  (function ($) {
    function W(J, q, F) {
      return M$.TypeSystemPolicy.ExactOptionalPropertyTypes
        ? `('${q}' in ${J} ? ${F} : true)`
        : `(${y$.Encode(J, q)} !== undefined ? ${F} : true)`;
    }
    $.IsExactOptionalProperty = W;
    function Y(J) {
      return !M$.TypeSystemPolicy.AllowArrayObject
        ? `(typeof ${J} === 'object' && ${J} !== null && !Array.isArray(${J}))`
        : `(typeof ${J} === 'object' && ${J} !== null)`;
    }
    $.IsObjectLike = Y;
    function X(J) {
      return !M$.TypeSystemPolicy.AllowArrayObject
        ? `(typeof ${J} === 'object' && ${J} !== null && !Array.isArray(${J}) && !(${J} instanceof Date) && !(${J} instanceof Uint8Array))`
        : `(typeof ${J} === 'object' && ${J} !== null && !(${J} instanceof Date) && !(${J} instanceof Uint8Array))`;
    }
    $.IsRecordLike = X;
    function Z(J) {
      return !M$.TypeSystemPolicy.AllowNaN
        ? `(typeof ${J} === 'number' && Number.isFinite(${J}))`
        : `typeof ${J} === 'number'`;
    }
    $.IsNumberLike = Z;
    function Q(J) {
      return M$.TypeSystemPolicy.AllowNullVoid
        ? `(${J} === undefined || ${J} === null)`
        : `${J} === undefined`;
    }
    $.IsVoidLike = Q;
  })(S1 || (IY.Policy = S1 = {}));
  var CY;
  (function ($) {
    function W(L) {
      return L[B0.Kind] === "Any" || L[B0.Kind] === "Unknown";
    }
    function* Y(L, E, j) {
      yield "true";
    }
    function* X(L, E, j) {
      yield `Array.isArray(${j})`;
      const [m, d] = [U0("value", "any"), U0("acc", "number")];
      if ((0, r.IsNumber)(L.maxItems)) yield `${j}.length <= ${L.maxItems}`;
      if ((0, r.IsNumber)(L.minItems)) yield `${j}.length >= ${L.minItems}`;
      const y = s(L.items, E, "value");
      if (
        (yield `${j}.every((${m}) => ${y})`,
        B0.TypeGuard.TSchema(L.contains) ||
          (0, r.IsNumber)(L.minContains) ||
          (0, r.IsNumber)(L.maxContains))
      ) {
        const Z0 = B0.TypeGuard.TSchema(L.contains)
            ? L.contains
            : B0.Type.Never(),
          P0 = s(Z0, E, "value"),
          Q0 = (0, r.IsNumber)(L.minContains)
            ? [`(count >= ${L.minContains})`]
            : [],
          M = (0, r.IsNumber)(L.maxContains)
            ? [`(count <= ${L.maxContains})`]
            : [],
          a = `const count = ${j}.reduce((${d}, ${m}) => ${P0} ? acc + 1 : acc, 0)`,
          O0 = ["(count > 0)", ...Q0, ...M].join(" && ");
        yield `((${m}) => { ${a}; return ${O0}})(${j})`;
      }
      if (L.uniqueItems === true)
        yield `((${m}) => { const set = new Set(); for(const element of value) { const hashed = hash(element); if(set.has(hashed)) { return false } else { set.add(hashed) } } return true } )(${j})`;
    }
    function* Z(L, E, j) {
      yield `(typeof value === 'object' && Symbol.asyncIterator in ${j})`;
    }
    function* Q(L, E, j) {
      if (
        (yield `(typeof ${j} === 'bigint')`,
        (0, r.IsBigInt)(L.exclusiveMaximum))
      )
        yield `${j} < BigInt(${L.exclusiveMaximum})`;
      if ((0, r.IsBigInt)(L.exclusiveMinimum))
        yield `${j} > BigInt(${L.exclusiveMinimum})`;
      if ((0, r.IsBigInt)(L.maximum)) yield `${j} <= BigInt(${L.maximum})`;
      if ((0, r.IsBigInt)(L.minimum)) yield `${j} >= BigInt(${L.minimum})`;
      if ((0, r.IsBigInt)(L.multipleOf))
        yield `(${j} % BigInt(${L.multipleOf})) === 0`;
    }
    function* J(L, E, j) {
      yield `(typeof ${j} === 'boolean')`;
    }
    function* q(L, E, j) {
      yield* i(L.returns, E, `${j}.prototype`);
    }
    function* F(L, E, j) {
      if (
        (yield `(${j} instanceof Date) && Number.isFinite(${j}.getTime())`,
        (0, r.IsNumber)(L.exclusiveMaximumTimestamp))
      )
        yield `${j}.getTime() < ${L.exclusiveMaximumTimestamp}`;
      if ((0, r.IsNumber)(L.exclusiveMinimumTimestamp))
        yield `${j}.getTime() > ${L.exclusiveMinimumTimestamp}`;
      if ((0, r.IsNumber)(L.maximumTimestamp))
        yield `${j}.getTime() <= ${L.maximumTimestamp}`;
      if ((0, r.IsNumber)(L.minimumTimestamp))
        yield `${j}.getTime() >= ${L.minimumTimestamp}`;
      if ((0, r.IsNumber)(L.multipleOfTimestamp))
        yield `(${j}.getTime() % ${L.multipleOfTimestamp}) === 0`;
    }
    function* D(L, E, j) {
      yield `(typeof ${j} === 'function')`;
    }
    function* B(L, E, j) {
      if (
        (yield `(typeof ${j} === 'number' && Number.isInteger(${j}))`,
        (0, r.IsNumber)(L.exclusiveMaximum))
      )
        yield `${j} < ${L.exclusiveMaximum}`;
      if ((0, r.IsNumber)(L.exclusiveMinimum))
        yield `${j} > ${L.exclusiveMinimum}`;
      if ((0, r.IsNumber)(L.maximum)) yield `${j} <= ${L.maximum}`;
      if ((0, r.IsNumber)(L.minimum)) yield `${j} >= ${L.minimum}`;
      if ((0, r.IsNumber)(L.multipleOf)) yield `(${j} % ${L.multipleOf}) === 0`;
    }
    function* K(L, E, j) {
      const m = L.allOf.map((d) => s(d, E, j)).join(" && ");
      if (L.unevaluatedProperties === false) {
        const d = F0(`${new RegExp(B0.KeyResolver.ResolvePattern(L))};`),
          y = `Object.getOwnPropertyNames(${j}).every(key => ${d}.test(key))`;
        yield `(${m} && ${y})`;
      } else if (B0.TypeGuard.TSchema(L.unevaluatedProperties)) {
        const d = F0(`${new RegExp(B0.KeyResolver.ResolvePattern(L))};`),
          y = `Object.getOwnPropertyNames(${j}).every(key => ${d}.test(key) || ${s(
            L.unevaluatedProperties,
            E,
            `${j}[key]`
          )})`;
        yield `(${m} && ${y})`;
      } else yield `(${m})`;
    }
    function* I(L, E, j) {
      yield `(typeof value === 'object' && Symbol.iterator in ${j})`;
    }
    function* w(L, E, j) {
      if (typeof L.const === "number" || typeof L.const === "boolean")
        yield `(${j} === ${L.const})`;
      else yield `(${j} === '${Z6.Escape(L.const)}')`;
    }
    function* U(L, E, j) {
      yield "false";
    }
    function* P(L, E, j) {
      yield `(!${s(L.not, E, j)})`;
    }
    function* N(L, E, j) {
      yield `(${j} === null)`;
    }
    function* O(L, E, j) {
      if ((yield S1.IsNumberLike(j), (0, r.IsNumber)(L.exclusiveMaximum)))
        yield `${j} < ${L.exclusiveMaximum}`;
      if ((0, r.IsNumber)(L.exclusiveMinimum))
        yield `${j} > ${L.exclusiveMinimum}`;
      if ((0, r.IsNumber)(L.maximum)) yield `${j} <= ${L.maximum}`;
      if ((0, r.IsNumber)(L.minimum)) yield `${j} >= ${L.minimum}`;
      if ((0, r.IsNumber)(L.multipleOf)) yield `(${j} % ${L.multipleOf}) === 0`;
    }
    function* S(L, E, j) {
      if ((yield S1.IsObjectLike(j), (0, r.IsNumber)(L.minProperties)))
        yield `Object.getOwnPropertyNames(${j}).length >= ${L.minProperties}`;
      if ((0, r.IsNumber)(L.maxProperties))
        yield `Object.getOwnPropertyNames(${j}).length <= ${L.maxProperties}`;
      const m = Object.getOwnPropertyNames(L.properties);
      for (let d of m) {
        const y = y$.Encode(j, d),
          Z0 = L.properties[d];
        if (L.required && L.required.includes(d)) {
          if ((yield* i(Z0, E, y), B0.ExtendsUndefined.Check(Z0) || W(Z0)))
            yield `('${d}' in ${j})`;
        } else {
          const P0 = s(Z0, E, y);
          yield S1.IsExactOptionalProperty(j, d, P0);
        }
      }
      if (L.additionalProperties === false)
        if (L.required && L.required.length === m.length)
          yield `Object.getOwnPropertyNames(${j}).length === ${m.length}`;
        else {
          const d = `[${m.map((y) => `'${y}'`).join(", ")}]`;
          yield `Object.getOwnPropertyNames(${j}).every(key => ${d}.includes(key))`;
        }
      if (typeof L.additionalProperties === "object") {
        const d = s(L.additionalProperties, E, `${j}[key]`),
          y = `[${m.map((Z0) => `'${Z0}'`).join(", ")}]`;
        yield `(Object.getOwnPropertyNames(${j}).every(key => ${y}.includes(key) || ${d}))`;
      }
    }
    function* R(L, E, j) {
      yield `(typeof value === 'object' && typeof ${j}.then === 'function')`;
    }
    function* _(L, E, j) {
      if ((yield S1.IsRecordLike(j), (0, r.IsNumber)(L.minProperties)))
        yield `Object.getOwnPropertyNames(${j}).length >= ${L.minProperties}`;
      if ((0, r.IsNumber)(L.maxProperties))
        yield `Object.getOwnPropertyNames(${j}).length <= ${L.maxProperties}`;
      const [m, d] = Object.entries(L.patternProperties)[0],
        y = F0(`${new RegExp(m)}`),
        Z0 = s(d, E, "value"),
        P0 = B0.TypeGuard.TSchema(L.additionalProperties)
          ? s(L.additionalProperties, E, j)
          : L.additionalProperties === false
          ? "false"
          : "true",
        Q0 = `(${y}.test(key) ? ${Z0} : ${P0})`;
      yield `(Object.entries(${j}).every(([key, value]) => ${Q0}))`;
    }
    function* G(L, E, j) {
      const m = (0, W7.Deref)(L, E);
      if (x.functions.has(L.$ref)) return yield `${K0(L.$ref)}(${j})`;
      yield* i(m, E, j);
    }
    function* b(L, E, j) {
      if ((yield `(typeof ${j} === 'string')`, (0, r.IsNumber)(L.maxLength)))
        yield `${j}.length <= ${L.maxLength}`;
      if ((0, r.IsNumber)(L.minLength)) yield `${j}.length >= ${L.minLength}`;
      if (L.pattern !== undefined)
        yield `${F0(`${new RegExp(L.pattern)};`)}.test(${j})`;
      if (L.format !== undefined) yield `format('${L.format}', ${j})`;
    }
    function* l(L, E, j) {
      yield `(typeof ${j} === 'symbol')`;
    }
    function* g(L, E, j) {
      yield `(typeof ${j} === 'string')`,
        yield `${F0(`${new RegExp(L.pattern)};`)}.test(${j})`;
    }
    function* t(L, E, j) {
      yield `${K0(L.$ref)}(${j})`;
    }
    function* N0(L, E, j) {
      if ((yield `Array.isArray(${j})`, L.items === undefined))
        return yield `${j}.length === 0`;
      yield `(${j}.length === ${L.maxItems})`;
      for (let m = 0; m < L.items.length; m++)
        yield `${s(L.items[m], E, `${j}[${m}]`)}`;
    }
    function* M0(L, E, j) {
      yield `${j} === undefined`;
    }
    function* n(L, E, j) {
      yield `(${L.anyOf.map((d) => s(d, E, j)).join(" || ")})`;
    }
    function* Y0(L, E, j) {
      if (
        (yield `${j} instanceof Uint8Array`, (0, r.IsNumber)(L.maxByteLength))
      )
        yield `(${j}.length <= ${L.maxByteLength})`;
      if ((0, r.IsNumber)(L.minByteLength))
        yield `(${j}.length >= ${L.minByteLength})`;
    }
    function* V0(L, E, j) {
      yield "true";
    }
    function* c(L, E, j) {
      yield S1.IsVoidLike(j);
    }
    function* T(L, E, j) {
      const m = x.instances.size;
      x.instances.set(m, L), yield `kind('${L[B0.Kind]}', ${m}, ${j})`;
    }
    function* i(L, E, j, m = true) {
      const d = (0, r.IsString)(L.$id) ? [...E, L] : E,
        y = L;
      if (m && (0, r.IsString)(L.$id)) {
        const Z0 = K0(L.$id);
        if (x.functions.has(Z0)) return yield `${Z0}(${j})`;
        else {
          const P0 = v0(Z0, L, E, "value", false);
          return x.functions.set(Z0, P0), yield `${Z0}(${j})`;
        }
      }
      switch (y[B0.Kind]) {
        case "Any":
          return yield* Y(y, d, j);
        case "Array":
          return yield* X(y, d, j);
        case "AsyncIterator":
          return yield* Z(y, d, j);
        case "BigInt":
          return yield* Q(y, d, j);
        case "Boolean":
          return yield* J(y, d, j);
        case "Constructor":
          return yield* q(y, d, j);
        case "Date":
          return yield* F(y, d, j);
        case "Function":
          return yield* D(y, d, j);
        case "Integer":
          return yield* B(y, d, j);
        case "Intersect":
          return yield* K(y, d, j);
        case "Iterator":
          return yield* I(y, d, j);
        case "Literal":
          return yield* w(y, d, j);
        case "Never":
          return yield* U(y, d, j);
        case "Not":
          return yield* P(y, d, j);
        case "Null":
          return yield* N(y, d, j);
        case "Number":
          return yield* O(y, d, j);
        case "Object":
          return yield* S(y, d, j);
        case "Promise":
          return yield* R(y, d, j);
        case "Record":
          return yield* _(y, d, j);
        case "Ref":
          return yield* G(y, d, j);
        case "String":
          return yield* b(y, d, j);
        case "Symbol":
          return yield* l(y, d, j);
        case "TemplateLiteral":
          return yield* g(y, d, j);
        case "This":
          return yield* t(y, d, j);
        case "Tuple":
          return yield* N0(y, d, j);
        case "Undefined":
          return yield* M0(y, d, j);
        case "Union":
          return yield* n(y, d, j);
        case "Uint8Array":
          return yield* Y0(y, d, j);
        case "Unknown":
          return yield* V0(y, d, j);
        case "Void":
          return yield* c(y, d, j);
        default:
          if (!B0.TypeRegistry.Has(y[B0.Kind])) throw new J6(L);
          return yield* T(y, d, j);
      }
    }
    const x = {
      language: "javascript",
      functions: new Map(),
      variables: new Map(),
      instances: new Map(),
    };
    function s(L, E, j, m = true) {
      return `(${[...i(L, E, j, m)].join(" && ")})`;
    }
    function K0(L) {
      return `check_${X6.Encode(L)}`;
    }
    function F0(L) {
      const E = `local_${x.variables.size}`;
      return x.variables.set(E, `const ${E} = ${L}`), E;
    }
    function v0(L, E, j, m, d = true) {
      const [y, Z0] = ["\n", (a) => "".padStart(a, " ")],
        P0 = U0("value", "any"),
        Q0 = $1("boolean"),
        M = [...i(E, j, m, d)].map((a) => `${Z0(4)}${a}`).join(` &&${y}`);
      return `function ${L}(${P0})${Q0} {${y}${Z0(2)}return (${y}${M}${y}${Z0(
        2
      )})\n}`;
    }
    function U0(L, E) {
      const j = x.language === "typescript" ? `: ${E}` : "";
      return `${L}${j}`;
    }
    function $1(L) {
      return x.language === "typescript" ? `: ${L}` : "";
    }
    function W1(L, E, j) {
      const m = v0("check", L, E, "value"),
        d = U0("value", "any"),
        y = $1("boolean"),
        Z0 = [...x.functions.values()],
        P0 = [...x.variables.values()],
        Q0 = (0, r.IsString)(L.$id)
          ? `return function check(${d})${y} {\n  return ${K0(L.$id)}(value)\n}`
          : `return ${m}`;
      return [...P0, ...Z0, Q0].join("\n");
    }
    function q0(...L) {
      const E = { language: "javascript" },
        [j, m, d] =
          L.length === 2 && (0, r.IsArray)(L[1])
            ? [L[0], L[1], E]
            : L.length === 2 && !(0, r.IsArray)(L[1])
            ? [L[0], [], L[1]]
            : L.length === 3
            ? [L[0], L[1], L[2]]
            : L.length === 1
            ? [L[0], [], E]
            : [null, [], E];
      if (
        ((x.language = d.language),
        x.variables.clear(),
        x.functions.clear(),
        x.instances.clear(),
        !B0.TypeGuard.TSchema(j))
      )
        throw new v$(j);
      for (let y of m) if (!B0.TypeGuard.TSchema(y)) throw new v$(y);
      return W1(j, m, d);
    }
    $.Code = q0;
    function G1(L, E = []) {
      const j = q0(L, E, { language: "javascript" }),
        m = globalThis.Function("kind", "format", "hash", j),
        d = new Map(x.instances);
      function y(M, a, O0) {
        if (!B0.TypeRegistry.Has(M) || !d.has(a)) return false;
        const o$ = B0.TypeRegistry.Get(M),
          h$ = d.get(a);
        return o$(h$, O0);
      }
      function Z0(M, a) {
        if (!B0.FormatRegistry.Has(M)) return false;
        return B0.FormatRegistry.Get(M)(a);
      }
      function P0(M) {
        return (0, Y7.Hash)(M);
      }
      const Q0 = m(y, Z0, P0);
      return new Q6(L, E, Q0, j);
    }
    $.Compile = G1;
  })(CY || (IY.TypeCompiler = CY = {}));
});
var _Y = H0((h0) => {
  var z7 =
      (h0 && h0.__createBinding) ||
      (Object.create
        ? function ($, W, Y, X) {
            if (X === undefined) X = Y;
            var Z = Object.getOwnPropertyDescriptor(W, Y);
            if (
              !Z ||
              ("get" in Z ? !W.__esModule : Z.writable || Z.configurable)
            )
              Z = {
                enumerable: true,
                get: function () {
                  return W[Y];
                },
              };
            Object.defineProperty($, X, Z);
          }
        : function ($, W, Y, X) {
            if (X === undefined) X = Y;
            $[X] = W[Y];
          }),
    H7 =
      (h0 && h0.__exportStar) ||
      function ($, W) {
        for (var Y in $)
          if (Y !== "default" && !Object.prototype.hasOwnProperty.call(W, Y))
            z7(W, $, Y);
      };
  Object.defineProperty(h0, "__esModule", { value: true });
  h0.ValueErrorIterator = h0.ValueErrorType = undefined;
  var bY = L$();
  Object.defineProperty(h0, "ValueErrorType", {
    enumerable: true,
    get: function () {
      return bY.ValueErrorType;
    },
  });
  Object.defineProperty(h0, "ValueErrorIterator", {
    enumerable: true,
    get: function () {
      return bY.ValueErrorIterator;
    },
  });
  H7(GY(), h0);
});
var b1 = ($, W) => ({
  part: $,
  store: null,
  inert:
    W !== undefined ? new Map(W.map((Y) => [Y.part.charCodeAt(0), Y])) : null,
  params: null,
  wildcardStore: null,
});
var P6 = ($, W) => ({ ...$, part: W });
var S6 = ($) => ({ paramName: $, store: null, inert: null });

class _1 {
  root = {};
  history = [];
  static regex = { static: /:.+?(?=\/|$)/, params: /:.+?(?=\/|$)/g };
  add($, W, Y) {
    let X;
    if (typeof W != "string") throw TypeError("Route path must be a string");
    W === "" ? (W = "/") : W[0] !== "/" && (W = `/${W}`),
      this.history.push([$, W, Y]);
    let Z = W[W.length - 1] === "*";
    Z && (W = W.slice(0, -1));
    let Q = W.split(_1.regex.static),
      J = W.match(_1.regex.params) || [];
    Q[Q.length - 1] === "" && Q.pop(),
      (X = this.root[$] ? this.root[$] : (this.root[$] = b1("/")));
    let q = 0;
    for (let F = 0; F < Q.length; ++F) {
      let D = Q[F];
      if (F > 0) {
        let B = J[q++].slice(1);
        if (X.params === null) X.params = S6(B);
        else if (X.params.paramName !== B)
          throw Error(
            `Cannot create route "${W}" with parameter "${B}" because a route already exists with a different parameter name ("${X.params.paramName}") in the same location`
          );
        let K = X.params;
        if (K.inert === null) {
          X = K.inert = b1(D);
          continue;
        }
        X = K.inert;
      }
      for (let B = 0; ; ) {
        if (B === D.length) {
          if (B < X.part.length) {
            let K = P6(X, X.part.slice(B));
            Object.assign(X, b1(D, [K]));
          }
          break;
        }
        if (B === X.part.length) {
          if (X.inert === null) X.inert = new Map();
          else if (X.inert.has(D.charCodeAt(B))) {
            (X = X.inert.get(D.charCodeAt(B))), (D = D.slice(B)), (B = 0);
            continue;
          }
          let K = b1(D.slice(B));
          X.inert.set(D.charCodeAt(B), K), (X = K);
          break;
        }
        if (D[B] !== X.part[B]) {
          let K = P6(X, X.part.slice(B)),
            I = b1(D.slice(B));
          Object.assign(X, b1(X.part.slice(0, B), [K, I])), (X = I);
          break;
        }
        ++B;
      }
    }
    if (q < J.length) {
      let F = J[q],
        D = F.slice(1);
      if (X.params === null) X.params = S6(D);
      else if (X.params.paramName !== D)
        throw Error(
          `Cannot create route "${W}" with parameter "${D}" because a route already exists with a different parameter name ("${X.params.paramName}") in the same location`
        );
      return X.params.store === null && (X.params.store = Y), X.params.store;
    }
    return Z
      ? (X.wildcardStore === null && (X.wildcardStore = Y), X.wildcardStore)
      : (X.store === null && (X.store = Y), X.store);
  }
  find($, W) {
    let Y = this.root[$];
    return Y ? l$(W, W.length, Y, 0) : null;
  }
}
var l$ = ($, W, Y, X) => {
  let Z = Y?.part,
    Q = X + Z.length;
  if (Z.length > 1) {
    if (Q > W) return null;
    if (Z.length < 15) {
      for (let J = 1, q = X + 1; J < Z.length; ++J, ++q)
        if (Z.charCodeAt(J) !== $.charCodeAt(q)) return null;
    } else if ($.substring(X, Q) !== Z) return null;
  }
  if (Q === W)
    return Y.store !== null
      ? { store: Y.store, params: {} }
      : Y.wildcardStore !== null
      ? { store: Y.wildcardStore, params: { "*": "" } }
      : null;
  if (Y.inert !== null) {
    let J = Y.inert.get($.charCodeAt(Q));
    if (J !== undefined) {
      let q = l$($, W, J, Q);
      if (q !== null) return q;
    }
  }
  if (Y.params !== null) {
    let J = Y.params,
      q = $.indexOf("/", Q);
    if (q !== Q) {
      if (q === -1 || q >= W) {
        if (J.store !== null) {
          let F = {};
          return (
            (F[J.paramName] = $.substring(Q, W)), { store: J.store, params: F }
          );
        }
      } else if (J.inert !== null) {
        let F = l$($, W, J.inert, q);
        if (F !== null) return (F.params[J.paramName] = $.substring(Q, q)), F;
      }
    }
  }
  return Y.wildcardStore !== null
    ? { store: Y.wildcardStore, params: { "*": $.substring(Q, W) } }
    : null;
};
var O6 = Y1(j6(), 1);
var C6 = O6.default;
var I6 = ($, W) => {
  return (Y) => {
    const X = Y.id;
    if (Y.event === "request" && Y.type === "begin") {
      const Z = () => {
          let U,
            P,
            N = -1;
          const O = [],
            S = [];
          let R = false;
          const _ = new Promise((l) => {
            U = (g) => {
              if (R) return;
              else R = true;
              l(g);
            };
          });
          let G = false;
          const b = new Promise((l) => {
            P = (g) => {
              if (G) return;
              else G = true;
              if (N === -1) N = 0;
              for (; N < S.length; N++) {
                let t;
                const N0 = {
                  name: "anonymous",
                  time: performance.now(),
                  skip: true,
                  end: new Promise((M0) => {
                    M0(t);
                  }),
                  children: [],
                };
                (t = performance.now()), O[N](N0);
              }
              l(g);
            };
          });
          return {
            signal: _,
            consumeChild(l) {
              switch (l.type) {
                case "begin":
                  O[++N]({
                    name: l.name,
                    time: l.time,
                    end: new Promise((g) => {
                      S.push(g);
                    }),
                  });
                  break;
                case "end":
                  S[N](l.time);
                  break;
              }
            },
            consume(l) {
              switch (l.type) {
                case "begin":
                  const g = [],
                    t = l.unit ?? 0;
                  for (let N0 = 0; N0 < t; N0++) {
                    let M0;
                    g.push(
                      new Promise((n) => {
                        M0 = n;
                      })
                    ),
                      O.push(M0);
                  }
                  U({
                    name: l.name,
                    time: l.time,
                    skip: false,
                    end: b,
                    children: g,
                  });
                  break;
                case "end":
                  P(l.time);
                  break;
              }
            },
            resolve() {
              if (R && G) return;
              let l;
              const g = {
                name: "anonymous",
                time: performance.now(),
                skip: true,
                end: new Promise((t) => {
                  t(l);
                }),
                children: [],
              };
              (l = performance.now()), U(g), P(l);
            },
          };
        },
        Q = Z(),
        J = Z(),
        q = Z(),
        F = Z(),
        D = Z(),
        B = Z(),
        K = Z(),
        I = Z();
      Q.consume(Y);
      const w = (U) => {
        if (U.id === X)
          switch (U.event) {
            case "request":
              Q.consume(U);
              break;
            case "request.unit":
              Q.consumeChild(U);
              break;
            case "parse":
              J.consume(U);
              break;
            case "parse.unit":
              J.consumeChild(U);
              break;
            case "transform":
              q.consume(U);
              break;
            case "transform.unit":
              q.consumeChild(U);
              break;
            case "beforeHandle":
              F.consume(U);
              break;
            case "beforeHandle.unit":
              F.consumeChild(U);
              break;
            case "handle":
              D.consume(U);
              break;
            case "afterHandle":
              B.consume(U);
              break;
            case "afterHandle.unit":
              B.consumeChild(U);
              break;
            case "error":
              K.consume(U);
              break;
            case "error.unit":
              K.consumeChild(U);
              break;
            case "response":
              if (U.type === "begin")
                Q.resolve(),
                  J.resolve(),
                  q.resolve(),
                  F.resolve(),
                  D.resolve(),
                  B.resolve(),
                  K.resolve();
              else $.off("event", w);
              I.consume(U);
              break;
            case "response.unit":
              I.consumeChild(U);
              break;
          }
      };
      $.on("event", w),
        W({
          id: Y.id,
          context: Y.ctx,
          set: Y.ctx?.set,
          store: Y.ctx?.store,
          time: Y.time,
          request: Q.signal,
          parse: J.signal,
          transform: J.signal,
          beforeHandle: F.signal,
          handle: D.signal,
          afterHandle: B.signal,
          error: K.signal,
          response: I.signal,
        });
    }
  };
};
var a8 = Y1(r8(), 1);
var ZY =
  typeof Bun !== "undefined"
    ? Bun.env
    : typeof process !== "undefined"
    ? process?.env
    : undefined;
var A1 = Symbol("ErrorCode");
var z$ = (ZY?.NODE_ENV ?? ZY?.ENV) === "production";

class x$ extends Error {
  code = "NOT_FOUND";
  status = 500;
  constructor() {
    super("INTERNAL_SERVER_ERROR");
  }
}

class P1 extends Error {
  code = "NOT_FOUND";
  status = 404;
  constructor() {
    super("NOT_FOUND");
  }
}
class S0 extends Error {
  $;
  W;
  Y;
  code = "VALIDATION";
  status = 400;
  constructor($, W, Y) {
    const X = z$ ? undefined : W.Errors(Y).First(),
      Z = X?.schema.error
        ? typeof X.schema.error === "function"
          ? X.schema.error($, W, Y)
          : X.schema.error
        : undefined,
      Q = z$
        ? Z ?? `Invalid ${$ ?? X?.schema.error ?? X?.message}`
        : Z ??
          `Invalid ${$}, '${X?.path?.slice(1) || "type"}': ${X?.message}` +
            "\n\nExpected: " +
            JSON.stringify(a8.Value.Create(W.schema), null, 2) +
            "\n\nFound: " +
            JSON.stringify(Y, null, 2);
    super(Q);
    this.type = $;
    this.validator = W;
    this.value = Y;
    Object.setPrototypeOf(this, S0.prototype);
  }
  get all() {
    return [...this.validator.Errors(this.value)];
  }
  get model() {
    return a8.Value.Create(this.validator.schema);
  }
  toResponse($) {
    return new Response(this.message, { status: 400, headers: $ });
  }
}
var e8 = {
  open($) {
    $.data.open?.($);
  },
  message($, W) {
    $.data.message?.($, W);
  },
  drain($) {
    $.data.drain?.($);
  },
  close($, W, Y) {
    $.data.close?.($, W, Y);
  },
};

class o1 {
  $;
  W;
  validator;
  constructor($, W) {
    this.raw = $;
    this.data = W;
    this.validator = $.data.validator;
  }
  publish($, W = undefined, Y) {
    if (this.validator?.Check(W) === false)
      throw new S0("message", this.validator, W);
    if (typeof W === "object") W = JSON.stringify(W);
    return this.raw.publish($, W, Y), this;
  }
  send($) {
    if (this.validator?.Check($) === false)
      throw new S0("message", this.validator, $);
    if (typeof $ === "object") $ = JSON.stringify($);
    return this.raw.send($), this;
  }
  subscribe($) {
    return this.raw.subscribe($), this;
  }
  unsubscribe($) {
    return this.raw.unsubscribe($), this;
  }
  cork($) {
    return this.raw.cork($), this;
  }
  close() {
    return this.raw.close(), this;
  }
  terminate() {
    this.raw.terminate();
  }
  get isSubscribed() {
    return this.raw.isSubscribed;
  }
  get remoteAddress() {
    return this.raw.remoteAddress;
  }
}
var vY = Y1(Y6(), 1);
var OY = import.meta.require("crypto");
var k$ = function ($, W) {
  if (typeof $ != "string")
    throw new TypeError("Cookie value must be provided as a string.");
  if (W == null) throw new TypeError("Secret key must be provided.");
  return (
    $ +
    "." +
    OY.createHmac("sha256", W).update($).digest("base64").replace(/\=+$/, "")
  );
};
var g$ = function ($, W) {
  if (typeof $ != "string")
    throw new TypeError("Signed cookie string must be provided.");
  if (W == null) throw new TypeError("Secret key must be provided.");
  var Y = $.slice(0, $.lastIndexOf(".")),
    X = k$(Y, W),
    Z = Buffer.from(X),
    Q = Buffer.from($);
  return Z.length === Q.length && OY.timingSafeEqual(Z, Q) ? Y : false;
};
var l9 = function ($, W) {
  if (typeof $ !== "string")
    throw new TypeError("argument str must be a string");
  var Y = {},
    X = W || {},
    Z = X.decode || s9,
    Q = 0;
  while (Q < $.length) {
    var J = $.indexOf("=", Q);
    if (J === -1) break;
    var q = $.indexOf(";", Q);
    if (q === -1) q = $.length;
    else if (q < J) {
      Q = $.lastIndexOf(";", J - 1) + 1;
      continue;
    }
    var F = $.slice(Q, J).trim();
    if (Y[F] === undefined) {
      var D = $.slice(J + 1, q).trim();
      if (D.charCodeAt(0) === 34) D = D.slice(1, -1);
      Y[F] = e9(D, Z);
    }
    Q = q + 1;
  }
  return Y;
};
var t9 = function ($, W, Y) {
  var X = Y || {},
    Z = X.encode || r9;
  if (typeof Z !== "function") throw new TypeError("option encode is invalid");
  if (!f$.test($)) throw new TypeError("argument name is invalid");
  var Q = Z(W);
  if (Q && !f$.test(Q)) throw new TypeError("argument val is invalid");
  var J = $ + "=" + Q;
  if (X.maxAge != null) {
    var q = X.maxAge - 0;
    if (isNaN(q) || !isFinite(q))
      throw new TypeError("option maxAge is invalid");
    J += "; Max-Age=" + Math.floor(q);
  }
  if (X.domain) {
    if (!f$.test(X.domain)) throw new TypeError("option domain is invalid");
    J += "; Domain=" + X.domain;
  }
  if (X.path) {
    if (!f$.test(X.path)) throw new TypeError("option path is invalid");
    J += "; Path=" + X.path;
  }
  if (X.expires) {
    var F = X.expires;
    if (!a9(F) || isNaN(F.valueOf()))
      throw new TypeError("option expires is invalid");
    J += "; Expires=" + F.toUTCString();
  }
  if (X.httpOnly) J += "; HttpOnly";
  if (X.secure) J += "; Secure";
  if (X.priority) {
    var D =
      typeof X.priority === "string" ? X.priority.toLowerCase() : X.priority;
    switch (D) {
      case "low":
        J += "; Priority=Low";
        break;
      case "medium":
        J += "; Priority=Medium";
        break;
      case "high":
        J += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (X.sameSite) {
    var B =
      typeof X.sameSite === "string" ? X.sameSite.toLowerCase() : X.sameSite;
    switch (B) {
      case true:
        J += "; SameSite=Strict";
        break;
      case "lax":
        J += "; SameSite=Lax";
        break;
      case "strict":
        J += "; SameSite=Strict";
        break;
      case "none":
        J += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return J;
};
var s9 = function ($) {
  return $.indexOf("%") !== -1 ? decodeURIComponent($) : $;
};
var r9 = function ($) {
  return encodeURIComponent($);
};
var a9 = function ($) {
  return c9.call($) === "[object Date]" || $ instanceof Date;
};
var e9 = function ($, W) {
  try {
    return W($);
  } catch (Y) {
    return $;
  }
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var T$ = l9;
var d$ = t9;
var c9 = Object.prototype.toString;
var f$ = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
var p$ = Y1(f0(), 1);
var N$ = Y1(r8(), 1);
var H6 = Y1(_Y(), 1);
/*!
 * mergician
 * v1.1.0
 * https://jhildenbiddle.github.io/mergician/
 * (c) 2022-2023 John Hildenbiddle
 * MIT license
 */
var q7 = Object.getOwnPropertyNames;
var EY = ($, W) =>
  function Y() {
    return W || (0, $[q7($)[0]])((W = { exports: {} }).exports, W), W.exports;
  };
var M7 = EY({
  "src/util.cjs"($, W) {
    function Y(...B) {
      const K = {};
      return (
        B.forEach((I) => {
          I.forEach((w) => {
            K[w] = w in K ? ++K[w] : 1;
          });
        }),
        K
      );
    }
    function X(...B) {
      const K = Y(...B);
      return Object.keys(K).filter((I) => K[I] > 1);
    }
    function Z(...B) {
      return B.reduce((K, I) => K.filter(Set.prototype.has, new Set(I)));
    }
    function Q(...B) {
      const K = Y(...B);
      return Object.keys(K).filter((I) => K[I] === 1);
    }
    function J(...B) {
      const K = Y(...B);
      return Object.keys(K).filter((I) => K[I] < B.length);
    }
    function q(B, K = false) {
      if (K) {
        const I = [];
        for (let w in B) I.push(w);
        return I;
      } else return Object.keys(B);
    }
    function F(B) {
      return typeof B === "object" && B !== null && !Array.isArray(B);
    }
    function D(B) {
      if (!F(B)) return false;
      const K = ["writable", "enumerable", "configurable"].some((P) => P in B),
        I = ["get", "set"].some((P) => typeof B[P] === "function"),
        w = ["get", "set"].every((P) => P in B);
      let U = ("value" in B && K) || (I && (w || K));
      if (U) {
        const P = [
          "configurable",
          "get",
          "set",
          "enumerable",
          "value",
          "writable",
        ];
        U = Object.keys(B).some((N) => !(N in P));
      }
      return U;
    }
    W.exports = {
      countOccurrences: Y,
      getInMultiple: X,
      getInAll: Z,
      getNotInMultiple: Q,
      getNotInAll: J,
      getObjectKeys: q,
      isObject: F,
      isPropDescriptor: D,
    };
  },
});
var N7 = EY({
  "src/index.cjs"($, W) {
    var {
        getInMultiple: Y,
        getInAll: X,
        getNotInMultiple: Z,
        getNotInAll: Q,
        getObjectKeys: J,
        isObject: q,
        isPropDescriptor: F,
      } = M7(),
      D = {
        onlyKeys: [],
        skipKeys: [],
        onlyCommonKeys: false,
        onlyUniversalKeys: false,
        skipCommonKeys: false,
        skipUniversalKeys: false,
        invokeGetters: false,
        skipSetters: false,
        appendArrays: false,
        prependArrays: false,
        dedupArrays: false,
        sortArrays: false,
        hoistProto: false,
        filter: Function.prototype,
        beforeEach: Function.prototype,
        afterEach: Function.prototype,
        onCircular: Function.prototype,
      };
    function B(...K) {
      const I = arguments.length === 1 ? arguments[0] : {},
        w = { ...D, ...I },
        U = new Map(),
        P = new Map(),
        N = typeof w.sortArrays === "function" ? w.sortArrays : undefined,
        O = new WeakMap();
      let S = 0;
      function R(G) {
        return J(G, w.hoistProto);
      }
      function _(...G) {
        let b;
        if (G.length > 1) {
          if (w.onlyCommonKeys) b = Y(...G.map((g) => R(g)));
          else if (w.onlyUniversalKeys) b = X(...G.map((g) => R(g)));
          else if (w.skipCommonKeys) b = Z(...G.map((g) => R(g)));
          else if (w.skipUniversalKeys) b = Q(...G.map((g) => R(g)));
        }
        if (!b && w.onlyKeys.length) b = w.onlyKeys;
        if (b && b !== w.onlyKeys && w.onlyKeys.length)
          b = b.filter((g) => w.onlyKeys.includes(g));
        const l = G.reduce((g, t) => {
          O.set(t, g);
          let N0 = b || R(t);
          if (w.skipKeys.length)
            N0 = N0.filter((M0) => w.skipKeys.indexOf(M0) === -1);
          for (let M0 = 0; M0 < N0.length; M0++) {
            const n = N0[M0],
              Y0 = g[n];
            let V0 = false,
              c;
            if (n in t === false) continue;
            try {
              c = t[n];
            } catch (x) {
              console.error(x);
              continue;
            }
            const T = Object.getOwnPropertyDescriptor(t, n);
            if (
              T &&
              typeof T.set === "function" &&
              typeof T.get !== "function"
            ) {
              if (!w.skipSetters)
                (T.configurable = true), Object.defineProperty(g, n, T);
              continue;
            }
            if (w.filter !== D.filter) {
              const x = w.filter({
                depth: S,
                key: n,
                srcObj: t,
                srcVal: c,
                targetObj: g,
                targetVal: Y0,
              });
              if (x !== undefined && !x) continue;
            }
            if (w.beforeEach !== D.beforeEach) {
              const x = w.beforeEach({
                depth: S,
                key: n,
                srcObj: t,
                srcVal: c,
                targetObj: g,
                targetVal: Y0,
              });
              if (x !== undefined) (V0 = true), (c = x);
            }
            if (typeof c === "object" && c !== null) {
              if (O.has(t[n])) {
                const x = w.onCircular({
                  depth: S,
                  key: n,
                  srcObj: t,
                  srcVal: t[n],
                  targetObj: g,
                  targetVal: Y0,
                });
                if (x === undefined) {
                  (c = O.get(t[n])), (g[n] = c);
                  continue;
                }
                (V0 = true), (c = x);
              }
            }
            if (Array.isArray(c)) {
              if (((c = [...c]), Array.isArray(Y0))) {
                if (w.appendArrays) c = [...Y0, ...c];
                else if (w.prependArrays) c = [...c, ...Y0];
              }
              if (w.dedupArrays)
                if (w.afterEach !== D.afterEach) c = [...new Set(c)];
                else {
                  const x = U.get(g);
                  if (x && !x.includes(n)) x.push(n);
                  else U.set(g, [n]);
                }
              if (w.sortArrays)
                if (w.afterEach !== D.afterEach) c = c.sort(N);
                else {
                  const x = P.get(g);
                  if (x && !x.includes(n)) x.push(n);
                  else P.set(g, [n]);
                }
            } else if (q(c) && (!V0 || !F(c))) {
              if ((S++, q(Y0))) c = _(Y0, c);
              else c = _(c);
              S--;
            }
            if (w.afterEach !== D.afterEach) {
              const x = w.afterEach({
                depth: S,
                key: n,
                mergeVal: c,
                srcObj: t,
                targetObj: g,
              });
              if (x !== undefined) (V0 = true), (c = x);
            }
            if (V0)
              if (F(c)) {
                if (
                  ((c.configurable = true),
                  (c.enumerable = !("enumerable" in c) ? true : c.enumerable),
                  "value" in c && !("writable" in c))
                )
                  c.writable = true;
                Object.defineProperty(g, n, c);
              } else g[n] = c;
            else {
              const x = Object.getOwnPropertyDescriptor(t, n);
              if (x && typeof x.get === "function" && !w.invokeGetters) {
                if (w.skipSetters) x.set = undefined;
                (x.configurable = true), Object.defineProperty(g, n, x);
              } else g[n] = c;
            }
          }
          return g;
        }, {});
        for (let [g, t] of U.entries())
          for (let N0 of t) g[N0] = [...new Set(g[N0])];
        for (let [g, t] of P.entries()) for (let N0 of t) g[N0].sort(N);
        return l;
      }
      if (arguments.length === 1)
        return function (...G) {
          if (arguments.length === 1) return B({ ...w, ...G[0] });
          else return _(...G);
        };
      else return _(...arguments);
    }
    W.exports = B;
  },
});
var z6 = N7();
var L1 = z6({});
var VY = z6({
  appendArrays: true,
  dedupArrays: true,
  skipKeys: ["properties"],
});
var L0 = ($, W) => {
  const Y = [...(Array.isArray($) ? $ : [$])],
    X = [];
  for (let Z of Y) if (Z.$elysiaChecksum) X.push(Z.$elysiaChecksum);
  for (let Z of Array.isArray(W) ? W : [W])
    if (!X.includes(Z?.$elysiaChecksum)) Y.push(Z);
  return Y;
};
var j1 = ($, W) => {
  return {
    body: W?.body ?? $?.body,
    headers: W?.headers ?? $?.headers,
    params: W?.params ?? $?.params,
    query: W?.query ?? $?.query,
    response: W?.response ?? $?.response,
    type: $?.type || W?.type,
    detail: L1(W?.detail ?? {}, $?.detail ?? {}),
    parse: L0($?.parse ?? [], W?.parse ?? []),
    transform: L0($?.transform ?? [], W?.transform ?? []),
    beforeHandle: L0($?.beforeHandle ?? [], W?.beforeHandle ?? []),
    afterHandle: L0($?.afterHandle ?? [], W?.afterHandle ?? []),
    onResponse: L0($?.onResponse ?? [], W?.onResponse ?? []),
    trace: L0($?.trace ?? [], W?.trace ?? []),
    error: L0($?.error ?? [], W?.error ?? []),
  };
};
var N1 = (
  $,
  { models: W = {}, additionalProperties: Y = false, dynamic: X = false }
) => {
  if (!$) return;
  if (typeof $ === "string" && !($ in W)) return;
  const Z = typeof $ === "string" ? W[$] : $;
  if (Z.type === "object" && "additionalProperties" in Z === false)
    Z.additionalProperties = Y;
  if (X)
    return {
      schema: Z,
      references: "",
      checkFunc: () => {},
      code: "",
      Check: (Q) => N$.Value.Check(Z, Q),
      Errors: (Q) => N$.Value.Errors(Z, Q),
      Code: () => "",
    };
  return H6.TypeCompiler.Compile(Z);
};
var q6 = (
  $,
  { models: W = {}, additionalProperties: Y = false, dynamic: X = false }
) => {
  if (!$) return;
  if (typeof $ === "string" && !($ in W)) return;
  const Z = typeof $ === "string" ? W[$] : $,
    Q = (q) => {
      if (X)
        return {
          schema: q,
          references: "",
          checkFunc: () => {},
          code: "",
          Check: (F) => N$.Value.Check(q, F),
          Errors: (F) => N$.Value.Errors(q, F),
          Code: () => "",
        };
      return H6.TypeCompiler.Compile(q);
    };
  if (p$.Kind in Z) {
    if ("additionalProperties" in Z === false) Z.additionalProperties = Y;
    return { 200: Q(Z) };
  }
  const J = {};
  return (
    Object.keys(Z).forEach((q) => {
      const F = Z[+q];
      if (typeof F === "string") {
        if (F in W) {
          const D = W[F];
          D.type === "object" && "additionalProperties" in D,
            (J[+q] = p$.Kind in D ? Q(D) : D);
        }
        return;
      }
      if (F.type === "object" && "additionalProperties" in F === false)
        F.additionalProperties = Y;
      J[+q] = p$.Kind in F ? Q(F) : F;
    }),
    J
  );
};
var xY = ($) => {
  let W = 9;
  for (let Y = 0; Y < $.length; )
    W = Math.imul(W ^ $.charCodeAt(Y++), 387420489);
  return (W = W ^ (W >>> 9));
};
var i$ = ($, W, Y) => {
  const X = (Z) => {
    if (Y) Z.$elysiaChecksum = Y;
    return Z;
  };
  return {
    start: L0($.start, ("start" in W ? W.start ?? [] : []).map(X)),
    request: L0($.request, ("request" in W ? W.request ?? [] : []).map(X)),
    parse: L0($.parse, "parse" in W ? W?.parse ?? [] : []).map(X),
    transform: L0($.transform, (W?.transform ?? []).map(X)),
    beforeHandle: L0($.beforeHandle, (W?.beforeHandle ?? []).map(X)),
    afterHandle: L0($.afterHandle, (W?.afterHandle ?? []).map(X)),
    onResponse: L0($.onResponse, (W?.onResponse ?? []).map(X)),
    trace: L0($.trace, ("trace" in W ? W.trace ?? [] : []).map(X)),
    error: L0($.error, (W?.error ?? []).map(X)),
    stop: L0($.stop, ("stop" in W ? W.stop ?? [] : []).map(X)),
  };
};
var kY = ($, W = true) => {
  if (!$) return $;
  if (typeof $ === "function") {
    if (W) $.$elysiaHookType = "global";
    else $.$elysiaHookType = undefined;
    return $;
  }
  return $.map((Y) => {
    if (W) Y.$elysiaHookType = "global";
    else Y.$elysiaHookType = undefined;
    return Y;
  });
};
var h1 = ($) => {
  if (!$) return $;
  if (typeof $ === "function")
    return $.$elysiaHookType === "global" ? $ : undefined;
  return $.filter((W) => W.$elysiaHookType === "global");
};
var M6 = ($) => {
  return {
    ...$,
    type: $?.type,
    detail: $?.detail,
    parse: h1($?.parse),
    transform: h1($?.transform),
    beforeHandle: h1($?.beforeHandle),
    afterHandle: h1($?.afterHandle),
    onResponse: h1($?.onResponse),
    error: h1($?.error),
  };
};
var N6 = {
  Continue: 100,
  "Switching Protocols": 101,
  Processing: 102,
  "Early Hints": 103,
  OK: 200,
  Created: 201,
  Accepted: 202,
  "Non-Authoritative Information": 203,
  "No Content": 204,
  "Reset Content": 205,
  "Partial Content": 206,
  "Multi-Status": 207,
  "Already Reported": 208,
  "Multiple Choices": 300,
  "Moved Permanently": 301,
  Found: 302,
  "See Other": 303,
  "Not Modified": 304,
  "Temporary Redirect": 307,
  "Permanent Redirect": 308,
  "Bad Request": 400,
  Unauthorized: 401,
  "Payment Required": 402,
  Forbidden: 403,
  "Not Found": 404,
  "Method Not Allowed": 405,
  "Not Acceptable": 406,
  "Proxy Authentication Required": 407,
  "Request Timeout": 408,
  Conflict: 409,
  Gone: 410,
  "Length Required": 411,
  "Precondition Failed": 412,
  "Payload Too Large": 413,
  "URI Too Long": 414,
  "Unsupported Media Type": 415,
  "Range Not Satisfiable": 416,
  "Expectation Failed": 417,
  "I'm a teapot": 418,
  "Misdirected Request": 421,
  "Unprocessable Content": 422,
  Locked: 423,
  "Failed Dependency": 424,
  "Too Early": 425,
  "Upgrade Required": 426,
  "Precondition Required": 428,
  "Too Many Requests": 429,
  "Request Header Fields Too Large": 431,
  "Unavailable For Legal Reasons": 451,
  "Internal Server Error": 500,
  "Not Implemented": 501,
  "Bad Gateway": 502,
  "Service Unavailable": 503,
  "Gateway Timeout": 504,
  "HTTP Version Not Supported": 505,
  "Variant Also Negotiates": 506,
  "Insufficient Storage": 507,
  "Loop Detected": 508,
  "Not Extended": 510,
  "Network Authentication Required": 511,
};

class c0 {
  $;
  W;
  name;
  setter;
  constructor($, W = {}) {
    this._value = $;
    this.property = W;
  }
  get() {
    return this._value;
  }
  get value() {
    return this._value;
  }
  set value($) {
    if (typeof $ === "object") {
      if (JSON.stringify(this.value) === JSON.stringify($)) return;
    } else if (this.value === $) return;
    (this._value = $), this.sync();
  }
  add($) {
    const W = Object.assign(
      this.property,
      typeof $ === "function" ? $(Object.assign(this.property, this.value)) : $
    );
    if ("value" in W) (this._value = W.value), delete W.value;
    return (this.property = W), this.sync();
  }
  set($) {
    const W =
      typeof $ === "function" ? $(Object.assign(this.property, this.value)) : $;
    if ("value" in W) (this._value = W.value), delete W.value;
    return (this.property = W), this.sync();
  }
  remove() {
    if (this.value === undefined) return;
    this.set({ value: "", expires: new Date() });
  }
  get domain() {
    return this.property.domain;
  }
  set domain($) {
    (this.property.domain = $), this.sync();
  }
  get expires() {
    return this.property.expires;
  }
  set expires($) {
    (this.property.expires = $), this.sync();
  }
  get httpOnly() {
    return this.property.httpOnly;
  }
  set httpOnly($) {
    (this.property.httpOnly = $), this.sync();
  }
  get maxAge() {
    return this.property.maxAge;
  }
  set maxAge($) {
    (this.property.maxAge = $), this.sync();
  }
  get path() {
    return this.property.path;
  }
  set path($) {
    (this.property.path = $), this.sync();
  }
  get priority() {
    return this.property.priority;
  }
  set priority($) {
    (this.property.priority = $), this.sync();
  }
  get sameSite() {
    return this.property.sameSite;
  }
  set sameSite($) {
    (this.property.sameSite = $), this.sync();
  }
  get secure() {
    return this.property.secure;
  }
  set secure($) {
    (this.property.secure = $), this.sync();
  }
  toString() {
    return typeof this.value === "object"
      ? JSON.stringify(this.value)
      : this.value?.toString() ?? "";
  }
  sync() {
    if (!this.name || !this.setter) return this;
    if (!this.setter.cookie)
      this.setter.cookie = {
        [this.name]: Object.assign(this.property, { value: this.toString() }),
      };
    else
      this.setter.cookie[this.name] = Object.assign(this.property, {
        value: this.toString(),
      });
    return this;
  }
}
var gY = ($, W) =>
  new Proxy($, {
    get(Y, X) {
      if (X in Y) return Y[X];
      const Z = new c0(undefined);
      return (Z.setter = W), (Z.name = X), Z;
    },
    set(Y, X, Z) {
      if (!(Z instanceof c0)) return false;
      if (!W.cookie) W.cookie = {};
      return (Z.setter = W), (Z.name = X), Z.sync(), (Y[X] = Z), true;
    },
  });
var fY = ($, W, { secret: Y, sign: X } = {}) => {
  if (!W) return gY({}, $);
  const Z = {},
    Q = typeof Y === "string";
  if (X && X !== true && !Array.isArray(X)) X = [X];
  const J = Object.keys(T$(W));
  for (let q = 0; q < J.length; q++) {
    const F = J[q];
    let D = T$(W)[F];
    if (X === true || X?.includes(F)) {
      if (!Y) throw new Error("No secret is provided to cookie plugin");
      if (Q) {
        if (((D = g$(D, Y)), D === false))
          throw new Error(`Fail to decode cookie: ${F}`);
      } else {
        let I = true;
        for (let w = 0; w < Y.length; w++) {
          const U = g$(D, Y[w]);
          if (U !== false) {
            (D = U), (I = false);
            break;
          }
        }
        if (I) throw new Error(`Fail to decode cookie: ${F}`);
      }
    }
    const B = D.charCodeAt(0);
    if (B === 123 || B === 91)
      try {
        const I = new c0(JSON.parse(D));
        (I.setter = $), (I.name = F), (Z[F] = I);
        continue;
      } catch {}
    if (!Number.isNaN(+D)) D = +D;
    else if (D === "true") D = true;
    else if (D === "false") D = false;
    const K = new c0(D);
    (K.setter = $), (K.name = F), (Z[F] = K);
  }
  return gY(Z, $);
};
var TY = "toJSON" in new Headers();
var O1 = ($) => {
  for (let W in $) return true;
  return false;
};
var dY = ($, W) => {
  if (!$ || !Array.isArray(W)) return $;
  $.delete("Set-Cookie");
  for (let Y = 0; Y < W.length; Y++) {
    const X = W[Y].indexOf("=");
    $.append("Set-Cookie", `${W[Y].slice(0, X)}=${W[Y].slice(X + 1)}`);
  }
  return $;
};
var yY = ($) => {
  if (!$ || typeof $ !== "object" || !O1($)) return;
  const W = [];
  for (let [Y, X] of Object.entries($)) {
    if (!Y || !X) continue;
    if (Array.isArray(X.value))
      for (let Z = 0; Z < X.value.length; Z++) {
        let Q = X.value[Z];
        if (Q === undefined || Q === null) continue;
        if (typeof Q === "object") Q = JSON.stringify(Q);
        W.push(d$(Y, Q, X));
      }
    else {
      let Z = X.value;
      if (Z === undefined || Z === null) continue;
      if (typeof Z === "object") Z = JSON.stringify(Z);
      W.push(d$(Y, X.value, X));
    }
  }
  if (W.length === 0) return;
  if (W.length === 1) return W[0];
  return W;
};
var U1 = ($, W) => {
  if (O1(W.headers) || W.status !== 200 || W.redirect || W.cookie) {
    if (W.redirect) (W.headers.Location = W.redirect), (W.status = 302);
    if (W.cookie && O1(W.cookie)) W.headers["Set-Cookie"] = yY(W.cookie);
    if (W.headers["Set-Cookie"] && Array.isArray(W.headers["Set-Cookie"]))
      W.headers = dY(new Headers(W.headers), W.headers["Set-Cookie"]);
    if (typeof W.status === "string") W.status = N6[W.status];
    switch ($?.constructor?.name) {
      case "String":
      case "Blob":
        return new Response($, { status: W.status, headers: W.headers });
      case "Object":
      case "Array":
        return Response.json($, W);
      case undefined:
        if (!$) return new Response("", W);
        return Response.json($, W);
      case "Response":
        const Y = { ...W.headers };
        if (TY) W.headers = $.headers.toJSON();
        else
          for (let [Z, Q] of $.headers.entries())
            if (Z in W.headers) W.headers[Z] = Q;
        for (let Z in Y) $.headers.append(Z, Y[Z]);
        return $;
      case "Error":
        return U$($, W);
      case "Promise":
        return $.then((Z) => U1(Z, W));
      case "Function":
        return U1($(), W);
      case "Number":
      case "Boolean":
        return new Response($.toString(), W);
      case "Cookie":
        if ($ instanceof c0) return new Response($.value, W);
        return new Response($?.toString(), W);
      default:
        const X = JSON.stringify($);
        if (X.charCodeAt(0) === 123) {
          if (!W.headers["Content-Type"])
            W.headers["Content-Type"] = "application/json";
          return new Response(JSON.stringify($), W);
        }
        return new Response(X, W);
    }
  } else
    switch ($?.constructor?.name) {
      case "String":
      case "Blob":
        return new Response($);
      case "Object":
      case "Array":
        return new Response(JSON.stringify($), {
          headers: { "content-type": "application/json" },
        });
      case undefined:
        if (!$) return new Response("");
        return new Response(JSON.stringify($), {
          headers: { "content-type": "application/json" },
        });
      case "Response":
        return $;
      case "Error":
        return U$($, W);
      case "Promise":
        return $.then((X) => {
          const Z = w1(X);
          if (Z !== undefined) return Z;
          return new Response("");
        });
      case "Function":
        return w1($());
      case "Number":
      case "Boolean":
        return new Response($.toString());
      case "Cookie":
        if ($ instanceof c0) return new Response($.value, W);
        return new Response($?.toString(), W);
      default:
        const Y = JSON.stringify($);
        if (Y.charCodeAt(0) === 123)
          return new Response(JSON.stringify($), {
            headers: { "Content-Type": "application/json" },
          });
        return new Response(Y);
    }
};
var l0 = ($, W) => {
  if ($ === undefined || $ === null) return;
  if (O1(W.headers) || W.status !== 200 || W.redirect || W.cookie) {
    if (W.redirect) (W.headers.Location = W.redirect), (W.status = 302);
    if (W.cookie && O1(W.cookie)) W.headers["Set-Cookie"] = yY(W.cookie);
    if (W.headers["Set-Cookie"] && Array.isArray(W.headers["Set-Cookie"]))
      W.headers = dY(new Headers(W.headers), W.headers["Set-Cookie"]);
    if (typeof W.status === "string") W.status = N6[W.status];
    switch ($?.constructor?.name) {
      case "String":
      case "Blob":
        return new Response($, W);
      case "Object":
      case "Array":
        return Response.json($, W);
      case undefined:
        if (!$) return;
        return Response.json($, W);
      case "Response":
        const Y = Object.assign({}, W.headers);
        if (TY) W.headers = $.headers.toJSON();
        else
          for (let [Z, Q] of $.headers.entries())
            if (!(Z in W.headers)) W.headers[Z] = Q;
        for (let Z in Y) $.headers.append(Z, Y[Z]);
        if ($.status !== W.status) W.status = $.status;
        return $;
      case "Promise":
        return $.then((Z) => {
          const Q = l0(Z, W);
          if (Q !== undefined) return Q;
          return;
        });
      case "Error":
        return U$($, W);
      case "Function":
        return l0($(), W);
      case "Number":
      case "Boolean":
        return new Response($.toString(), W);
      case "Cookie":
        if ($ instanceof c0) return new Response($.value, W);
        return new Response($?.toString(), W);
      default:
        const X = JSON.stringify($);
        if (X.charCodeAt(0) === 123) {
          if (!W.headers["Content-Type"])
            W.headers["Content-Type"] = "application/json";
          return new Response(JSON.stringify($), W);
        }
        return new Response(X, W);
    }
  } else
    switch ($?.constructor?.name) {
      case "String":
      case "Blob":
        return new Response($);
      case "Object":
      case "Array":
        return new Response(JSON.stringify($), {
          headers: { "content-type": "application/json" },
        });
      case undefined:
        if (!$) return new Response("");
        return new Response(JSON.stringify($), {
          headers: { "content-type": "application/json" },
        });
      case "Response":
        return $;
      case "Promise":
        return $.then((X) => {
          const Z = l0(X, W);
          if (Z !== undefined) return Z;
          return;
        });
      case "Error":
        return U$($, W);
      case "Function":
        return w1($());
      case "Number":
      case "Boolean":
        return new Response($.toString());
      case "Cookie":
        if ($ instanceof c0) return new Response($.value, W);
        return new Response($?.toString(), W);
      default:
        const Y = JSON.stringify($);
        if (Y.charCodeAt(0) === 123)
          return new Response(JSON.stringify($), {
            headers: { "Content-Type": "application/json" },
          });
        return new Response(Y);
    }
};
var w1 = ($) => {
  switch ($?.constructor?.name) {
    case "String":
    case "Blob":
      return new Response($);
    case "Object":
    case "Array":
      return new Response(JSON.stringify($), {
        headers: { "content-type": "application/json" },
      });
    case undefined:
      if (!$) return new Response("");
      return new Response(JSON.stringify($), {
        headers: { "content-type": "application/json" },
      });
    case "Response":
      return $;
    case "Error":
      return U$($);
    case "Promise":
      return $.then((Y) => {
        const X = w1(Y);
        if (X !== undefined) return X;
        return new Response("");
      });
    case "Function":
      return w1($());
    case "Number":
    case "Boolean":
      return new Response($.toString());
    default:
      const W = JSON.stringify($);
      if (W.charCodeAt(0) === 123)
        return new Response(JSON.stringify($), {
          headers: { "Content-Type": "application/json" },
        });
      return new Response(W);
  }
};
var U$ = ($, W) =>
  new Response(
    JSON.stringify({ name: $?.name, message: $?.message, cause: $?.cause }),
    { status: W?.status !== 200 ? W?.status ?? 500 : 500, headers: W?.headers }
  );
var U7 = new Headers().toJSON;
var F7 = new RegExp(" (\\w+) = context", "g");
var pY = { value: 0 };
var iY = ({
  hasTrace: $,
  hasTraceSet: W = false,
  addFn: Y,
  condition: X = {},
}) => {
  if ($)
    return (Z, { name: Q, attribute: J = "", unit: q = 0 } = {}) => {
      const F = Z.indexOf("."),
        D = Z !== "handle" && F === -1;
      if (Z !== "request" && Z !== "response" && !X[D ? Z : Z.slice(0, F)])
        return () => {};
      if (D) Q ||= Z;
      else Q ||= "anonymous";
      Y(
        "\n" +
          `reporter.emit('event', { 
					id,
					event: '${Z}',
					type: 'begin',
					name: '${Q}',
					time: performance.now(),
					${D ? `unit: ${q},` : ""}
					${J}
				})`.replace(/(\t| |\n)/g, "") +
          "\n"
      );
      let B = false;
      return () => {
        if (B) return;
        if (
          ((B = true),
          Y(
            "\n" +
              `
						reporter.emit('event', {
							id,
							event: '${Z}',
							type: 'end',
							time: performance.now()
						})`.replace(/(\t| |\n)/g, "") +
              "\n"
          ),
          W && Z === "afterHandle")
        )
          Y("\nawait new Promise(r => {queueMicrotask(r)})\n");
      };
    };
  else return () => () => {};
};
var F$ = ($) => {
  const W = $.indexOf(")");
  if ($.charCodeAt(W + 2) === 61 && $.charCodeAt(W + 5) !== 123) return true;
  return $.includes("return");
};
var B7 = ($, { injectResponse: W = "" } = {}) => ({
  composeValidation: (Y, X = `c.${Y}`) =>
    $
      ? `c.set.status = 400; throw new ValidationError(
'${Y}',
${Y},
${X}
)`
      : `c.set.status = 400; return new ValidationError(
	'${Y}',
	${Y},
	${X}
).toResponse(c.set.headers)`,
  composeResponseValidation: (Y = "r") => {
    const X = $
      ? `throw new ValidationError(
'response',
response[c.set.status],
${Y}
)`
      : `return new ValidationError(
'response',
response[c.set.status],
${Y}
).toResponse(c.set.headers)`;
    return `\n${W}
		if(response[c.set.status]?.Check(${Y}) === false) { 
	if(!(response instanceof Error))
		${X}
}\n`;
  },
});
var G0 = ($, W) => {
  (W = W.trimStart()), (W = W.replaceAll(/^async /g, ""));
  const Y =
    W.charCodeAt(0) === 40 || W.startsWith("function")
      ? W.slice(W.indexOf("(") + 1, W.indexOf(")"))
      : W.slice(0, W.indexOf("=") - 1);
  if (Y === "") return false;
  const X = Y.charCodeAt(0) === 123 ? Y.indexOf("...") : -1;
  if (Y.charCodeAt(0) === 123) {
    if (Y.includes($)) return true;
    if (X === -1) return false;
  }
  if (W.match(new RegExp(`${Y}(.${$}|\\["${$}"\\])`))) return true;
  const Z = X !== -1 ? Y.slice(X + 3, Y.indexOf(" ", X + 3)) : undefined;
  if (W.match(new RegExp(`${Z}(.${$}|\\["${$}"\\])`))) return true;
  const Q = [Y];
  if (Z) Q.push(Z);
  for (let q of W.matchAll(F7)) Q.push(q[1]);
  const J = new RegExp(`{.*?} = (${Q.join("|")})`, "g");
  for (let [q] of W.matchAll(J))
    if (q.includes(`{ ${$}`) || q.includes(`, ${$}`)) return true;
  return false;
};
var c1 = Symbol.for("TypeBox.Kind");
var m$ = ($, W) => {
  if (!W) return;
  if (c1 in W && W[c1] === $) return true;
  if (W.type === "object") {
    const Y = W.properties;
    for (let X of Object.keys(Y)) {
      const Z = Y[X];
      if (Z.type === "object") {
        if (m$($, Z)) return true;
      } else if (Z.anyOf) {
        for (let Q = 0; Q < Z.anyOf.length; Q++)
          if (m$($, Z.anyOf[Q])) return true;
      }
      if (c1 in Z && Z[c1] === $) return true;
    }
    return false;
  }
  return W.properties && c1 in W.properties && W.properties[c1] === $;
};
var U6 = Symbol.for("TypeBox.Transform");
var C1 = ($) => {
  if (!$) return;
  if ($.type === "object") {
    const W = $.properties;
    for (let Y of Object.keys(W)) {
      const X = W[Y];
      if (X.type === "object") {
        if (C1(X)) return true;
      } else if (X.anyOf) {
        for (let Q = 0; Q < X.anyOf.length; Q++)
          if (C1(X.anyOf[Q])) return true;
      }
      if (U6 in X) return true;
    }
    return false;
  }
  return U6 in $ || ($.properties && U6 in $.properties);
};
var A7 = ($) => {
  if (!$) return;
  const W = $?.schema;
  if (W && "anyOf" in W) {
    let Y = false;
    const X = W.anyOf[0].type;
    for (let Z of W.anyOf)
      if (Z.type !== X) {
        Y = true;
        break;
      }
    if (!Y) return X;
  }
  return $.schema?.type;
};
var w7 = /(?:return|=>) \S*\(/g;
var j0 = ($) => {
  if ($.constructor.name === "AsyncFunction") return true;
  if ($.toString().match(w7)) return true;
  return false;
};
var mY = ({
  path: $,
  method: W,
  hooks: Y,
  validator: X,
  handler: Z,
  handleError: Q,
  definitions: J,
  schema: q,
  onRequest: F,
  config: D,
  reporter: B,
}) => {
  const K =
      D.forceErrorEncapsulation ||
      Y.error.length > 0 ||
      typeof Bun === "undefined" ||
      Y.onResponse.length > 0 ||
      !!Y.trace.length,
    I = Y.onResponse.length
      ? `\n;(async () => {${Y.onResponse
          .map((T, i) => `await res${i}(c)`)
          .join(";")}})();\n`
      : "",
    w = Y.trace.map((T) => T.toString()),
    U = {
      parse: w.some((T) => G0("parse", T)),
      transform: w.some((T) => G0("transform", T)),
      handle: w.some((T) => G0("handle", T)),
      beforeHandle: w.some((T) => G0("beforeHandle", T)),
      afterHandle: w.some((T) => G0("afterHandle", T)),
      error: K || w.some((T) => G0("error", T)),
    },
    P = Y.trace.length;
  let N = "";
  if (P) N += "\nconst id = c.$$requestId\n";
  N += K ? "try {\n" : "";
  const O =
      X || (W !== "GET" && W !== "HEAD")
        ? [Z, ...Y.transform, ...Y.beforeHandle, ...Y.afterHandle].map((T) =>
            T.toString()
          )
        : [],
    S =
      W !== "GET" &&
      W !== "HEAD" &&
      Y.type !== "none" &&
      (!!X.body || !!Y.type || O.some((T) => G0("body", T))),
    R = X.headers || O.some((T) => G0("headers", T)),
    _ = X.cookie || O.some((T) => G0("cookie", T)),
    G = X?.cookie?.schema;
  let b = "";
  if (G?.sign) {
    if (!G.secrets)
      throw new Error(
        `t.Cookie required secret which is not set in (${W}) ${$}.`
      );
    const T = !G.secrets
      ? undefined
      : typeof G.secrets === "string"
      ? G.secrets
      : G.secrets[0];
    if (
      ((b += `const _setCookie = c.set.cookie
		if(_setCookie) {`),
      G.sign === true)
    )
      b += `for(const [key, cookie] of Object.entries(_setCookie)) {
				c.set.cookie[key].value = signCookie(cookie.value, '${T}')
			}`;
    else
      for (let i of G.sign)
        b += `if(_setCookie['${i}']?.value) { c.set.cookie['${i}'].value = signCookie(_setCookie['${i}'].value, '${T}') }\n`;
    b += "}\n";
  }
  const { composeValidation: l, composeResponseValidation: g } = B7(K);
  if (R)
    N += U7
      ? "c.headers = c.request.headers.toJSON()\n"
      : `c.headers = {}
                for (const [key, value] of c.request.headers.entries())
					c.headers[key] = value
				`;
  if (_) {
    const T = G
      ? `{
			secret: ${
        G.secrets !== undefined
          ? typeof G.secrets === "string"
            ? `'${G.secrets}'`
            : "[" + G.secrets.reduce((i, x) => i + `'${x}',`, "") + "]"
          : "undefined"
      },
			sign: ${
        G.sign === true
          ? true
          : G.sign !== undefined
          ? "[" + G.sign.reduce((i, x) => i + `'${x}',`, "") + "]"
          : "undefined"
      }
		}`
      : "undefined";
    if (R) N += `\nc.cookie = parseCookie(c.set, c.headers.cookie, ${T})\n`;
    else
      N += `\nc.cookie = parseCookie(c.set, c.request.headers.get('cookie'), ${T})\n`;
  }
  if (X.query || O.some((T) => G0("query", T)))
    N += `const url = c.request.url

		if(c.qi !== -1) {
			c.query ??= parseQuery(url.substring(c.qi + 1))
		} else {
			c.query ??= {}
		}
		`;
  const N0 = Y.trace.some((T) => G0("set", T.toString())),
    M0 =
      N0 ||
      _ ||
      O.some((T) => G0("set", T)) ||
      F.some((T) => G0("set", T.toString())),
    n = iY({
      hasTrace: P,
      hasTraceSet: N0,
      condition: U,
      addFn: (T) => {
        N += T;
      },
    }),
    Y0 =
      S ||
      N0 ||
      j0(Z) ||
      Y.parse.length > 0 ||
      Y.afterHandle.some(j0) ||
      Y.beforeHandle.some(j0) ||
      Y.transform.some(j0),
    V0 = n("parse", { unit: Y.parse.length });
  if (S) {
    const T = A7(X?.body);
    if (Y.type && !Array.isArray(Y.type)) {
      if (Y.type)
        switch (Y.type) {
          case "json":
          case "application/json":
            N += "c.body = await c.request.json()\n";
            break;
          case "text":
          case "text/plain":
            N += "c.body = await c.request.text()\n";
            break;
          case "urlencoded":
          case "application/x-www-form-urlencoded":
            N += "c.body = parseQuery(await c.request.text())\n";
            break;
          case "arrayBuffer":
          case "application/octet-stream":
            N += "c.body = await c.request.arrayBuffer()\n";
            break;
          case "formdata":
          case "multipart/form-data":
            N += `c.body = {}

						const form = await c.request.formData()
						for (const key of form.keys()) {
							if (c.body[key])
								continue

							const value = form.getAll(key)
							if (value.length === 1)
								c.body[key] = value[0]
							else c.body[key] = value
						}\n`;
            break;
        }
      if (Y.parse.length) N += "}}";
    } else {
      const x = (() => {
        if (Y.parse.length && T && !Array.isArray(Y.type)) {
          const s = X?.body?.schema;
          switch (T) {
            case "object":
              if (m$("File", s) || m$("Files", s))
                return `c.body = {}
		
								const form = await c.request.formData()
								for (const key of form.keys()) {
									if (c.body[key])
										continue
			
									const value = form.getAll(key)
									if (value.length === 1)
										c.body[key] = value[0]
									else c.body[key] = value
								}`;
              break;
            default:
              break;
          }
        }
      })();
      if (x) N += x;
      else {
        if (
          ((N += "\n"),
          (N += R
            ? "let contentType = c.headers['content-type']"
            : "let contentType = c.request.headers.get('content-type')"),
          (N += `
				if (contentType) {
					const index = contentType.indexOf(';')
					if (index !== -1) contentType = contentType.substring(0, index)\n`),
          Y.parse.length)
        ) {
          N += "let used = false\n";
          const s = n("parse", { unit: Y.parse.length });
          for (let K0 = 0; K0 < Y.parse.length; K0++) {
            const F0 = `bo${K0}`;
            if (K0 !== 0) N += "if(!used) {\n";
            if (
              ((N += `let ${F0} = parse[${K0}](c, contentType)\n`),
              (N += `if(${F0} instanceof Promise) ${F0} = await ${F0}\n`),
              (N += `if(${F0} !== undefined) { c.body = ${F0}; used = true }\n`),
              K0 !== 0)
            )
              N += "}";
          }
          s();
        }
        if (Y.parse.length) N += "if (!used)";
        (N += `
				switch (contentType) {
					case 'application/json':
						c.body = await c.request.json()
						break
				
					case 'text/plain':
						c.body = await c.request.text()
						break
				
					case 'application/x-www-form-urlencoded':
						c.body = parseQuery(await c.request.text())
						break
				
					case 'application/octet-stream':
						c.body = await c.request.arrayBuffer();
						break
				
					case 'multipart/form-data':
						c.body = {}
				
						const form = await c.request.formData()
						for (const key of form.keys()) {
							if (c.body[key])
								continue
				
							const value = form.getAll(key)
							if (value.length === 1)
								c.body[key] = value[0]
							else c.body[key] = value
						}
				
						break
					}\n`),
          (N += "}\n");
      }
    }
    N += "\n";
  }
  if ((V0(), Y?.transform)) {
    const T = n("transform", { unit: Y.transform.length });
    for (let i = 0; i < Y.transform.length; i++) {
      const x = Y.transform[i],
        s = n("transform.unit");
      if (x.$elysia === "derive")
        N += j0(Y.transform[i])
          ? `Object.assign(c, await transform[${i}](c));`
          : `Object.assign(c, transform[${i}](c));`;
      else
        N += j0(Y.transform[i])
          ? `await transform[${i}](c);`
          : `transform[${i}](c);`;
      s();
    }
    T();
  }
  if (X) {
    if (((N += "\n"), X.headers)) {
      if (
        ((N += `if(headers.Check(c.headers) === false) {
				${l("headers")}
			}`),
        C1(X.headers.schema))
      )
        N += "\nc.headers = headers.Decode(c.headers)\n";
    }
    if (X.params) {
      if (
        ((N += `if(params.Check(c.params) === false) {
				${l("params")}
			}`),
        C1(X.params.schema))
      )
        N += "\nc.params = params.Decode(c.params)\n";
    }
    if (X.query) {
      if (
        ((N += `if(query.Check(c.query) === false) {
				${l("query")} 
			}`),
        C1(X.query.schema))
      )
        N += "\nc.query = query.Decode(Object.assign({}, c.query))\n";
    }
    if (X.body) {
      if (
        ((N += `if(body.Check(c.body) === false) { 
				${l("body")}
			}`),
        C1(X.body.schema))
      )
        N += "\nc.body = body.Decode(c.body)\n";
    }
    if (X.cookie) {
      if (
        ((N += `const cookieValue = {}
			for(const [key, value] of Object.entries(c.cookie))
				cookieValue[key] = value.value

			if(cookie.Check(cookieValue) === false) {
				${l("cookie", "cookieValue")}
			}`),
        C1(X.cookie.schema))
      )
        N += "\nc.cookie = params.Decode(c.cookie)\n";
    }
  }
  if (Y?.beforeHandle) {
    const T = n("beforeHandle", { unit: Y.beforeHandle.length });
    for (let i = 0; i < Y.beforeHandle.length; i++) {
      const x = n("beforeHandle.unit", { name: Y.beforeHandle[i].name }),
        s = `be${i}`;
      if (!F$(Y.beforeHandle[i].toString()))
        (N += j0(Y.beforeHandle[i])
          ? `await beforeHandle[${i}](c);\n`
          : `beforeHandle[${i}](c);\n`),
          x();
      else {
        (N += j0(Y.beforeHandle[i])
          ? `let ${s} = await beforeHandle[${i}](c);\n`
          : `let ${s} = beforeHandle[${i}](c);\n`),
          x(),
          (N += `if(${s} !== undefined) {\n`);
        const F0 = n("afterHandle", { unit: Y.transform.length });
        if (Y.afterHandle) {
          const v0 = s;
          for (let U0 = 0; U0 < Y.afterHandle.length; U0++) {
            const $1 = F$(Y.afterHandle[U0].toString()),
              W1 = n("afterHandle.unit", { name: Y.afterHandle[U0].name });
            if (((N += `c.response = ${v0}\n`), !$1))
              N += j0(Y.afterHandle[U0])
                ? `await afterHandle[${U0}](c, ${v0});\n`
                : `afterHandle[${U0}](c, ${v0});\n`;
            else {
              const q0 = `af${U0}`;
              (N += j0(Y.afterHandle[U0])
                ? `const ${q0} = await afterHandle[${U0}](c);\n`
                : `const ${q0} = afterHandle[${U0}](c);\n`),
                (N += `if(${q0} !== undefined) { c.response = ${v0} = ${q0} }\n`);
            }
            W1();
          }
        }
        if ((F0(), X.response)) N += g(s);
        (N += b), (N += `return mapEarlyResponse(${s}, c.set)}\n`);
      }
    }
    T();
  }
  if (Y?.afterHandle.length) {
    const T = n("handle", { name: Z.name });
    (N += j0(Z) ? "let r = await handler(c);\n" : "let r = handler(c);\n"), T();
    const i = n("afterHandle", { unit: Y.afterHandle.length });
    N += "c.response = r\n";
    for (let x = 0; x < Y.afterHandle.length; x++) {
      const s = `af${x}`,
        K0 = F$(Y.afterHandle[x].toString()),
        F0 = n("afterHandle.unit", { name: Y.afterHandle[x].name });
      if (!K0)
        (N += j0(Y.afterHandle[x])
          ? `await afterHandle[${x}](c)\n`
          : `afterHandle[${x}](c)\n`),
          F0();
      else if (
        ((N += j0(Y.afterHandle[x])
          ? `let ${s} = await afterHandle[${x}](c)\n`
          : `let ${s} = afterHandle[${x}](c)\n`),
        F0(),
        X.response)
      )
        (N += `if(${s} !== undefined) {`),
          (N += g(s)),
          (N += `${s} = mapEarlyResponse(${s}, c.set)\n`),
          (N += `if(${s}) {`),
          i(),
          (N += `return ${s} } }`);
      else (N += `if(${s}) {`), i(), (N += `return ${s} }\n`);
    }
    if ((i(), X.response)) N += g();
    if (((N += b), M0)) N += "return mapResponse(r, c.set)\n";
    else N += "return mapCompactResponse(r)\n";
  } else {
    const T = n("handle", { name: Z.name });
    if (X.response)
      if (
        ((N += j0(Z)
          ? "const r = await handler(c);\n"
          : "const r = handler(c);\n"),
        T(),
        (N += g()),
        n("afterHandle")(),
        (N += b),
        M0)
      )
        N += "return mapResponse(r, c.set)\n";
      else N += "return mapCompactResponse(r)\n";
    else if (U.handle || _)
      if (
        ((N += j0(Z) ? "let r = await handler(c);\n" : "let r = handler(c);\n"),
        T(),
        n("afterHandle")(),
        (N += b),
        M0)
      )
        N += "return mapResponse(r, c.set)\n";
      else N += "return mapCompactResponse(r)\n";
    else {
      T();
      const i = j0(Z) ? "await handler(c) " : "handler(c)";
      if ((n("afterHandle")(), M0)) N += `return mapResponse(${i}, c.set)\n`;
      else N += `return mapCompactResponse(${i})\n`;
    }
  }
  if (K || I) {
    if (
      ((N += `
} catch(error) {`),
      !Y0)
    )
      N += "return (async () => {";
    N += `const set = c.set

		if (!set.status || set.status < 300) set.status = 500
	`;
    const T = n("error", { unit: Y.error.length });
    if (Y.error.length) {
      N += "for (let i = 0; i < handleErrors.length; i++) {\n";
      const i = n("error.unit");
      (N += `\nlet handled = handleErrors[i]({
					request: c.request,
					error: error,
					set,
					code: error.code ?? error[ERROR_CODE] ?? "UNKNOWN"
				})
				if (handled instanceof Promise) handled = await handled\n`),
        i(),
        (N += "const response = mapEarlyResponse(handled, set)\n"),
        (N += "if (response) {"),
        T(),
        (N += "return response }\n"),
        (N += "}\n");
    }
    if ((T(), (N += "return handleError(c, error)"), !Y0)) N += "})()";
    if (((N += "}"), I || P)) {
      N += " finally { ";
      const i = n("response", { unit: Y.onResponse.length });
      (N += I), i(), (N += "}");
    }
  }
  return (
    (N = `const { 
		handler,
		handleError,
		hooks: {
			transform,
			beforeHandle,
			afterHandle,
			parse,
			error: handleErrors,
			onResponse
		},
		validator: {
			body,
			headers,
			params,
			query,
			response,
			cookie
		},
		utils: {
			mapResponse,
			mapCompactResponse,
			mapEarlyResponse,
			parseQuery
		},
		error: {
			NotFoundError,
			ValidationError,
			InternalServerError
		},
		schema,
		definitions,
		ERROR_CODE,
		reporter,
		requestId,
		parseCookie,
		signCookie
	} = hooks

	${
    Y.onResponse.length
      ? `const ${Y.onResponse
          .map((T, i) => `res${i} = onResponse[${i}]`)
          .join(",")}`
      : ""
  }

	return ${Y0 ? "async" : ""} function(c) {
		${q && J ? "c.schema = schema; c.defs = definitions;" : ""}
		${N}
	}`),
    Function(
      "hooks",
      N
    )({
      handler: Z,
      hooks: Y,
      validator: X,
      handleError: Q,
      utils: {
        mapResponse: U1,
        mapCompactResponse: w1,
        mapEarlyResponse: l0,
        parseQuery: vY.parse,
      },
      error: {
        NotFoundError: P1,
        ValidationError: S0,
        InternalServerError: x$,
      },
      schema: q,
      definitions: J,
      ERROR_CODE: A1,
      reporter: B,
      requestId: pY,
      parseCookie: fY,
      signCookie: k$,
    })
  );
};
var F6 = ($) => {
  let W = "",
    Y = "";
  for (let B of Object.keys($.decorators)) W += `,${B}: app.decorators.${B}`;
  const { router: X, staticRouter: Z } = $,
    Q = $.event.trace.length,
    J = `
	const route = find(request.method, path) ${
    X.root.ALL ? '?? find("ALL", path)' : ""
  }
	if (route === null)
		return ${
      $.event.error.length
        ? "handleError(ctx, notFound)"
        : `new Response(error404, {
					status: 404
				})`
    }

	ctx.params = route.params

	return route.store(ctx)`;
  let q = "";
  for (let [B, { code: K, all: I }] of Object.entries(Z.map))
    q += `case '${B}':\nswitch(request.method) {\n${K}\n${
      I ?? "default: break map"
    }}\n\n`;
  Y += `const {
		app,
		app: { store, router, staticRouter },
		mapEarlyResponse,
		NotFoundError,
		requestId,
		reporter
	} = data

	const notFound = new NotFoundError()

	${$.event.request.length ? "const onRequest = app.event.request" : ""}

	${Z.variables}

	const find = router.find.bind(router)
	const handleError = app.handleError.bind(this)

	${$.event.error.length ? "" : "const error404 = notFound.message.toString()"}

	return function map(request) {
	`;
  const F = $.event.trace.map((B) => B.toString()),
    D = iY({
      hasTrace: Q,
      condition: { request: F.some((B) => G0("parse", B.toString())) },
      addFn: (B) => {
        Y += B;
      },
    });
  if ($.event.request.length) {
    Y += `
			${Q ? "const id = +requestId.value++" : ""}

			const ctx = {
				request,
				store,
				set: {
					cookie: {},
					headers: {},
					status: 200
				}
				${Q ? ",$$requestId: +id" : ""}
				${W}
			}
		`;
    const B = D("request", { attribute: "ctx" });
    Y += "try {\n";
    for (let K = 0; K < $.event.request.length; K++) {
      const I = F$($.event.request[K].toString()),
        w = D("request.unit", { name: $.event.request[K].name });
      if (I)
        (Y += `const response = mapEarlyResponse(
					onRequest[${K}](ctx),
					ctx.set
				)\n`),
          w(),
          (Y += "if(response) return response\n");
      else (Y += `onRequest[${K}](ctx)`), w();
    }
    (Y += `} catch (error) {
			return handleError(ctx, error)
		}`),
      B(),
      (Y += `
		const url = request.url,
		s = url.indexOf('/', 11),
		i = ctx.qi = url.indexOf('?', s + 1),
		path = ctx.path = i === -1 ? url.substring(s) : url.substring(s, i);`);
  } else
    (Y += `
		const url = request.url,
			s = url.indexOf('/', 11),
			qi = url.indexOf('?', s + 1),
			path = qi === -1
				? url.substring(s)
				: url.substring(s, qi)

		${Q ? "const id = +requestId.value++" : ""}

		const ctx = {
			request,
			store,
			qi,
			path,
			set: {
				headers: {},
				status: 200
			}
			${Q ? ",$$requestId: id" : ""}
			${W}
		}`),
      D("request", {
        attribute:
          F.some((B) => G0("context", B)) ||
          F.some((B) => G0("store", B)) ||
          F.some((B) => G0("set", B))
            ? "ctx"
            : "",
      })();
  return (
    (Y += `
		map: switch(path) {
			${q}

			default:
				break
		}

		${J}
	}`),
    ($.handleError = B6($)),
    Function(
      "data",
      Y
    )({
      app: $,
      mapEarlyResponse: l0,
      NotFoundError: P1,
      reporter: $.reporter,
      requestId: pY,
    })
  );
};
var B6 = ($) => {
  let W = `const {
		app: { event: { error: onError, onResponse: res } },
		mapResponse,
		ERROR_CODE
	} = inject

	return ${$.event.error.find(j0) ? "async" : ""} function(context, error) {
		const { request, set } = context
		`;
  for (let Y = 0; Y < $.event.error.length; Y++) {
    const X = $.event.error[Y],
      Z = `${j0(X) ? "await " : ""}onError[${Y}]({
			request,
			code: error.code ?? error[ERROR_CODE] ?? 'UNKNOWN',
			error,
			set
		})`;
    if (F$(X.toString()))
      W += `const r${Y} = ${Z}; if(r${Y} !== undefined) return mapResponse(r${Y}, set)\n`;
    else W += Z + "\n";
  }
  return (
    (W += `if(error.constructor.name === "ValidationError") {
		set.status = error.status ?? 400
		return new Response(
			error.message, 
			{ headers: set.headers, status: set.status }
		)
	} else {
		return new Response(error.message, { headers: set.headers, status: error.status ?? 500 })
	}
}`),
    Function("inject", W)({ app: $, mapResponse: U1, ERROR_CODE: A1 })
  );
};
var u$ = Y1(Y6(), 1);
var A6 = ($) => async (W) => {
  const Y = { cookie: {}, status: 200, headers: {} };
  let X;
  if ($.decorators)
    (X = $.decorators), (X.request = W), (X.set = Y), (X.store = $.store);
  else X = { set: Y, store: $.store, request: W };
  const Z = W.url,
    Q = Z.indexOf("/", 11),
    J = Z.indexOf("?", Q + 1),
    q = J === -1 ? Z.substring(Q) : Z.substring(Q, J);
  try {
    for (let P = 0; P < $.event.request.length; P++) {
      const N = $.event.request[P];
      let O = N(X);
      if (O instanceof Promise) O = await O;
      if (((O = l0(O, Y)), O)) return O;
    }
    const F =
      $.dynamicRouter.find(W.method, q) ?? $.dynamicRouter.find("ALL", q);
    if (!F) throw new P1();
    const { handle: D, hooks: B, validator: K, content: I } = F.store;
    let w;
    if (W.method !== "GET" && W.method !== "HEAD")
      if (I)
        switch (I) {
          case "application/json":
            w = await W.json();
            break;
          case "text/plain":
            w = await W.text();
            break;
          case "application/x-www-form-urlencoded":
            w = u$.parse(await W.text());
            break;
          case "application/octet-stream":
            w = await W.arrayBuffer();
            break;
          case "multipart/form-data":
            w = {};
            const P = await W.formData();
            for (let N of P.keys()) {
              if (w[N]) continue;
              const O = P.getAll(N);
              if (O.length === 1) w[N] = O[0];
              else w[N] = O;
            }
            break;
        }
      else {
        let P = W.headers.get("content-type");
        if (P) {
          const N = P.indexOf(";");
          if (N !== -1) P = P.slice(0, N);
          for (let O = 0; O < $.event.parse.length; O++) {
            let S = $.event.parse[O](X, P);
            if (S instanceof Promise) S = await S;
            if (S) {
              w = S;
              break;
            }
          }
          if (w === undefined)
            switch (P) {
              case "application/json":
                w = await W.json();
                break;
              case "text/plain":
                w = await W.text();
                break;
              case "application/x-www-form-urlencoded":
                w = u$.parse(await W.text());
                break;
              case "application/octet-stream":
                w = await W.arrayBuffer();
                break;
              case "multipart/form-data":
                w = {};
                const O = await W.formData();
                for (let S of O.keys()) {
                  if (w[S]) continue;
                  const R = O.getAll(S);
                  if (R.length === 1) w[S] = R[0];
                  else w[S] = R;
                }
                break;
            }
        }
      }
    (X.body = w),
      (X.params = F?.params || undefined),
      (X.query = J === -1 ? {} : u$.parse(Z.substring(J + 1)));
    for (let P = 0; P < B.transform.length; P++) {
      const N = B.transform[P](X);
      if (B.transform[P].$elysia === "derive")
        if (N instanceof Promise) Object.assign(X, await N);
        else Object.assign(X, N);
      else if (N instanceof Promise) await N;
    }
    if (K) {
      if (K.headers) {
        const P = {};
        for (let N in W.headers) P[N] = W.headers.get(N);
        if (K.headers.Check(P) === false) throw new S0("header", K.headers, P);
      }
      if (K.params?.Check(X.params) === false)
        throw new S0("params", K.params, X.params);
      if (K.query?.Check(X.query) === false)
        throw new S0("query", K.query, X.query);
      if (K.cookie) {
        const P = {};
        for (let [N, O] of Object.entries(X.cookie)) P[N] = O.value;
        if (K.cookie?.Check(P) === false) throw new S0("cookie", K.cookie, P);
      }
      if (K.body?.Check(w) === false) throw new S0("body", K.body, w);
    }
    for (let P = 0; P < B.beforeHandle.length; P++) {
      let N = B.beforeHandle[P](X);
      if (N instanceof Promise) N = await N;
      if (N !== undefined) {
        X.response = N;
        for (let S = 0; S < B.afterHandle.length; S++) {
          let R = B.afterHandle[S](X);
          if (R instanceof Promise) R = await R;
          if (R) N = R;
        }
        const O = l0(N, X.set);
        if (O) return O;
      }
    }
    let U = D(X);
    if (U instanceof Promise) U = await U;
    if (!B.afterHandle.length) {
      const P = K?.response?.[U.status];
      if (P?.Check(U) === false) throw new S0("response", P, U);
    } else {
      X.response = U;
      for (let P = 0; P < B.afterHandle.length; P++) {
        let N = B.afterHandle[P](X);
        if (N instanceof Promise) N = await N;
        const O = l0(N, X.set);
        if (O !== undefined) {
          const S = K?.response?.[U.status];
          if (S?.Check(O) === false) throw new S0("response", S, O);
          return O;
        }
      }
    }
    return U1(U, X.set);
  } catch (F) {
    if (F.status) Y.status = F.status;
    return $.handleError(W, F, Y);
  } finally {
    for (let F of $.event.onResponse) await F(X);
  }
};
var uY =
  ($) =>
  async (W, Y, X = { cookie: {}, headers: {} }) => {
    for (let Z = 0; Z < $.event.error.length; Z++) {
      let Q = $.event.error[Z]({
        request: W,
        code: Y.code ?? Y[A1] ?? "UNKNOWN",
        error: Y,
        set: X,
      });
      if (Q instanceof Promise) Q = await Q;
      if (Q !== undefined && Q !== null) return U1(Q, X);
    }
    return new Response(typeof Y.cause === "string" ? Y.cause : Y.message, {
      headers: X.headers,
      status: Y.status ?? 500,
    });
  };
var I1 = Y1(R$(), 1);
var A0 = Y1(f0(), 1);
try {
  I1.TypeSystem.Format("email", ($) =>
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(
      $
    )
  ),
    I1.TypeSystem.Format("uuid", ($) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        $
      )
    ),
    I1.TypeSystem.Format("date", ($) => !Number.isNaN(new Date($).getTime())),
    I1.TypeSystem.Format(
      "date-time",
      ($) => !Number.isNaN(new Date($).getTime())
    );
} catch ($) {}
var nY = ($) => {
  if (typeof $ === "string")
    switch ($.slice(-1)) {
      case "k":
        return +$.slice(0, $.length - 1) * 1024;
      case "m":
        return +$.slice(0, $.length - 1) * 1048576;
      default:
        return +$;
    }
  return $;
};
var w6 = ($, W) => {
  if (!(W instanceof Blob)) return false;
  if ($.minSize && W.size < nY($.minSize)) return false;
  if ($.maxSize && W.size > nY($.maxSize)) return false;
  if ($.extension)
    if (typeof $.extension === "string") {
      if (!W.type.startsWith($.extension)) return false;
    } else {
      for (let Y = 0; Y < $.extension.length; Y++)
        if (W.type.startsWith($.extension[Y])) return true;
      return false;
    }
  return true;
};
var D7 = I1.TypeSystem.Type("Files", ($, W) => {
  if (!Array.isArray(W)) return w6($, W);
  if ($.minItems && W.length < $.minItems) return false;
  if ($.maxItems && W.length > $.maxItems) return false;
  for (let Y = 0; Y < W.length; Y++) if (!w6($, W[Y])) return false;
  return true;
});
var R1 = {
  Numeric: ($) =>
    A0.Type.Transform(A0.Type.Union([A0.Type.String(), A0.Type.Number($)]))
      .Decode((W) => {
        const Y = +W;
        if (isNaN(Y)) return W;
        return Y;
      })
      .Encode((W) => W),
  ObjectString: ($, W) =>
    A0.Type.Transform(A0.Type.Union([A0.Type.String(), A0.Type.Object($, W)]))
      .Decode((Y) => {
        if (typeof Y === "string")
          try {
            return JSON.parse(Y);
          } catch {
            return Y;
          }
        return Y;
      })
      .Encode((Y) => JSON.stringify(Y)),
  File: I1.TypeSystem.Type("File", w6),
  Files: ($) =>
    A0.Type.Transform(A0.Type.Union([D7($)]))
      .Decode((W) => {
        if (Array.isArray(W)) return W;
        return [W];
      })
      .Encode((W) => W),
  Nullable: ($) => ({ ...$, nullable: true }),
  MaybeEmpty: ($) => A0.Type.Union([A0.Type.Undefined(), $]),
  Cookie: ($, W) => A0.Type.Object($, W),
};
A0.Type.ObjectString = R1.ObjectString;
A0.Type.Numeric = R1.Numeric;
A0.Type.File = ($ = {}) =>
  R1.File({
    default: "File",
    ...$,
    extension: $?.type,
    type: "string",
    format: "binary",
  });
A0.Type.Files = ($ = {}) =>
  R1.Files({
    ...$,
    elysiaMeta: "Files",
    default: "Files",
    extension: $?.type,
    type: "array",
    items: { ...$, default: "Files", type: "string", format: "binary" },
  });
A0.Type.Nullable = ($) => R1.Nullable($);
A0.Type.MaybeEmpty = R1.MaybeEmpty;
A0.Type.Cookie = R1.Cookie;

class n$ {
  config;
  dependencies = {};
  store = {};
  decorators = {};
  definitions = { type: {}, error: {} };
  schema = {};
  event = {
    start: [],
    request: [],
    parse: [],
    transform: [],
    beforeHandle: [],
    afterHandle: [],
    onResponse: [],
    trace: [],
    error: [],
    stop: [],
  };
  reporter = new C6();
  server = null;
  validator = null;
  router = new _1();
  routes = [];
  staticRouter = { handlers: [], variables: "", map: {}, all: "" };
  dynamicRouter = new _1();
  lazyLoadModules = [];
  path = "";
  constructor($) {
    this.config = {
      forceErrorEncapsulation: false,
      prefix: "",
      aot: true,
      strictPath: false,
      scoped: false,
      cookie: {},
      ...$,
      seed: $?.seed === undefined ? "" : $?.seed,
    };
  }
  add(
    $,
    W,
    Y,
    X,
    { allowMeta: Z = false, skipPrefix: Q = false } = {
      allowMeta: false,
      skipPrefix: false,
    }
  ) {
    if (typeof W === "string") W = [W];
    for (let J of W) {
      if (
        ((J = J === "" ? J : J.charCodeAt(0) === 47 ? J : `/${J}`),
        this.config.prefix && !Q)
      )
        J = this.config.prefix + J;
      if (X?.type)
        switch (X.type) {
          case "text":
            X.type = "text/plain";
            break;
          case "json":
            X.type = "application/json";
            break;
          case "formdata":
            X.type = "multipart/form-data";
            break;
          case "urlencoded":
            X.type = "application/x-www-form-urlencoded";
            break;
          case "arrayBuffer":
            X.type = "application/octet-stream";
            break;
          default:
            break;
        }
      const q = this.definitions.type,
        F = N1(X?.cookie ?? this.validator?.cookie, {
          dynamic: !this.config.aot,
          models: q,
          additionalProperties: true,
        });
      if (F && O1(this.config.cookie ?? []))
        F.schema = { ...F.schema, ...VY(F.schema, this.config.cookie) };
      const D = {
          body: N1(X?.body ?? this.validator?.body, {
            dynamic: !this.config.aot,
            models: q,
          }),
          headers: N1(X?.headers ?? this.validator?.headers, {
            dynamic: !this.config.aot,
            models: q,
            additionalProperties: true,
          }),
          params: N1(X?.params ?? this.validator?.params, {
            dynamic: !this.config.aot,
            models: q,
          }),
          query: N1(X?.query ?? this.validator?.query, {
            dynamic: !this.config.aot,
            models: q,
          }),
          cookie: F,
          response: q6(X?.response ?? this.validator?.response, {
            dynamic: !this.config.aot,
            models: q,
          }),
        },
        B = j1(this.event, X),
        K = J.endsWith("/") ? J.slice(0, J.length - 1) : J + "/";
      if (this.config.aot === false) {
        if (
          (this.dynamicRouter.add($, J, {
            validator: D,
            hooks: B,
            content: X?.type,
            handle: Y,
          }),
          this.config.strictPath === false)
        )
          this.dynamicRouter.add($, K, {
            validator: D,
            hooks: B,
            content: X?.type,
            handle: Y,
          });
        this.routes.push({
          method: $,
          path: J,
          composed: null,
          handler: Y,
          hooks: B,
        });
        return;
      }
      const I = mY({
        path: J,
        method: $,
        hooks: B,
        validator: D,
        handler: Y,
        handleError: this.handleError,
        onRequest: this.event.request,
        config: this.config,
        definitions: Z ? this.definitions.type : undefined,
        schema: Z ? this.schema : undefined,
        reporter: this.reporter,
      });
      if (
        (this.routes.push({
          method: $,
          path: J,
          composed: I,
          handler: Y,
          hooks: B,
        }),
        J.indexOf(":") === -1 && J.indexOf("*") === -1)
      ) {
        const w = this.staticRouter.handlers.length;
        if (
          (this.staticRouter.handlers.push(I),
          (this.staticRouter.variables += `const st${w} = staticRouter.handlers[${w}]\n`),
          !this.staticRouter.map[J])
        )
          this.staticRouter.map[J] = { code: "" };
        if ($ === "ALL")
          this.staticRouter.map[J].all = `default: return st${w}(ctx)\n`;
        else
          this.staticRouter.map[J].code += `case '${$}': return st${w}(ctx)\n`;
        if (!this.config.strictPath) {
          if (!this.staticRouter.map[K])
            this.staticRouter.map[K] = { code: "" };
          if ($ === "ALL")
            this.staticRouter.map[K].all = `default: return st${w}(ctx)\n`;
          else
            this.staticRouter.map[
              K
            ].code += `case '${$}': return st${w}(ctx)\n`;
        }
      } else if ((this.router.add($, J, I), !this.config.strictPath))
        this.router.add(
          $,
          J.endsWith("/") ? J.slice(0, J.length - 1) : J + "/",
          I
        );
    }
  }
  onStart($) {
    return this.on("start", $), this;
  }
  onRequest($) {
    return this.on("request", $), this;
  }
  onParse($) {
    return this.on("parse", $), this;
  }
  onTransform($) {
    return this.on("transform", $), this;
  }
  onBeforeHandle($) {
    return this.on("beforeHandle", $), this;
  }
  onAfterHandle($) {
    return this.on("afterHandle", $), this;
  }
  onResponse($) {
    return this.on("response", $), this;
  }
  trace($) {
    if (!this.event.trace.length)
      this.reporter.on("event", I6(this.reporter, $));
    return this.on("trace", $), this;
  }
  error($, W) {
    switch (typeof $) {
      case "string":
        return (W.prototype[A1] = $), (this.definitions.error[$] = W), this;
      case "function":
        return (this.definitions.error = $(this.definitions.error)), this;
    }
    for (let [Y, X] of Object.entries($))
      (X.prototype[A1] = Y), (this.definitions.error[Y] = X);
    return this;
  }
  onError($) {
    return this.on("error", $), this;
  }
  onStop($) {
    return this.on("stop", $), this;
  }
  on($, W) {
    for (let Y of Array.isArray(W) ? W : [W])
      switch (((Y = kY(Y)), $)) {
        case "start":
          this.event.start.push(Y);
          break;
        case "request":
          this.event.request.push(Y);
          break;
        case "response":
          this.event.onResponse.push(Y);
          break;
        case "parse":
          this.event.parse.splice(this.event.parse.length - 1, 0, Y);
          break;
        case "transform":
          this.event.transform.push(Y);
          break;
        case "beforeHandle":
          this.event.beforeHandle.push(Y);
          break;
        case "afterHandle":
          this.event.afterHandle.push(Y);
          break;
        case "trace":
          this.event.trace.push(Y);
          break;
        case "error":
          this.event.error.push(Y);
          break;
        case "stop":
          this.event.stop.push(Y);
          break;
      }
    return this;
  }
  group($, W, Y) {
    const X = new n$({ ...this.config, prefix: "" });
    X.store = this.store;
    const Z = typeof W === "object",
      Q = (Z ? Y : W)(X);
    if (
      ((this.decorators = L1(this.decorators, X.decorators)),
      Q.event.request.length)
    )
      this.event.request = [...this.event.request, ...Q.event.request];
    if (Q.event.onResponse.length)
      this.event.onResponse = [...this.event.onResponse, ...Q.event.onResponse];
    return (
      this.model(Q.definitions.type),
      Object.values(X.routes).forEach(
        ({ method: J, path: q, handler: F, hooks: D }) => {
          if (((q = this.config.prefix + $ + q), Z)) {
            const B = W,
              K = D;
            this.add(
              J,
              q,
              F,
              j1(B, {
                ...K,
                error: !K.error
                  ? Q.event.error
                  : Array.isArray(K.error)
                  ? [...K.error, ...Q.event.error]
                  : [K.error, ...Q.event.error],
              })
            );
          } else
            this.add(J, q, F, j1(D, { error: Q.event.error }), {
              skipPrefix: true,
            });
        }
      ),
      this
    );
  }
  guard($, W) {
    if (!W)
      return (
        (this.event = i$(this.event, $)),
        (this.validator = {
          body: $.body,
          headers: $.headers,
          params: $.params,
          query: $.query,
          response: $.response,
        }),
        this
      );
    const Y = new n$();
    Y.store = this.store;
    const X = W(Y);
    if (
      ((this.decorators = L1(this.decorators, Y.decorators)),
      X.event.request.length)
    )
      this.event.request = [...this.event.request, ...X.event.request];
    if (X.event.onResponse.length)
      this.event.onResponse = [...this.event.onResponse, ...X.event.onResponse];
    return (
      this.model(X.definitions.type),
      Object.values(Y.routes).forEach(
        ({ method: Z, path: Q, handler: J, hooks: q }) => {
          this.add(
            Z,
            Q,
            J,
            j1($, {
              ...q,
              error: !q.error
                ? X.event.error
                : Array.isArray(q.error)
                ? [...q.error, ...X.event.error]
                : [q.error, ...X.event.error],
            })
          );
        }
      ),
      this
    );
  }
  use($) {
    if ($ instanceof Promise)
      return (
        this.lazyLoadModules.push(
          $.then((W) => {
            if (typeof W === "function") return W(this);
            if (typeof W.default === "function") return W.default(this);
            return this._use(W.default);
          }).then((W) => W.compile())
        ),
        this
      );
    else return this._use($);
    return this;
  }
  _use($) {
    if (typeof $ === "function") {
      const Z = $(this);
      if (Z instanceof Promise)
        return this.lazyLoadModules.push(Z.then((Q) => Q.compile())), this;
      return Z;
    }
    const W = $.config.scoped;
    if (!W)
      this.decorate($.decorators),
        this.state($.store),
        this.model($.definitions.type),
        this.error($.definitions.error);
    const { name: Y, seed: X } = $.config;
    if (
      (Object.values($.routes).forEach(
        ({ method: Z, path: Q, handler: J, hooks: q }) => {
          this.add(Z, Q, J, j1(q, { error: $.event.error }));
        }
      ),
      !W)
    )
      if (Y) {
        if (!(Y in this.dependencies)) this.dependencies[Y] = [];
        const Z = X !== undefined ? xY(Y + JSON.stringify(X)) : 0;
        if (this.dependencies[Y].some((Q) => Z === Q)) return this;
        this.dependencies[Y].push(Z),
          (this.event = i$(this.event, M6($.event), Z));
      } else this.event = i$(this.event, M6($.event));
    return this;
  }
  mount($, W) {
    if (typeof $ === "function" || $.length === 0 || $ === "/") {
      const Z = typeof $ === "function" ? $ : W,
        Q = async ({ request: J, path: q }) =>
          Z(new Request("http://a.cc" + q || "/", J));
      return (
        this.all("/", Q, { type: "none" }),
        this.all("/*", Q, { type: "none" }),
        this
      );
    }
    const Y = $.length,
      X = async ({ request: Z, path: Q }) =>
        W(new Request("http://a.cc" + Q.slice(Y) || "/", Z));
    return (
      this.all($, X, { type: "none" }),
      this.all($ + ($.endsWith("/") ? "*" : "/*"), X, { type: "none" }),
      this
    );
  }
  get($, W, Y) {
    return this.add("GET", $, W, Y), this;
  }
  post($, W, Y) {
    return this.add("POST", $, W, Y), this;
  }
  put($, W, Y) {
    return this.add("PUT", $, W, Y), this;
  }
  patch($, W, Y) {
    return this.add("PATCH", $, W, Y), this;
  }
  delete($, W, Y) {
    return this.add("DELETE", $, W, Y), this;
  }
  options($, W, Y) {
    return this.add("OPTIONS", $, W, Y), this;
  }
  all($, W, Y) {
    return this.add("ALL", $, W, Y), this;
  }
  head($, W, Y) {
    return this.add("HEAD", $, W, Y), this;
  }
  connect($, W, Y) {
    return this.add("CONNECT", $, W, Y), this;
  }
  ws($, W) {
    const Y = W.transformMessage
      ? Array.isArray(W.transformMessage)
        ? W.transformMessage
        : [W.transformMessage]
      : undefined;
    return (
      this.get(
        $,
        (X) => {
          const { set: Z, path: Q, qi: J, ...q } = X;
          X.headers, X.query, X.params;
          const F = N1(W?.body, { models: this.definitions.type }),
            D = N1(W?.response, { models: this.definitions.type }),
            B = (K) => {
              const I = K.charCodeAt(0);
              if (I === 47 || I === 123)
                try {
                  K = JSON.parse(K);
                } catch {}
              else if (!Number.isNaN(+K)) K = +K;
              if (Y?.length)
                for (let w = 0; w < Y.length; w++) {
                  const U = Y[w](K);
                  if (U !== undefined) K = U;
                }
              return K;
            };
          if (
            this.server?.upgrade(X.request, {
              headers:
                typeof W.upgrade === "function" ? W.upgrade(X) : W.upgrade,
              data: {
                validator: D,
                open(K) {
                  W.open?.(new o1(K, q));
                },
                message: (K, I) => {
                  const w = B(I);
                  if (F?.Check(w) === false)
                    return void K.send(new S0("message", F, w).message);
                  W.message?.(new o1(K, q), w);
                },
                drain(K) {
                  W.drain?.(new o1(K, q));
                },
                close(K, I, w) {
                  W.close?.(new o1(K, q), I, w);
                },
              },
            })
          )
            return;
          return (Z.status = 400), "Expected a websocket connection";
        },
        {
          beforeHandle: W.beforeHandle,
          transform: W.transform,
          headers: W.headers,
          params: W.params,
          query: W.query,
        }
      ),
      this
    );
  }
  route($, W, Y, { config: X, ...Z } = { config: { allowMeta: false } }) {
    return this.add($, W, Y, Z, X), this;
  }
  state($, W) {
    switch (typeof $) {
      case "object":
        return (this.store = L1(this.store, $)), this;
      case "function":
        return (this.store = $(this.store)), this;
    }
    if (!($ in this.store)) this.store[$] = W;
    return this;
  }
  decorate($, W) {
    switch (typeof $) {
      case "object":
        return (this.decorators = L1(this.decorators, $)), this;
      case "function":
        return (this.decorators = $(this.decorators)), this;
    }
    if (!($ in this.decorators)) this.decorators[$] = W;
    return this;
  }
  derive($) {
    return ($.$elysia = "derive"), this.onTransform($);
  }
  model($, W) {
    switch (typeof $) {
      case "object":
        return (
          Object.entries($).forEach(([Y, X]) => {
            if (!(Y in this.definitions.type)) this.definitions.type[Y] = X;
          }),
          this
        );
      case "function":
        return (this.definitions.type = $(this.definitions.type)), this;
    }
    return (this.definitions.type[$] = W), this;
  }
  mapDerive($) {
    return ($.$elysia = "derive"), this.onTransform($);
  }
  affix($, W, Y) {
    if (Y === "") return this;
    const X = ["_", "-", " "],
      Z = (F) => F[0].toUpperCase() + F.slice(1),
      Q =
        $ === "prefix"
          ? (F, D) => (X.includes(F.at(-1) ?? "") ? F + D : F + Z(D))
          : X.includes(Y.at(-1) ?? "")
          ? (F, D) => D + F
          : (F, D) => D + Z(F),
      J = (F) => {
        const D = {};
        switch (F) {
          case "decorator":
            for (let B in this.decorators) D[Q(Y, B)] = this.decorators[B];
            this.decorators = D;
            break;
          case "state":
            for (let B in this.store) D[Q(Y, B)] = this.store[B];
            this.store = D;
            break;
          case "model":
            for (let B in this.definitions.type)
              D[Q(Y, B)] = this.definitions.type[B];
            this.definitions.type = D;
            break;
          case "error":
            for (let B in this.definitions.error)
              D[Q(Y, B)] = this.definitions.error[B];
            this.definitions.error = D;
            break;
        }
      },
      q = Array.isArray(W) ? W : [W];
    for (let F of q.some((D) => D === "all")
      ? ["decorator", "state", "model", "error"]
      : q)
      J(F);
    return this;
  }
  prefix($, W) {
    return this.affix("prefix", $, W);
  }
  suffix($, W) {
    return this.affix("suffix", $, W);
  }
  compile() {
    if (
      ((this.fetch = this.config.aot ? F6(this) : A6(this)),
      typeof this.server?.reload === "function")
    )
      this.server.reload({ ...this.server, fetch: this.fetch });
    return this;
  }
  handle = async ($) => this.fetch($);
  fetch = ($) => (this.fetch = this.config.aot ? F6(this) : A6(this))($);
  handleError = async ($, W, Y) =>
    (this.handleError = this.config.aot ? B6(this) : uY(this))($, W, Y);
  outerErrorHandler = ($) =>
    new Response($.message, { status: $?.status ?? 500 });
  listen = ($, W) => {
    if (!Bun) throw new Error("Bun to run");
    if ((this.compile(), typeof $ === "string")) {
      if ((($ = +$.trim()), Number.isNaN($)))
        throw new Error("Port must be a numeric value");
    }
    const Y = this.fetch,
      X =
        typeof $ === "object"
          ? {
              development: !z$,
              ...this.config.serve,
              ...$,
              websocket: { ...this.config.websocket, ...e8 },
              fetch: Y,
              error: this.outerErrorHandler,
            }
          : {
              development: !z$,
              ...this.config.serve,
              websocket: { ...this.config.websocket, ...e8 },
              port: $,
              fetch: Y,
              error: this.outerErrorHandler,
            };
    if (typeof Bun === "undefined")
      throw new Error(
        ".listen() is designed to run on Bun only. If you are running Elysia in other environment please use a dedicated plugin or export the handler via Elysia.fetch"
      );
    this.server = Bun?.serve(X);
    for (let Z = 0; Z < this.event.start.length; Z++) this.event.start[Z](this);
    if (W) W(this.server);
    return (
      Promise.all(this.lazyLoadModules).then(() => {
        Bun?.gc(false);
      }),
      this
    );
  };
  stop = async () => {
    if (!this.server)
      throw new Error(
        "Elysia isn't running. Call `app.listen` to start the server."
      );
    this.server.stop();
    for (let $ = 0; $ < this.event.stop.length; $++)
      await this.event.stop[$](this);
  };
  get modules() {
    return Promise.all(this.lazyLoadModules);
  }
}
var export_t = A0.Type;

// node_modules/ely
var dispatch = function () {
  wsConnections.forEach((connection) => {
    console.log("sending refresh");
    connection.send("refresh");
  });
};
var wsConnections = new Set();
var port = process.argv[2] || 3001;
var app = new n$()
  .ws("/ws", {
    open(ws) {
      wsConnections.add(ws);
    },
    close(ws) {
      wsConnections.delete(ws);
    },
    message(ws, message) {},
  })
  .get("/restart", () => {
    dispatch();
  })
  .listen(port);
console.log(
  `\uD83E\uDD8A Livereload running ${app.server?.hostname}:${app.server?.port}`
);
