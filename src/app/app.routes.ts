import {Routes} from '@angular/router';
import  {TagsComponent} from '../app/tags/tags.component'; 
import { PageprincComponent } from '../app/pageprinc/pageprinc.component';

export const routes: Routes = [
    {path:'tags', component: TagsComponent},
    {path:'', component: PageprincComponent}
];
