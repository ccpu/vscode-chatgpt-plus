import { lookup } from 'mime-types';
import * as path from 'path';

export const getFileType = (fileName: string) => {
    const ext = path.parse(fileName).ext;
    const mimeType = lookup(ext);
    if (!mimeType) { return; }

    if (mimeType.includes('/')) { return mimeType.split('/')[1]; };

    return mimeType;
};
