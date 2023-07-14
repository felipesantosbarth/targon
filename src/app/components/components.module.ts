import { NgModule } from '@angular/core';

import { RoleListComponent } from './role-list/role-list.component';

@NgModule({
	declarations:[RoleListComponent],
	exports: [RoleListComponent]
})
export class ComponentsModule {}