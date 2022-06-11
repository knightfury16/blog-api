import { makeReadme, API } from './apiToReadme';
import * as path from 'path';
import { userRoute } from './userRoute';
import { blogRoute } from './blogRoute';

const apis: API[] = [...userRoute, ...blogRoute];
makeReadme(apis, {
  readmePath: path.join(__dirname, '../README.md'),
  startComment: 'api-start',
  endComment: 'api-end'
});
