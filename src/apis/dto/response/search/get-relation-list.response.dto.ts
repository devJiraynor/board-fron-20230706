import ResponseDto from '..';

export default interface GetRelationListResponseDto extends ResponseDto {
    relativeWordList: string[];
}