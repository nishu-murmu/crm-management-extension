import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SettingLayout from '../components/core/SettingLayout';
import { ROUTES } from '../config/config';
import Generate from '../screens/Generate';
import Home from '../screens/Home';
import { getCurrentRoute } from '../utils/utils';

const AppRouter = () => {
  // Please remove this code after testing.
  useEffect(() => {
    document.querySelector('.btn-bottom-toolbar.text-right')?.remove();
  }, []);

  return (
    <MemoryRouter initialEntries={[getCurrentRoute()]}>
      <SettingLayout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />}></Route>
          <Route path={ROUTES.GENERATE} element={<Generate />}></Route>
        </Routes>
      </SettingLayout>
    </MemoryRouter>
  );
};

export default AppRouter;
