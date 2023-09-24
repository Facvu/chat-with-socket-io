const { VITE_REACT_APP_SECRET, VITE_REACT_APP_CONECTION_URL } = import.meta.env
export const config = {
    SECRET: VITE_REACT_APP_SECRET || 'development',
    CONNECTION_URL: VITE_REACT_APP_CONECTION_URL || 'http://192.168.0.2/'
}