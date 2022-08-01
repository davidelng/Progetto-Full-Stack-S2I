import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourceService } from 'src/app/services/resource.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  form!:FormGroup;
  invalid: boolean = false;

  @Input() userId!: number;

  @Output() submitted: EventEmitter<boolean> = new EventEmitter();

  postSubscription?: Subscription;

  constructor(private formBuilder: FormBuilder, private resourceService: ResourceService) { }

  createForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      content: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(500)]],
      author_id: [this.userId, [Validators.required]],
      })
  }

  ngOnInit(): void {
    this.createForm();
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      this.invalid = true;
      return;
    }
    this.invalid = false;

    this.postSubscription = this.resourceService.createPost(this.form.value)
    .subscribe(() => { this.submitted.emit(true); this.ngOnInit();  });
  }

  ngOnDestroy() {
    this.postSubscription?.unsubscribe();
  }

}
