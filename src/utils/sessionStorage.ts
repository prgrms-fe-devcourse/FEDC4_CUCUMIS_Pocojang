const setItem = <T>(key: string, value: T) => {
  try {
    const data = JSON.stringify(value);
    sessionStorage.setItem(key, data);
  } catch (error) {
    throw new Error(String(error));
  }
};

const getItem = <T>(key: string): T | null => {
  try {
    const data = sessionStorage.getItem(key);
    if (!data) return null;

    return JSON.parse(data);
  } catch (error) {
    throw new Error(String(error));
  }
};

const removeItem = (key: string) => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    throw new Error(String(error));
  }
};

const session = {
  setItem,
  getItem,
  removeItem,
};

export default session;
