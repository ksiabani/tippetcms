import { Selector, State, Action, StateContext } from "@ngxs/store";
import { PagesState, PagesStateModel } from "./children/pages.state";
import { SinglePageState } from "./children/single-page.state";

export interface AdminStateModel {
  pages: PagesStateModel;
}
@State<AdminStateModel>({
  name: "admin",
  children: [PagesState, SinglePageState]
})
export class AdminState {}
