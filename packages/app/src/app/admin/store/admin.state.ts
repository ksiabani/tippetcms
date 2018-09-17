import { Selector, State, Action, StateContext } from "@ngxs/store";
import { PagesState, PagesStateModel } from "./children/pages.state";

export interface AdminStateModel {
  pages: PagesStateModel;
}
@State<AdminStateModel>({
  name: "admin",
  children: [PagesState]
})
export class AdminState {}
