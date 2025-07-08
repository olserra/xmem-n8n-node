"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMemApi = void 0;
class XMemApi {
    constructor() {
        this.name = 'xMemApi';
        this.displayName = 'xMem API';
        this.documentationUrl = 'https://github.com/your-org/xmem';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                default: '',
                required: true,
                description: 'Your xMem API Key',
            },
            {
                displayName: 'API Base URL',
                name: 'baseUrl',
                type: 'string',
                default: 'https://xmem.xyz/api',
                required: true,
                description: 'Base URL for the xMem API',
            },
        ];
    }
}
exports.XMemApi = XMemApi;
