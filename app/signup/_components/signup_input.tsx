import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InputWithButtonProps {
  onInputSubmit: (value: string) => void;
  onAddToList: (value: string) => void;
  placeholder: string; // Adding the placeholder prop
  buttonName: string;
  clearInputOnAdd?: boolean;
}

export function InputWithButton({ onInputSubmit, placeholder, buttonName, clearInputOnAdd, onAddToList }: InputWithButtonProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [pholder, setPlaceholder] = useState(placeholder);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (onInputSubmit && inputValue !== '') {
      if (placeholder === "Add Skills (Coding Languages, Research, etc)") {
        onAddToList(inputValue);
        if(clearInputOnAdd) { setInputValue('') }   
      } else {
        onInputSubmit(inputValue);
      }
    } else if (inputValue === '') {
      setPlaceholder('Please Input At Least One Value!')
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (pholder === 'Please Input At Least One Value!') {
      timeoutId = setTimeout(() => setPlaceholder(placeholder), 1500);
    }

    return () => {
      clearTimeout(timeoutId); // Clear timeout if component unmounts or placeholder changes
    };
  }, [pholder, placeholder]);


  return (
    <div className="flex w-[450px] items-center space-x-2 pt-2">
      <Input
        type="text"
        placeholder={pholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <Button type="submit" className="border-2" onClick={handleSubmit}>{buttonName}</Button>
    </div>
  );
}
