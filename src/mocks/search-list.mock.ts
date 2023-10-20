import { BoardListItem } from 'types';
import currentBoardListMock from './current-board-list.mock';

const searchListMock = (word: string): BoardListItem[] => {
    const list = currentBoardListMock.filter(boardItem => boardItem.title.includes(word) || boardItem.content.includes(word));
    return list;
}

export default searchListMock;