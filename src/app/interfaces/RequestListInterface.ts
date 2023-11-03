import { JwtResponse } from "./jwtResponse";

export interface RequestListInterface {
    Page: any;
    Rows: any;
    ValFilter: string;
    ColOrder: string;
    ColDirectrion: string;
  }