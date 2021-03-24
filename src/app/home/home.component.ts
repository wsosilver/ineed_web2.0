import { Component, OnInit } from "@angular/core";
import { ChartType, ChartOptions, ChartDataSets } from "chart.js";
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from "ng2-charts";
import { DataBasePrefabs } from "../share/data-base";
import { HttpClient } from "@angular/common/http";
import { from, Observable } from "rxjs";
import { groupBy, mergeMap, toArray } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent extends DataBasePrefabs {
  SOLICITACOES;
  SOLICITACOES_ATIVAS;
  SERVICOS_SOLICITADOS = [];
  USUARIOS;
  USUARIOS_INATIVO = [];
  ORCAMENTOS;
  ORDENER = [];
  VISITAS;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [["Usuários"], "Usuários Inativos"];
  public pieChartData: SingleDataSet = [0, 0];
  public pieVisitData: SingleDataSet = [0, 0];
  public pieChartType: ChartType = "pie";
  public solChartType: ChartType = "horizontalBar";
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public pieSolicitacao: Label[] = [
    "Solicitações em Andamento",
    "Solicitações Concluídas",
  ];
  public pieVisita: Label[] = ["Visitas Pendentes", "Visitas Urgentes"];

  public monthValues: ChartDataSets = {
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    label: "2019",
  };
  public userMonthValues: SingleDataSet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  public monthLabels: Label[] = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  public pieSolicitacaoValues: SingleDataSet = [0, 0];

  ERROR_MENSAGES = [
    "Versão incompleta, algumas páginas não estão com sua implementação imcompleta! Atualizações estão em andamento!",
  ];

  constructor(public http: HttpClient) {
    super("", http);
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  get pievalid() {
    if (
      this.SOLICITACOES &&
      this.USUARIOS &&
      this.ORCAMENTOS &&
      this.ORDENER.length > 0
    ) {
      return true;
    }

    return false;
  }

  ngOnInit() {
    this.get("/solicitacao").subscribe((data: any) => {
      console.log(data.solicit);
      this.SOLICITACOES = data.solicit;

      let concluidas = [];
      let andamento = [];
      let servicosMaisSolicitados = [];
      this.SOLICITACOES.forEach((data) => {
        if (data.ativo) concluidas.push(data);
        else andamento.push(data);
        if (data.servicoSolicitacao[0]) {
          this.SERVICOS_SOLICITADOS.push({
            servicoId: data.servicoSolicitacao[0].servicoId,
            categoria: data.servicoSolicitacao[0].servico.categoria.valor,
            nome: data.servicoSolicitacao[0].servico.nome,
          });
        }
      });

      this.get("/dashboard/orcamento?meses=11").subscribe((data: any) => {
        data.dashboard.forEach((element) => {
          this.monthValues.data[element.mes - 1] = element.valorTotal;
          this.monthLabels[element.mes - 1] = `${
            this.monthLabels[element.mes - 1]
          } - ${element.ano}`;
        });
      });

      this.get("/dashboard/visita?meses=11").subscribe((data: any) => {
        this.pieVisitData[0] = data.pendentes.visitasPendentes;
        this.pieVisitData[1] = data.pendentes.visitasPendentesUrgentes;

        this.VISITAS =
          Number.parseInt(data.pendentes.visitasPendentes) +
          Number.parseInt(data.pendentes.visitasPendentesUrgentes);
      });

      let servicosPorSolicitacao: Observable<any[]> = from(
        this.SERVICOS_SOLICITADOS
      ).pipe(
        groupBy((servico) => servico.servicoId),
        mergeMap((group) => group.pipe(toArray()))
      );

      servicosPorSolicitacao.subscribe((data) => {
        this.ORDENER.push(data);
      });

      console.log("RESSPERT", this.ORDENER);

      this.pieSolicitacaoValues[0] = andamento.length;
      this.pieSolicitacaoValues[1] = concluidas.length;

      console.log(servicosMaisSolicitados);
    });

    this.get("/usuario/listarTodos").subscribe((data: any) => {
      console.log(data);
      this.USUARIOS = data.usuario;

      this.USUARIOS.forEach((element) => {
        let data = new Date(element.criadoEm);
        let now = new Date();

        if (element.inativo) {
          this.USUARIOS_INATIVO.push(element);
        }
      });

      this.pieChartData[0] =
        this.USUARIOS.length - this.USUARIOS_INATIVO.length;
      this.pieChartData[1] = this.USUARIOS_INATIVO.length;
    });

    this.get("orcamento").subscribe((data: any) => {
      console.log("ASD", data);
      this.ORCAMENTOS = data.listaorcamento;

      // this.pieChartData[1] = this.ORCAMENTOS.length
    });

    this.get("/dashboard/Usuario?meses=11").subscribe((data: any) => {
      console.log("uASX", data);
      // this.ORCAMENTOS = data.listaorcamento

      data.dashboard.forEach((element) => {
        this.userMonthValues[element.mes - 1] = element.valorTotal;
        // this.monthLabels[element.mes - 1] = `${this.monthLabels[element.mes - 1]} - ${element.ano}`
      });
    });
  }
}
