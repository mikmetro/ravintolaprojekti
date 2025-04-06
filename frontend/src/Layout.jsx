import {Outlet} from 'react-router-dom';
import Header from './components/Header';

const Layout = () => (
  <div>
    <Header />
    <main>
      <Outlet /> {/* Child routes render here */}
    </main>
    <footer>{/* Footer content */}</footer>
  </div>
);

export default Layout;
