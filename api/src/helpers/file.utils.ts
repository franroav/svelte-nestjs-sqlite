import {extname, join} from 'path';

export const csvFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(csv)$/)) {
        return callback(new Error('Only CSV files are allowed!'), false);
    }
    callback(null, true);
};

export const csvFileName = (req, file, callback) => {
    //const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    callback(null, `data${fileExtName}`);
};

export const getCSVFile = () => {
    //const name = file.originalname.split('.')[0];
    const filePath = join(__dirname, "..", "..", "uploads/csv", "data.csv");
    return filePath;
};

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};