import { useEffect, useRef, useState } from 'react';

const NewTodoForm: React.FC<{
  onAdd: (title: string) => Promise<boolean>;
  disabled?: boolean;
}> = ({ onAdd, disabled = false }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus(); // фокус за замовчуванням
  }, []);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const success = await onAdd(value);

    if (success) {
      setValue('');
    }

    inputRef.current?.focus();
  };

  return (
    <form onSubmit={submit}>
      <input
        ref={inputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={disabled}
      />
    </form>
  );
};

export const Header: React.FC<{
  toggleAllActive: boolean;
  onToggleAll: () => Promise<void>;
  onAdd: (title: string) => Promise<boolean>;
  adding: boolean;
}> = ({ toggleAllActive, onToggleAll, onAdd, adding }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={`todoapp__toggle-all ${toggleAllActive ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={() => void onToggleAll()}
      />

      <NewTodoForm onAdd={onAdd} disabled={adding} />
    </header>
  );
};
