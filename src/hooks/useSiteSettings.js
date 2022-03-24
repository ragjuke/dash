import { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';

// ----------------------------------------------------------------------

const useSiteSettings = () => useContext(SettingsContext);

export default useSiteSettings;
