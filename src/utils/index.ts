import dayjs from 'dayjs';

export const convertUrlsToFiles = async (urls: string[]) => {
    const files = [];
    for (let index = 0; index < urls.length; index++) {
        const file = await convertUrlToFile(urls[index]);
        files.push(file);
    }
    return files;
};

export const convertUrlToFile = async (url: string) => {
    const response = await fetch(url);
    const data = await response.blob();
    const extd = url.split('.').pop();
    const fileName = url.split('/').pop();
    const meta = { type: `image/${extd}` };

    return new File([data], fileName as string, meta);    
};

export const getWriteDatetimeFormat = (writeDatetime: string | undefined) => {
    if (!writeDatetime) return '';
    const date = dayjs(writeDatetime);
    return date.format('YYYY. MM. DD.');
};

export const cutString = (str: string | undefined, size: number) => {
    if (!str) return '';
    return str.length > size ? str.substring(0, size) + '...' : str;
};