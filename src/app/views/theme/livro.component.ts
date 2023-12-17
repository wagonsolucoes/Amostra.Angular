import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/utils/src';
import { HttpClient } from '@angular/common/http';
import { LivroViewModel } from '../../interfaces/LivroViewModel';
import { LivroService } from '../../services/livro.service';
import { RequestListInterface } from '../../interfaces/RequestListInterface';
import { ResponseLivro } from '../../interfaces/ResponseLivro';
import { PagSelRows } from '../../interfaces/PagSelRows';
import { IconSetService } from '@coreui/icons-angular';
import { cilPencil } from '@coreui/icons/dist/cjs/free/cil-pencil'
import * as moment from 'moment';

@Component({
  templateUrl: 'livro.component.html',
  styleUrls: ['livro.component.css'],
  providers: [IconSetService],
})

export class LivroComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private livroService: LivroService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public iconSet: IconSetService
  ) {
    iconSet.icons = { cilPencil };
  }
  dhCompra = "";
  dhExtravio = "";
  nascimento="";
  tipo:any="CPF";
  cnpj:any="";
  orderCol:any="";
  orderColAnt:any="";
  orderDir:any="";
  interval:any;
  msgSaved:any = "";
  lista:Array<LivroViewModel>=[];
  frm = {} as LivroViewModel;
  frmDel = {} as LivroViewModel;
  req = {} as RequestListInterface;
  res = {} as ResponseLivro
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
    this.orderCol="cpf";
    this.orderColAnt="cpf";
    this.orderDir="asc";
    this.msgSaved = "";
    this.lista=[];
    this.req.Page = 1;
    this.req.Rows = 10;
    this.req.ColDirectrion = "ASC";
    this.req.ColOrder = "Nome";
    this.req.ValFilter = "";
    this.selrows = [
      { val: "10",  txt: "10 registros" },
      { val: "25",   txt: "25 registros" },
      { val: "50", txt: "50 registros" },
      { val: "100", txt: "100 registros" }
    ];
    this.Lista();
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
    this.req.ColOrder = "Titulo";
    this.livroService.Lista(this.req).subscribe((res) => {
      debugger
      this.lista = res.lst;
      this.ttRows2 = res.ttRows;
      this.PopulaSelPages(res.ttRows);
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
    var m = 5;
    var i = 0;
    if(this.frm.dhCompra != null){
      i++
    }
    if(this.frm.titulo != "" && this.frm.titulo != undefined){
      i++
    }
    if(this.frm.prefacio != "" && this.frm.prefacio != undefined){
      i++
    }
    if(this.frm.autor != "" && this.frm.autor != undefined){
      i++
    }
    if(this.frm.editora != "" && this.frm.editora != undefined){
      i++
    }
    if(i < m){
      this.bFrmDisabled = true;
    }
    else{
      this.bFrmDisabled = false;
    }
  }
  ValidateDateCompra(){
    debugger
    var inp = (<HTMLInputElement>document.getElementById("txtDhCompra"));
    if(this.dhCompra.length == 8){
      var dd="";
      var mm = "";
      var yyyy = "";
      var n = this.dhCompra;
      dd = n.substring(0,2);
      mm = n.substring(2,4);
      yyyy = n.substring(4,8);
      var d = new Date(yyyy + "-" + mm + "-" + dd).toString();
      if(d === 'Invalid Date')
      {
        alert("Data da compra inválida. Utilize formato 'dd/mm/aaaa'.");
        inp.focus();
        inp.select();
      }
      else{
        this.frm.dhCompra = new Date(yyyy + "-" + mm + "-" + dd);
        this.SetBtnSave();
      }
    }
    else{
      inp.focus();
      inp.select();
    }
  }
  ValidateDateExtravio(){
    debugger
    var inp = (<HTMLInputElement>document.getElementById("txtDhExtravio"));
    if(this.dhExtravio.length == 8){
      var dd="";
      var mm = "";
      var yyyy = "";
      var n = this.dhExtravio;
      dd = n.substring(0,2);
      mm = n.substring(2,4);
      yyyy = n.substring(4,8);
      var d = new Date(yyyy + "-" + mm + "-" + dd).toString();
      if(d === 'Invalid Date')
      {
        alert("Data de extravio inválida. Utilize formato 'dd/mm/aaaa'.");
        inp.focus();
        inp.select();
      }
      else{
        this.frm.dhExtravio = new Date(yyyy + "-" + mm + "-" + dd);
        this.SetBtnSave();
      }
    }
    else{
      inp.focus();
      inp.select();
    }
  }

  SetFrmInsert(){
    this.frm = {} as LivroViewModel;
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
    debugger
    this.frm.id = obj.id;
    this.frm.titulo = obj.titulo;
    this.frm.prefacio = obj.prefacio;
    this.frm.autor = obj.autor;
    this.frm.editora = obj.editora;
    this.frm.extraviado = obj.extraviado;
    this.frm.emprestado = obj.emprestado;
    this.frm.ativo = obj.ativo;
    this.frm.dhCompra = obj.dhCompra;

    var dt = moment(this.frm.dhCompra.toString());
    var dd = "";
    var day = dt.date();
    if(day < 10){
      dd = "0" + day;
    }
    else{
      dd = day.toString();
    }
    var month = dt.month() + 1;
    if(month < 10){
      var mm = "0" + month;
    }
    else{
      var mm = month.toString();
    }
    var year = dt.year();
    this.dhCompra = dd + "/" + mm + "/" + year;

    if(obj.dhExtravio != "0001-01-01T00:00:00")
    {
      var dt = moment(this.frm.dhExtravio.toString());
      var day = dt.date();
      var month = dt.month() + 1;
      if(month < 10){
        var mm = "0" + month;
      }
      else{
        var mm = month.toString();
      }
      var year = dt.year();
      this.dhExtravio = day + "/" + mm + "/" + year;
    }
    this.bForm=true;
    this.bConfirmaDelete=false;
    this.bUpdate=true;
    this.bLista=false;
    this.SetBtnSave();
  }

  Insert(){
    debugger
    this.frm.extraviado = false;
    if(this.frm.dhExtravio != null){
      this.frm.extraviado = true;
    }
    if(this.dhCompra != null){
      var dd="";
      var mm = "";
      var yyyy = "";
      dd = this.dhCompra.substring(0,2);
      mm = this.dhCompra.substring(2,4);
      yyyy = this.dhCompra.substring(4,8);
      this.frm.dhCompra = new Date(yyyy + "-" + mm + "-" + dd);
    }
    this.frm.emprestado=false;
    this.frm.ativo = true;
    this.livroService.Insert(this.frm).subscribe((res) => {
      debugger
      this.msgSaved="Inserido com sucesso."
      this.req.Page = 1;
      this.Lista();
      this.bLista=true;
      this.bForm=false;
      this.bConfirmaDelete=false;
      this.bConfirmaDeleteAuto=false;
      this.frm = {} as LivroViewModel;
      this.bUpdate=false;
    })
  }

  Update(){
    this.frm.ativo = true;
    debugger
    this.livroService.Update(this.frm).subscribe((res) => {
      debugger
      this.msgSaved="Alterado com sucesso."
      this.req.Page = 1;
      this.Lista();
      this.bLista=true;
      this.bForm=false;
      this.bConfirmaDelete=false;
      this.bConfirmaDeleteAuto=false;
      this.frm = {} as LivroViewModel;
      this.bUpdate=false;
    })
  }

  Apagar(){
    //debugger
    this.livroService.Delete(this.frmDel).subscribe((res) => {
      this.msgSaved="Apagado com sucesso."
      this.req.Page = 1;
      this.Lista();
      this.bLista=true;
      this.bConfirmaDelete=false;
      this.frmDel = {} as LivroViewModel;
    });
  }

  Cancelar(){
    //debugger
    this.bLista=true;
    this.bConfirmaDelete=false;
    this.frmDel = {} as LivroViewModel;
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

}
