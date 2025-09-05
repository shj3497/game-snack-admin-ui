module.exports = {
  v1: {
    input: 'https://admin-api-test.ad.finflow.co.kr/v3/api-docs', //TODO Swagger json 문서 링크
    output: {
      target: './src/lib/service/api-client/client.ts',
      mode: 'tags-split',
      schemas: './src/lib/service/api-client/model',
      client: 'react-query',
      httpClient: 'fetch',
      prettier: true,
      override: {
        mutator: {
          path: './src/lib/service/custom-fetch.client.ts',
          name: 'customFetch',
        },
        query: {
          useQuery: true,
          useSuspenseQuery: true,
        },
        fetch: {
          includeHttpResponseReturnType: false,
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
  v2: {
    input: 'https://admin-api-test.ad.finflow.co.kr/v3/api-docs', //TODO Swagger json 문서 링크
    output: {
      target: './src/lib/service/api-server/client.ts',
      mode: 'tags-split',
      schemas: './src/lib/service/api-server/model',
      client: 'react-query',
      httpClient: 'fetch',
      prettier: true,
      override: {
        mutator: {
          path: './src/lib/service/custom-fetch.server.ts',
          name: 'customFetch',
        },
        query: {
          usePrefetch: true,
        },
        fetch: {
          includeHttpResponseReturnType: false,
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
};
