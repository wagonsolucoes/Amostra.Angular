import { JwtResponse } from "./jwtResponse";

export interface LoginResponse {
  statusCode:any;
  Objeto: JwtResponse;
  msg: string;
  _ValidationResult: any;
}