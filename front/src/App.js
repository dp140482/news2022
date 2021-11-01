import './App.css';

const App = () => {
  return (
    <div className="App">
      <form>
        <fieldset className="enFieldset upFieldset">
          <div>
            <label>Дата: </label>
            <input type="text" placeholder="YYYY-MM-DD" />
          </div><div className="timeBlock">
            <label>Время: </label>
            <input type="text" placeholder="HH:MM" />
          </div>
        </fieldset>
        <fieldset className="enFieldset textFieldset">
          <label>Текст: </label>
          <textarea className="msgArea" />
        </fieldset>
        <fieldset className="enFieldset downFieldset">
          <label>Темы: </label>
          <input type="text" className="tagsArea" />
        </fieldset>
        <button className="sendBtn">Отправить</button>
      </form>
    </div>
  );
}

export default App;