import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';

import { Dashboard, Edit, Home, New } from './pages';

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new" element={<New />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Switch>
    </BrowserRouter>
  );
}
