import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';

import { CalendarDialogComponent } from './calendar-dialog.component';

describe('CalendarDialogComponent', () => {
  let component: CalendarDialogComponent;
  let fixture: ComponentFixture<CalendarDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, BrowserModule, MatDialogModule],
      declarations: [CalendarDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CalendarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#getHours', () => {
    it('should return 60h', () => {
      expect(component.getHours(3600)).toEqual('60h');
    });
    it('should return 1m', () => {
      expect(component.getHours(1)).toEqual('1m');
    });
    it('should return 60h 1m', () => {
      expect(component.getHours(3601)).toEqual('60h 1m');
    });
  });

  describe('#getFlightClass', () => {
    it('should return Economy class', () => {
      expect(component.getFlightClass(0)).toEqual('Economy class');
    });
    it('should return Business class', () => {
      expect(component.getFlightClass(1)).toEqual('Business class');
    });
    it('should return First class', () => {
      expect(component.getFlightClass(2)).toEqual('First class');
    });
  });
});
