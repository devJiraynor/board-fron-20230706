import React from 'react';
import './style.css';
import { CommentListItem } from 'types';
import DefaultProfileImage from 'assets/default-profile-image.png';
import dayjs from 'dayjs';

//          interface: 댓글 리스트 아이템 컴포넌트 Props         //
interface Props {
  commentItem: CommentListItem;
}

//          component: 댓글 리스트 아이템 컴포넌트          //
export default function CommentItem({ commentItem }: Props) {

  //          state: Properties          //
  const { content, profileImage, writeDatetime, nickname } = commentItem;

  //          function: 작성일 경과시간 함수          //
  const getElapsedTime = () => {
    const now = dayjs().add(9, 'hour');
    const writeTime = dayjs(writeDatetime);

    const gap = now.diff(writeTime, 's');
    if (gap < 60) return `${gap}초 전`;
    if (gap < 3600) return `${Math.floor(gap/60)}분 전`;
    if (gap < 86400) return `${Math.floor(gap/3600)}시간 전`;
    return `${Math.floor(gap/86400)}일 전`;
  };

  //          render: 댓글 리스트 아이템 컴포넌트 렌더링          //
  return (
    <div className='comment-list-item-box'>
      <div className='comment-list-item-top'>
        <div className='comment-list-item-profile-box'>
          <div className='comment-list-item-profile-image' style={{ backgroundImage: `url(${profileImage ? profileImage : DefaultProfileImage})` }}></div>
        </div>
        <div className='comment-list-item-nickname'>{nickname}</div>
        <div className='comment-list-item-divider'>{'\|'}</div>
        <div className='comment-list-item-time'>{getElapsedTime()}</div>
      </div>
      <div className='comment-list-item-main'>
        <div className='comment-list-item-contents'>{content}</div>
      </div>
    </div>
  )
}
