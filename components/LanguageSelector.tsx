import { SelectMenu, Button, CodeIcon } from "evergreen-ui";
import { langs } from "./langs";
import { Lang } from "lib/types";

export default function LanguageSelector({ selectedLang, onChange } : { selectedLang: Lang, onChange: (lang: Lang) => void }) {
  return (
    <SelectMenu
      options={langs.map((l) => {
        return {
          label: l.name,
          value: l.name,
        };
      })}
      closeOnSelect={true}
      selected={selectedLang ? selectedLang.name : ""}
      onSelect={(option) => {
        const lang = langs.find((l) => l.name === option.label);
        if (lang) {
          onChange(lang);
        }
      }}
      hasTitle={false}
      filterPlaceholder="Search..."
    >
      <Button
        type="button"
        className="lang-select"
        width={220}
        iconBefore={CodeIcon}
        resize="none"
        backgroundColor="var(--input)"
        color="var(--text-primary)"
      >
        {selectedLang
          ? `${selectedLang.name}(.${selectedLang.file})`
          : "Select Language"}
      </Button>
    </SelectMenu>
  );
}
