/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment: '순환 의존성 금지',
      from: {},
      to: {
        circular: true
      }
    },
    {
      name: 'respect-fsd-app',
      comment: 'app -> (pages|widgets|features|entities|shared) 외 금지',
      severity: 'error',
      from: {
        path: '^src/app'
      },
      to: {
        pathNot: '^src/(pages|widgets|features|entities|shared)'
      }
    },
    {
      name: 'respect-fsd-pages',
      comment: 'pages -> (widgets|features|entities|shared) 외 금지',
      severity: 'error',
      from: {
        path: '^src/pages'
      },
      to: {
        pathNot: '^src/(widgets|features|entities|shared)'
      }
    },
    {
      name: 'respect-fsd-widgets',
      comment: 'widgets -> (features|entities|shared) 외 금지',
      severity: 'error',
      from: {
        path: '^src/widgets'
      },
      to: {
        pathNot: '^src/(features|entities|shared)'
      }
    },
    {
      name: 'respect-fsd-features',
      comment: 'features -> (자기 자신|entities|shared) 외 금지',
      severity: 'error',
      from: {
        path: '^src/features'
      },
      to: {
        pathNot: '^src/(features|entities|shared)'
      }
    },
    {
      name: 'respect-fsd-entities',
      comment: 'entities -> (자기 자신|shared) 외 금지',
      severity: 'error',
      from: {
        path: '^src/entities'
      },
      to: {
        pathNot: '^src/(entities|shared)'
      }
    },
    {
      name: 'respect-fsd-shared',
      comment: 'shared -> shared(자기 자신) 외 금지',
      severity: 'error',
      from: {
        path: '^src/shared'
      },
      to: {
        pathNot: '^src/shared'
      }
    },
    {
      name: 'no-direct-shared-import',
      comment: 'shared 모듈은 index.ts(또는 하위 폴더의 index.ts)를 통해서만 import 가능',
      severity: 'error',
      from: {
        pathNot: '^src/shared'
      },
      to: {
        // index.ts가 포함되지 않은 경로이면 forbid
        path: '^src/shared/(?!.*index)'
      }
    }
  ],
  options: {
    doNotFollow: {
      path: 'node_modules'
    },
    includeOnly: '^src',
    tsConfig: {
      fileName: 'tsconfig.json'
    }
  }
};