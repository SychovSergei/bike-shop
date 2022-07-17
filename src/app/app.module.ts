import {NgModule} from '@angular/core';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {initializeApp,provideFirebaseApp} from '@angular/fire/app';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {provideAuth,getAuth} from '@angular/fire/auth';
import {provideDatabase,getDatabase} from '@angular/fire/database';
import {provideFirestore,getFirestore} from '@angular/fire/firestore';
import {provideFunctions,getFunctions} from '@angular/fire/functions';
import {provideRemoteConfig,getRemoteConfig} from '@angular/fire/remote-config';
import {provideStorage,getStorage} from '@angular/fire/storage';
import {SharedModule} from "./shared/shared.module";

import {AuthService} from "./shared/services/auth.service";
import {AuthGuard} from "./shared/services/auth.guard";
import {RoleGuard} from "./shared/services/role.guard";

import {CardDiscountPipe} from "./shared/pipes/card-discount.pipe";
import {ContactPageModule} from "./contact-page/contact-page.module";
import {ContactPageComponent} from './contact-page/contact-page.component';
import {CreateProductPageComponent} from './create-product-page/create-product-page.component';
import {CreateProductPageModule} from "./create-product-page/create-product-page.module";
import {EditProductPageComponent} from './edit-product-page/edit-product-page.component';
import {FooterComponent} from './shared/components/main-layout/footer/footer.component';
import {HeaderComponent} from './shared/components/main-layout/header/header.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {LimitCharPipe} from "./shared/pipes/limit-char.pipe";
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {NavigationComponent} from './shared/components/navigation/navigation.component';
import {OrderPageComponent} from './order-page/order-page.component';
import {OrderPageModule} from "./order-page/order-page.module";
import {ProductCardComponent} from './shared/components/product-card/product-card.component';
import {ProductDetailsPageComponent} from './product-details-page/product-details-page.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {RelatedLinksComponent} from './shared/components/related-links/related-links.component';
import {ReplacePipe} from "./shared/pipes/replace.pipe";
import {StarRatesComponent} from './shared/components/star-rates/star-rates.component';
import {SignupPageComponent} from './signup-page/signup-page.component';

import {DialogModule} from "primeng/dialog";
import {PasswordModule} from "primeng/password";
import {RadioButtonModule} from 'primeng/radiobutton';
import {TabViewModule} from "primeng/tabview";
import {TooltipModule} from "primeng/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    CardDiscountPipe,
    ContactPageComponent,
    CreateProductPageComponent,
    EditProductPageComponent,
    HeaderComponent,
    RelatedLinksComponent,
    FooterComponent,
    LimitCharPipe,
    LoginPageComponent,
    MainLayoutComponent,
    NavigationComponent,
    OrderPageComponent,
    ProductCardComponent,
    ProductDetailsPageComponent,
    ProductPageComponent,
    ReplacePipe,
    SignupPageComponent,
    StarRatesComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ContactPageModule,
    CreateProductPageModule,
    DialogModule,
    FontAwesomeModule,
    PasswordModule,
    OrderPageModule,
    RadioButtonModule,
    TabViewModule,
    TooltipModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    AuthService,
    AuthGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
