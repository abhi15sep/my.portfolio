import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { pendingTasksReducer as pendingTasks } from 'react-redux-spinner';
import locale from './locale';
import projects from './projects';

export default combineReducers({
  routing: routerReducer,
  pendingTasks,
  locale,
  projects
});
