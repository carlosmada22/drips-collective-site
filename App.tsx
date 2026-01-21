import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shell from './components/Shell';
import About from './src/pages/About';
import Blog from './src/pages/Blog';
import BlogDetail from './src/pages/BlogDetail';
import Events from './src/pages/Events';
import EventDetail from './src/pages/EventDetail';
import Home from './src/pages/Home';
import Label from './src/pages/Label';
import LabelDetail from './src/pages/LabelDetail';
import Residents from './src/pages/Residents';
import ResidentDetail from './src/pages/ResidentDetail';
import Shop from './src/pages/Shop';
import Tickets from './src/pages/Tickets';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:slug" element={<EventDetail />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="shop" element={<Shop />} />
          <Route path="label" element={<Label />} />
          <Route path="label/:slug" element={<LabelDetail />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path="residents" element={<Residents />} />
          <Route path="residents/:slug" element={<ResidentDetail />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
