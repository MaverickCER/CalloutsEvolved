import Navbar from './ui/Navbar';
import { useSettings } from '../context/SettingsContext';

const Layout = ({ children }) => {
  const { theme } = useSettings();

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        '--bbc': `rgb(${theme.bbc})`,
        '--bcc': `rgb(${theme.bcc})`,
        '--cba': theme.cba,
        '--cbb': theme.cbb,
        '--cbc': theme.cbc,
        '--cbd': theme.cbd,
        '--cbe': theme.cbe,
        '--cbf': theme.cbf,
        '--cca': theme.cca,
        '--ccb': theme.ccb,
        '--ccc': theme.ccc,
        '--ccd': theme.ccd,
        '--cce': theme.cce,
        '--ccf': theme.ccf,
        '--fsz': theme.fsz,
        '--lyt': theme.lyt,
        '--mba': theme.mba,
        '--mbb': theme.mbb,
        '--mbc': theme.mbc,
        '--mbd': theme.mbd,
        '--mca': theme.mca,
        '--mcb': theme.mcb,
        '--mcc': theme.mcc,
        '--mcd': theme.mcd,
        '--mod': theme.mod,
      }}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
