"""Format already-validated load signals as presentation math, never execute them."""
import ast


def tex_text(value):
    return str(value).replace("\\", " ").replace("{", "").replace("}", "").replace("_", r"\_").replace("%", r"\%").replace("#", r"\#").replace("&", r"\&").replace("$", r"\$")


def signal_math(source, labels=None):
    labels = labels or {}
    def number(value):
        text = str(value)
        if "e" in text.lower():
            base, exponent = text.lower().split("e")
            return base + r"\times10^{" + str(int(exponent)) + "}"
        return text
    if isinstance(source, (int, float)): return number(source)
    if isinstance(source, dict): return r"\operatorname{interp}(t)"
    def visit(node):
        if isinstance(node, ast.Constant): return number(node.value)
        if isinstance(node, ast.Name):
            if node.id == "pi": return r"\pi"
            if node.id in {"t", "e"}: return node.id
            return r"\text{" + tex_text(labels.get(node.id, node.id)) + "}"
        if isinstance(node, ast.BinOp):
            a, b = visit(node.left), visit(node.right)
            if isinstance(node.op, ast.Div): return rf"\frac{{{a}}}{{{b}}}"
            if isinstance(node.op, ast.Pow): return rf"\left({a}\right)^{{{b}}}"
            op = {ast.Add: "+", ast.Sub: "-", ast.Mult: r"\cdot "}[type(node.op)]
            return rf"\left({a}{op}{b}\right)"
        if isinstance(node, ast.UnaryOp): return ("-" if isinstance(node.op, ast.USub) else "+") + visit(node.operand)
        if isinstance(node, ast.Compare):
            op = {ast.Lt:"<", ast.LtE:r"\le ", ast.Gt:">", ast.GtE:r"\ge ", ast.Eq:"=", ast.NotEq:r"\ne "}[type(node.ops[0])]
            return visit(node.left) + op + visit(node.comparators[0])
        if isinstance(node, ast.BoolOp): return (r"\land " if isinstance(node.op, ast.And) else r"\lor ").join(map(visit, node.values))
        if isinstance(node, ast.Call):
            name = node.func.id
            if name in {"q", "v"}:
                symbol = "q" if name == "q" else r"\dot q"
                return symbol + r"_{\text{" + tex_text(node.args[0].value) + "}}(t)"
            args = list(map(visit, node.args))
            if name == "where": return r"\begin{cases}" + args[1] + " & " + args[0] + r"\\" + args[2] + r" & \text{其他}\end{cases}"
            if name == "sqrt": return rf"\sqrt{{{args[0]}}}"
            if name == "abs": return rf"\left|{args[0]}\right|"
            symbol = "\\"+name if name in {"sin","cos","tan","log","exp","min","max"} else r"\operatorname{"+name+"}"
            return symbol + r"\left(" + ", ".join(args) + r"\right)"
        raise ValueError("Unsupported presentation node")
    return visit(ast.parse(source, mode="eval").body)
