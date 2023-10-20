import { BoardListItem } from 'types';
import ResponseDto from '..';

export default interface GetSearchBoardListResponseDto extends ResponseDto {
    searchList: BoardListItem[];
}