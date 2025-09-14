document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("back")?.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});

const isOperator = (t) => ["+", "-", "*", "/"].includes(t);
const prec = (op) => (op === "+" || op === "-" ? 1 : 2);

function tokenize(expr) {
  const tokens = [];
  let i = 0, n = expr.length;
  while (i < n) {
    const ch = expr[i];
    if (ch === " ") { i++; continue; }
    if (isOperator(ch)) { tokens.push(ch); i++; continue; }
    if (ch === ".") {
      tokens.push("0.");
      i++;
      while (i < n && /[0-9]/.test(expr[i])) {
        tokens[tokens.length - 1] += expr[i++];
      }
      continue;
    }
    if (/[0-9]/.test(ch)) {
      let num = ch; i++;
      while (i < n && /[0-9]/.test(expr[i])) num += expr[i++];
      if (i < n && expr[i] === ".") {
        num += ".";
        i++;
        while (i < n && /[0-9]/.test(expr[i])) num += expr[i++];
      }
      tokens.push(num);
      continue;
    }
    i++;
  }
  return tokens;
}

function toRPN(tokens) {
  const out = [], stack = [];
  for (const t of tokens) {
    if (isOperator(t)) {
      while (stack.length && isOperator(stack.at(-1)) && prec(stack.at(-1)) >= prec(t)) {
        out.push(stack.pop());
      }
      stack.push(t);
    } else {
      out.push(t);
    }
  }
  while (stack.length) out.push(stack.pop());
  return out;
}

function evalRPN(rpn) {
  const st = [];
  for (const t of rpn) {
    if (!isOperator(t)) {
      st.push(parseFloat(t));
      continue;
    }
    const b = st.pop(), a = st.pop();
    let r = 0;
    switch (t) {
      case "+": r = a + b; break;
      case "-": r = a - b; break;
      case "*": r = a * b; break;
      case "/": r = b === 0 ? NaN : a / b; break;
    }
    st.push(r);
  }
  return st.pop();
}

function safeCalc(expr) {
  const tokens = tokenize(expr);
  if (tokens.length === 0) return "";
  if (isOperator(tokens.at(-1))) tokens.pop();
  const rpn = toRPN(tokens);
  const result = evalRPN(rpn);
  if (Number.isNaN(result) || !Number.isFinite(result)) return "Erro";
  return Number(result.toFixed(10)).toString();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("calc-form");
  const display = document.getElementById("display");
  const backBtn = document.getElementById("back");

  display?.focus();

  form?.addEventListener("click", (e) => {
    const btn = e.target;
    if (!(btn instanceof HTMLInputElement) || btn.type !== "button") return;

    const action = btn.getAttribute("data-action");
    const val = btn.getAttribute("data-value");

    if (action === "clear") {
      display.value = "";
      return;
    }

    if (action === "backspace") {
      display.value = display.value.slice(0, -1);
      return;
    }

    if (action === "equals") {
      display.value = safeCalc(display.value);
      return;
    }

    if (val != null) {
      const last = display.value.slice(-1);
      if (isOperator(val) && isOperator(last)) {
        display.value = display.value.slice(0, -1) + val;
      } else if (val === "." ) {
        const parts = display.value.split(/[\+\-\*\/]/);
        if (parts.at(-1)?.includes(".")) return;
        display.value += val;
      } else {
        display.value += val;
      }
    }
  });

  display?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      display.value = safeCalc(display.value);
    } else if (e.key === "Escape") {
      display.value = "";
    } else if (e.key === "Backspace") {
    } else {
      const ok = /[0-9\+\-\*\/\.]/.test(e.key) || e.ctrlKey || e.metaKey || e.altKey;
      if (!ok) e.preventDefault();
    }
  });

  backBtn?.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
