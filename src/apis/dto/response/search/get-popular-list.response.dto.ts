import ResponseDto from '..';

export default interface GetPopularListResponseDto extends ResponseDto {
    popularWordList: string[];
}