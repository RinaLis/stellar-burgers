import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTZiMmE2ZDgyOWJlMDAxYzc3Nzg5OCIsImlhdCI6MTczMDI4MDU1NSwiZXhwIjoxNzMwMjgxNzU1fQ.pTD__u6BJdkRr-bz35lXr6VcFqPspLACAjGdEIBF1xs',
    refreshToken: 'e24fe3f2b3d2a401eee510a6206bb9e7831ffbf65fbbb79b934b4b13e4d5c59dcf02dce0662212c6',
  }
});