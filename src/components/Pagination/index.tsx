import React, { Dispatch, SetStateAction } from 'react';
import './style.css';

//          interface: 페이지네이션 컴포넌트 Properties         //
interface Props {
  currentPageNumber: number;
  currentSectionNumber: number;
  setCurrentPageNumber: Dispatch<SetStateAction<number>>;
  setCurrentSectionNumber: Dispatch<SetStateAction<number>>;

  viewPageNumberList: number[];
  totalSection: number;
}

//          component: 페이지네이션 컴포넌트          //
export default function Pagination(props: Props) {

  //          state: Properties          //
  const { currentPageNumber, currentSectionNumber, setCurrentPageNumber, setCurrentSectionNumber } = props;
  const { viewPageNumberList, totalSection } = props;

  //          event handler: 페이지 번호 클릭 이벤트 처리          //
   const onPageNumberClickHandler = (pageNumber: number) => {
    setCurrentPageNumber(pageNumber);
  }
  //          event handler: 다음 버튼 클릭 이벤트 처리          //
  const onNextButtonClickHandler = () => {
    if (currentSectionNumber === totalSection) {
      alert('마지막 섹션입니다.');
      return;
    }
    setCurrentPageNumber(currentSectionNumber * 10 + 1);
    setCurrentSectionNumber(currentSectionNumber + 1);
  }
  //          event handler: 이전 버튼 클릭 이벤트 처리          //
  const onPreviousButtonClickHandler = () => {
    if (currentSectionNumber === 1) {
      alert('첫번째 섹션입니다.');
      return;
    }
    setCurrentPageNumber((currentSectionNumber - 1) * 10);
    setCurrentSectionNumber(currentSectionNumber - 1);
  }

  //          render: 페이지네이션 컴포넌트 렌더링          //
  return (
    <div className='pagination-container'>
      <div className='pagination-change-link-box' onClick={onPreviousButtonClickHandler}>
        <div className='pagination-change-link-icon-box'>
          <div className='left-light-icon'></div>
        </div>
        <div className='pagination-change-link-text'>{'이전'}</div>
      </div>
      <div className='pagination-divider'>{'\|'}</div>
      { viewPageNumberList.map(pageNumber => pageNumber === currentPageNumber ? <div className='pagination-active-text'>{pageNumber}</div> : <div className='pagination-text' onClick={() => onPageNumberClickHandler(pageNumber)}>{pageNumber}</div>) }
      <div className='pagination-divider'>{'\|'}</div>
      <div className='pagination-change-link-box' onClick={onNextButtonClickHandler}>
        <div className='pagination-change-link-text'>{'다음'}</div>
        <div className='pagination-change-link-icon-box'>
          <div className='right-light-icon'></div>
        </div>
      </div>
    </div>
  );
}
