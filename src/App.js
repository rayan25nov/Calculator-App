import React, { useState } from "react";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { Button, Container, Stack } from "@mui/material";
import "./App.css";

const App = () => {
  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <Button
          onClick={() => updateCalc(i.toString())}
          variant="outlined"
          key={i}
        >
          {i}
        </Button>
      );
    }
    return digits;
  };
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const operator = ["/", "*", "+", "-", "."];
  const updateCalc = (value) => {
    if (calc === "0") {
      setCalc(value);
      return value;
    }

    if (
      (operator.includes(value) && calc === "") ||
      (operator.includes(value) && operator.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + value);

    if (!operator.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };
  const calculate = () => {
    if (
      calc.lastIndexOf("/") === calc.length - 1 ||
      calc.lastIndexOf("*") === calc.length - 1 ||
      calc.lastIndexOf("-") === calc.length - 1 ||
      calc.lastIndexOf("+") === calc.length - 1
    ) {
      return setCalc(calc.slice(0, calc.length - 1));
    }

    const res = eval(calc).toString();
    setCalc(res);
  };
  const deleteLast = () => {
    if (calc === "") {
      return;
    }
    const val = calc.slice(0, -1);
    setCalc(val);

    setResult(val);
  };
  const reset = () => {
    setCalc("");
    setResult("");
  };
  return (
    <Container>
      <div className="Calc">
        <div className="calculator">
          <div className="display">
            {result ? <span>({result})</span> : ""}
            {calc || "0"}
          </div>
          <Stack className="operators" spacing={0.4} direction="row">
            <Button onClick={() => updateCalc("/")} variant="contained">
              &#247;
            </Button>
            <Button onClick={() => updateCalc("*")} variant="contained">
              &times;
            </Button>
            <Button onClick={() => updateCalc("+")} variant="contained">
              +
            </Button>
            <Button onClick={() => updateCalc("-")} variant="contained">
              -
            </Button>
            <Button onClick={reset} variant="contained">
              <ClearAllIcon />
            </Button>
          </Stack>
          <div className="numbers">{createDigits()}</div>
          <div className="digits">
            <Button onClick={() => updateCalc("0")} variant="outlined">
              0
            </Button>
            <Button onClick={() => updateCalc(".")} variant="outlined">
              .
            </Button>

            <Button onClick={calculate} variant="outlined">
              =
            </Button>
            <Button onClick={deleteLast} variant="contained">
              <BackspaceIcon />
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default App;
