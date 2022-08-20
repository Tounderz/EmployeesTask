// import React, { createContext } from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import EmployeeStore from './store/EmployeeStore';
// import ErrorStore from './store/ErrorStore';

// export const Context = createContext(null)

// ReactDOM.render(
//   <Context.Provider value={{
//     employee: new EmployeeStore(),
//     error: new ErrorStore()
//   }}>
//   <App />
//   </Context.Provider>,
//   document.getElementById('root')
// );

import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import EmployeeStore from './store/EmployeeStore';
import ErrorStore from './store/ErrorStore';

export const Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Context.Provider value={{
    employee: new EmployeeStore(),
    error: new ErrorStore()
  }}>
  <App />
  </Context.Provider>
);