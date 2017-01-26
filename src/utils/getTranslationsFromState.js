export default function (key) {
  return (dispatch, getState) => {
    const translations = getState().locale.translations;

    return (translations[key]) ? translations[key] : key;
  };
}
