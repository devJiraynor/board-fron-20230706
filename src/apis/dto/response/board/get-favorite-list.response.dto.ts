import { FavoriteListItem } from 'types';
import ResponseDto from '..';

export default interface GetFavoriteListResponseDto extends ResponseDto {
    favoriteList: FavoriteListItem[];
}