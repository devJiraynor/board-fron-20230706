import { BoardListItem } from 'types';
import ResponseDto from '..';

export default interface GetLatestBoardListResponseDto extends ResponseDto {
    latestList: BoardListItem[];
}