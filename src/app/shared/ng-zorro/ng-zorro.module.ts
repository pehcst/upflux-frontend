import { NgModule } from '@angular/core';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@NgModule({
  exports: [
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzCardModule,
    NzGridModule,
    NzModalModule,
    NzFormModule,
    NzIconModule,
    NzDividerModule,
  ],
})
export class NgZorroModule {}
