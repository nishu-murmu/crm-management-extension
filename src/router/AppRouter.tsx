import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from '../screens/Home';

const AppRouter = () => {
  return (
    <MemoryRouter initialEntries={['/home']}>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </MemoryRouter>
  );
};

export default AppRouter;
