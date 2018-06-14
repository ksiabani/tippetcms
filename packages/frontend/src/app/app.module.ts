import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { NgxsModule } from "@ngxs/store";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AdminSectionModule } from "./admin-section/admin-section.module";
import { NormalSectionModule } from "./normal-section/normal-section.module";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";
import { PostsState } from "./normal-section/stores/posts.state";

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AdminSectionModule,
    AdminSectionModule,
    NormalSectionModule,
    AppRoutingModule,
    NgxsModule.forRoot([PostsState]),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
