import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class XMemApi implements ICredentialType {
    name = 'xMemApi';
    displayName = 'xMem API';
    documentationUrl = 'https://github.com/your-org/xmem';
    properties: INodeProperties[] = [
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