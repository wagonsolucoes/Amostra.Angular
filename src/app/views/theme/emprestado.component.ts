import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/utils/src';
import { HttpClient } from '@angular/common/http';
import { EmprestadoViewModel } from '../../interfaces/EmprestadoViewModel';
import { SelectDto } from '../../interfaces/SelectDto';
import { ClienteService } from '../../services/cliente.service';
import { EmprestadoService } from '../../services/emprestado.service';
import { LivroService } from '../../services/livro.service';
import { RequestListEmprestadoInterface } from '../../interfaces/RequestListEmprestadoInterface';
import { ResponseEmprestado } from '../../interfaces/ResponseEmprestado';
import { PagSelRows } from '../../interfaces/PagSelRows';
import { IconSetService } from '@coreui/icons-angular';
import { cilPencil } from '@coreui/icons/dist/cjs/free/cil-pencil'
import * as moment from 'moment';

@Component({
  templateUrl: 'emprestado.component.html',
  styleUrls: ['emprestado.component.css'],
  providers: [IconSetService],
})

export class EmprestadoComponent implements OnInit {
JSON: any;

  constructor(
    private http: HttpClient,
    private clienteService: ClienteService,
    private emprestadoService: EmprestadoService,
    private livroService: LivroService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public iconSet: IconSetService
  ) {
    iconSet.icons = { cilPencil };
  }
  position = 'top-end';
  bToast = false;
  percentage = 0;
  colorToast = "";
  headerToast = "";
  bodyToast = "";
  dh:any;
  dhDevolucao:any;
  nascimento="";
  tipo:any="CPF";
  cnpj:any="";
  orderCol:any="";
  orderColAnt:any="Cliente";
  orderDir:any="";
  interval:any;
  msgSaved:any = "";
  lista:Array<EmprestadoViewModel>=[];
  ddlCliente:Array<SelectDto>=[];
  ddlLivro:Array<SelectDto>=[];
  frm = {} as EmprestadoViewModel;
  frmDel = {} as EmprestadoViewModel;
  req = {} as RequestListEmprestadoInterface;
  res = {} as ResponseEmprestado
  disFirts:any = false;
  disLast:any = false;
  lblRowStart:any = "";
  lblRowLast:any = "";
  ttPaginas:any;
  ttRows:any;
  ttRows2:any;
  bLista:any=true;
  bListaAuto:any=false;
  bUpdate:any=false;
  bFrmDisabled:any=true;
  bFrmDisabledAuto:any=true;
  bConfirmaDelete:any=false;
  bConfirmaDeleteAuto:any=false;
  bAlert:any = false;
  bDismissible:any = true;
  bForm:any=false;
  bFormAutoIns:any=false;
  bFormAutoUpd:any=false;
  bFormAutoDel:any=false;
  bModalAuto:any=false;
  sMsgAlert:any = "";
  sAcaoFormAuto:any = "Novo";
  selrows:Array<PagSelRows>=[];
  selpages:Array<any>=[0];

  ngOnInit(): void {
    this.orderCol="Cliente";
    this.orderColAnt="Cliente";
    this.orderDir="asc";
    this.msgSaved = "";
    this.lista=[];
    this.req.Page = 1;
    this.req.Rows = 10;
    this.req.ColDirectrion = "ASC";
    this.req.ColOrder = "Cliente";
    this.selrows = [
      { val: "10",  txt: "10 registros" },
      { val: "25",   txt: "25 registros" },
      { val: "50", txt: "50 registros" },
      { val: "100", txt: "100 registros" }
    ];
    this.Lista();
    this.DdlCliente();
    this.DdlLivro();
  }

  SetOrder(col:any){
    this.req.ColOrder = col;
    if(col != this.orderColAnt){
      this.req.ColDirectrion = "ASC"
    }
    else
    {
      if(this.req.ColDirectrion == "ASC")
      {
        this.req.ColDirectrion = "DESC"
      }
      else
      {
        this.req.ColDirectrion = "ASC"
      }
    }
    this.orderColAnt = col;
    this.Lista();
  }

  Lista(){
    debugger
    this.emprestadoService.Lista(this.req).subscribe((res) => {
      debugger
      this.lista = res.lst;
      this.ttRows2 = res.ttRows;
      this.PopulaSelPages(res.ttRows);
    })
  }

  DdlCliente(){
    this.clienteService.DdlCliente().subscribe((res) => {
      this.ddlCliente = res;
    })
  }

  DdlLivro(){
    this.livroService.DdlLivro().subscribe((res) => {
      this.ddlLivro = res;
    })
  }

  SetRows(){
    var page = parseInt(this.req.Page);
    if(page > 1){
      this.req.Page = 1;
    }
    this.Lista();
  }

  PopulaSelPages(ttRows:any){
    var r = parseInt(this.req.Rows);
    this.ttRows = r;
    var tt = Math.round(ttRows / r);
    this.ttPaginas = tt;
    this.selpages = [];
    if(tt > 0){
      for(var j=1; j <= tt; j++){
        this.selpages.push(j);
      }
    }
    else{
      this.selpages = [1];
      this.ttPaginas = 1;
    }
    var nPage = parseInt(this.req.Page);
    if(nPage == 1){
      this.disFirts = true;
    }
    else{
      this.disFirts = false;
    }

    if(nPage == this.ttPaginas)
    {
      this.disLast = true;
    }
    else
    {
      this.disLast = false;
    }
    this.SetLblPaginador();
  }

  SetLblPaginador(){
    var p = parseInt(this.req.Page);
    var nRows = parseInt(this.req.Rows);
    if(p == 1){
      this.lblRowStart = 1;
      this.lblRowLast = (p * nRows);
      if(this.ttRows2 < this.lblRowLast){
        this.lblRowLast = this.ttRows2;
      }
    }
    else{
      var st = (p * nRows) - nRows;
      this.lblRowStart = st;
      this.lblRowLast = (p * nRows);
      if(this.ttRows2 < this.lblRowLast){
        this.lblRowLast = this.ttRows2;
      }
    }
  }

  Search(){
    this.req.Page = 1;
    this.Lista();
  }

  SetSt(){
    this.req.Page = 1;
    this.Lista();
  }

  SetLst(){
    this.req.Page = this.ttPaginas;
    this.Lista();
  }

  Next(){
    var ttPaginas = parseInt(this.ttPaginas);
    var nRows = parseInt(this.req.Rows);
    var p = parseInt(this.req.Page);
    if(ttPaginas > 0 && p < ttPaginas)
    {
      p++;
      this.req.Page = p;
      this.Lista();
    }
  }

  Prev(){
    var p = parseInt(this.req.Page);
    if(p > 1)
    {
      p--;
      this.req.Page = p;
      this.Lista();
    }

  }

  SetBtnSave(){
    this.bFrmDisabled = true;
    var m = 2;
    var i = 0;
    if(this.frm.idCliente != "" && this.frm.idCliente != undefined){
      i++
    }
    if(this.frm.idLivro != "" && this.frm.idLivro != undefined){
      i++
    }
    if(i < m){
      this.bFrmDisabled = true;
    }
    else{
      this.bFrmDisabled = false;
    }
  }

  ValidateDate(){
    var inp = (<HTMLInputElement>document.getElementById("txtNascimento"));
    if(this.dhDevolucao.length == 8){
      var dd="";
      var mm = "";
      var yyyy = "";
      var n = this.dhDevolucao;
      dd = n.substring(0,2);
      mm = n.substring(2,4);
      yyyy = n.substring(4,8);
      var d = new Date(yyyy + "-" + mm + "-" + dd).toString();
      if(d === 'Invalid Date')
      {
        this.toggleToast("Data de devolução inválida. Utilize formato 'dd/mm/aaaa'.","","warning");
        inp.focus();
        inp.select();
      }
      else{
        this.frm.dhDevolucao = new Date(yyyy + "-" + mm + "-" + dd);
        this.SetBtnSave();
      }
    }
    else{
      inp.focus();
      inp.select();
    }
  }

  SetFrmInsert(){
    this.frm = {} as EmprestadoViewModel;
    this.bForm=true;
    this.bConfirmaDelete=false;
    this.bUpdate=false;
    this.bLista=false;
  }

  Salvar(){
    //debugger
    if(this.bUpdate){
      this.Update();
    }
    else
    {
      this.Insert();
    }
  }

  SetFrmUpdate(obj:any){
    this.frm.id = obj.id;
    this.frm.idCliente = obj.idCliente;
    this.frm.idLivro = obj.idLivro;
    this.frm.dh = obj.dh;
    this.frm.dhDevolucao = obj.dhDevolucao;
    this.frm.diasEmprestado = obj.diasEmprestado;
    this.frm.ativo = obj.ativo;

    var dt = moment(obj.dh.toString());
    var day = dt.date();
    var month = dt.month() + 1;
    if(month < 10){
      var mm = "0" + month;
    }
    else{
      var mm = month.toString();
    }
    var year = dt.year();
    this.dh = day + "/" + mm + "/" + year;

    debugger
    var d = "";
    if(obj.dhDevolucao != null){
      var dt = moment(obj.dhDevolucao.toString());
      var day = dt.date();
      if(day < 10){
        d = "0" + day;
      }
      else
      {
        d = day.toString();
      }
      var month = dt.month() + 1;
      if(month < 10){
        var mm = "0" + month;
      }
      else{
        var mm = month.toString();
      }
      var year = dt.year();
      this.dhDevolucao = d + "/" + mm + "/" + year;
    }

    this.bForm=true;
    this.bConfirmaDelete=false;
    this.bUpdate=true;
    this.bLista=false;
    this.SetBtnSave();
  }

  Insert(){
    //debugger
    this.frm.diasEmprestado = 0;
    this.frm.ativo = true;
    this.emprestadoService.Insert(this.frm).subscribe((res) => {
      //debugger
      this.toggleToast("Inserido com sucesso.","","success");
      this.req.Page = 1;
      this.Lista();
      this.bLista=true;
      this.bForm=false;
      this.bConfirmaDelete=false;
      this.bConfirmaDeleteAuto=false;
      this.frm = {} as EmprestadoViewModel;
      this.bUpdate=false;
    })
  }

  Update(){
    this.frm.diasEmprestado = 0;
    this.frm.ativo = true;
    debugger
    this.emprestadoService.Update(this.frm).subscribe((res) => {
      debugger
      this.toggleToast("Alterado com sucesso.","","success");
      this.req.Page = 1;
      this.Lista();
      this.bLista=true;
      this.bForm=false;
      this.bConfirmaDelete=false;
      this.bConfirmaDeleteAuto=false;
      this.frm = {} as EmprestadoViewModel;
      this.bUpdate=false;
    })
  }

  Apagar(){
    //debugger
    this.emprestadoService.Delete(this.frmDel).subscribe((res) => {
      this.toggleToast("Apagado com sucesso.","","success");
      this.req.Page = 1;
      this.Lista();
      this.bLista=true;
      this.bConfirmaDelete=false;
      this.frmDel = {} as EmprestadoViewModel;
    });
  }

  Cancelar(){
    //debugger
    this.bLista=true;
    this.bConfirmaDelete=false;
    this.frmDel = {} as EmprestadoViewModel;
  }

  SetFrmDelete(obj:any){
    this.frmDel = obj;
    this.bConfirmaDelete=true;
    this.bLista=false;
  }

  timeLeft: number = 5;

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.pauseTimer();
      }
    },1000)
  }

  pauseTimer() {
    this.msgSaved=""
    clearInterval(this.interval);
  }

  handleLiveDemoChange(event: any) {
    this.bFormAutoDel = event;
  }

  handleLiveDemoChange2(event: any) {
    this.bModalAuto = event;
  }

  toggleToast(headerToast: string = "", bodyToast: string = "", colorToast: string = "") {
    this.headerToast = headerToast;
    this.bodyToast = bodyToast;
    this.colorToast = colorToast;
    this.bToast = !this.bToast;
  }

  onVisibleChange($event: boolean) {
    this.bToast = $event;
    this.percentage = !this.bToast ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }

}
