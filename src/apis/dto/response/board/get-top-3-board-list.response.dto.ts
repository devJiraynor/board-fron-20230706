import { BoardListItem } from 'types';
import ResponseDto from '..';

export default interface GetTop3BoardListResponseDto extends ResponseDto {

    top3List: BoardListItem[];

}