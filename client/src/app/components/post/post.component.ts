import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/app/services/resource.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  @Input() currentUserId!: number;

  editMode: boolean = false;
  invalid: boolean = false;

  form!:FormGroup;

  updateSubscription?: Subscription;
  deleteSubscription?: Subscription;

  constructor(
    private resourceService: ResourceService, 
    private formBuilder: FormBuilder, 
    private date: DatePipe, 
    private router: Router
    ) { }

  createForm() {
    this.form = this.formBuilder.group({
      title: [this.post.title, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      content: [this.post.content, [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
      })
  }

  ngOnInit(): void {
    this.post.created_at = this.date.transform(this.post.created_at, 'short')!;
    this.post.updated_at = this.date.transform(this.post.updated_at, 'short')!;
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

    this.updateSubscription = this.resourceService.updatePost(this.post.post_id, this.form.value)
    .subscribe(() => { 
      this.editMode = false; 
      this.ngOnInit(); 
    });
  }

  editPost() {
    this.editMode = true;
    this.createForm();
  }

  deletePost() {
    this.deleteSubscription = this.resourceService.deletePost(this.post.post_id)
    .subscribe(() => window.location.reload());
  }

  isThisPostFromThisUser(): boolean {
    if (this.post.author_id === this.currentUserId) {
      return true;
    }
    return false;
  }

  isProfile(): boolean {
    if (this.router.url === '/profile') {
      return true;
    }
    return false;
  }

  isHomepage(): boolean {
    if (this.router.url === '/') {
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    this.updateSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
  }

}
