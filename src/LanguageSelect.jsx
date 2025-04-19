import React from "react";
import i18next from "i18next";
import { Menu, ActionIcon, rem } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "it", label: "Italiano" },
  { value: "de", label: "Deutsch" },
];

const LanguageMenu = () => {
  const handleChange = (value) => {
    i18next.changeLanguage(value);
  };

  return (
    <div style={{padding: 10, display: "flex", justifyContent: "flex-end"}}>
      <Menu shadow="md" width={150} position="bottom-end" withinPortal>
        <Menu.Target>
          <ActionIcon variant="default" size="lg" aria-label="Change language">
            <IconWorld style={{ width: rem(20), height: rem(20) }} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          {languages.map(({ value, label }) => (
            <Menu.Item key={value} onClick={() => handleChange(value)}>
              {label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default LanguageMenu;
