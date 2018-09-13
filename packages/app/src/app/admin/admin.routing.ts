import { Routes, RouterModule } from "@angular/router";
import { OverviewComponent } from "./pages/overview/overview.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { MediaComponent } from "./pages/media/media.component";
import { ElementsComponent } from "./pages/elements/elements.component";
import { PagesComponent } from "./pages/pages/pages.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { DetailsComponent } from "./pages/details/details.component";
import { SectionComponent } from "./pages/section/section.component";
import { TileComponent } from "./pages/tile/tile.component";

const adminRoutes: Routes = [
  {
    path: "admin",
    redirectTo: "lobby"
  },
  {
    path: "admin/:id",
    component: AdminComponent,
    children: [
      { path: "", component: OverviewComponent },
      {
        path: "media",
        component: MediaComponent
      },
      {
        path: "elements",
        component: ElementsComponent
      },
      {
        path: "pages",
        component: PagesComponent
      },
      {
        path: "page/:pageId",
        children: [
          { path: "", component: DetailsComponent },
          { path: "section/:sectionId", component: SectionComponent },
          { path: "section/:sectionId/tile/:tileId", component: TileComponent }
        ]
      },
      {
        path: "settings",
        component: SettingsComponent
      }
    ]
  }
];

export const AdminRouting = RouterModule.forChild(adminRoutes);
