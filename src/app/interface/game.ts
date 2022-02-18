import {Genre} from "@app/interface/genre";

export interface Game {
  title: string;
  id: string;
  price: number;
  genres: Genre[];
  image?: string;
}
