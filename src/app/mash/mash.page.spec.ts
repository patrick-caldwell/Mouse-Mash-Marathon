import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MashPage } from './mash.page';

describe('MashPage', () => {
  let component: MashPage;
  let fixture: ComponentFixture<MashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MashPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
