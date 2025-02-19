import { Component, inject, WritableSignal } from '@angular/core';
import { LikeService } from '../_services/like.service';
import { default_pageSizeOption, default_paginator, Paginator, UserQueryPagination } from '../_models/pagination';
import { User } from '../_models/user';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MemberCardComponent } from '../member/member-card/member-card.component';


@Component({
  selector: 'app-following',
  imports: [MemberCardComponent, MatIconModule, MatButtonModule, MatSelectModule, MatPaginatorModule, MatExpansionModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './following.component.html',
  styleUrl: './following.component.scss'
})
export class FollowingComponent {
  private likeService = inject(LikeService)
  following: WritableSignal<Paginator<UserQueryPagination, User>>
  // paginator: WritableSignal<Paginator<UserQueryPagination, User>>
  pageSize = default_pageSizeOption

  onPageChange(event: PageEvent) {
    const copyPaginator = this.following()
    copyPaginator.pagination.currentPage = event.pageIndex + 1
    copyPaginator.pagination.pageSize = event.pageSize
    this.following.set(copyPaginator)

    this.onSearch()
  }

  constructor() {
    this.following = this.likeService.following
  }

  async onSearch() {
    this.likeService.getFollowing()
  }

  ngOnInit(): void {
    this.onSearch()
  }
  onResetSearch() {
    this.following.set(default_paginator)
    this.onSearch()
  }
}
