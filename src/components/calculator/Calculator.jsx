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
  const [operateScreenValue, setOperateScreenValue] = useState(false);

  const printOnScreen = (numValue) => {
    console.log("operateScreenValue", operateScreenValue);
    if (!numValue) {
      setActuaNum(["0"]);
    } else {
      setActuaNum(transformDataValues(numValue));
    }
  };

  const transformDataValues = (num) => {
    let newActualNumbber;
    if (operateScreenValue) {
      setOldNum(actualNum);
      newActualNumbber = [num];
    } else {
      newActualNumbber = `${actualNum.join("")}${num}`.split("");
    }

    if (newActualNumbber.length > 1 && newActualNumbber[0] == 0) {
      newActualNumbber.shift();
    }
    return newActualNumbber;
  };

  const transformeToInt = (value) => {
    return +value.join("");
  };

  const sum = (operation, callOnUseEffect) => {
    if (callOnUseEffect) {
      const resultSum = [transformeToInt(oldNum) + transformeToInt(actualNum)];
      return resultSum;
    }
  };

  const rest = (callOnUseEffect) => {
    if (callOnUseEffect) {
      const resultRest = [transformeToInt(oldNum) - transformeToInt(actualNum)];
      return resultRest;
    }
  };

  const multiply = (callOnUseEffect) => {
    if (callOnUseEffect) {
      const resultMultiply = [
        transformeToInt(oldNum) * transformeToInt(actualNum),
      ];
      return resultMultiply;
    }
  };

  const handleOperation = (operation, callOnUseEffectOrSecondTime) => {
    if (!callOnUseEffectOrSecondTime) {
      switch (operation) {
        case "sum":
          if (isSum) {
            handleStateNum("sum", sum(true));
          }
          break;
        case "rest":
          if (isRest) {
            handleStateNum("rest", rest(true));
          }
          break;
        case "multiply":
          if (isMultiply) {
            handleStateNum("multiply", multiply(true));
          }
          break;
      }
      handleStateNum(operation);
      setNewNum(true);
    } else {
      switch (operation) {
        case "sum":
          handleStateNum("sum", sum("", callOnUseEffectOrSecondTime));
          break;
        case "rest":
          handleStateNum("rest", rest(callOnUseEffectOrSecondTime));
          break;
        case "multiply":
          handleStateNum("multiply", multiply(callOnUseEffectOrSecondTime));
          break;
      }
    }
  };

  const handleStateNum = (operation, result) => {
    if (!result) {
      setOldNum(actualNum);
      setActuaNum(["0"]);
    }

    switch (operation) {
      case "sum":
        setIstSum(true);
        if (result) {
          setIstSum(false);
        }
        break;
      case "rest":
        setIstRest(true);
        if (result) {
          setIstRest(false);
        }
        break;
      case "multiply":
        setIstMultiply(true);
        if (result) {
          setIstMultiply(false);
        }
        break;
    }

    if (result) {
      setActuaNum(result);
      setNewNum(false);
      setOperateScreenValue(true);
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
        //sum(true);
        handleOperation("sum", true);
      } else if (isRest) {
        handleOperation("rest", true);
      } else if (isMultiply) {
        handleOperation("multiply", true);
      }
    }
  }, [newNum, isSum]); //

  return (
    <>
      <div className="calculator-container">
        <div className="screen">{actualNum}</div>
        <div className="row">
          <div className="col">
            <div className="btn first" onClick={() => printOnScreen(0)}>
              AC
            </div>
          </div>
          <div className="col">
            <div className="btn">%</div>
          </div>
          <div className="col">
            <div className="btn">÷</div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="btn" onClick={() => printOnScreen(7)}>
              7
            </div>
          </div>
          <div className="col">
            <div className="btn" onClick={() => printOnScreen(8)}>
              8
            </div>
          </div>
          <div className="col">
            <div className="btn" onClick={() => printOnScreen(9)}>
              9
            </div>
          </div>
          <div className="col">
            <div className="btn" onClick={() => handleOperation("multiply")}>
              X
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="btn" onClick={() => printOnScreen(4)}>
              4
            </div>
          </div>
          <div className="col">
            <div className="btn" onClick={() => printOnScreen(5)}>
              5
            </div>
          </div>
          <div className="col">
            <div className="btn" onClick={() => printOnScreen(6)}>
              6
            </div>
          </div>
          <div className="col">
            <div className="btn" onClick={() => handleOperation("rest")}>
              -
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="btn" onClick={() => printOnScreen(1)}>
              1
            </div>
          </div>
          <div className="col">
            <div className="btn" onClick={() => printOnScreen(2)}>
              2
            </div>
          </div>
          <div className="col">
            <div className="btn" onClick={() => printOnScreen(3)}>
              3
            </div>
          </div>
          <div className="col">
            <div className="btn" onClick={() => handleOperation("sum")}>
              +
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="btn btn-lg" onClick={() => printOnScreen(0)}>
              0
            </div>
          </div>
          <div className="col">
            <div className="btn">,</div>
          </div>
          <div className="col">
            <div className="btn" onClick={() => setNewNum(true)}>
              =
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
