"""
Gera a planilha de exemplo do Gestão360 (projeto demonstrativo).

Uso:
    pip install openpyxl
    python scripts/gerar_planilha_gestao360.py

Saída: public/downloads/gestao360-planilha-exemplo.xlsx

Opcional (recomendado antes de publicar): abrir e salvar o arquivo no Excel
ou no LibreOffice para gravar os valores calculados — assim pré-visualizações
(Google Drive, WhatsApp etc.) já mostram os números. Com LibreOffice:
    soffice --headless --convert-to xlsx --outdir public/downloads public/downloads/gestao360-planilha-exemplo.xlsx

A planilha usa as mesmas transações fictícias do dashboard
(scripts/dados/gestao360-transacoes.json). Todos os totais, indicadores
e gráficos são FÓRMULAS: altere ou inclua lançamentos e tudo recalcula.
"""

import json
from datetime import date
from pathlib import Path

from openpyxl import Workbook
from openpyxl.chart import BarChart, LineChart, Reference
from openpyxl.comments import Comment
from openpyxl.formatting.rule import CellIsRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.worksheet.table import Table, TableStyleInfo

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "scripts" / "dados" / "gestao360-transacoes.json"
OUT = ROOT / "public" / "downloads" / "gestao360-planilha-exemplo.xlsx"

# ---------- Estilo ----------
FONT = "Arial"
NAVY = "0A1730"
BLUE = "2A78D6"
ORANGE = "EB6834"
GREEN_TXT = "0F7A52"
GREY = "64748B"
LIGHT = "F1F5F9"
BORDER = "E2E8F0"

f_title = Font(name=FONT, size=18, bold=True, color=NAVY)
f_sub = Font(name=FONT, size=10, color=GREY)
f_head = Font(name=FONT, size=10, bold=True, color="FFFFFF")
f_body = Font(name=FONT, size=10, color="1E293B")
f_bold = Font(name=FONT, size=10, bold=True, color="1E293B")
f_input = Font(name=FONT, size=10, color="0000FF")  # entradas editáveis
f_kpi_label = Font(name=FONT, size=9, color=GREY)
f_kpi = Font(name=FONT, size=16, bold=True, color=NAVY)
f_section = Font(name=FONT, size=12, bold=True, color=NAVY)

fill_head = PatternFill("solid", fgColor=NAVY)
fill_light = PatternFill("solid", fgColor=LIGHT)
fill_input = PatternFill("solid", fgColor="FFFF00")
fill_white = PatternFill("solid", fgColor="FFFFFF")
thin = Side(style="thin", color=BORDER)
box = Border(left=thin, right=thin, top=thin, bottom=thin)
bottom = Border(bottom=thin)

BRL = 'R$ #,##0.00;[Red]-R$ #,##0.00;"-"'
BRL0 = 'R$ #,##0;[Red]-R$ #,##0;"-"'
PCT = '0.0%;[Red]-0.0%;"-"'
INT = '#,##0;-#,##0;"-"'

REVENUE_CATS = ["Produtos", "Serviços", "Assinaturas", "Treinamentos"]
EXPENSE_CATS = ["Fornecedores", "Folha de pagamento", "Aluguel", "Marketing", "Impostos", "Energia e internet", "Logística"]
METHODS = ["Pix", "Cartão de crédito", "Cartão de débito", "Boleto", "Transferência"]
MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]


def style_range(ws, ref, font=None, fill=None, border=None, fmt=None, align=None):
    for row in ws[ref]:
        for c in row:
            if font:
                c.font = font
            if fill:
                c.fill = fill
            if border:
                c.border = border
            if fmt:
                c.number_format = fmt
            if align:
                c.alignment = align


def main():
    tx = json.loads(DATA.read_text(encoding="utf-8"))
    wb = Workbook()

    # =========================================================
    # 1) Instruções
    # =========================================================
    ins = wb.active
    ins.title = "Instruções"
    ins.sheet_view.showGridLines = False
    ins.column_dimensions["A"].width = 3
    ins.column_dimensions["B"].width = 100
    ins["B2"] = "Gestão360 — Planilha de controle financeiro"
    ins["B2"].font = f_title
    ins["B3"] = "Projeto demonstrativo. A empresa, os lançamentos e os valores são fictícios."
    ins["B3"].font = f_sub
    lines = [
        ("Como usar", True),
        ("1. Na aba “Lançamentos”, registre cada entrada (Receita) ou saída (Despesa) em uma nova linha da tabela.", False),
        ("2. Preencha Data, Descrição, Categoria, Tipo, Forma de pagamento, Situação e Valor. As colunas Categoria, Tipo, Forma de pagamento e Situação têm listas de opções.", False),
        ("3. Informe o Valor sempre como número positivo — a coluna Tipo define se é receita ou despesa.", False),
        ("4. Na aba “Resumo”, altere o ano na célula amarela (C4) para ver os números de outro ano.", False),
        ("5. Para criar novas categorias, inclua-as na aba “Categorias”.", False),
        ("", False),
        ("Legenda de cores", True),
        ("Texto azul = dado digitado (pode ser editado).  Texto preto = fórmula (não editar).  Fundo amarelo = parâmetro para escolher.", False),
        ("", False),
        ("Fórmulas utilizadas", True),
        ("Receita / Despesas do mês: SOMASES (SUMIFS) por Tipo e intervalo de datas.  Vendas: CONT.SES (COUNTIFS) das receitas.", False),
        ("Lucro = Receita − Despesas.  Margem = Lucro ÷ Receita.  Ticket médio = Receita ÷ Quantidade de vendas.", False),
        ("Os mesmos dados alimentam o dashboard on-line do Gestão360 (demonstração do portfólio).", False),
    ]
    r = 5
    for text, is_head in lines:
        ins.cell(row=r, column=2, value=text).font = f_section if is_head else f_body
        ins.cell(row=r, column=2).alignment = Alignment(wrap_text=True, vertical="top")
        r += 1

    # =========================================================
    # 2) Categorias
    # =========================================================
    cat = wb.create_sheet("Categorias")
    cat.sheet_view.showGridLines = False
    cat["B2"] = "Categorias"
    cat["B2"].font = f_title
    cat["B4"], cat["C4"] = "Categoria", "Tipo"
    style_range(cat, "B4:C4", font=f_head, fill=fill_head)
    rows = [(c, "Receita") for c in REVENUE_CATS] + [(c, "Despesa") for c in EXPENSE_CATS]
    for i, (c, t) in enumerate(rows, start=5):
        cat.cell(row=i, column=2, value=c).font = f_input
        cat.cell(row=i, column=3, value=t).font = f_input
    cat_last = 4 + len(rows) + 10  # espaço para novas categorias
    style_range(cat, f"B5:C{cat_last}", border=box)
    cat.column_dimensions["B"].width = 26
    cat.column_dimensions["C"].width = 14

    # =========================================================
    # 3) Lançamentos
    # =========================================================
    lan = wb.create_sheet("Lançamentos")
    lan.sheet_view.showGridLines = False
    headers = ["Código", "Data", "Descrição", "Categoria", "Tipo", "Forma de pagamento", "Situação", "Valor (R$)", "Mês"]
    widths = [11, 12, 46, 20, 11, 20, 12, 15, 11]
    for i, (h, w) in enumerate(zip(headers, widths), start=1):
        lan.cell(row=1, column=i, value=h)
        lan.column_dimensions[get_column_letter(i)].width = w
    style_range(lan, "A1:I1", font=f_head, fill=fill_head, align=Alignment(vertical="center"))
    lan.row_dimensions[1].height = 22

    for i, t in enumerate(tx, start=2):
        y, m, d = map(int, t["date"].split("-"))
        values = [t["id"], date(y, m, d), t["description"], t["category"], t["type"], t["method"], t["status"], t["amount"]]
        for col, v in enumerate(values, start=1):
            c = lan.cell(row=i, column=col, value=v)
            c.font = f_input
        lan.cell(row=i, column=9, value=f"=DATE(YEAR(B{i}),MONTH(B{i}),1)").font = f_body
        lan.cell(row=i, column=2).number_format = "dd/mm/yyyy"
        lan.cell(row=i, column=8).number_format = BRL
        lan.cell(row=i, column=9).number_format = "mmm/yy"
    last = len(tx) + 1

    table = Table(displayName="Lancamentos", ref=f"A1:I{last}")
    table.tableStyleInfo = TableStyleInfo(name="TableStyleLight1", showRowStripes=True)
    lan.add_table(table)
    lan.freeze_panes = "A2"

    # Listas de validação (aplicadas também a linhas futuras)
    future = last + 500
    dv_cat = DataValidation(type="list", formula1=f"=Categorias!$B$5:$B${cat_last}", allow_blank=True)
    dv_tipo = DataValidation(type="list", formula1='"Receita,Despesa"', allow_blank=True)
    dv_met = DataValidation(type="list", formula1=f'"{",".join(METHODS)}"', allow_blank=True)
    dv_sit = DataValidation(type="list", formula1='"Pago,Pendente"', allow_blank=True)
    dv_val = DataValidation(type="decimal", operator="greaterThan", formula1="0", allow_blank=True)
    dv_val.error, dv_val.errorTitle = "Informe um valor positivo. O Tipo define se é receita ou despesa.", "Valor inválido"
    for dv, col in [(dv_cat, "D"), (dv_tipo, "E"), (dv_met, "F"), (dv_sit, "G"), (dv_val, "H")]:
        lan.add_data_validation(dv)
        dv.add(f"{col}2:{col}{future}")
    lan["H1"].comment = Comment("Sempre positivo. A coluna Tipo indica se é Receita ou Despesa.", "Gestão360")

    # =========================================================
    # 4) Resumo
    # =========================================================
    res = wb.create_sheet("Resumo", 1)
    res.sheet_view.showGridLines = False
    for col, w in zip("ABCDEFGHI", [3, 22, 17, 17, 17, 12, 12, 15, 3]):
        res.column_dimensions[col].width = w
    res["B2"] = "Gestão360 — Resumo financeiro"
    res["B2"].font = f_title
    res["B3"] = "Projeto demonstrativo · dados fictícios · todos os valores abaixo são calculados por fórmulas"
    res["B3"].font = f_sub
    res["B4"] = "Ano de referência"
    res["B4"].font = f_bold
    res["C4"] = 2025
    res["C4"].font = f_input
    res["C4"].fill = fill_input
    res["C4"].border = box
    res["C4"].alignment = Alignment(horizontal="center")
    res["C4"].comment = Comment("Digite o ano que deseja analisar (os dados de exemplo vão de 2025 a 2026).", "Gestão360")
    dv_year = DataValidation(type="whole", operator="between", formula1="2000", formula2="2100")
    res.add_data_validation(dv_year)
    dv_year.add("C4")

    V = f"Lançamentos!$H$2:$H${future}"
    T = f"Lançamentos!$E$2:$E${future}"
    D = f"Lançamentos!$B$2:$B${future}"
    C = f"Lançamentos!$D$2:$D${future}"

    # --- Tabela mensal (linhas 16 a 28) ---
    top = 15
    res.cell(row=top - 1, column=2, value="Resultado mensal").font = f_section
    for i, h in enumerate(["Mês", "Receita", "Despesas", "Lucro", "Margem", "Vendas", "Ticket médio"], start=2):
        res.cell(row=top, column=i, value=h)
    style_range(res, f"B{top}:H{top}", font=f_head, fill=fill_head)
    for m in range(1, 13):
        r = top + m
        start = f"DATE($C$4,{m},1)"
        end = f"DATE($C$4,{m + 1},1)"
        res.cell(row=r, column=2, value=MONTHS[m - 1])
        res.cell(row=r, column=3, value=f'=SUMIFS({V},{T},"Receita",{D},">="&{start},{D},"<"&{end})')
        res.cell(row=r, column=4, value=f'=SUMIFS({V},{T},"Despesa",{D},">="&{start},{D},"<"&{end})')
        res.cell(row=r, column=5, value=f"=C{r}-D{r}")
        res.cell(row=r, column=6, value=f"=IF(C{r}=0,0,E{r}/C{r})")
        res.cell(row=r, column=7, value=f'=COUNTIFS({T},"Receita",{D},">="&{start},{D},"<"&{end})')
        res.cell(row=r, column=8, value=f"=IF(G{r}=0,0,C{r}/G{r})")
    tot = top + 13
    res.cell(row=tot, column=2, value="Total do ano")
    for col in "CDEG":
        res[f"{col}{tot}"] = f"=SUM({col}{top + 1}:{col}{top + 12})"
    res[f"F{tot}"] = f"=IF(C{tot}=0,0,E{tot}/C{tot})"
    res[f"H{tot}"] = f"=IF(G{tot}=0,0,C{tot}/G{tot})"
    style_range(res, f"B{top + 1}:H{tot}", font=f_body, border=bottom)
    style_range(res, f"B{tot}:H{tot}", font=f_bold, fill=fill_light)
    style_range(res, f"C{top + 1}:E{tot}", fmt=BRL)
    style_range(res, f"F{top + 1}:F{tot}", fmt=PCT)
    style_range(res, f"G{top + 1}:G{tot}", fmt=INT)
    style_range(res, f"H{top + 1}:H{tot}", fmt=BRL)
    res.conditional_formatting.add(f"E{top + 1}:E{tot}", CellIsRule(operator="lessThan", formula=["0"], font=Font(name=FONT, color="C00000")))

    # --- Indicadores (linhas 6 a 12) ---
    res["B6"] = "Indicadores do ano"
    res["B6"].font = f_section
    kpis = [
        ("Receita total", f"=C{tot}", BRL0),
        ("Despesas", f"=D{tot}", BRL0),
        ("Lucro estimado", f"=E{tot}", BRL0),
        ("Margem de lucro", f"=F{tot}", PCT),
        ("Vendas", f"=G{tot}", INT),
        ("Ticket médio", f"=H{tot}", BRL),
    ]
    positions = [("B", 7), ("D", 7), ("F", 7), ("B", 10), ("D", 10), ("F", 10)]
    for (label, formula, fmt), (col, row) in zip(kpis, positions):
        col2 = get_column_letter(res[f"{col}1"].column + 1)
        res.merge_cells(f"{col}{row}:{col2}{row}")
        res.merge_cells(f"{col}{row + 1}:{col2}{row + 1}")
        res[f"{col}{row}"] = label
        res[f"{col}{row}"].font = f_kpi_label
        res[f"{col}{row + 1}"] = formula
        res[f"{col}{row + 1}"].font = f_kpi
        res[f"{col}{row + 1}"].number_format = fmt
        res[f"{col}{row + 1}"].alignment = Alignment(horizontal="left")
        for rr in (row, row + 1):
            for cc in (col, col2):
                res[f"{cc}{rr}"].fill = fill_light
    res["H7"] = "Pendente a receber"
    res["H7"].font = f_kpi_label
    res["H8"] = f'=SUMIFS({V},{T},"Receita",Lançamentos!$G$2:$G${future},"Pendente",{D},">="&DATE($C$4,1,1),{D},"<"&DATE($C$4+1,1,1))'
    res["H8"].font = Font(name=FONT, size=12, bold=True, color=NAVY)
    res["H8"].number_format = BRL
    res["H7"].fill = res["H8"].fill = fill_light

    # --- Por categoria ---
    ctop = tot + 3
    res.cell(row=ctop - 1, column=2, value="Por categoria (ano de referência)").font = f_section
    for i, h in enumerate(["Categoria", "Tipo", "Total", "% do tipo"], start=2):
        res.cell(row=ctop, column=i, value=h)
    style_range(res, f"B{ctop}:E{ctop}", font=f_head, fill=fill_head)
    for i in range(len(rows)):
        r = ctop + 1 + i
        src = 5 + i
        res[f"B{r}"] = f"=Categorias!B{src}"
        res[f"C{r}"] = f"=Categorias!C{src}"
        res[f"D{r}"] = f'=SUMIFS({V},{C},B{r},{T},C{r},{D},">="&DATE($C$4,1,1),{D},"<"&DATE($C$4+1,1,1))'
        res[f"E{r}"] = f'=IF(C{r}="Receita",IF($C${tot}=0,0,D{r}/$C${tot}),IF($D${tot}=0,0,D{r}/$D${tot}))'
        res[f"B{r}"].font = res[f"C{r}"].font = Font(name=FONT, size=10, color="008000")  # links para outra aba
        res[f"D{r}"].font = res[f"E{r}"].font = f_body
        res[f"D{r}"].number_format = BRL
        res[f"E{r}"].number_format = PCT
    cend = ctop + len(rows)
    style_range(res, f"B{ctop + 1}:E{cend}", border=bottom)

    # --- Gráficos nativos do Excel ---
    bar = BarChart()
    bar.type = "col"
    bar.title = "Receita × Despesas por mês"
    bar.y_axis.title = "R$"
    bar.y_axis.numFmt = "#,##0"
    bar.height, bar.width = 8.5, 17
    bar.add_data(Reference(res, min_col=3, max_col=4, min_row=top, max_row=top + 12), titles_from_data=True)
    bar.set_categories(Reference(res, min_col=2, min_row=top + 1, max_row=top + 12))
    bar.series[0].graphicalProperties.solidFill = BLUE
    bar.series[0].graphicalProperties.line.solidFill = BLUE
    bar.series[1].graphicalProperties.solidFill = ORANGE
    bar.series[1].graphicalProperties.line.solidFill = ORANGE
    bar.gapWidth = 60
    res.add_chart(bar, "J6")

    line = LineChart()
    line.title = "Lucro por mês"
    line.y_axis.numFmt = "#,##0"
    line.height, line.width = 8.5, 17
    line.add_data(Reference(res, min_col=5, min_row=top, max_row=top + 12), titles_from_data=True)
    line.set_categories(Reference(res, min_col=2, min_row=top + 1, max_row=top + 12))
    line.series[0].graphicalProperties.line.solidFill = "1BAF7A"
    line.series[0].graphicalProperties.line.width = 28000
    line.series[0].smooth = False
    res.add_chart(line, "J24")

    res.freeze_panes = "A5"
    ins.sheet_view.tabSelected = False
    wb.active = 1  # abre na aba Resumo
    OUT.parent.mkdir(parents=True, exist_ok=True)
    wb.save(OUT)
    print(f"Planilha gerada: {OUT} ({len(tx)} lançamentos)")


if __name__ == "__main__":
    main()
