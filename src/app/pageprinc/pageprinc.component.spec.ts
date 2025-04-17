import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageprincComponent } from './pageprinc.component';

describe('PageprincComponent', () => {
  let component: PageprincComponent;
  let fixture: ComponentFixture<PageprincComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageprincComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageprincComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
