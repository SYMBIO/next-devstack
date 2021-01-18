import { UAParser as Parser } from 'ua-parser-js';
import { NextApiRequest } from 'next';

export default function isMobile(req?: NextApiRequest) {
    let userAgent: IUAParser.IResult;

    if (req) {
        //SSR request is present
        userAgent = (new Parser(req.headers['user-agent'] || '') as unknown) as IUAParser.IResult;
    } else {
        // check only on clientside no request present
        userAgent = new Parser().getResult();
    }

    return userAgent?.device?.type === 'mobile';
}
