import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function GridSearchBar() {
  const search_form = useForm({
    defaultValues: {
      search: "",
    },
  });

  const submit = (data) => {
    console.log("Search term:", data.search);
  };

  const onError = (errors) => {
    if (errors.search) {
      toast.error("Search term must be at least 4 characters!");
    }
  };

  return (
    <>
      <form
        className="join flex-1"
        onSubmit={search_form.handleSubmit(submit, onError)}
      >
        <input
          {...search_form.register("search", {
            required: true,
            validate: (value) => value.length > 3 || "Too short",
          })}
          type="search"
          className="input input-primary join-item flex-1"
          placeholder="Search"
        />
        <button type="submit" className="btn btn-primary join-item">
          <SearchIcon className="size-5" />
        </button>
      </form>

      {/* Add this once in your app root ideally */}
    </>
  );
}
