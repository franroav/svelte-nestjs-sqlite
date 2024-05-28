import { CORRELATION_ID_KEY } from './../middleware/correlation-id.middleware';

export const loggerOptions = {
    pinoHttp: {
        autoLogging: true,
        redact: ['req.headers.authorization', 'req.headers.cookie'], // redact authorization and cookie from request headers
        customProps: function (req) {
            return {
                correlationId: req.headers[CORRELATION_ID_KEY],
            };
        },
        formatters: {
            level: (label) => {
                return { level: label };
            },
        },
    },
};