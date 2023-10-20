import { BoardListItem } from 'types';
import ResponseDto from '..';

export default interface GetUserBoardListResponseDto extends ResponseDto {
    userBoardList: BoardListItem[];
}