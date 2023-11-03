import { JwtResponse } from "./jwtResponse";

export interface RequestList {
  Cpf: any;
  Page: any;
  Rows: any;
  ColFilter: string[];
  OperatorFilter: string[];
  ValFilter: string[];
  ColOrder: string[];
  ColDirectrion: string[];
  jwtResponse: JwtResponse;
}