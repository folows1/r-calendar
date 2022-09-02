import React, { useState } from "react";
import List from "./List";

function App() {

  const [selectedSemester, setSelectedSemester] = useState<null | number>(null);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [yearInput, setYearInput] = useState<string>('');
  const [responseArray, setResponseArray] = useState<string[]>([]);

  const weekDays = [
    { name: 'segunda', value: 1, label: 'Segunda-feira' },
    { name: 'terça', value: 2, label: 'Terça-feira' },
    { name: 'quarta', value: 3, label: 'Quarta-feira' },
    { name: 'quinta', value: 4, label: 'Quinta-feira' },
    { name: 'sexta', value: 5, label: 'Sexta-feira' },
  ]

  function isSemesterSelected(semester: number): boolean {
    return selectedSemester === semester;
  }

  function isDaySelected(day: number): boolean {
    return selectedDays.includes(day);
  }

  function handleDaysChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;
    const day = Number(value);
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((item) => item !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  }

  const handleSemesterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedSemester(Number(e.target.value));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const dataToSubmit = {
      ano: Number(yearInput),
      semestre: selectedSemester,
      dias_da_semana: selectedDays,
    }
    console.log(dataToSubmit);
    const resp = await fetch('http://localhost:3001/api/v1/classes', {
      method: 'POST',
      body: JSON.stringify(dataToSubmit),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (resp.ok) {
      const data = await resp.json();
      setResponseArray(data);
    } else {
      const { msg } = await resp.json();
      alert('Erro ao enviar dados: ' + msg);
    }
    clearForm();
  }

  function handleYearInput(e: React.ChangeEvent<HTMLInputElement>): void {
    setYearInput(e.target.value);
  }

  function clearForm(): void {
    setSelectedDays([]);
    setSelectedSemester(null);
    setYearInput('');
  }


  return (
    <>
    <div>
      <h1>
        Aulas
      </h1>
      <form onSubmit={handleSubmit}>

        <label>
          Ano
        </label>
        <input type="number" required value={yearInput} onChange={handleYearInput} />

        <input type="radio" name="semestre" value={1} checked={isSemesterSelected(1)} onChange={handleSemesterChange} id="primeiro" />
        <label htmlFor="primeiro">
          1º Semestre
        </label>

        <input type="radio" name="semestre" value={2} checked={isSemesterSelected(2)} onChange={handleSemesterChange} id="segundo" />
        <label htmlFor="segundo">
          2º Semestre
        </label>

        {weekDays.map(dia => (
          <div key={dia.value}>
            <input type="checkbox" name={dia.name} value={dia.value} id={dia.label} onChange={handleDaysChange} checked={isDaySelected(dia.value)} />
            <label htmlFor={dia.label}>
              {dia.label}
            </label>
          </div>
        ))}

        <input type="submit" value="Enviar" />
      </form>
    </div>
      <List responseArray={responseArray} />
    </>
  )
}

export default App
