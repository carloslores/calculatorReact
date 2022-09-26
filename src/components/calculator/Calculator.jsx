import "./Calculator.css";
import { useState, useEffect, useRef } from "react";

const Calculator = () => {
  const [oldNum, setOldNum] = useState([0]);
  const [actualNum, setActuaNum] = useState([0]);
  const [newNum, setNewNum] = useState(false);
  const [isSum, setIstSum] = useState(false);
  const [isRest, setIstRest] = useState(false);
  const [isMultiply, setIstMultiply] = useState(false);
  const [isDivide, setIstDivide] = useState(false);
  const [isValueToLong, setIsValueToLong] = useState(false);

  const printOnScreen = (numValue) => {
    if (!numValue && numValue !== 0) {
      setActuaNum(["0"]);
      setIsValueToLong(false);
    } else {
      if (typeof numValue === "string" && actualNum.includes(",")) {
        numValue = "";
      }
      setActuaNum(transformDataValues(numValue));
    }
  };

  const transformDataValues = (num) => {
    let newActualNumbber;

    if (actualNum.length >= 8) {
      newActualNumbber = `${
        typeof actualNum === "string" ? actualNum : actualNum.join("")
      }`;
      setIsValueToLong(true);
    } else {
      newActualNumbber = `${
        typeof actualNum === "string" ? actualNum : actualNum.join("")
      }${num}`.split("");
      setIsValueToLong(false);
    }
    if (newActualNumbber.length > 1 && newActualNumbber[0] == 0) {
      newActualNumbber.shift();
    }
    return newActualNumbber;
  };

  const transformeToInt = (value) => {
    let trasnformValueToCollect;
    if (typeof value === "string") {
      trasnformValueToCollect = value.split("");
    } else {
      trasnformValueToCollect = value;
    }
    return +trasnformValueToCollect.join("").replace(",", ".");
  };

  const sum = () => {
    const resultSum = [transformeToInt(oldNum) + transformeToInt(actualNum)];
    return String(resultSum[0].toFixed(2)).replace(".", ",");
  };

  const rest = () => {
    const resultRest = [transformeToInt(oldNum) - transformeToInt(actualNum)];
    return String(resultRest[0].toFixed(2)).replace(".", ",");
  };

  const multiply = () => {
    const resultMultiply = [
      transformeToInt(oldNum) * transformeToInt(actualNum),
    ];
    return String(resultMultiply[0].toFixed(2)).replace(".", ",");
  };

  const divide = () => {
    const resultMultiply = [
      transformeToInt(oldNum) / transformeToInt(actualNum),
    ];
    return String(resultMultiply[0].toFixed(2)).replace(".", ",");
  };

  const operateNumber = (operation, callOnUseEffect) => {
    setIsValueToLong(false);
    if (callOnUseEffect) {
      switch (operation) {
        case "sum":
          handleNumState(callOnUseEffect, sum());
          setIstSum(false);
          break;
        case "rest":
          handleNumState(callOnUseEffect, rest());
          setIstRest(false);
          break;
        case "multiply":
          handleNumState(callOnUseEffect, multiply());
          setIstMultiply(false);
          break;
        case "divide":
          handleNumState(callOnUseEffect, divide());
          setIstDivide(false);
          break;
        default:
          break;
      }
    } else {
      handleNumState(false);
      switch (operation) {
        case "sum":
          setIstSum(true);
          break;
        case "rest":
          setIstRest(true);
          break;
        case "multiply":
          setIstMultiply(true);
          break;
        case "divide":
          setIstDivide(true);
          break;
        default:
          break;
      }
    }
  };

  const handleNumState = (callOnUseEffect, result) => {
    if (callOnUseEffect && result) {
      if (result.length < 8) {
        setActuaNum(result.replace(",00", ""));
        setIsValueToLong(false);
      } else {
        setOldNum(actualNum);
        setActuaNum(["0"]);
        setIsValueToLong(true);
      }
      setNewNum(false);
    } else {
      setOldNum(actualNum);
      setActuaNum(["0"]);
    }
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (newNum) {
      if (isSum) {
        operateNumber("sum", true);
      } else if (isRest) {
        operateNumber("rest", true);
      } else if (isMultiply) {
        operateNumber("multiply", true);
      } else if (isDivide) {
        operateNumber("divide", true);
      }
    }
  }, [newNum, isSum]);

  return (
    <>
      <div className="calculator-container">
        {isValueToLong ? (
          <div className="bubble-message fade-in-fwd">
            El valor es demasiado largo, inténtelo con valores más pequeños.
          </div>
        ) : null}
        <div className="screen">{actualNum}</div>
        <div className="row">
          <div className="col">
            <div
              className="btn first btn-gray"
              onClick={() => printOnScreen(null)}
            >
              AC
            </div>
          </div>
          <div className="col">
            <div
              className="btn btn-yellow"
              onClick={() => operateNumber("divide")}
            >
              ÷
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="btn btn-dark-gray" onClick={() => printOnScreen(7)}>
              7
            </div>
          </div>
          <div className="col">
            <div className="btn btn-dark-gray" onClick={() => printOnScreen(8)}>
              8
            </div>
          </div>
          <div className="col">
            <div className="btn btn-dark-gray" onClick={() => printOnScreen(9)}>
              9
            </div>
          </div>
          <div className="col">
            <div
              className="btn btn-yellow"
              onClick={() => operateNumber("multiply")}
            >
              X
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="btn btn-dark-gray" onClick={() => printOnScreen(4)}>
              4
            </div>
          </div>
          <div className="col">
            <div className="btn btn-dark-gray" onClick={() => printOnScreen(5)}>
              5
            </div>
          </div>
          <div className="col">
            <div className="btn btn-dark-gray" onClick={() => printOnScreen(6)}>
              6
            </div>
          </div>
          <div className="col">
            <div
              className="btn btn-yellow"
              onClick={() => operateNumber("rest")}
            >
              -
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="btn btn-dark-gray" onClick={() => printOnScreen(1)}>
              1
            </div>
          </div>
          <div className="col">
            <div className="btn btn-dark-gray" onClick={() => printOnScreen(2)}>
              2
            </div>
          </div>
          <div className="col">
            <div className="btn btn-dark-gray" onClick={() => printOnScreen(3)}>
              3
            </div>
          </div>
          <div className="col">
            <div
              className="btn btn-yellow"
              onClick={() => operateNumber("sum")}
            >
              +
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div
              className="btn btn-dark-gray btn-lg"
              onClick={() => printOnScreen(0)}
            >
              0
            </div>
          </div>
          <div className="col">
            <div
              className="btn btn-dark-gray"
              onClick={() => printOnScreen(",")}
            >
              ,
            </div>
          </div>
          <div className="col">
            <div className="btn btn-yellow" onClick={() => setNewNum(true)}>
              =
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
