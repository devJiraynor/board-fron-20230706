import React from 'react';
import './style.css';
import { BoardListItem } from 'types';
import DefaultProfileImage from 'assets/default-profile-image.png';
import { useNavigate } from 'react-router-dom';
import { BOARD_DETAIL_PATH } from 'constant';
import { cutString, getWriteDatetimeFormat } from 'utils';

//          interface: Top3 리스트 아이템 컴포넌트 Props         //
interface Props {
  boardItem: BoardListItem
}

//          component: Top3 리스트 아이템 컴포넌트         //
export default function Top3ListItem({ boardItem }: Props) {

  //          state: Properties         //
  const { boardNumber, title, content, boardTitleImage } = boardItem;
  const { viewCount, commentCount, favoriteCount } = boardItem;
  const { writeDatetime, writerNickname, writerProfileImage } = boardItem;

  //          function: 네이비게이트 함수         //
  const navigator = useNavigate();

  //          event handler: Card Click 이벤트 처리 함수         //
  const onCardClickHandler = () => {
    navigator(BOARD_DETAIL_PATH(boardNumber));
  };

  //          render: Top3 리스트 아이템 컴포넌트 렌더링         //
  return (
    <div className='top3-list-item-card' style={{ backgroundImage: `url(${boardTitleImage})` }} onClick={onCardClickHandler} >
      <div className='top3-list-item-main-box'>
        <div className='top3-list-item-top'>
          <div className='top3-list-item-profile-box'>
            <div className='top3-list-item-profile-image' style={{ backgroundImage: `url(${writerProfileImage ? writerProfileImage : DefaultProfileImage})` }}></div>
          </div>
          <div className='top3-list-item-write-box'>
            <div className='top3-list-item-nickname'>{writerNickname}</div>
            <div className='top3-list-item-write-date'>{getWriteDatetimeFormat(writeDatetime)}</div>
          </div>
        </div>
        <div className='top3-list-item-middle'>
          <div className='top3-list-item-title'>{cutString(title, 25)}</div>
          <div className='top3-list-item-contents'>{cutString(content, 40)}</div>
        </div>
        <div className='top3-list-item-bottom'>
          <div className='top3-list-item-counts'>
            {`댓글 ${commentCount} · 좋아요 ${favoriteCount} · 조회수 ${viewCount}`}
          </div>
        </div>
      </div>
    </div>
  )
}
