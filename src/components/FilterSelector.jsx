export default function FilterSelector({ name, id, defaultOptionValue, options }) {

  return (
    <select name={name} id={id}>
      <option value=''>{defaultOptionValue}</option>
      {
        options.map((option) => {
          return (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          )
        })
      }
    </select>
  );
}