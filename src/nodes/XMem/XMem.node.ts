import { IExecuteFunctions } from 'n8n-workflow';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import axios from 'axios';

export class XMem implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'xMem',
        name: 'xMem',
        icon: 'file:xmem.png',
        group: ['transform'],
        version: 1,
        description: 'Interact with xMem API',
        defaults: {
            name: 'xMem',
        },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        credentials: [
            {
                name: 'xMemApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                options: [
                    { name: 'Session Memory', value: 'sessionMemory' },
                    { name: 'Session', value: 'session' },
                    { name: 'Agent Chat', value: 'agentChat' },
                    { name: 'Vector Source', value: 'vectorSource' },
                    { name: 'Qdrant Query', value: 'qdrantQuery' },
                    { name: 'API Key', value: 'apiKey' },
                ],
                default: 'sessionMemory',
                description: 'The xMem resource to interact with',
            },
            // Session Memory operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                displayOptions: {
                    show: {
                        resource: ['sessionMemory'],
                    },
                },
                options: [
                    { name: 'Add', value: 'add', description: 'Add a new session memory/message' },
                    { name: 'Get', value: 'get', description: 'List all messages for a session or all sessions' },
                ],
                default: 'add',
            },
            {
                displayName: 'Session ID',
                name: 'sessionId',
                type: 'string',
                required: false,
                displayOptions: {
                    show: {
                        resource: ['sessionMemory'],
                    },
                },
                default: '',
                description: 'Session ID to add to or fetch messages for',
            },
            {
                displayName: 'Content',
                name: 'content',
                type: 'string',
                required: false,
                displayOptions: {
                    show: {
                        resource: ['sessionMemory'],
                        operation: ['add'],
                    },
                },
                default: '',
                description: 'Content/message to store in session memory',
            },
            {
                displayName: 'Role',
                name: 'role',
                type: 'options',
                options: [
                    { name: 'User', value: 'user' },
                    { name: 'Assistant', value: 'assistant' },
                ],
                required: false,
                displayOptions: {
                    show: {
                        resource: ['sessionMemory'],
                        operation: ['add'],
                    },
                },
                default: 'user',
                description: 'Role of the message',
            },
            // Sessions operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                displayOptions: {
                    show: {
                        resource: ['session'],
                    },
                },
                options: [
                    { name: 'Create/Update', value: 'createUpdate', description: 'Create or update a session' },
                    { name: 'Get', value: 'get', description: 'Get a session by ID' },
                    { name: 'List', value: 'list', description: 'List all sessions' },
                ],
                default: 'createUpdate',
            },
            {
                displayName: 'Session ID',
                name: 'sessionId',
                type: 'string',
                required: false,
                displayOptions: {
                    show: {
                        resource: ['session'],
                        operation: ['get', 'createUpdate'],
                    },
                },
                default: '',
                description: 'Session ID',
            },
            {
                displayName: 'Metadata',
                name: 'metadata',
                type: 'json',
                required: false,
                displayOptions: {
                    show: {
                        resource: ['session'],
                        operation: ['createUpdate'],
                    },
                },
                default: '',
                description: 'Session metadata as JSON',
            },
            // Agent Chat operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                displayOptions: {
                    show: {
                        resource: ['agentChat'],
                    },
                },
                options: [
                    { name: 'Query', value: 'query', description: 'Query the agent' },
                ],
                default: 'query',
            },
            {
                displayName: 'Input',
                name: 'input',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['agentChat'],
                        operation: ['query'],
                    },
                },
                default: '',
                description: 'Input/query for the agent',
            },
            {
                displayName: 'Session ID',
                name: 'sessionId',
                type: 'string',
                required: false,
                displayOptions: {
                    show: {
                        resource: ['agentChat'],
                        operation: ['query'],
                    },
                },
                default: '',
                description: 'Session ID for context',
            },
            // Vector Source operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                displayOptions: {
                    show: {
                        resource: ['vectorSource'],
                    },
                },
                options: [
                    { name: 'List', value: 'list', description: 'List vector sources' },
                    { name: 'Create', value: 'create', description: 'Create a new vector source' },
                ],
                default: 'list',
            },
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['vectorSource'],
                        operation: ['create'],
                    },
                },
                default: '',
                description: 'Name of the vector source',
            },
            {
                displayName: 'Description',
                name: 'description',
                type: 'string',
                required: false,
                displayOptions: {
                    show: {
                        resource: ['vectorSource'],
                        operation: ['create'],
                    },
                },
                default: '',
                description: 'Description of the vector source',
            },
            // Qdrant Query operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                displayOptions: {
                    show: {
                        resource: ['qdrantQuery'],
                    },
                },
                options: [
                    { name: 'Query', value: 'query', description: 'Query Qdrant vector DB' },
                ],
                default: 'query',
            },
            {
                displayName: 'Query',
                name: 'query',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['qdrantQuery'],
                        operation: ['query'],
                    },
                },
                default: '',
                description: 'Query string for Qdrant',
            },
            // API Key operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                displayOptions: {
                    show: {
                        resource: ['apiKey'],
                    },
                },
                options: [
                    { name: 'Create', value: 'create', description: 'Create an API key' },
                ],
                default: 'create',
            },
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['apiKey'],
                        operation: ['create'],
                    },
                },
                default: '',
                description: 'Name for the API key',
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];
        const credentials = await this.getCredentials('xMemApi');
        const apiKey = credentials.apiKey as string;
        const baseUrl = credentials.baseUrl as string;

        for (let i = 0; i < items.length; i++) {
            const resource = this.getNodeParameter('resource', i) as string;
            let responseData;

            if (resource === 'sessionMemory') {
                // Example: POST /api/session-memory/
                const operation = this.getNodeParameter('operation', i, 'add');
                if (operation === 'add') {
                    const sessionId = this.getNodeParameter('sessionId', i) as string;
                    const content = this.getNodeParameter('content', i) as string;
                    const role = this.getNodeParameter('role', i, 'user') as string;
                    responseData = await axios.post(
                        `${baseUrl}/session-memory/`,
                        { sessionId, content, role },
                        {
                            headers: {
                                'Authorization': `Bearer ${apiKey}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    returnData.push({ json: responseData.data });
                } else if (operation === 'get') {
                    const sessionId = this.getNodeParameter('sessionId', i, '');
                    const url = sessionId ? `${baseUrl}/session-memory/?sessionId=${sessionId}` : `${baseUrl}/session-memory/`;
                    responseData = await axios.get(url, {
                        headers: {
                            'Authorization': `Bearer ${apiKey}`,
                        },
                    });
                    returnData.push({ json: responseData.data });
                }
            } else if (resource === 'session') {
                const operation = this.getNodeParameter('operation', i);
                if (operation === 'createUpdate') {
                    const sessionId = this.getNodeParameter('sessionId', i, '');
                    const metadataParam = this.getNodeParameter('metadata', i, '');
                    let metadataObj = undefined;
                    if (typeof metadataParam === 'string' && metadataParam.trim() !== '') {
                        metadataObj = JSON.parse(metadataParam);
                    }
                    responseData = await axios.post(
                        `${baseUrl}/sessions/`,
                        { sessionId, metadata: metadataObj },
                        {
                            headers: {
                                'Authorization': `Bearer ${apiKey}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    returnData.push({ json: responseData.data });
                } else if (operation === 'get') {
                    const sessionId = this.getNodeParameter('sessionId', i, '');
                    responseData = await axios.get(
                        `${baseUrl}/sessions/${sessionId}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${apiKey}`,
                            },
                        }
                    );
                    returnData.push({ json: responseData.data });
                } else if (operation === 'list') {
                    responseData = await axios.get(
                        `${baseUrl}/sessions/`,
                        {
                            headers: {
                                'Authorization': `Bearer ${apiKey}`,
                            },
                        }
                    );
                    returnData.push({ json: responseData.data });
                }
            } else if (resource === 'agentChat') {
                const operation = this.getNodeParameter('operation', i);
                if (operation === 'query') {
                    const input = this.getNodeParameter('input', i) as string;
                    const sessionId = this.getNodeParameter('sessionId', i, '');
                    responseData = await axios.post(
                        `${baseUrl}/agent-chat/`,
                        { input, sessionId },
                        {
                            headers: {
                                'Authorization': `Bearer ${apiKey}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    returnData.push({ json: responseData.data });
                }
            } else if (resource === 'vectorSource') {
                const operation = this.getNodeParameter('operation', i);
                if (operation === 'list') {
                    responseData = await axios.get(
                        `${baseUrl}/vector-sources/`,
                        {
                            headers: {
                                'Authorization': `Bearer ${apiKey}`,
                            },
                        }
                    );
                    returnData.push({ json: responseData.data });
                } else if (operation === 'create') {
                    const name = this.getNodeParameter('name', i) as string;
                    const description = this.getNodeParameter('description', i, '');
                    responseData = await axios.post(
                        `${baseUrl}/vector-sources/`,
                        { name, description },
                        {
                            headers: {
                                'Authorization': `Bearer ${apiKey}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    returnData.push({ json: responseData.data });
                }
            } else if (resource === 'qdrantQuery') {
                const operation = this.getNodeParameter('operation', i);
                if (operation === 'query') {
                    const query = this.getNodeParameter('query', i) as string;
                    responseData = await axios.get(
                        `${baseUrl}/qdrant-queries/?query=${encodeURIComponent(query)}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${apiKey}`,
                            },
                        }
                    );
                    returnData.push({ json: responseData.data });
                }
            } else if (resource === 'apiKey') {
                const operation = this.getNodeParameter('operation', i);
                if (operation === 'create') {
                    const name = this.getNodeParameter('name', i) as string;
                    responseData = await axios.post(
                        `${baseUrl}/api-keys/`,
                        { name },
                        {
                            headers: {
                                'Authorization': `Bearer ${apiKey}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    returnData.push({ json: responseData.data });
                }
            }
        }
        return [returnData];
    }
} 