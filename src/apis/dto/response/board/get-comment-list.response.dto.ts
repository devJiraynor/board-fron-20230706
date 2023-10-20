import { CommentListItem } from 'types';
import ResponseDto from '..';

export default interface GetCommentListResponseDto extends ResponseDto {
    commentList: CommentListItem[];
}