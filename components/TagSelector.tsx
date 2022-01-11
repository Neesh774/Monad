import { tags } from "./langs";
import { TagInput, toaster } from "evergreen-ui";

function findDuplicates(arr: string[]) {
  return new Set(arr).size !== arr.length;
}

export default function TagSelector({
  maxOptions = 5,
  selectedTags = [],
  setSelectedTags,
}: {
  maxOptions?: number;
  selectedTags?: string[];
  setSelectedTags: (tags: string[]) => void;
}) {
  return (
    <TagInput
      inputProps={{
        placeholder: "Add tags",
        color: "var(--text-primary)",
      }}
      tagProps={(value) => {
        const tagObj = tags.find((tag) => {
          if (typeof tag.name === "string") {
            return value.toLowerCase().includes(tag.name.toLowerCase());
          }
          return tag.name.find((n) => {
            return value.toLowerCase().includes(n.toLowerCase());
          });
        });
        return {
          color: tagObj ? `hsl(${tagObj.color}, 100%, 81%)` : "neutral",
        };
      }}
      values={selectedTags}
      backgroundColor="var(--input)"
      className="tag-input"
      onChange={(values) => {
        if (values.length > maxOptions) {
          toaster.warning(`You can only select up to ${maxOptions} tags!`, {
            id: "tag-error",
          });
          return;
        } else if (values.some((x) => x.length > 20)) {
          toaster.warning("Tags must be under 20 characters!", {
            id: "tag-error",
          });
          return;
        } else if (values.some((x) => x.length < 2)) {
          toaster.warning("Tags must be over 1 character!", {
            id: "tag-error",
          });
          return;
        } else if (findDuplicates(values)) {
          toaster.warning("Tags must be unique!", {
            id: "tag-error",
          });
          return;
        }
        setSelectedTags(values);
      }}
      width="100%"
    />
  );
}
