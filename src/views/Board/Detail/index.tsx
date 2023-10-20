import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import './style.css';
import DefaultProfileImage from 'assets/default-profile-image.png';
import { Board, CommentListItem, FavoriteListItem } from 'types';
import { useNavigate, useParams } from 'react-router-dom';
import { boardMock, commentListMock, favoriteListMock } from 'mocks';
import { useUserStore } from 'stores';
import { usePagination } from 'hooks';
import CommentItem from 'components/CommentItem';
import Pagination from 'components/Pagination';
import { AUTH_PATH, BOARD_UPDATE_PATH, MAIN_PATH, USER_PATH } from 'constant';
import { deleteBoardRequest, getBoardRequest, getCommentListRequest, getFavoriteListRequest, increaseViewCountRequest, postCommentRequest, putFavoriteRequest } from 'apis';
import { GetBoardResponseDto, GetCommentListResponseDto, GetFavoriteListResponseDto } from 'apis/dto/response/board';
import ResponseDto from 'apis/dto/response';
import { useCookies } from 'react-cookie';
import { PostCommentRequestDto } from 'apis/dto/request/board';
import dayjs from 'dayjs';

//          component: 게시물 상세보기 페이지          //
export default function BoardDetail() {

  //          state: 게시물 번호 path variable 상태          //
  const { boardNumber } = useParams();
  //          state: 로그인 유저 상태          //
  const { user } = useUserStore();
  //          state: cookie 상태          //
  const [cookies, setCookie] = useCookies();
  
  //          function: 네비게이트 함수          //
  const navigator = useNavigate();
  //          function: increase view count response 처리 함수          //
  const increaseViewCountResponse = (code: string) => {
    if (code === 'NB') alert('존재하지 않는 게시물입니다.');
    if (code === 'DBE') alert('데이터베이스 오류입니다.');
  };
  
  //          component: 게시물 상세보기 상단 컴포넌트          //
  const BoardDetailTop = () => {
    //          state: 작성자 상태          //
    const [isWriter, setWriter] = useState<boolean>(false);
    //          state: more button 상태          //
    const [showMore, setShowMore] = useState<boolean>(false);
    //          state: 게시물 상태          //
    const [board, setBoard] = useState<Board | null>(null);

    //          function: 작성일 포멧 변경 함수          //
    const getWriteDatetimeFormat = (writeDatetime: string | undefined) => {
      if (!writeDatetime) return '';
      const date = dayjs(writeDatetime);
      return date.format('YYYY. MM. DD.');
    };
    //          function: get board response 처리 함수          //
    const getBoardResponse = (responseBody: GetBoardResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') {
        navigator(MAIN_PATH);
        return;
      }

      const board: Board = { ...responseBody as GetBoardResponseDto };
      setBoard(board);

      if (!user) return;
      const isWriter = user.email === board.writerEmail;
      setWriter(isWriter);
    };

    //          function: delete board response 처리 함수          //
    const deleteBoardResponse = (code: string) => {
      if (code === 'VF') alert('잘못된 접근입니다.');
      if (code === 'NU' || code === 'AF') {
        navigator(AUTH_PATH);
        return;
      } 
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'NP') alert('권한이 없습니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      navigator(MAIN_PATH);
    }

    //          event handler: 작성자 클릭 이벤트 처리          //
    const onNicknameClickHandler = () => {
      if (!board) return;
      navigator(USER_PATH(board.writerEmail));
    };

    //          event handler: more button 클릭 이벤트 처리          //
    const onMoreButtonClickHandler = () => {
      setShowMore(!showMore);
    };
    //          event handler: 수정 버튼 클릭 이벤트 처리          //
    const onUpdateButtonClickHandler = () => {
      if (!boardNumber) return;
      navigator(BOARD_UPDATE_PATH(boardNumber));
    };
    //          event handler: 삭제 버튼 클릭 이벤트 처리          //
    const onDeleteButtonClickHandler = () => {
      const accessToken = cookies.accessToken;
      if (!boardNumber || !accessToken) return;
      deleteBoardRequest(boardNumber, accessToken).then(deleteBoardResponse);
    };

    //          effect: 게시물 번호 path variable이 바뀔때 마다 게시물 불러오기          //
    useEffect(() => {
      if (!boardNumber) {
        alert('잘못된 접근입니다.');
        navigator(MAIN_PATH);
        return;
      }
      getBoardRequest(boardNumber).then(getBoardResponse);
    }, []);

    //          render: 게시물 상세보기 상단 컴포넌트 렌더링          //
    return (
      <div id='board-detail-top'>
        <div className='board-detail-top-header'>
          <div className='board-detail-title'>{board?.title}</div>
          <div className='board-detail-sub-box'>
            <div className='board-detail-write-info-box'>
              <div className='board-detail-writer-profile-image' style={{ backgroundImage: `url(${board?.writerProfileImage ? board.writerProfileImage : DefaultProfileImage})` }}></div>
              <div className='board-detail-writer-nickname' onClick={onNicknameClickHandler}>{board?.writerNickname}</div>
              <div className='board-detail-info-divider'>{'\|'}</div>
              <div className='board-detail-write-date'>{getWriteDatetimeFormat(board?.writeDatetime)}</div>
            </div>
            {isWriter && (
            <div className='icon-button' onClick={onMoreButtonClickHandler}>
              <div className='more-icon'></div>
            </div>
            )}
            {showMore && (
            <div className='more-box'>
              <div className='more-update-button' onClick={onUpdateButtonClickHandler}>{'수정'}</div>
              <div className='divider'></div>
              <div className='more-delete-button' onClick={onDeleteButtonClickHandler}>{'삭제'}</div>
            </div>
            )}
          </div>
        </div>
        <div className='divider'></div>
        <div className='board-detail-top-main'>
          <div className='board-detail-main-text'>{board?.content}</div>
          { board?.boardImageList.map(boardImage => <img className='board-detail-main-image' src={boardImage} />) }
        </div>
      </div>
    )
  };
  //          component: 게시물 상세보기 하단 컴포넌트          //
  const BoardDetailBottom = () => {

    //          state: 댓글 textarea 참조 상태          //
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    //          state: 좋아요 리스트 상태          //
    const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
    //          state: 댓글 리스트 페이지네이션 상태          //
    const {currentPageNumber, setCurrentPageNumber, currentSectionNumber, setCurrentSectionNumber, viewBoardList, viewPageNumberList, totalSection, setBoardList} = usePagination<CommentListItem>(3);
    //          state: 댓글 갯수 상태          //
    const [commentsCount, setCommentsCount] = useState<number>(0);

    //          state: 좋아요 박스 상태          //
    const [showFavorite, setShowFavorite] = useState<boolean>(false);
    //          state: 댓글 박스 상태          //
    const [showComments, setShowComments] = useState<boolean>(false);
    //          state: 좋아요 상태          //
    const [isFavorite, setFavorite] = useState<boolean>(false);
    //          state: 댓글 상태          //
    const [comment, setComment] = useState<string>('');

    //           function: get favorite list response 처리 함수          //
    const getFavoriteListResponse = (responseBody: GetFavoriteListResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { favoriteList } = responseBody as GetFavoriteListResponseDto;
      setFavoriteList(favoriteList);

      const isFavorite = favoriteList.findIndex(item => item.email === user?.email) !== -1;
      setFavorite(isFavorite);
    };
    //           function: get comment list response 처리 함수          //
    const getCommentListResponse = (responseBody: GetCommentListResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { commentList } = responseBody as GetCommentListResponseDto;
      setBoardList(commentList);
      setCommentsCount(commentList.length);
    };
    //           function: put favorite response 처리 함수          //
    const putFavoriteResponse = (code: string) => {
      if (code === 'VF') alert('잘못된 접근입니다.');
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'AF') alert('인증에 실패했습니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      if (!boardNumber) return;
      getFavoriteListRequest(boardNumber).then(getFavoriteListResponse);
    }
    //           function: post comment response 처리 함수          //
    const postCommentResponse = (code: string) => {
      if (code === 'VF') alert('잘못된 접근입니다.');
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'AF') alert('인증에 실패했습니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      setComment('');
      if (!boardNumber)  return;
      getCommentListRequest(boardNumber).then(getCommentListResponse);
    }

    //           event handler: 좋아요 박스 보기 버튼 클릭 이벤트 처리          //
    const onShowFavoriteButtonClickHandler = () => {
      setShowFavorite(!showFavorite);
    }
    //           event handler: 댓글 박스 보기 버튼 클릭 이벤트 처리          //
    const onShowCommentsButtonClickHandler = () => {
      setShowComments(!showComments);
    }
    //           event handler: 좋아요 버튼 클릭 이벤트 처리          //
    const onFavoriteButtonClickHandler = () => {
      const accessToken = cookies.accessToken;
      if (!accessToken) {
        alert('로그인시 이용가능합니다.');
        return;
      }
      if (!boardNumber) return;

      putFavoriteRequest(boardNumber, accessToken).then(putFavoriteResponse);
    }
    //           event handler: 댓글 작성 버튼 클릭 이벤트 처리          //
    const onCommentButtonClickHandler = () => {
      const accessToken = cookies.accessToken;
      if (!accessToken) {
        alert('로그인이 필요합니다.');
        return;
      }
      if (!boardNumber) return;

      const requestBody: PostCommentRequestDto = {
        content: comment
      };

      postCommentRequest(requestBody, boardNumber, accessToken).then(postCommentResponse);
    }

    //           event handler: 댓글 변경 이벤트 처리          //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const comment = event.target.value;
      setComment(comment);
      // description: textarea 내용이 바뀔때마다 높이 변경 //
      if (!textareaRef.current) return;
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    //          effect: 게시물 번호 path variable이 바뀔때 마다 좋아요 및 댓글 리스트 불러오기          //
    useEffect(() => {
      if (!boardNumber) {
        alert('잘못된 접근입니다.');
        navigator(MAIN_PATH);
        return;
      }
      getFavoriteListRequest(boardNumber).then(getFavoriteListResponse);
      getCommentListRequest(boardNumber).then(getCommentListResponse);
    }, [boardNumber]);

    //          render: 게시물 상세보기 하단 컴포넌트 렌더링          //
    return (
      <div id='board-detail-bottom'>
        <div className='board-detail-bottom-button-box'>
          <div className='board-detail-bottom-button-group'>
            <div className='icon-button' onClick={onFavoriteButtonClickHandler}>
              {isFavorite ? (<div className='favorite-fill-icon'></div>) : (<div className='favorite-light-icon'></div>)}
            </div>
            <div className='board-detail-bottom-button-text'>{`좋아요 ${favoriteList.length}`}</div>
            <div className='icon-button' onClick={onShowFavoriteButtonClickHandler}>
              {showFavorite ? (<div className='up-light-icon'></div>) : (<div className='down-light-icon'></div>)}
            </div>
          </div>
          <div className='board-detail-bottom-button-group'>
            <div className='icon-box'>
              <div className='comment-light-icon'></div>
            </div>
            <div className='board-detail-bottom-button-text'>{`댓글 ${commentsCount}`}</div>
            <div className='icon-button' onClick={onShowCommentsButtonClickHandler}>
              {showComments ? (<div className='up-light-icon'></div>) : (<div className='down-light-icon'></div>)}
            </div>
          </div>
        </div>
        {showFavorite && (
        <div className='board-detail-bottom-favorite-box'>
          <div className='board-detail-bottom-favorite-container'>
            <div className='board-detail-bottom-favorite-title'>{'좋아요 '}<span className='emphasis'>{favoriteList.length}</span></div>
            <div className='board-detail-bottom-favorite-contents'>
              {favoriteList.map(favoriteItem => (
              <div className='board-detail-bottom-favorite-item'>
                <div className='board-detail-bottom-favorite-profile-image' style={{ backgroundImage: `url(${favoriteItem.profileImage ? favoriteItem.profileImage : DefaultProfileImage})` }}></div>
                <div className='board-detail-bottom-favorite-nickname'>{favoriteItem.nickname}</div>
              </div>
              ))}
            </div>
          </div>
        </div>
        )}
        {showComments && (
        <div className='board-detail-bottom-comments-box'>
          <div className='board-detail-bottom-comments-container'>
            <div className='board-detail-bottom-comments-list-container'>
              <div className='board-detail-bottom-comments-list-title'>{'댓글 '}<span className='emphasis'>{commentsCount}</span></div>
              <div className='board-detail-bottom-comments-list-contents'>
                {viewBoardList.map(commentItem => <CommentItem commentItem={commentItem} />)}
              </div>
            </div>
          </div>
          <div className='divider'></div>
          <div className='board-detail-bottom-comments-pagination-box'>
            <Pagination 
              currentPageNumber={currentPageNumber}
              currentSectionNumber={currentSectionNumber}
              setCurrentPageNumber={setCurrentPageNumber}
              setCurrentSectionNumber={setCurrentSectionNumber}
              totalSection={totalSection}
              viewPageNumberList={viewPageNumberList}
            />
          </div>
          {user !== null && (
          <div className='board-detail-bottom-comments-input-box'>
            <div className='board-detail-bottom-comments-input-container'>
              <textarea ref={textareaRef} className='board-detail-bottom-comments-input' placeholder='댓글을 작성해주세요.' value={comment} onChange={onCommentChangeHandler} />
              <div className='board-detail-bottom-comments-button-box'>
                {comment.length === 0 ? (<div className='board-detail-bottom-comments-button-disable'>{'댓글달기'}</div>) : (<div className='board-detail-bottom-comments-button' onClick={onCommentButtonClickHandler}>{'댓글달기'}</div>)}
              </div>
            </div>
          </div>
          )}
        </div>
        )}
      </div>
    )
  };

  //          effect: 첫 렌더시 실행할 함수          //
  let effectFlag = true;
  useEffect(() => {

    if (effectFlag) {
      effectFlag = false;
      return;
    }
    
    if (!boardNumber) return;
    increaseViewCountRequest(boardNumber).then(increaseViewCountResponse);

  }, []);

  //          render: 게시물 상세보기 페이지 렌더링          //
  return (
    <div id='board-detail-wrapper'>
      <div className='board-detail-container'>
        <BoardDetailTop />
        <BoardDetailBottom />
      </div>
    </div>
  )
}
