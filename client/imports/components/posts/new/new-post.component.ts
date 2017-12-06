import { Component, Input, Output, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { Meteor } from 'meteor/meteor';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NewPostComponent),
  multi: true
};

@Component({
  selector: 'new-post',
  templateUrl: 'new-post.html',
  styleUrls: ['new-post.scss'],
  inputs: ['content', 'onSubmit'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class NewPostComponent implements OnInit, ControlValueAccessor {

  protected innerContent: string = '';

  @Input() onSubmit: Function;
  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  ngOnInit() {
  }

  submit() {
    this.onSubmit();
  }

  get value(): any {
    return this.innerContent;
  };

  set value(v: any) {
    if (v !== this.innerContent) {
      this.innerContent = v;
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerContent) {
      this.innerContent = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}