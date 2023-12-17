import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/utils/src';
import { HttpClient } from '@angular/common/http';
import { ClienteViewModel } from '../../interfaces/ClienteViewModel';
import { ClienteService } from '../../services/cliente.service';
import { RequestListInterface } from '../../interfaces/RequestListInterface';
import { ResponseCliente } from '../../interfaces/ResponseCliente';
import { PagSelRows } from '../../interfaces/PagSelRows';
import { IconSetService } from '@coreui/icons-angular';
import { cilPencil } from '../../../../node_modules/@coreui/icons/dist/cjs/free/cil-pencil'
import * as moment from 'moment';

@Component({
  templateUrl: 'cliente.component.html',
  styleUrls: ['cliente.component.css'],
  providers: [IconSetService],
})

export class ClienteComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private clienteService: ClienteService,
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
  headerToast = "sssss";
  bodyToast = "222222";
  nascimento="";
  tipo:any="CPF";
  cnpj:any="";
  orderCol:any="";
  orderColAnt:any="Documento";
  orderDir:any="";
  interval:any;
  msgSaved:any = "";
  lista:Array<ClienteViewModel>=[];
  frm = {} as ClienteViewModel;
  frmDel = {} as ClienteViewModel;
  req = {} as RequestListInterface;
  res = {} as ResponseCliente
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
  selEstados:Array<any> =  [
      {"nome": "Acre", "sigla": "AC"},
      {"nome": "Alagoas", "sigla": "AL"},
      {"nome": "Amapá", "sigla": "AP"},
      {"nome": "Amazonas", "sigla": "AM"},
      {"nome": "Bahia", "sigla": "BA"},
      {"nome": "Ceará", "sigla": "CE"},
      {"nome": "Distrito Federal", "sigla": "DF"},
      {"nome": "Espírito Santo", "sigla": "ES"},
      {"nome": "Goiás", "sigla": "GO"},
      {"nome": "Maranhão", "sigla": "MA"},
      {"nome": "Mato Grosso", "sigla": "MT"},
      {"nome": "Mato Grosso do Sul", "sigla": "MS"},
      {"nome": "Minas Gerais", "sigla": "MG"},
      {"nome": "Pará", "sigla": "PA"},
      {"nome": "Paraíba", "sigla": "PB"},
      {"nome": "Paraná", "sigla": "PR"},
      {"nome": "Pernambuco", "sigla": "PE"},
      {"nome": "Piauí", "sigla": "PI"},
      {"nome": "Rio de Janeiro", "sigla": "RJ"},
      {"nome": "Rio Grande do Norte", "sigla": "RN"},
      {"nome": "Rio Grande do Sul", "sigla": "RS"},
      {"nome": "Rondônia", "sigla": "RO"},
      {"nome": "Roraima", "sigla": "RR"},
      {"nome": "Santa Catarina", "sigla": "SC"},
      {"nome": "São Paulo", "sigla": "SP"},
      {"nome": "Sergipe", "sigla": "SE"},
      {"nome": "Tocantins", "sigla": "TO"}
  ];

  selrows:Array<PagSelRows>=[];
  selpages:Array<any>=[0];

  ngOnInit(): void {
    this.orderCol="Documento";
    this.orderColAnt="Documento";
    this.orderDir="asc";
    this.msgSaved = "";
    this.lista=[];
    this.req.Page = 1;
    this.req.Rows = 10;
    this.req.ColDirectrion = "ASC";
    this.req.ColOrder = "Documento";
    this.req.ValFilter = "";
    this.selrows = [
      { val: "10",  txt: "10 registros" },
      { val: "25",   txt: "25 registros" },
      { val: "50", txt: "50 registros" },
      { val: "100", txt: "100 registros" }
    ];
    this.Lista();
  }

  SetCnpj(){
    this.frm.documento = this.cnpj;
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

  Viacep(){
    this.clienteService.Viacep(this.frm.cep).subscribe((res) => {
      this.frm.endereco = res.logradouro;
      this.frm.bairro = res.bairro;
      this.frm.municipio = res.localidade;
      this.frm.uf = res.uf;
      this.SetBtnSave();
    })
  }

  Lista(){
    this.clienteService.Lista(this.req).subscribe((res) => {
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
    var m = 10;
    var i = 0;
    if(this.frm.documento != "" && this.frm.documento != undefined){
      i++
    }
    if(this.frm.nome != "" && this.frm.nome != undefined){
      i++
    }
    if(this.frm.cep != "" && this.frm.cep != undefined){
      i++
    }
    if(this.frm.endereco != "" && this.frm.endereco != undefined){
      i++
    }
    if(this.frm.numero != "" && this.frm.numero != undefined){
      i++
    }
    if(this.frm.bairro != "" && this.frm.bairro != undefined){
      i++
    }
    if(this.frm.municipio != "" && this.frm.municipio != undefined){
      i++
    }
    if(this.frm.uf != "" && this.frm.uf != undefined){
      i++
    }
    if(this.frm.email != "" && this.frm.email != undefined){
      i++
    }
    if(this.frm.telefone != "" && this.frm.telefone != undefined){
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
    if(this.nascimento.length == 8){
      var dd="";
      var mm = "";
      var yyyy = "";
      var n = this.nascimento;
      dd = n.substring(0,2);
      mm = n.substring(2,4);
      yyyy = n.substring(4,8);
      var d = new Date(yyyy + "-" + mm + "-" + dd).toString();
      if(d === 'Invalid Date')
      {
        this.toggleToast("Nascimento inválido. Utilize formato 'dd/mm/aaaa'.","","warning");
        inp.focus();
        inp.select();
      }
      else{
        this.frm.nascimento = new Date(yyyy + "-" + mm + "-" + dd);
        this.SetBtnSave();
      }
    }
    else{
      inp.focus();
      inp.select();
    }
  }

  SetFrmInsert(){
    this.frm = {} as ClienteViewModel;
    this.bForm=true;
    this.bConfirmaDelete=false;
    this.bUpdate=false;
    this.bLista=false;
  }

  Salvar(){
    if(this.bUpdate){
      this.Update();
    }
    else
    {
      this.Insert();
    }
  }

  SetFrmUpdate(obj:any){
    this.frm.documento = obj.documento;
    this.frm.nome = obj.nome;
    this.frm.cep = obj.cep;
    this.frm.endereco = obj.endereco;
    this.frm.numero = obj.numero;
    this.frm.complemento = obj.complemento;
    this.frm.bairro = obj.bairro;
    this.frm.municipio = obj.municipio;
    this.frm.uf = obj.uf;
    this.frm.email = obj.email;
    this.frm.nascimento = obj.nascimento;
    var dt = moment(this.frm.nascimento.toString());
    var day = dt.date();
    var month = dt.month() + 1;
    if(month < 10){
      var mm = "0" + month;
    }
    else{
      var mm = month.toString();
    }
    var year = dt.year();
    this.nascimento = day + "/" + mm + "/" + year;
    this.frm.telefone = obj.telefone;
    this.bForm=true;
    this.bConfirmaDelete=false;
    this.bUpdate=true;
    this.bLista=false;
  }

  Insert(){
    this.frm.idade = 0;
    this.frm.ativo = true;
    this.clienteService.Insert(this.frm).subscribe((res) => {
      this.toggleToast("Inserido com sucesso.","","success");
      this.req.Page = 1;
      this.Lista();
      this.bLista=true;
      this.bForm=false;
      this.bConfirmaDelete=false;
      this.bConfirmaDeleteAuto=false;
      this.frm = {} as ClienteViewModel;
      this.bUpdate=false;
    })
  }

  Update(){
    this.frm.idade = 0;
    this.frm.ativo = true;
    this.clienteService.Update(this.frm).subscribe((res) => {
      this.toggleToast("Alterado com sucesso.","","success");
      this.req.Page = 1;
      this.Lista();
      this.bLista=true;
      this.bForm=false;
      this.bConfirmaDelete=false;
      this.bConfirmaDeleteAuto=false;
      this.frm = {} as ClienteViewModel;
      this.bUpdate=false;
    })
  }

  Apagar(){
    this.clienteService.Delete(this.frmDel).subscribe((res) => {
      this.toggleToast("Apagado com sucesso.","","success");
      this.req.Page = 1;
      this.Lista();
      this.bLista=true;
      this.bConfirmaDelete=false;
      this.frmDel = {} as ClienteViewModel;
    });
  }

  Cancelar(){
    this.bLista=true;
    this.bConfirmaDelete=false;
    this.frmDel = {} as ClienteViewModel;
  }

  SetFrmDelete(obj:any){
    this.frmDel = obj;
    this.bConfirmaDelete=true;
    this.bLista=false;
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
    if(this.bToast){
      this.bToast=false;
      this.bToast=true;
    }
    else{
      this.bToast = !this.bToast;
    }
  }

  onVisibleChange($event: boolean) {
    this.bToast = $event;
    this.percentage = !this.bToast ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }
}
