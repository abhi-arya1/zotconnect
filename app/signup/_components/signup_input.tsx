import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InputWithButtonProps {
  onInputSubmit: (type: string, value: string) => void;
  placeholder: string; // Adding the placeholder prop
}

export function InputWithButton({ onInputSubmit, placeholder }: InputWithButtonProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (onInputSubmit) {
      if(placeholder === "Major (No Abbreviations)") {
        onInputSubmit("Major", inputValue);
      } else {
        onInputSubmit("Interest/Field", inputValue);
      }
    }
  };

  return (
    <div className="flex w-[300px] items-center space-x-2 pt-2">
      <Input
        type="text"
        placeholder={placeholder} // Using the placeholder prop
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button type="submit" className="border-2" onClick={handleSubmit}>Save</Button>
    </div>
  );
}
