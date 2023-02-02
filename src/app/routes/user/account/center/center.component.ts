import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { Subscription, zip, filter } from 'rxjs';

@Component({
  selector: 'app-account-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProAccountCenterComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private http: _HttpClient, private cdr: ChangeDetectorRef) {}
  @ViewChild('tagInput', { static: false }) private tagInput!: ElementRef<HTMLInputElement>;
  user: any;
  notice: any;
  tabs = [
    {
      key: 'articles',
      tab: '收藏 (8)'
    },
    {
      key: 'applications',
      tab: '关注 (8)'
    },
    {
      key: 'projects',
      tab: '浏览 (8)'
    }
  ];
  pos = 0;
  taging = false;
  tagValue = '';

  ngOnInit(): void {

  }

  to(item: { key: string }): void {
    this.router.navigateByUrl(`/user/account/center/${item.key}`);
  }
  tagShowIpt(): void {
    this.taging = true;
    this.cdr.detectChanges();
    this.tagInput.nativeElement.focus();
  }

  tagBlur(): void {
    const { user, cdr, tagValue } = this;
    if (tagValue && user.tags.filter((tag: { label: string }) => tag.label === tagValue).length === 0) {
      user.tags.push({ label: tagValue });
    }
    this.tagValue = '';
    this.taging = false;
    cdr.detectChanges();
  }

  tagEnter(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      this.tagBlur();
    }
  }

  ngOnDestroy(): void {
    // this.router$.unsubscribe();
  }
}
