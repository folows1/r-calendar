import React, { useState } from "react";

function App() {

  const [selectedSemester, setSelectedSemester] = useState<null | number>(null);

  const dias = [
    { name: 'segunda', value: 1, label: 'Segunda-feira' },
    { name: 'terça', value: 2, label: 'Terça-feira' },
    { name: 'quarta', value: 3, label: 'Quarta-feira' },
    { name: 'quinta', value: 4, label: 'Quinta-feira' },
    { name: 'sexta', value: 5, label: 'Sexta-feira' },
  ]

  function isSemesterSelected(semester: number): boolean {
    return selectedSemester === semester;
  }

  const handleSemesterChange = (e: React.ChangeEvent<HTMLInputElement>): void => setSelectedSemester(Number(e.target.value));


  return (
    <div>
      <h1>
        Aulas
      </h1>
      <form>

        <label>
          Ano
        </label>
        <input type="number" required />

        <input type="radio" name="semestre" value={1} checked={isSemesterSelected(1)} onChange={handleSemesterChange} id="primeiro" />
        <label htmlFor="primeiro">
          1º Semestre
        </label>

        <input type="radio" name="semestre" value={2} checked={isSemesterSelected(2)} onChange={handleSemesterChange} id="segundo" />
        <label htmlFor="segundo">
          2º Semestre
        </label>

        {dias.map(dia => (
          <div key={dia.value}>
            <input type="checkbox" name={dia.name} value={dia.value} id={dia.label} />
            <label htmlFor={dia.label}>
              {dia.label}
            </label>
          </div>
        ))}

        <input type="submit" value="Enviar" />
      </form>
    </div>
  )
}

export default App
