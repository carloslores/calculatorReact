import "./Calculator.css";
import { useState, useEffect, useRef } from "react";

const Calculator = () => {
  const [oldNum, setOldNum] = useState([0]);
  const [actualNum, setActuaNum] = useState([0]);
  const [newNum, setNewNum] = useState(false);
  const [isSum, setIstSum] = useState(false);
  const [isRest, setIstRest] = useState(false);

  const printOnScreen = (numValue) => {
    if (!numValue) {
      setActuaNum(["0"]);
    } else {
      setActuaNum(transformDataValues(numValue));
    }
  };

  const transformDataValues = (num) => {
    const newActualNumbber = `${actualNum.join("")}${num}`.split("");
    if (newActualNumbber.length > 1 && newActualNumbber[0] == 0) {
      newActualNumbber.shift();
    }
    return newActualNumbber;
  };

  const transformeToInt = (value) => {
    return +value.join("");
  };

  const sum = (callOnUseEffect) => {
    let resultSum = null;
    if (callOnUseEffect) {
      console.log(oldNum);
      console.log(actualNum);
      const resultSum = [transformeToInt(oldNum) + transformeToInt(actualNum)];
      setActuaNum(resultSum);
      setNewNum(false);
      setIstSum(false);
    } else {
      console.log(actualNum);
      setOldNum(actualNum);
      setActuaNum(["0"]);
      setIstSum(true);
    }

    if (resultSum) {
      setNewNum(true);
    }
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isSum && newNum) {
      sum(true);
    }

    console.log("useEffect ran. count is: ", newNum);
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
            <div className="btn">X</div>
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
            <div className="btn">-</div>
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
            <div className="btn" onClick={() => sum()}>
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
