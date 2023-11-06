import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/utils/src';
import { HttpClient } from '@angular/common/http';
import { ClienteViewModel } from '../../interfaces/ClienteViewModel';
import { ClienteService } from '../../services/cliente.service';
import { RequestListInterface } from '../../interfaces/RequestListInterface';
import { ResponseCliente } from '../../interfaces/ResponseCliente';
import { PagSelRows } from '../../interfaces/PagSelRows'


@Component({
  templateUrl: 'cliente.component.html'
})

export class ClienteComponent implements OnInit {

  constructor(
    private http: HttpClient, 
    private clienteService: ClienteService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) {
  }
  //teste:string="";
  tipo:any="CPF";
  orderCol:any="";
  orderColAnt:any="";
  orderDir:any="";
  interval:any;
  msgSaved:any = "";
  teste:string="aaaa";
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
    this.clienteService.Lista(this.req).subscribe((res) => {
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
    }
    else{      
      var st = (p * nRows) - nRows;
      this.lblRowStart = st;
      this.lblRowLast = (p * nRows);
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
    var m = 3;
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

  SetFrmInsert(){
    this.frm = {} as ClienteViewModel;
    this.bForm=true;
    this.bConfirmaDelete=false;
    this.bUpdate=true;
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
    debugger
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
    this.frm.telefone = obj.telefone;
    this.bForm=true;
    this.bConfirmaDelete=false;
    this.bUpdate=true;
    this.bLista=false;
  }
  
  Insert(){
    this.clienteService.Insert(this.frm).subscribe((res) => {
      if(res.statusCode == 200){
        this.msgSaved="Inserido com sucesso."
        this.req.Page = 1;
        this.Lista();
        this.bLista=true; 
        this.bForm=false;
        this.bConfirmaDelete=false;
        this.bConfirmaDeleteAuto=false;
        this.frm = {} as ClienteViewModel;
        this.startTimer()
      }
      else{
        ////
      }
    })
  }

  Update(){
    this.clienteService.Update(this.frm).subscribe((res) => {
      if(res.statusCode == 200){
        this.msgSaved="Alterado com sucesso."
        this.req.Page = 1;
        this.Lista();
        this.bLista=true; 
        this.bForm=false;
        this.bConfirmaDelete=false;
        this.bConfirmaDeleteAuto=false;
        this.frm = {} as ClienteViewModel;
        this.startTimer()
      }
      else{
        //
      }
    })
  }

  Apagar(bCancel:any,obj:any){  
    if(!bCancel)
    {
      this.bLista=true;
      this.bConfirmaDelete=false;
      this.frmDel = {} as ClienteViewModel;
    }
    else
    { 
      this.frmDel = obj;
      this.clienteService.Delete(this.frmDel).subscribe((res) => {
        if(res.statusCode == 200){
          this.msgSaved="Apagado com sucesso."
          this.req.Page = 1;
          this.Lista();
          this.bLista=true;
          this.bConfirmaDelete=false;
          this.frmDel = {} as ClienteViewModel;
          this.startTimer()
        }
        else{
          //
        }
      })
    }
  }

  SetFrmDelete(obj:any){
    this.frmDel = obj;
    this.bConfirmaDelete=true;
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